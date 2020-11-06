Page({
    data: {
        PageCur: "home"
    },
    onShow: function() {
        wx.setNavigationBarTitle({
            title: "好多计算器"
        });
    },
    onShareAppMessage: function() {
        return {
            title: "利率/贷款/税额/ 计算原来可以这么方便，方便快捷好用的一个小工具，推荐给您。",
            path: "/pages/index/index"
        };
    }
});