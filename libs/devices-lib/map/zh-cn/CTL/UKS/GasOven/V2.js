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
Object.defineProperty(exports, "__esModule", { value: true });
var ZH_CN_1 = require("../../../ZH_CN");
var meta_1 = require("../../../../../meta/UKS/meta");
var CountShowField_1 = require("../../../../../meta/CountShowField");
var comms_1 = require("@sdcsoft/comms");
var SdcSoftDevice_1 = require("../../../../../devices/SdcSoftDevice");
//命令：1.010100000001fdca
//      2.0103000b0005f40b
//      3 .0103013e0001e43a
//      4.0103014a0005a5e3
//      5.01030194000345db
//      6.01040000000271cb
//      7.0104000f0010c1c5
//      8.0104002400063003
//      9.01030136000165f8
var Map_CTL_UKS_GasOven_V2 = /** @class */ (function (_super) {
    __extends(Map_CTL_UKS_GasOven_V2, _super);
    function Map_CTL_UKS_GasOven_V2() {
        var _this = _super.call(this) || this;
        _this.addPoint(new CountShowField_1.CountShowField(comms_1.GroupKeys.KEY_BASE, SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_DAYS, '运行天数', ''));
        _this.addPoint(new CountShowField_1.CountShowField(comms_1.GroupKeys.KEY_BASE, SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_HOURS, '运行小时数', ''));
        _this.addPoint(new meta_1.DemandField("ba_moshileixing", 120, 2, "模式类型", '', Map_CTL_UKS_GasOven_V2.coms_moshi));
        return _this;
    }
    Map_CTL_UKS_GasOven_V2.coms_moshi = {
        0: "蒸汽型",
        1: "热水型",
        2: "燃烧器型",
    };
    return Map_CTL_UKS_GasOven_V2;
}(ZH_CN_1.Map_ZH_CN));
exports.Map_CTL_UKS_GasOven_V2 = Map_CTL_UKS_GasOven_V2;
