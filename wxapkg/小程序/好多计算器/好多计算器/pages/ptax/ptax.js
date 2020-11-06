getApp();

var t = null;

Page({
    data: {
        tips: "*这里是简单的说明哦，你知道的。",
        salary: "",
        insur: "",
        discus: "",
        start: 5e3,
        loadModal: !1,
        showResult: !1,
        config: {
            salary: "税前月薪",
            insur: "五险一金",
            discus: "专项扣除",
            start: "起征点"
        },
        result: {}
    },
    bindViewTap: function() {
        wx.navigateTo({
            url: "../logs/logs"
        });
    },
    onLoad: function() {
        wx.setNavigationBarTitle({
            title: "个税计算器"
        }), wx.createInterstitialAd && ((t = wx.createInterstitialAd({
            adUnitId: "adunit-40aa48347aa76a3b"
        })).onLoad(function() {}), t.onError(function(t) {}), t.onClose(function() {}));
    },
    mvvmAction: function(t) {
        var a = {};
        a[t.currentTarget.dataset.name] = t.detail && t.detail.value, this.setData(a), console.log(a);
    },
    didStart: function(a) {
        var s = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/, i = new RegExp(s);
        if (console.log("点击了开始"), "" != this.data.salary && i.test(this.data.salary)) if ("" != this.data.insur && i.test(this.data.insur)) {
            var o = Number(this.data.salary), e = Number(this.data.insur), n = 0;
            i.test(this.data.discus) && (n = Number(this.data.discus)), t && t.show().catch(function(t) {
                console.error(t);
            });
            var l = require("../../utils/calculator").ptaxCalculator(o, e, n), r = {
                result: l
            };
            this.loadModal(), this.setData(r), console.log(l);
        } else wx.showToast({
            title: "请先填写" + this.data.config.insur,
            icon: "none"
        }); else wx.showToast({
            title: "请先正确填写" + this.data.config.salary,
            icon: "none"
        });
    },
    loadModal: function() {
        var t = this;
        this.setData({
            loadModal: !0,
            showResult: !1
        }), setTimeout(function() {
            t.setData({
                loadModal: !1,
                showResult: !0
            });
        }, 1e3);
    },
    onShareAppMessage: function() {
        return {
            title: "一款好用的个税计算器，推荐给您。",
            path: "/pages/ptax/ptax"
        };
    }
});