App({
    onLaunch: function() {
        var t = this, a = wx.getStorageSync("logs") || [];
        a.unshift(Date.now()), wx.setStorageSync("logs", a), wx.login({
            success: function(t) {}
        }), wx.getSetting({
            success: function(a) {
                a.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(a) {
                        t.globalData.userInfo = a.userInfo, t.userInfoReadyCallback && t.userInfoReadyCallback(a);
                    }
                });
            }
        }), wx.getSystemInfo({
            success: function(a) {
                t.globalData.StatusBar = a.statusBarHeight;
                var s = wx.getMenuButtonBoundingClientRect();
                s ? (t.globalData.Custom = s, t.globalData.CustomBar = s.bottom + s.top - a.statusBarHeight) : t.globalData.CustomBar = a.statusBarHeight + 50;
            }
        });
    },
    globalData: {
        userInfo: null
    }
});