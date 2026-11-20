// SmartBudget – שכבת ענן משותפת לשתי האפליקציות (index.html + work.html)
// כל הקריאות ל-Google Apps Script עוברות מכאן, עם קוד גישה (token) שנשמר במכשיר בלבד.
(function () {
    'use strict';

    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz_oBoiUpQ9C_yFsBafkSKjodk1qmuh1sFxnsqFnQ3XHITsWlSOOlLHqgeKqLXlvAgQ/exec';
    // גיבוי זמני: נקרא רק כל עוד השרת עדיין בגרסה הישנה (בלי action=transactions).
    // אחרי עדכון ה-Apps Script וביטול "פרסום לאינטרנט" של הגיליון, הוא כבר לא בשימוש.
    const LEGACY_TSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQQhpqylBsPuVtMuG7o8HLOKA-EMr-qEZ42jkr7B1frtIMq9ORruM6P2EIOMjgrRU0-T0FHDkniySrG/pub?output=tsv';
    const TOKEN_KEY = 'sb_access_token';

    class AuthError extends Error {
        constructor(msg) { super(msg || 'unauthorized'); this.name = 'AuthError'; }
    }

    function getToken() {
        try { return localStorage.getItem(TOKEN_KEY) || ''; } catch (e) { return ''; }
    }
    function setToken(t) {
        try { localStorage.setItem(TOKEN_KEY, String(t || '').trim()); } catch (e) {}
    }
    function hasToken() { return !!getToken(); }

    // מבקש מהמשתמש קוד גישה. מחזיר true אם הוזן קוד חדש.
    function askToken(reason) {
        const msg = (reason ? reason + '\n\n' : '') +
            'הזן את קוד הגישה לענן.\n(הקוד מופיע ביומן הריצה של Apps Script אחרי הרצת setupToken)';
        const t = prompt(msg, getToken());
        if (t && t.trim()) { setToken(t); return true; }
        return false;
    }

    async function getJson(params) {
        const qs = new URLSearchParams(Object.assign({}, params, { token: getToken(), t: Date.now() }));
        const res = await fetch(SCRIPT_URL + '?' + qs.toString());
        const text = await res.text();
        let data = null;
        try { data = JSON.parse(text); } catch (e) {}
        if (data && (data.error === 'unauthorized' || data.error === 'not_configured')) {
            throw new AuthError(data.error);
        }
        return data;
    }

    // מחזיר { aliases: object|null, categories: object }
    async function loadConfig() {
        const data = await getJson({ action: 'config' });
        if (!data || typeof data !== 'object') throw new Error('תשובה לא תקינה מהענן');
        return {
            aliases: data.aliases ? JSON.parse(data.aliases) : null,
            categories: data.categories ? JSON.parse(data.categories) : {}
        };
    }

    // מחזיר מערך שורות (בלי שורת הכותרת): [תאריך, שם עסק, סכום, סוג, אמצעי תשלום]
    async function loadTransactionRows() {
        const data = await getJson({ action: 'transactions' });
        if (data && Array.isArray(data.rows)) return data.rows;
        // שרת ישן – מחזיר את ההגדרות במקום עסקאות. נופלים לגיליון המפורסם (זמני).
        const res = await fetch(LEGACY_TSV_URL + '&t=' + Date.now());
        const text = await res.text();
        if (/^\s*</.test(text)) return []; // הגיליון כבר לא מפורסם (דף HTML)
        return text.split('\n').slice(1)
            .map(r => r.replace(/\r$/, '').split('\t'))
            .filter(cols => cols.length >= 4);
    }

    // שליחת פעולה לשרת. mode:no-cors => אי אפשר לקרוא תשובה, רק לדעת שהבקשה יצאה.
    function post(payload) {
        return fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(Object.assign({}, payload, { token: getToken() }))
        });
    }

    // עדכון הגדרות בטוח: קורא את הגרסה העדכנית מהענן, נותן ל-mutator לשנות רק את מה שבבעלותו,
    // ושומר. כך אפליקציה אחת לא דורסת נתונים שהשנייה כתבה בינתיים.
    // mutator(cfg) מקבל { aliases, categories } ומחזיר { aliases, categories } (או false לביטול).
    let writeChain = Promise.resolve();
    function updateConfig(mutator) {
        const job = writeChain.catch(() => {}).then(async () => {
            const cfg = await loadConfig();
            if (!cfg.aliases) cfg.aliases = {};
            const next = mutator(cfg);
            if (next === false) return false;
            const out = next || cfg;
            await post({
                action: 'save_config',
                aliases: JSON.stringify(out.aliases || {}),
                categories: JSON.stringify(out.categories || {})
            });
            return true;
        });
        writeChain = job;
        return job;
    }

    function escHtml(s) {
        return String(s == null ? '' : s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }
    // ארגומנט בטוח ל-onclick="fn(...)" בתוך HTML
    function jsArg(v) { return escHtml(JSON.stringify(v == null ? '' : v)); }

    window.SBCloud = { AuthError, getToken, setToken, hasToken, askToken, loadConfig, loadTransactionRows, post, updateConfig };
    window.escHtml = escHtml;
    window.jsArg = jsArg;
})();
