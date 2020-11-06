getApp();

var t = null;

Page({
    data: {
        total: "",
        month: "",
        per: "",
        tips: "利率的计算方式，",
        loadModal: !1,
        showResult: !1,
        config: {
            total: "贷款总额",
            month: "贷款时长",
            per: "每月还款金额"
        },
        result: {}
    },
    onLoad: function(a) {
        wx.setNavigationBarTitle({
            title: "利率计算器"
        }), wx.createInterstitialAd && ((t = wx.createInterstitialAd({
            adUnitId: "adunit-40aa48347aa76a3b"
        })).onLoad(function() {}), t.onError(function(t) {}), t.onClose(function() {}));
        var o = new Date(), e = require("../../utils/util").formatYmd(o);
        this.setData({
            enddate: e
        });
    },
    mvvmAction: function(t) {
        console.log(t.currentTarget.dataset);
        var a = {};
        a[t.currentTarget.dataset.name] = t.detail && t.detail.value, this.setData(a), console.log(a);
    },
    didStart: function(a) {
        var o = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/, e = new RegExp(o);
        if ("" != this.data.total && e.test(this.data.total)) if ("" != this.data.month && e.test(this.data.month)) if ("" != this.data.per && e.test(this.data.per)) {
            t && t.show().catch(function(t) {
                console.error(t);
            }), console.log("---ddd---");
            var n = require("../../utils/calculator").rateCalculator(this.data.total, this.data.month, this.data.per), i = {
                result: n
            };
            this.setData(i), this.loadModal(), console.log(n);
        } else wx.showToast({
            title: "请先正确填写" + this.data.config.per,
            icon: "none"
        }); else wx.showToast({
            title: "请先正确填写" + this.data.config.month,
            icon: "none"
        }); else wx.showToast({
            title: "请先正确填写" + this.data.config.total,
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
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "你知道信用卡分期的真实利率和名义利率的差距有多大吗？",
            path: "/pages/rate/rate"
        };
    }
});