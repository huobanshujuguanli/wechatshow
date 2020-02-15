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
var V2_Base_1 = require("../AScript/V2_Base");
module.exports = /** @class */ (function (_super) {
    __extends(CTL_UKS_GasOven_V2_1, _super);
    function CTL_UKS_GasOven_V2_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CTL_UKS_GasOven_V2_1.prototype.addFocusFields = function (list) {
        var map = this.getMockFields();
        list.push(map.getItem("mo_huishuiNTC1wendu"));
        list.push(map.getItem("mo_songshuiNTC2wendu"));
    };
    return CTL_UKS_GasOven_V2_1;
}(V2_Base_1.CTL_UKS_GasOven_V2_Base));
