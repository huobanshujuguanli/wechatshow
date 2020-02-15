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
var meta_1 = require("../../../../../../../meta/UKS/meta");
var SdcSoftDevice_1 = require("../../../../../../../devices/SdcSoftDevice");
var FixedValueField_1 = require("../../../../../../../meta/FixedValueField");
var V2_1 = require("../../V2");
//命令：1.010100000001fdca
//      2.0103000b0005f40b
//      3 .0103013e0001e43a
//      4.0103014a0005a5e3
//      5.01030194000345db
//      6.01040000000271cb
//      7.0104000f0010c1c5
//      8.0104002400063003
//      9.01030136000165f8
var Map_CTL_UKS_GasOven_V2_Base = /** @class */ (function (_super) {
    __extends(Map_CTL_UKS_GasOven_V2_Base, _super);
    function Map_CTL_UKS_GasOven_V2_Base() {
        var _this = _super.call(this) || this;
        _this.addPoint(new meta_1.BaseInfoField("ba_kaiguanji", 3, 1, "控制器状态", '', Map_CTL_UKS_GasOven_V2_Base.coms_kaiguan));
        _this.addPoint(new meta_1.BaseInfoField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_SYSTEM_STATUS, 94, 2, "燃气炉状态", '', Map_CTL_UKS_GasOven_V2_Base.coms_status));
        _this.addPoint(new FixedValueField_1.FixedValueField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_POWER, "燃料类型", 0, Map_CTL_UKS_GasOven_V2_Base.coms_power));
        // this.addPoint(new InputOutputField( "ba_IN1", 57, 2, "IN1",0));
        // this.addPoint(new InputOutputField("ba_IN2", 57, 2, "IN2",1));
        // this.addPoint(new InputOutputField("ba_IN3", 57, 2, "IN3",2));
        // this.addPoint(new InputOutputField( "ba_IN4", 57, 2, "IN4",3));
        // this.addPoint(new InputOutputField("ba_IN5", 57, 2, "IN5",4));
        // this.addPoint(new InputOutputField( "ba_IN6", 57, 2, "IN6",5));
        // this.addPoint(new InputOutputField("ba_lizihuoyan", 57, 2, "离子火焰",6));
        // this.addPoint(new InputOutputField("ba_IN7", 57, 2, "IN7",7));
        // this.addPoint(new InputOutputField("ba_IN8", 57, 2, "IN8",8));
        // this.addPoint(new InputOutputField( "ba_IN9", 57, 2, "IN9",9));
        // this.addPoint(new InputOutputField("ba_OUT1", 59, 2, "OUT1",0));
        // this.addPoint(new InputOutputField("ba_OUT2", 59, 2, "OUT2",1));
        // this.addPoint(new InputOutputField( "ba_OUT3", 59, 2, "OUT3",2));
        // this.addPoint(new InputOutputField("ba_OUT4", 59, 2, "OUT4",3));
        // this.addPoint(new InputOutputField("ba_OUT5", 59, 2, "OUT5",4));
        // this.addPoint(new InputOutputField("ba_OUT6", 59, 2, "OUT6",5));
        // this.addPoint(new InputOutputField("ba_OUT7", 59, 2, "OUT7",6));
        _this.addPoint(new meta_1.MockField("mo_fengjisudufankui", 88, 2, "风机速度反馈", "rpm"));
        _this.addPoint(new meta_1.MockField("mo_fengjisudushuchu", 96, 2, "风机速度输出", "rpm"));
        _this.addPoint(new meta_1.ExceptionField("ex_fubengxiangxu", 92, 2, "氟泵相序", 0));
        _this.addPoint(new meta_1.ExceptionField("ex_yanwenguogao_baojing_", 92, 2, "烟温过高（报警）", 1));
        _this.addPoint(new meta_1.ExceptionField("ex_fengjiguzhang", 92, 2, "风机故障", 3));
        _this.addPoint(new meta_1.ExceptionField("ex_canhuo", 92, 2, "残火", 4));
        _this.addPoint(new meta_1.ExceptionField("ex_dianhuoshibai", 92, 2, "点火失败", 5));
        _this.addPoint(new meta_1.ExceptionField("ex_chuanhuoshibai", 92, 2, "传火失败", 6));
        _this.addPoint(new meta_1.ExceptionField("ex_xihuo", 92, 2, "熄火", 7));
        _this.addPoint(new meta_1.ExceptionField("ex_yudianhuoshibai", 92, 2, "预点火失败", 10));
        _this.addPoint(new meta_1.ExceptionField("ex_zhufa1louqi", 92, 2, "主阀1漏气", 11));
        _this.addPoint(new meta_1.ExceptionField("ex_zhufa2louqi", 92, 2, "主阀2漏气", 12));
        _this.addPoint(new meta_1.ExceptionField("ex_ranqiyalidi", 92, 2, "燃气压力低", 13));
        _this.addPoint(new meta_1.ExceptionField("ex_xianwenbaohu", 92, 2, "限温保护", 14));
        _this.addPoint(new meta_1.ExceptionField("ex_fengjiyalidi", 113, 2, "风机压力低", 0));
        _this.addPoint(new meta_1.ExceptionField("ex_yanqichuanganqiqueshi", 113, 2, "烟气传感器缺失", 3));
        _this.addPoint(new meta_1.ExceptionField("ex_fengyachuanganqiguzhang", 113, 2, "风压传感器故障", 4));
        _this.addPoint(new meta_1.ExceptionField("ex_yanqiyalidi", 113, 2, "烟气压力低", 5));
        _this.addPoint(new meta_1.ExceptionField("ex_yanyachuanganqiguzhang", 113, 2, "烟压传感器故障", 6));
        _this.addPoint(new meta_1.ExceptionField("ex_huishuiguzhang", 113, 2, "回水故障", 7));
        return _this;
    }
    Map_CTL_UKS_GasOven_V2_Base.coms_status = {
        0: "上电延时",
        1: "关机",
        2: "待机",
        3: "前清扫",
        4: "欲点火",
        5: "点火",
        6: "传火",
        7: "工作",
        8: "停炉",
        9: "故障",
        10: "小火保持",
        11: "自检",
        12: "捡漏",
        13: "开点火器",
        14: "启动等待中",
    };
    Map_CTL_UKS_GasOven_V2_Base.coms_kaiguan = {
        0: "关机",
        1: "开机",
    };
    return Map_CTL_UKS_GasOven_V2_Base;
}(V2_1.Map_CTL_UKS_GasOven_V2));
exports.Map_CTL_UKS_GasOven_V2_Base = Map_CTL_UKS_GasOven_V2_Base;
