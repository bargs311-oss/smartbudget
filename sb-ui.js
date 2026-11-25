// SmartBudget – רכיבי ממשק משותפים לשתי האפליקציות: גיליון תחתון, שורות עם החלקה, אייקונים.
(function () {
    'use strict';

    const ICONS = {
        close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
        prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
        next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
        chevDown: '<svg class="row-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
        chevLeft: '<svg class="row-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
        lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="5" y="11" width="14" height="10" rx="1"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
        trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>',
        edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
        plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
        gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
        budget: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 7h12l6 5-6 5H3z"/><circle cx="15" cy="12" r="1.4" fill="currentColor" stroke="none"/></svg>',
        clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
        cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M7 18h10a4 4 0 0 0 .6-8A6 6 0 0 0 6 9.5 4.3 4.3 0 0 0 7 18z"/></svg>',
        tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.3" fill="currentColor" stroke="none"/></svg>',
        layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/></svg>',
        inbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 13l3-8h12l3 8v6H3z"/><path d="M3 13h5l1 2h6l1-2h5"/></svg>',
        repeat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/></svg>',
        sliders: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/></svg>',
        key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M15 8l2 2"/></svg>',
        trend: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>',
        grip: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>',
        check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
        shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4" stroke-linecap="round"/></svg>',
        warn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h0"/></svg>'
    };

    // ---------- גיליון תחתון ----------
    const openStack = [];
    function openSheet(id) {
        const el = document.getElementById(id);
        if (!el) return;
        if (!el.classList.contains('open')) {
            el._returnFocus = document.activeElement;
            el.classList.add('open');
            el.setAttribute('aria-hidden', 'false');
            openStack.push(el);
            document.body.style.overflow = 'hidden';
        }
        const body = el.querySelector('.sheet-body');
        if (body) body.scrollTop = 0;
        setTimeout(() => {
            const f = el.querySelector('[autofocus]') || el.querySelector('.sheet-close');
            if (f) f.focus({ preventScroll: true });
        }, 30);
    }
    function closeSheet(id) {
        const el = typeof id === 'string' ? document.getElementById(id) : id;
        if (!el || !el.classList.contains('open')) return;
        el.classList.remove('open');
        el.setAttribute('aria-hidden', 'true');
        const i = openStack.indexOf(el);
        if (i > -1) openStack.splice(i, 1);
        if (el._onClose) { const f = el._onClose; el._onClose = null; f(); }
        if (!openStack.length) document.body.style.overflow = '';
        if (el._returnFocus && el._returnFocus.focus) el._returnFocus.focus({ preventScroll: true });
    }
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && openStack.length) closeSheet(openStack[openStack.length - 1]);
    });
    document.addEventListener('click', e => {
        const t = e.target;
        if (t.classList && t.classList.contains('sheet') && t.classList.contains('open')) closeSheet(t);
        const c = t.closest && t.closest('[data-close-sheet]');
        if (c) closeSheet(c.closest('.sheet'));
    });

    // ---------- שורות עם החלקה ----------
    // החלקה ימינה חושפת את הפעולות בצד שמאל (כמו ב-iOS בעברית). לחיצה על שורה פתוחה סוגרת אותה.
    function closeAllSwipes(except) {
        document.querySelectorAll('.sw-row.open').forEach(r => {
            if (r === except) return;
            r.classList.remove('open');
            const c = r.querySelector('.sw-content');
            if (c) c.style.transform = '';
        });
    }
    function bindSwipe(root) {
        (root || document).querySelectorAll('.sw-row:not([data-sw-bound])').forEach(row => {
            row.setAttribute('data-sw-bound', '1');
            const content = row.querySelector('.sw-content');
            const actions = row.querySelector('.sw-actions');
            if (!content || !actions) return;
            let startX = 0, startY = 0, dx = 0, tracking = false, decided = false, horizontal = false, base = 0, pid = null;
            const width = () => actions.offsetWidth || 76;

            content.addEventListener('pointerdown', e => {
                if (e.button !== undefined && e.button !== 0) return;
                startX = e.clientX; startY = e.clientY; dx = 0;
                tracking = true; decided = false; horizontal = false; pid = e.pointerId;
                base = row.classList.contains('open') ? width() : 0;
            });
            content.addEventListener('pointermove', e => {
                if (!tracking || e.pointerId !== pid) return;
                const mx = e.clientX - startX, my = e.clientY - startY;
                if (!decided && (Math.abs(mx) > 8 || Math.abs(my) > 8)) {
                    decided = true; horizontal = Math.abs(mx) > Math.abs(my);
                    if (horizontal) {
                        row.classList.add('dragging');
                        closeAllSwipes(row);
                        try { content.setPointerCapture(pid); } catch (err) { /* */ }
                    }
                }
                if (!horizontal) return;
                dx = Math.max(0, Math.min(width() + 24, base + mx));
                content.style.transform = `translateX(${dx}px)`;
            });
            const end = () => {
                if (!tracking) return;
                tracking = false;
                row.classList.remove('dragging');
                if (!horizontal) return;
                const open = dx > width() / 2;
                row.classList.toggle('open', open);
                content.style.transform = open ? `translateX(${width()}px)` : '';
            };
            content.addEventListener('pointerup', end);
            content.addEventListener('pointercancel', end);
            content.addEventListener('click', e => {
                if (horizontal && decided) { e.stopPropagation(); e.preventDefault(); decided = false; return; }
                if (row.classList.contains('open')) {
                    e.stopPropagation(); e.preventDefault();
                    row.classList.remove('open'); content.style.transform = '';
                }
            }, true);
            // מקלדת: Enter/רווח על שורה פותח את הפעולות
            content.addEventListener('keydown', e => {
                if (e.key !== 'Enter' && e.key !== ' ') return;
                if (e.target !== content) return;
                e.preventDefault();
                const open = !row.classList.contains('open');
                closeAllSwipes(row);
                row.classList.toggle('open', open);
                content.style.transform = open ? `translateX(${width()}px)` : '';
                if (open) { const b = actions.querySelector('button'); if (b) b.focus(); }
            });
        });
    }
    document.addEventListener('pointerdown', e => {
        if (!e.target.closest || !e.target.closest('.sw-row')) closeAllSwipes();
    }, { passive: true });

    // ---------- דיאלוג בגיליון: במקום prompt / confirm / alert של הדפדפן ----------
    let dialogEl = null;
    function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
    function ensureDialog() {
        if (dialogEl) return dialogEl;
        dialogEl = document.createElement('div');
        dialogEl.className = 'sheet';
        dialogEl.id = 'sbDialog';
        dialogEl.setAttribute('role', 'dialog');
        dialogEl.setAttribute('aria-modal', 'true');
        dialogEl.setAttribute('aria-hidden', 'true');
        dialogEl.setAttribute('aria-labelledby', 'sbDialogTitle');
        dialogEl.innerHTML = `<div class="sheet-panel">
            <div class="sheet-head"><div><h2 id="sbDialogTitle"></h2></div><button type="button" class="sheet-close" data-close-sheet aria-label="סגירה">${ICONS.close}</button></div>
            <form class="sheet-body" id="sbDialogBody" novalidate></form>
            <div class="sheet-foot"><div class="btn-row"><button type="button" class="btn btn-secondary" id="sbDialogCancel">ביטול</button><button type="button" class="btn" id="sbDialogOk">אישור</button></div></div>
        </div>`;
        document.body.appendChild(dialogEl);
        return dialogEl;
    }
    // fields: [{ name, label, type: text|number|date|time|select|textarea, value, options, required, placeholder, hint, inputmode, list, validate(v) → error|null }]
    function dialog(opts) {
        const el = ensureDialog();
        const o = Object.assign({ title: '', message: '', fields: [], okLabel: 'אישור', cancelLabel: 'ביטול', danger: false, alertOnly: false }, opts);
        el.querySelector('#sbDialogTitle').textContent = o.title;
        const form = el.querySelector('#sbDialogBody');
        let html = o.message ? `<p class="sheet-note" style="white-space:pre-line;font-size:15px;color:var(--ink);">${esc(o.message)}</p>` : '';
        o.fields.forEach((f, i) => {
            const id = 'sbf-' + i;
            let input;
            if (f.type === 'select') {
                input = `<select class="input" id="${id}">${(f.options || []).map(op => {
                    const v = typeof op === 'object' ? op.value : op, l = typeof op === 'object' ? op.label : op;
                    return `<option value="${esc(v)}" ${String(v) === String(f.value) ? 'selected' : ''}>${esc(l)}</option>`;
                }).join('')}</select>`;
            } else if (f.type === 'textarea') {
                input = `<textarea class="input" id="${id}" rows="5" placeholder="${esc(f.placeholder)}" style="font-size:14px;direction:ltr;text-align:left;">${esc(f.value)}</textarea>`;
            } else {
                input = `<input class="input" id="${id}" type="${f.type || 'text'}" ${f.inputmode ? `inputmode="${f.inputmode}"` : ''} ${f.step ? `step="${f.step}"` : ''} ${f.readonly ? 'readonly' : ''} value="${esc(f.value)}" placeholder="${esc(f.placeholder)}" autocomplete="off" ${f.list ? `list="${esc(f.list)}"` : ''}>`;
            }
            html += `<label class="field" for="${id}"><span>${esc(f.label)}</span>${input}${f.hint ? `<small>${esc(f.hint)}</small>` : ''}</label>`;
        });
        html += `<p class="form-error" id="sbDialogError" role="alert" hidden></p><button type="submit" hidden></button>`;
        form.innerHTML = html;
        const ok = el.querySelector('#sbDialogOk'), cancel = el.querySelector('#sbDialogCancel');
        ok.textContent = o.okLabel;
        ok.className = 'btn' + (o.danger ? ' btn-danger' : '');
        cancel.textContent = o.cancelLabel;
        cancel.hidden = o.alertOnly;
        return new Promise(resolve => {
            let done = false;
            const finish = val => {
                if (done) return;
                done = true;
                el._onClose = null;
                closeSheet(el);
                resolve(val);
            };
            const showErr = (m, inp) => {
                const p = form.querySelector('#sbDialogError');
                showFieldError(p, m, inp);
            };
            el._onClose = () => { if (!done) { done = true; resolve(null); } };
            ok.onclick = () => {
                const vals = {};
                for (let i = 0; i < o.fields.length; i++) {
                    const f = o.fields[i];
                    const inp = form.querySelector('#sbf-' + i);
                    const v = inp.value.trim();
                    if (f.required && !v) { showErr(f.requiredMsg || `צריך למלא: ${f.label}`, inp); inp.focus(); return; }
                    const err = f.validate ? f.validate(v, vals) : null; // vals = השדות שכבר נבדקו (לבדיקות בין שדות)
                    if (err) { showErr(err, inp); inp.focus(); return; }
                    vals[f.name] = v;
                }
                finish(o.fields.length ? vals : true);
            };
            cancel.onclick = () => finish(null);
            form.onsubmit = e => { e.preventDefault(); ok.onclick(); };
            openSheet('sbDialog');
            setTimeout(() => { const f = form.querySelector('input:not([readonly]), select, textarea'); (f || ok).focus({ preventScroll: true }); }, 60);
        });
    }
    // מציג הודעת שגיאה מתחת לשדה הרלוונטי ומסמן אותו; בלי שדה – ההודעה נשארת במקומה. msg ריק מנקה.
    function showFieldError(p, msg, inp) {
        const scope = p.closest('form, .sheet-body') || document;
        scope.querySelectorAll('[aria-invalid="true"]').forEach(el => el.removeAttribute('aria-invalid'));
        if (!msg) { p.hidden = true; p.textContent = ''; return; }
        p.innerHTML = ICONS.warn + '<span></span>';
        p.lastChild.textContent = msg;
        if (inp) {
            const field = inp.closest('.field');
            if (field) field.after(p);
            inp.setAttribute('aria-invalid', 'true');
            if (p.id) inp.setAttribute('aria-describedby', p.id);
        }
        p.hidden = false;
    }

    function confirmSheet(message, o) {
        o = o || {};
        return dialog({ title: o.title || 'לאשר?', message, okLabel: o.okLabel || 'אישור', danger: !!o.danger }).then(v => !!v);
    }
    function alertSheet(message, title) {
        return dialog({ title: title || 'שימו לב', message, okLabel: 'הבנתי', alertOnly: true }).then(() => undefined);
    }

    // ---------- הודעה קצרה ----------
    let toastTimer = null;
    function toast(text) {
        let t = document.getElementById('toast');
        if (!t) {
            t = document.createElement('div');
            t.id = 'toast'; t.className = 'toast'; t.setAttribute('role', 'status'); t.setAttribute('aria-live', 'polite');
            document.body.appendChild(t);
        }
        t.textContent = text;
        t.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
    }

    // ---------- מחיקה בשתי לחיצות בתוך השורה ----------
    // לחיצה ראשונה מחליפה את הכפתור ל"למחוק?", לחיצה שנייה תוך 3 שניות מאשרת.
    function armDelete(btn) {
        if (btn.classList.contains('armed')) return true;
        btn.classList.add('armed');
        btn._label = btn.innerHTML;
        btn.innerHTML = `${ICONS.trash}למחוק?`;
        btn.setAttribute('aria-label', 'לחיצה נוספת מוחקת');
        clearTimeout(btn._t);
        btn._t = setTimeout(() => { btn.classList.remove('armed'); btn.innerHTML = btn._label; btn.removeAttribute('aria-label'); }, 3000);
        return false;
    }

    window.SBUI = { ICONS, openSheet, closeSheet, bindSwipe, closeAllSwipes, dialog, confirm: confirmSheet, alert: alertSheet, toast, armDelete, showFieldError };
})();
