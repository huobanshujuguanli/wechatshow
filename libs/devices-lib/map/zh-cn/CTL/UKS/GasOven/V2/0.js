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
var V2_1 = require("../V2");
var FixedValueField_1 = require("../../../../../../meta/FixedValueField");
var SdcSoftDevice_1 = require("../../../../../../devices/SdcSoftDevice");
var meta_1 = require("../../../../../../meta/UKS/meta");
module.exports = /** @class */ (function (_super) {
    __extends(Map_CTL_UKS_GasOven_V2_0, _super);
    function Map_CTL_UKS_GasOven_V2_0() {
        var _this = _super.call(this) || this;
        _this.addPoint(new FixedValueField_1.FixedValueField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_MEDIA, "介质类型", 1, Map_CTL_UKS_GasOven_V2_0.coms_media));
        _this.addPoint(new meta_1.SettingField_BaseNumber("se_yalishedingzhi", 46, 2, "压力设定值", "MPa", 1000));
        _this.addPoint(new meta_1.SettingField_BaseNumber("se_yaliqidongyacha", 48, 2, "压力启动压差", "MPa", 1000));
        _this.addPoint(new meta_1.SettingField_BaseNumber("se_yalitingzhiyacha", 50, 2, "压力停止压差", "MPa", 1000));
        _this.addPoint(new meta_1.MockField_BaseNumber("mo_zhengqiyali", 74, 2, "蒸汽压力", "MPa", 1000));
        _this.addPoint(new meta_1.MockField("mo_dishuiweiADzhi", 78, 2, "低水位AD值"));
        _this.addPoint(new meta_1.MockField("mo_zhongshuiweiADzhi", 80, 2, "中水位AD值"));
        _this.addPoint(new meta_1.MockField("mo_gaoshuiweiADzhi", 82, 2, "高水位AD值"));
        _this.addPoint(new meta_1.ExceptionField("ex_queshui_zhengqi_", 92, 2, "缺水（蒸汽）", 2));
        _this.addPoint(new meta_1.ExceptionField("ex_jinshuichaoshi_zhengqi_", 92, 2, "进水超时（蒸汽）", 8));
        _this.addPoint(new meta_1.ExceptionField("ex_baoshuichaoshi_zhengqi_", 92, 2, "保水超时（蒸汽）", 9));
        return _this;
    }
    return Map_CTL_UKS_GasOven_V2_0;
}(V2_1.Map_CTL_UKS_GasOven_V2));
