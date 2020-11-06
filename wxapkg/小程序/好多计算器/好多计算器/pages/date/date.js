getApp();

var t = null;

Page({
    data: {
        birthday: "",
        startdate: "2020-09-09",
        tips: "*这里是简单的说明哦，你知道的。",
        loadModal: !1,
        showResult: !1,
        config: {
            birthday: "截至日期"
        },
        result: {
            zage: "",
            xage: "",
            days_all: ""
        }
    },
    onLoad: function(a) {
        wx.setNavigationBarTitle({
            title: "多少天计算器"
        }), wx.createInterstitialAd && ((t = wx.createInterstitialAd({
            adUnitId: "adunit-40aa48347aa76a3b"
        })).onLoad(function() {}), t.onError(function(t) {}), t.onClose(function() {}));
        var e = new Date(), o = require("../../utils/util").formatYmd(e);
        this.setData({
            startdate: o
        });
    },
    mvvmAction: function(t) {
        var a = {};
        a[t.currentTarget.dataset.name] = t.detail && t.detail.value, this.setData(a), console.log(a);
    },
    didStart: function(a) {
        if ("" != this.data.birthday) {
            t && t.show().catch(function(t) {
                console.error(t);
            });
            var e = require("../../utils/calculator").dateCalculator(this.data.birthday), o = {
                result: e
            };
            this.setData(o), this.loadModal(), console.log(e);
        } else wx.showToast({
            title: "请先选择出生年月日",
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
        return this.data.result.days_all ? {
            title: "我已经在这个世界上待了" + this.data.result.days_all + "天了。",
            path: "/pages/age/age"
        } : {
            title: "来看看你您在这个世界上待了多少天吧！",
            path: "/pages/age/age"
        };
    }
});