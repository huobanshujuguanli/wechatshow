module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1573525725020, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var Date_1 = require("./Date");
exports.DateUtil = Date_1.DateUtil;

}, function(modId) {var map = {"./Date":1573525725021}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1573525725021, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var DateUtil = /** @class */ (function () {
    function DateUtil() {
    }
    DateUtil.getThisWeekRange = function () {
        var now = new Date();
        var length = now.getDay() - 1;
        var year = now.getFullYear();
        var monday = new Date(year, now.getMonth(), now.getDate() - length);
        var weekRange = { timestamp: monday.getTime(), over: length };
        return weekRange;
    };
    DateUtil.getThisMonthRange = function () {
        var now = new Date();
        var year = now.getFullYear();
        var length = now.getDate() - 1;
        var monthStartDate = new Date(year, now.getMonth(), 1);
        var monthRange = { timestamp: monthStartDate.getTime(), over: length };
        return monthRange;
    };
    DateUtil.getThreeMonthRange = function () {
        return this.getPreMonthDay(2);
    };
    DateUtil.getNowRange = function () {
        var now = new Date();
        var year = now.getFullYear();
        now = new Date(year, now.getMonth(), now.getDate());
        return { timestamp: now.getTime(), over: 0 };
    };
    DateUtil.dateFormat = function (date, format) {
        var args = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "H+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            S: date.getMilliseconds()
        };
        if (/(y+)/.test(format))
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var i in args) {
            var n = args[i];
            if (new RegExp("(" + i + ")").test(format))
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
        }
        return format;
    };
    DateUtil.stringToDate = function (dateString) {
        if (dateString) {
            var date = new Date(dateString.replace(/-/, "/"));
            return date;
        }
        return null;
    };
    DateUtil.getPreMonthDay = function (monthNum) {
        var date = new Date();
        var year = date.getFullYear(); //获取当前日期的年份
        var month = date.getMonth(); //获取当前日期的月份
        //date = new Date(year,month,1);
        var year2 = year;
        var month2 = month - monthNum;
        if (month2 <= 0) {
            year2 = year2 - (month2 / 12 == 0 ? 1 : month2 / 12);
            month2 = 12 - (Math.abs(month2) % 12);
        }
        var date2 = new Date(year2, month2, 1);
        var length = Math.floor((date.getTime() - date2.getTime()) / 86400000);
        var range = { timestamp: date2.getTime(), over: length };
        return range;
    };
    return DateUtil;
}());
exports.DateUtil = DateUtil;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1573525725020);
})()
//# sourceMappingURL=index.js.map