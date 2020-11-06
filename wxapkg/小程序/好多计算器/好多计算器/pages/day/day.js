getApp();

var t = null;

Page({
    data: {
        drate: "",
        tips: "利率的计算方式，",
        loadModal: !1,
        showResult: !1,
        config: {
            drate: "日利率"
        },
        result: {}
    },
    onLoad: function(a) {
        wx.setNavigationBarTitle({
            title: "贷款计算器"
        }), wx.createInterstitialAd && ((t = wx.createInterstitialAd({
            adUnitId: "adunit-40aa48347aa76a3b"
        })).onLoad(function() {}), t.onError(function(t) {}), t.onClose(function() {}));
        var n = new Date(), e = require("../../utils/util").formatYmd(n);
        this.setData({
            enddate: e
        });
    },
    mvvmAction: function(t) {
        this.setData({
            showResult: !1
        });
        var a = {};
        a[t.currentTarget.dataset.name] = t.detail && t.detail.value, this.setData(a);
    },
    didStart: function(a) {
        var n = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/, e = new RegExp(n);
        if ("" != this.data.drate && e.test(this.data.drate)) {
            t && t.show().catch(function(t) {
                console.error(t);
            }), this.startLoading();
            var o = {
                result: require("../../utils/calculator").dayCalculator(this.data.drate)
            };
            this.setData(o), this.endLoading();
        } else wx.showToast({
            title: "请先正确填写" + this.data.config.drate,
            icon: "none"
        });
    },
    startLoading: function() {
        this.setData({
            loadModal: !0,
            showResult: !1
        });
    },
    endLoading: function() {
        var t = this;
        setTimeout(function() {
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
            title: "你知道万5的日利率，实际年利率又多高吗？",
            path: "/pages/day/day"
        };
    }
});