getApp();

var t = null;

Page({
    data: {
        type: "1",
        total: "",
        month: "",
        rate: "",
        tips: "利率的计算方式，",
        loadModal: !1,
        showResult: !1,
        config: {
            type: "还款方式",
            total: "贷款总额",
            month: "贷款时长",
            rate: "贷款年利率"
        },
        result: {}
    },
    onLoad: function(a) {
        wx.setNavigationBarTitle({
            title: "贷款计算器"
        }), wx.createInterstitialAd && ((t = wx.createInterstitialAd({
            adUnitId: "adunit-40aa48347aa76a3b"
        })).onLoad(function() {}), t.onError(function(t) {}), t.onClose(function() {}));
        var o = new Date(), n = require("../../utils/util").formatYmd(o);
        this.setData({
            enddate: n
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
        var o = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/, n = new RegExp(o);
        if ("" != this.data.total && n.test(this.data.total)) if ("" != this.data.month && n.test(this.data.month)) if ("" != this.data.rate && n.test(this.data.rate)) {
            t && t.show().catch(function(t) {
                console.error(t);
            }), this.startLoading();
            var e = {
                result: require("../../utils/calculator").loanCalculator(this.data.type, this.data.total, this.data.month, this.data.rate)
            };
            this.setData(e), this.endLoading();
        } else wx.showToast({
            title: "请先正确填写" + this.data.config.rate,
            icon: "none"
        }); else wx.showToast({
            title: "请先正确填写" + this.data.config.month,
            icon: "none"
        }); else wx.showToast({
            title: "请先正确填写" + this.data.config.total,
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
            title: "一款好用的贷款计算器，推荐给您。",
            path: "/pages/loan/loan"
        };
    }
});