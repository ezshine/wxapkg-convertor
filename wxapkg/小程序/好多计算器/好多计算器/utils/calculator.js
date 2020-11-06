function r(r) {
    return {
        error: "error",
        msg: r
    };
}

function t(r, t, e) {
    var a = r - t - e, o = [ {
        level: 5e3,
        rate: .03
    }, {
        level: 8e3,
        rate: .1
    }, {
        level: 17e3,
        rate: .2
    }, {
        level: 3e4,
        rate: .25
    }, {
        level: 4e4,
        rate: .3
    }, {
        level: 6e4,
        rate: .35
    }, {
        level: 85e3,
        rate: .45
    } ], n = 0, l = 0, u = 0;
    for (var s in o) {
        var p = o[s];
        if (a < p.level) break;
        n += (a - p.level) * (p.rate - l), l += p.rate, u = p.rate;
    }
    return n = Math.round(100 * n) / 100, {
        tax: n,
        cur: u,
        taxN: a - n + e
    };
}

function e(r, t, e) {
    if ("1" == t) {
        var a = r / (1 + e / 100);
        return a = Math.round(100 * a) / 100, {
            tax: o = Math.round(100 * (r - a)) / 100,
            taxP: a,
            taxN: r
        };
    }
    if ("0" == t) {
        var o = Math.round(r * e) / 100, n = 1 * r + o;
        return n = Math.round(100 * n) / 100, {
            tax: o,
            taxN: n,
            taxP: r
        };
    }
    return d;
}

function a(r, t, e, a) {
    var o = r - t - e;
    if (o <= a) console.log(o); else {
        var n = .03 * (o - a), l = o - n;
        console.log(n), console.log(l);
    }
}

function o(r, t, e, a) {
    return "1" == r ? n(t, e, a / 100) : "0" == r ? l(t, e, a / 100) : void 0;
}

function n(r, t, e) {
    r = parseFloat(r);
    for (var a = parseInt(t), o = parseFloat(e) / 12, n = r * o * Math.pow(1 + o, a) / (Math.pow(1 + o, a) - 1), l = a * n - r, u = l + r, s = [], p = l + r, c = 1; c <= a; c++) {
        var h = r * o * (Math.pow(1 + o, a) - Math.pow(1 + o, c - 1)) / (Math.pow(1 + o, a) - 1);
        (p -= n) < 0 && (p = 0), h = Math.round(100 * h) / 100;
        var i = Math.round(100 * n) / 100, d = {
            monthName: "第" + c + "月",
            monthRate: h,
            curMoney: i,
            yueBenjin: i - h,
            leftFund: Math.round(100 * p) / 100
        };
        s.push(d);
    }
    return n = Math.round(100 * n) / 100, l = Math.round(100 * l) / 100, u = Math.round(100 * u) / 100, 
    {
        per: n,
        interest: l,
        totalPrice: u,
        monthArray: s
    };
}

function l(r, t, e) {
    r = parseFloat(r);
    for (var a = parseInt(t), o = parseFloat(e) / 12, n = r / a, l = n + r * o, u = (n + r * o + r / a * (1 + o)) / 2 * a - r, s = u + r, p = [], c = u + r, h = 0, i = 1; i <= a; i++) {
        var d = (r - (h = n * (i - 1))) * o, v = n + d;
        (c -= v) < 0 && (c = 0);
        var M = {
            monthName: "第" + i + "月",
            monthRate: d = Math.round(100 * d) / 100,
            perBenjin: Math.round(100 * n) / 100,
            curMoney: v = Math.round(100 * v) / 100,
            leftFund: Math.round(100 * c) / 100
        };
        p.push(M);
    }
    return l = Math.round(100 * l) / 100, u = Math.round(100 * u) / 100, s = Math.round(100 * s) / 100, 
    {
        firstMonth: l,
        interest: u,
        totalPrice: s,
        monthArray: p
    };
}

function u(r, t, e) {
    for (var a = 1 + e, o = 1, n = 0; n < t; n++) o *= a;
    return r * e * o / (o - 1);
}

function s(r, t, e, a, o) {
    var n = u(r, t, a), l = 1 / r;
    return o > 100 ? a : n - e > l ? s(r, t, e, a - .01 / o, o + 1) : n - e > 0 ? a : n - e > -l / 2 ? a : s(r, t, e, a + .01 / o, o + 1);
}

function p(t, e, a) {
    t = Number(t), e = Number(e);
    var o = (a = Number(a)) * e;
    if (o < t) return r("还款总额不能小于贷款总额");
    if (o == t) return {
        rate: 0
    };
    var n = 2 * e * ((o - t) / t / e * 12) / (e + 1);
    return n = s(t, e, a, n / 12, 1), n = Math.round(1e4 * n * 12) / 100, {
        rate: n
    };
}

function c(r) {
    var t = r.split("-");
    if (3 != t.length) return "error";
    var e = parseInt(t[0]), a = parseInt(t[1]), o = parseInt(t[2]), n = new Date(e, a - 1, o), l = new Date(), u = l.getFullYear(), s = l.getMonth() + 1, p = l.getDate(), c = s > a || s == a && p >= o ? u - e : u - e - 1, h = u - e + 1, i = l.getTime() - n.getTime();
    return {
        zage: c,
        xage: h,
        days_all: parseInt(i / 864e5) + 1
    };
}

function h(r) {
    var t = 30 * r, e = 360 * r;
    return t = Math.round(t) / 100, e = Math.round(e) / 100, {
        mrate: t,
        yrate: e
    };
}

function i(r) {
    var t = r.split("-");
    if (3 != t.length) return "error";
    var e = parseInt(t[0]), a = parseInt(t[1]), o = parseInt(t[2]), r = new Date(e, a - 1, o), n = new Date(), l = r.getTime() - n.getTime();
    return {
        days_all: parseInt(l / 864e5) + 1
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ptaxCalculator = t, exports.taxCalculator = e, exports.houseCalculator = a, 
exports.loanCalculator = o, exports.loanBenxi = n, exports.loadBenjin = l, exports.loanPerCalculator = u, 
exports.handleRate = s, exports.rateCalculator = p, exports.ageCalculator = c, exports.dayCalculator = h, 
exports.dateCalculator = i;

var d = {
    error: "error",
    msg: "出错了啊"
};

module.exports = {
    ptaxCalculator: t,
    taxCalculator: e,
    houseCalculator: a,
    loanCalculator: o,
    rateCalculator: p,
    ageCalculator: c,
    loanPerCalculator: u,
    dayCalculator: h,
    dateCalculator: i
};