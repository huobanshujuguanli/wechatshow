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
var CountField_1 = require("../../../../meta/CountField");
var meta_1 = require("../../../../meta/RT/meta");
var SdcSoftDevice_1 = require("../../../../devices/SdcSoftDevice");
var CountShowField_1 = require("../../../../meta/CountShowField");
var comms_1 = require("@sdcsoft/comms");
var FixedValueField_1 = require("../../../../meta/FixedValueField");
var X7_1 = require("../../../../devices/CTL/RT/X7");
var X_1 = require("./X");
var Map_CTL_RT_X7 = /** @class */ (function (_super) {
    __extends(Map_CTL_RT_X7, _super);
    function Map_CTL_RT_X7() {
        var _this = _super.call(this) || this;
        _this.addPoint(new CountField_1.CountField(X7_1.CTL_RT_X7.KEY_POINT_Add_SHUI_BENG, "给水泵"));
        _this.addPoint(new CountField_1.CountField(X7_1.CTL_RT_X7.KEY_POINT_RAN_SHAO_QI, "燃烧器"));
        _this.addPoint(new CountField_1.CountField(X7_1.CTL_RT_X7.KEY_POINT_LENG_NING_BENG, "节能泵"));
        _this.addPoint(new CountField_1.CountField(X7_1.CTL_RT_X7.KEY_POINT_PAI_WU_FA, "排污阀"));
        _this.addPoint(new meta_1.BaseInfoField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_SYSTEM_STATUS, 3, 2, "控制器状态", '', Map_CTL_RT_X7.coms_status));
        _this.addPoint(new meta_1.BaseInfoField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_LIFE, 53, 2, "运行时间", "时"));
        _this.addPoint(new CountShowField_1.CountShowField(comms_1.GroupKeys.KEY_BASE, SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_DAYS, "运行天数", "天"));
        _this.addPoint(new CountShowField_1.CountShowField(comms_1.GroupKeys.KEY_BASE, SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_HOURS, "运行小时数", "时"));
        _this.addPoint(new FixedValueField_1.FixedValueField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_POWER, "燃料类型", 0, Map_CTL_RT_X7.coms_power));
        _this.addPoint(new FixedValueField_1.FixedValueField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_MEDIA, "介质类型", 1, Map_CTL_RT_X7.coms_media));
        _this.addPoint(new meta_1.DeviceField("de_jishuibeng_shoudong/zidong_", 49, 2, "给水泵", 1, Map_CTL_RT_X7.coms_auto));
        _this.addPoint(new meta_1.DeviceField("de_jishuibeng_zhu/bei_", 49, 2, "给水泵", 0, Map_CTL_RT_X7.coms_master));
        _this.addPoint(new meta_1.DeviceField("de_jienengbeng_zidong/shoudong_", 49, 2, "节能泵", 3, Map_CTL_RT_X7.coms_auto));
        _this.addPoint(new meta_1.DeviceField("de_jienengbeng_zhu/bei_", 49, 2, "节能泵", 2, Map_CTL_RT_X7.coms_master));
        _this.addPoint(new meta_1.OpenCloseField("oc_jixiandishuiwei", 5, 2, "极限低水位", 0, Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.OpenCloseField("oc_chaoyabaojing", 5, 2, "超压报警", 6, Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.OpenCloseField("oc_ranshaoqiguzhang", 5, 2, "燃烧器故障", 7, Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.DeviceField(X7_1.CTL_RT_X7.KEY_POINT_RAN_SHAO_QI_KONGZHI, 9, 2, "燃烧器", 0, Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.OpenCloseField("oc_ranshaoqidahuo", 9, 2, "燃烧器大火", 1, Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.DeviceField(X7_1.CTL_RT_X7.KEY_POINT_PAI_WU_FA_1, 9, 2, "排污阀", 2, Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.DeviceField(X7_1.CTL_RT_X7.KEY_POINT_LENG_NING_BENG_1, 9, 2, "节能泵", 3, Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.DeviceField(X7_1.CTL_RT_X7.KEY_POINT_Add_SHUI_BENG_1, 9, 2, "给水泵", 4, Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.OpenCloseField("oc_baojingzhuangtaishuchu", 9, 2, "报警状态输出", 5, Map_CTL_RT_X7.coms_open_close));
        _this.addPoint(new meta_1.MockField("mo_zhengqiyali", 13, 2, "蒸汽压力", "mPa", 100));
        _this.addPoint(new meta_1.ExceptionField("ex_jixiandishuiweibao", 45, 2, "极限低水位报警", 0));
        _this.addPoint(new meta_1.ExceptionField("ex_gaoshuiweibaojing", 45, 2, "高水位报警", 1));
        return _this;
    }
    return Map_CTL_RT_X7;
}(X_1.Map_CTL_RT_X));
exports.Map_CTL_RT_X7 = Map_CTL_RT_X7;
