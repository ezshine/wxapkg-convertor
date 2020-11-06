var t = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
};

module.exports = {
    formatTime: function(e) {
        var n = e.getFullYear(), r = e.getMonth() + 1, o = e.getDate(), u = e.getHours(), a = e.getMinutes(), g = e.getSeconds();
        return [ n, r, o ].map(t).join("/") + " " + [ u, a, g ].map(t).join(":");
    },
    formatYmd: function(e) {
        return [ e.getFullYear(), e.getMonth() + 1, e.getDate() ].map(t).join("/");
    }
};