// SmartBudget – חישוב שכר נטו משותף לשעון הנוכחות ולאפליקציית התקציב.
// כל הערכים שמשתנים משנה לשנה מרוכזים כאן ב-PAYROLL. כדאי להשוות פעם בשנה מול תלוש אמיתי.
(function () {
    'use strict';

    const PAYROLL = {
        REGULAR_HOURS: 8.0,

        // מדרגות מס הכנסה חודשיות (מוקפאות 2025-2027; לבדוק מול רשות המסים בתחילת כל שנה)
        TAX_BRACKETS: [
            { upTo: 7010, rate: 0.10 },
            { upTo: 10060, rate: 0.14 },
            { upTo: 16150, rate: 0.20 },
            { upTo: 22440, rate: 0.31 },
            { upTo: 46690, rate: 0.35 },
            { upTo: Infinity, rate: 0.47 }
        ],
        CREDIT_POINTS: 2.25,
        CREDIT_POINT_VALUE: 242,          // ₪ לחודש לנקודת זיכוי
        RESIDENT_DISCOUNT_RATE: 0.07,     // הנחת יישוב מוטב
        RESIDENT_DISCOUNT_CAP: 12220,     // תקרת הכנסה להנחה (חודשית)
        PENSION_EMPLOYEE_RATE: 0.07,
        PENSION_TAX_CREDIT_RATE: 0.35,

        // ביטוח לאומי + מס בריאות (עובד) – שיעורים מ-2025: 4.27% עד הסף, 12.17% מעליו
        NI_THRESHOLD: 7703,
        NI_REDUCED_RATE: 0.0427,
        NI_FULL_RATE: 0.1217,
        NI_MAX_INCOME: 51910,

        // הטבות שכר קבועות (זקיפות) וסיבוס
        CIBUS_IMPUTED_PER_DAY: 40,        // זקיפת סיבוס ליום עבודה
        CIBUS_DEDUCTION_PER_DAY: 12,      // ניכוי סיבוס מהנטו ליום עבודה
        FIXED_IMPUTED: 20.00 + 42.31      // רט"ן + ביטוח בריאות
    };

    function incomeTax(taxGross) {
        let tax = 0, prev = 0;
        for (const b of PAYROLL.TAX_BRACKETS) {
            if (taxGross <= prev) break;
            tax += (Math.min(taxGross, b.upTo) - prev) * b.rate;
            prev = b.upTo;
        }
        return tax;
    }

    function nationalInsurance(taxGross) {
        const g = Math.min(Math.max(taxGross, 0), PAYROLL.NI_MAX_INCOME);
        if (g <= PAYROLL.NI_THRESHOLD) return g * PAYROLL.NI_REDUCED_RATE;
        return PAYROLL.NI_THRESHOLD * PAYROLL.NI_REDUCED_RATE + (g - PAYROLL.NI_THRESHOLD) * PAYROLL.NI_FULL_RATE;
    }

    // shifts: המשמרות של החודש בלבד. מחזיר פירוט מלא.
    function computeNet({ shifts, wage, travel, bonus }) {
        wage = Number(wage) || 0;
        travel = Number(travel) || 0;
        bonus = Number(bonus) || 0;

        let pensionableBasePay = 0;
        let totalGrossPay = 0;
        const workDays = new Set();

        (shifts || []).forEach(s => {
            const shiftPay = parseFloat(s.pay || 0) || 0;
            totalGrossPay += shiftPay;
            if (s.type === 'shift' || !s.type) {
                workDays.add(normalizeDate(s.date));
                const hrs = parseFloat(s.hours || 0) || 0;
                pensionableBasePay += Math.min(hrs, PAYROLL.REGULAR_HOURS) * wage;
            } else if (s.type === 'vacation' || s.type === 'sick') {
                pensionableBasePay += shiftPay;
            }
        });

        const daysCount = workDays.size;
        const cibusImputed = daysCount * PAYROLL.CIBUS_IMPUTED_PER_DAY;
        const cibusDeduction = daysCount * PAYROLL.CIBUS_DEDUCTION_PER_DAY;
        const totalImputed = cibusImputed + PAYROLL.FIXED_IMPUTED;

        const physicalGross = totalGrossPay + travel + bonus;
        const taxGross = physicalGross + totalImputed;
        const pension = (pensionableBasePay + bonus) * PAYROLL.PENSION_EMPLOYEE_RATE;
        const bleumi = nationalInsurance(taxGross);

        let tax = incomeTax(taxGross);
        tax -= PAYROLL.CREDIT_POINTS * PAYROLL.CREDIT_POINT_VALUE;
        tax -= Math.min(taxGross, PAYROLL.RESIDENT_DISCOUNT_CAP) * PAYROLL.RESIDENT_DISCOUNT_RATE;
        tax -= pension * PAYROLL.PENSION_TAX_CREDIT_RATE;
        if (tax < 0) tax = 0;

        const net = physicalGross - pension - bleumi - tax - cibusDeduction;
        return {
            totalGrossPay, travel, bonus, daysCount, cibusImputed, cibusDeduction, totalImputed,
            physicalGross, taxGross, pension, bleumi, tax, net
        };
    }

    // תאריך משמרת אחיד: dd.mm.yyyy (גם אם נשמר בעבר כ-1.9.2026)
    function normalizeDate(str) {
        const p = String(str || '').split(/[./-]/);
        if (p.length !== 3) return String(str || '');
        let [d, m, y] = p;
        if (p[0].length === 4) { y = p[0]; m = p[1]; d = p[2]; } // yyyy-mm-dd
        if (y.length === 2) y = '20' + y;
        return `${d.padStart(2, '0')}.${m.padStart(2, '0')}.${y}`;
    }

    // חישוב נטו לחודש עבודה מתוך הנתונים השמורים במכשיר (משותף לשתי האפליקציות).
    // מחזיר מספר > 0 או 0 אם אין מספיק נתונים.
    function netForMonthFromStorage(monthKey) {
        try {
            const shifts = JSON.parse(localStorage.getItem('shiftsHistory') || '[]');
            const monthShifts = shifts.filter(s => s.monthKey === monthKey);
            const bonus = parseFloat(localStorage.getItem('bonus_' + monthKey) || '0') || 0;
            const wage = parseFloat(localStorage.getItem('hourlyWage') || '0') || 0;
            if (!wage || (monthShifts.length === 0 && bonus <= 0)) return 0;
            const travel = parseFloat(localStorage.getItem('travelExp') || '0') || 0;
            const r = computeNet({ shifts: monthShifts, wage, travel, bonus });
            return r.net > 0 ? Math.round(r.net) : 0;
        } catch (e) {
            return 0;
        }
    }

    window.SBPayroll = { PAYROLL, computeNet, incomeTax, nationalInsurance, normalizeDate, netForMonthFromStorage };
})();
