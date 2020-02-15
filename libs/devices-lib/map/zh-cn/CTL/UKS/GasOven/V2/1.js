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
    __extends(Map_CTL_UKS_GasOven_V2_1, _super);
    function Map_CTL_UKS_GasOven_V2_1() {
        var _this = _super.call(this) || this;
        _this.addPoint(new FixedValueField_1.FixedValueField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_MEDIA, "介质类型", 0, Map_CTL_UKS_GasOven_V2_1.coms_media));
        _this.addPoint(new meta_1.SettingField("se_qidongwencha", 9, 2, "启动温差", "℃"));
        _this.addPoint(new meta_1.SettingField("se_tingzhiwencha", 17, 2, "停止温差", "℃"));
        _this.addPoint(new meta_1.SettingField_BaseNumber("se_wendusheding", 24, 2, "温度设定", "℃", 10));
        _this.addPoint(new meta_1.SettingField_BaseNumber("se_wendushedingzuidazhi", 31, 2, "温度设定最大值", "℃", 10));
        _this.addPoint(new meta_1.SettingField_BaseNumber("se_wendushedingzuixiaozhi", 33, 2, "温度设定最小值", "℃", 10));
        _this.addPoint(new meta_1.SettingField("se_tingjiwendushedingzhi", 35, 2, "停机温度设定值", "℃"));
        _this.addPoint(new meta_1.SettingField_Count("se_wennuantianqiwendushedingzhi", 37, 2, "温暖天气温度设定值", "℃"));
        _this.addPoint(new meta_1.SettingField_Count("se_hanlengtianqiwendushedingzhi", 39, 2, "寒冷天气温度设定值", "℃"));
        _this.addPoint(new meta_1.MockField_BaseNumber("mo_huishuiNTC1wendu", 66, 2, "回水NTC1温度", "℃", 10));
        _this.addPoint(new meta_1.MockField_BaseNumber("mo_songshuiNTC2wendu", 68, 2, "送水NTC2温度", "℃", 10));
        _this.addPoint(new meta_1.MockField_BaseNumber("mo_yanqiNTC3wendu", 70, 2, "烟气NTC3温度", "℃", 10));
        _this.addPoint(new meta_1.MockField_BaseNumber("mo_shiwaiNTC4wendu", 72, 2, "室外NTC4温度", "℃", 10));
        _this.addPoint(new meta_1.MockField_BaseNumber("mo_wendushedingzhi_youshiwaiwendudechu_", 103, 2, "温度设定值（由室外温度得出）", "℃", 10));
        _this.addPoint(new meta_1.MockField_BaseNumber("mo_wendushedingzhi_shiji_", 107, 2, "温度设定值（实际）", "℃", 10));
        _this.addPoint(new meta_1.ExceptionField("ex_wushuiliu_reshui，ranshaoqi_", 92, 2, "无水流（热水，燃烧器）", 15));
        _this.addPoint(new meta_1.ExceptionField("ex_huishuichuanganqiqueshi", 113, 2, "回水传感器缺失", 1));
        _this.addPoint(new meta_1.ExceptionField("ex_chushuichuanganqiqueshi", 113, 2, "出水传感器缺失", 2));
        _this.addPoint(new meta_1.ExceptionField("ex_lengningshuiweigao_reshui_", 113, 2, "冷凝水位高（热水）", 8));
        return _this;
    }
    return Map_CTL_UKS_GasOven_V2_1;
}(V2_1.Map_CTL_UKS_GasOven_V2));
