Component({
    options: {
        addGlobalClass: !0
    },
    data: {
        elements: [ {
            title: "利率计算器",
            name: "rate",
            color: "cyan",
            icon: "colorlens",
            path: "/pages/rate/rate"
        }, {
            title: "贷款计算器",
            name: "loan",
            color: "brown",
            icon: "colorlens",
            path: "/pages/loan/loan"
        }, {
            title: "日转年利率",
            name: "day",
            color: "orange",
            icon: "btn",
            path: "/pages/day/day"
        }, {
            title: "税额计算器",
            name: "tax",
            color: "green",
            icon: "refund",
            path: "/pages/tax/tax"
        }, {
            title: "个税计算器",
            name: "ptax",
            color: "blue",
            icon: "refund",
            path: "/pages/ptax/ptax"
        }, {
            title: "年龄计算器",
            name: "age",
            color: "pink",
            icon: "colorlens",
            path: "/pages/age/age"
        }, {
            title: "多少天计算器",
            name: "age",
            color: "pink",
            icon: "colorlens",
            path: "/pages/date/date"
        } ]
    },
    methods: {
        toCharts: function() {
            wx.navigateToMiniProgram({
                appId: "wxf967f659a2494ab9",
                path: "pages/index/index",
                success: function(a) {}
            });
        }
    }
});