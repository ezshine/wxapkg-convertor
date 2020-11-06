getApp();

var t = null;

Page({
    data: {
        type: "1",
        total: "",
        rate: "",
        tips: "*这里是简单的说明哦，你知道的。",
        loadModal: !1,
        showResult: !1,
        config: {
            type: "计算方式",
            total: "总金额",
            rate: "税率"
        },
        result: {}
    },
    onLoad: function(a) {
        wx.setNavigationBarTitle({
            title: "税额计算器"
        }), wx.createInterstitialAd && ((t = wx.createInterstitialAd({
            adUnitId: "adunit-40aa48347aa76a3b"
        })).onLoad(function() {}), t.onError(function(t) {}), t.onClose(function() {}));
    },
    mvvmAction: function(t) {
        console.log(t.currentTarget.dataset);
        var a = {};
        a[t.currentTarget.dataset.name] = t.detail && t.detail.value, this.setData(a), console.log(a);
    },
    didStart: function(a) {
        var o = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/, e = new RegExp(o);
        if ("" != this.data.total && e.test(this.data.total)) if ("" != this.data.rate && e.test(this.data.rate)) if (this.data.rate >= 100) wx.showToast({
            title: "税率在100%以内",
            icon: "none"
        }); else {
            t && t.show().catch(function(t) {
                console.error(t);
            });
            var n = require("../../utils/calculator").taxCalculator(this.data.total, this.data.type, this.data.rate), i = {
                result: n
            };
            this.setData(i), this.loadModal(), console.log(n);
        } else wx.showToast({
            title: "请先正确填写" + this.data.config.rate,
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
            title: "快速知道要缴多少增值税，可以让您报价更精准哦。",
            path: "/pages/tax/tax"
        };
    }
});