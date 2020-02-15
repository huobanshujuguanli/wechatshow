"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var X7_1 = require("../X7");
module.exports = /** @class */ (function (_super) {
    __extends(CTL_RX_X7_1, _super);
    function CTL_RX_X7_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CTL_RX_X7_1.prototype.addFocusFields = function (list) {
        _super.prototype.addFocusFields.call(this, list);
        var map = this.getMockFields();
        list.push(map.getItem("mo_zhengqiyali"));
        list.push(map.getItem("mo_paiyanwendu"));
        list.push(map.getItem("mo_guoluchukouyanwen"));
        list.push(map.getItem("mo_jienengqishuiwen"));
        list.push(map.getItem("mo_lengningpaiyanwendu"));
    };
    return CTL_RX_X7_1;
}(X7_1.CTL_RT_X7));
