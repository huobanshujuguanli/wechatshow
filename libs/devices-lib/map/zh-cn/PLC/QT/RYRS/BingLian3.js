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
var _a;
"use strict";
var BaseMap_1 = require("../../BaseMap");
var meta_1 = require("../../../../../meta/PLC/meta");
var CountField_1 = require("../../../../../meta/CountField");
var BaseDevice_1 = require("../../../../../devices/PLC/BaseDevice");
var SdcSoftDevice_1 = require("../../../../../devices/SdcSoftDevice");
var FixedValueField_1 = require("../../../../../meta/FixedValueField");
var BingLian_3_1 = require("../../../../../devices/PLC/QT/RYRS/AScript/BingLian_3");
var meta_2 = require("../../../../../meta/PLC/QT/meta");
module.exports = (_a = /** @class */ (function (_super) {
        __extends(Map_PLC_QT_RYRS_BingLian3, _super);
        function Map_PLC_QT_RYRS_BingLian3() {
            var _this = _super.call(this) || this;
            /**
             * 计算属性（不显示）
             */
            _this.addPoint(new CountField_1.CountField(BaseDevice_1.PLC.KEY_POINT_Add_SHUI_BENG, "补水泵"));
            _this.addPoint(new CountField_1.CountField(BaseDevice_1.PLC.KEY_POINT_XUN_HUAN_BENG, "循环泵"));
            _this.addPoint(new CountField_1.CountField(BingLian_3_1.PLC_QT_RYRS_BingLian_3.KEY_POINT_RE_SHUI_BENG, "热水泵"));
            _this.addPoint(new CountField_1.CountField(BingLian_3_1.PLC_QT_RYRS_BingLian_3.KEY_POINT_LU_QIAN_BENG, "炉前泵"));
            _this.addPoint(new meta_1.BaseInfoField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_HOURS, 9, 2, "运行小时数", "时"));
            _this.addPoint(new meta_1.BaseInfoField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_DAYS, 11, 2, "运行天数", "天"));
            _this.addPoint(new meta_1.BaseInfoField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_SYSTEM_STATUS, 13, 2, "系统状态", '', BaseMap_1.Map_PLC.coms_status));
            _this.addPoint(new FixedValueField_1.FixedValueField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_POWER, "燃料", 0, Map_PLC_QT_RYRS_BingLian3.coms_power));
            _this.addPoint(new FixedValueField_1.FixedValueField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_MEDIA, "介质", 0, Map_PLC_QT_RYRS_BingLian3.coms_media));
            _this.addPoint(new meta_2.RanShaoQiField("ba_1#ranshaoqizhuangtai", 21, 2, "1#燃烧器状态", '', Map_PLC_QT_RYRS_BingLian3.rsq_status));
            _this.addPoint(new meta_2.RanShaoQiField("ba_2#ranshaoqizhuangtai", 23, 2, "2#燃烧器状态", '', Map_PLC_QT_RYRS_BingLian3.rsq_status));
            _this.addPoint(new meta_2.RanShaoQiField("ba_3#ranshaoqizhuangtai", 25, 2, "3#燃烧器状态", '', Map_PLC_QT_RYRS_BingLian3.rsq_status));
            _this.addPoint(new meta_1.MockField("mo_ecichushuiwendu(fengpan)", 35, 2, "二次出水温度(风盘)", "℃"));
            _this.addPoint(new meta_1.MockField("mo_ecihuishuiwendu(fengpan)", 39, 2, "二次回水温度(风盘)", "℃"));
            _this.addPoint(new meta_1.MockField("mo_reshuixiangwendu", 43, 2, "热水箱温度", "℃"));
            _this.addPoint(new meta_1.MockField("mo_ecibushuiyali(fengpan)", 55, 2, "二次补水压力(风盘)", "Mpa"));
            _this.addPoint(new meta_1.MockField("mo_bushuibengpinlufankui", 111, 2, "补水泵频率反馈", "Hz"));
            _this.addPoint(new meta_1.MockField("mo_xunhuanbengpinlufankui", 119, 2, "循环泵频率反馈", "Hz"));
            _this.addPoint(new meta_1.MockField("mo_1#guoluchushuiwendu", 123, 2, "1#锅炉出水温度", "℃"));
            _this.addPoint(new meta_1.MockField("mo_2#guoluchushuiwendu", 127, 2, "2#锅炉出水温度", "℃"));
            _this.addPoint(new meta_1.MockField("mo_3#guoluchushuiwendu", 131, 2, "3#锅炉出水温度", "℃"));
            _this.addPoint(new meta_1.MockField("mo_1#guoluhuishuiwendu", 135, 2, "1#锅炉回水温度", "℃"));
            _this.addPoint(new meta_1.MockField("mo_2#guoluhuishuiwendu", 139, 2, "2#锅炉回水温度", "℃"));
            _this.addPoint(new meta_1.MockField("mo_3#guoluhuishuiwendu", 143, 2, "3#锅炉回水温度", "℃"));
            _this.addPoint(new meta_1.MockField("mo_1#guolupaiyanwendu", 147, 2, "1#锅炉排烟温度", "℃"));
            _this.addPoint(new meta_1.MockField("mo_2#guolupaiyanwendu", 151, 2, "2#锅炉排烟温度", "℃"));
            _this.addPoint(new meta_1.MockField("mo_3#guolupaiyanwendu", 155, 2, "3#锅炉排烟温度", "℃"));
            _this.addPoint(new meta_1.SettingField("se_1#guoluqiluwendusheding", 248, 2, "1#锅炉启炉温度设定", "℃"));
            _this.addPoint(new meta_1.SettingField("se_2#guoluqiluwendusheding", 252, 2, "2#锅炉启炉温度设定", "℃"));
            _this.addPoint(new meta_1.SettingField("se_3#guoluqiluwendusheding", 256, 2, "3#锅炉启炉温度设定", "℃"));
            _this.addPoint(new meta_1.SettingField("se_1#guolutingluwendusheding", 260, 2, "1#锅炉停炉温度设定", "℃"));
            _this.addPoint(new meta_1.SettingField("se_2#guolutingluwendusheding", 264, 2, "2#锅炉停炉温度设定", "℃"));
            _this.addPoint(new meta_1.SettingField("se_3#guolutingluwendusheding", 268, 2, "3#锅炉停炉温度设定", "℃"));
            _this.addPoint(new meta_1.SettingField("se_huishuimubiaowendusheding(eci)", 272, 2, "回水目标温度设定(二次)", "℃"));
            _this.addPoint(new meta_1.SettingField("se_bushuimubiaoyalisheding(eci)", 276, 2, "补水目标压力设定(二次)", "MPa"));
            _this.addPoint(new meta_1.SettingField("se_reshuixiangwendudixiansheding", 280, 2, "热水箱温度低限设定", "℃"));
            _this.addPoint(new meta_1.SettingField("se_reshuixiangwendugaoxiansheding", 284, 2, "热水箱温度高限设定", "℃"));
            _this.addPoint(new meta_1.SettingField("se_1#guoluchushuiwendugaobaojingsheding", 288, 2, "1#锅炉出水温度高报警设定", "℃"));
            _this.addPoint(new meta_1.SettingField("se_2#guoluchushuiwendugaobaojingsheding", 292, 2, "2#锅炉出水温度高报警设定", "℃"));
            _this.addPoint(new meta_1.SettingField("se_3#guoluchushuiwendugaobaojingsheding", 296, 2, "3#锅炉出水温度高报警设定", "℃"));
            _this.addPoint(new meta_1.SettingField("se_1#guolupaiyanwendugaobaojingsheding", 300, 2, "1#锅炉排烟温度高报警设定", "℃"));
            _this.addPoint(new meta_1.SettingField("se_2#guolupaiyanwendugaobaojingsheding", 304, 2, "2#锅炉排烟温度高报警设定", "℃"));
            _this.addPoint(new meta_1.SettingField("se_3#guolupaiyanwendugaobaojingsheding", 308, 2, "3#锅炉排烟温度高报警设定", "℃"));
            _this.addPoint(new meta_1.DeviceField("de_1#luqianbengshoudong/zidong", 368, 2, "1#炉前泵手动/自动", BaseMap_1.Map_PLC.coms_atuo));
            _this.addPoint(new meta_1.DeviceField(BingLian_3_1.PLC_QT_RYRS_BingLian_3.KEY_POINT_LU_QIAN_BENG_1, 370, 2, "1#炉前泵启停/停止", BaseMap_1.Map_PLC.coms_start_stop));
            _this.addPoint(new meta_1.DeviceField("de_2#luqianbengshoudong/zidong", 372, 2, "2#炉前泵手动/自动", BaseMap_1.Map_PLC.coms_atuo));
            _this.addPoint(new meta_1.DeviceField(BingLian_3_1.PLC_QT_RYRS_BingLian_3.KEY_POINT_LU_QIAN_BENG_2, 374, 2, "2#炉前泵启停/停止", BaseMap_1.Map_PLC.coms_start_stop));
            _this.addPoint(new meta_1.DeviceField("de_3#luqianbengshoudong/zidong", 376, 2, "3#炉前泵手动/自动", BaseMap_1.Map_PLC.coms_atuo));
            _this.addPoint(new meta_1.DeviceField(BingLian_3_1.PLC_QT_RYRS_BingLian_3.KEY_POINT_LU_QIAN_BENG_3, 378, 2, "3#炉前泵启停/停止", BaseMap_1.Map_PLC.coms_start_stop));
            _this.addPoint(new meta_1.DeviceField("de_1#reshuibengshoudong/zidong", 380, 2, "1#热水泵手动/自动", BaseMap_1.Map_PLC.coms_atuo));
            _this.addPoint(new meta_1.DeviceField(BingLian_3_1.PLC_QT_RYRS_BingLian_3.KEY_POINT_RE_SHUI_BENG_1, 382, 2, "1#热水泵启停/停止", BaseMap_1.Map_PLC.coms_start_stop));
            _this.addPoint(new meta_1.DeviceField("de_2#reshuibengshoudong/zidong", 384, 2, "2#热水泵手动/自动", BaseMap_1.Map_PLC.coms_atuo));
            _this.addPoint(new meta_1.DeviceField(BingLian_3_1.PLC_QT_RYRS_BingLian_3.KEY_POINT_RE_SHUI_BENG_2, 386, 2, "2#热水泵启停/停止", BaseMap_1.Map_PLC.coms_start_stop));
            _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_XUN_HUAN_BENG_1, 388, 2, "1#循环泵启停/停止", BaseMap_1.Map_PLC.coms_start_stop));
            _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_XUN_HUAN_BENG_2, 390, 2, "2#循环泵启停/停止", BaseMap_1.Map_PLC.coms_start_stop));
            _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_Add_SHUI_BENG_1, 392, 2, "1#补水泵启停/停止", BaseMap_1.Map_PLC.coms_start_stop));
            _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_Add_SHUI_BENG_2, 394, 2, "2#补水泵启停/停止", BaseMap_1.Map_PLC.coms_start_stop));
            _this.addPoint(new meta_1.ExceptionField("ex_1#guoluchushuiwendugaobaojing", 448, 2, "1#锅炉出水温度高报警", 0));
            _this.addPoint(new meta_1.ExceptionField("ex_2#guoluchushuiwendugaobaojing", 448, 2, "2#锅炉出水温度高报警", 1));
            _this.addPoint(new meta_1.ExceptionField("ex_3#guoluchushuiwendugaobaojing", 448, 2, "3#锅炉出水温度高报警", 2));
            _this.addPoint(new meta_1.ExceptionField("ex_1#guolupaiyanwendugaobaojing", 448, 2, "1#锅炉排烟温度高报警", 3));
            _this.addPoint(new meta_1.ExceptionField("ex_2#guolupaiyanwendugaobaojing", 448, 2, "2#锅炉排烟温度高报警", 4));
            _this.addPoint(new meta_1.ExceptionField("ex_3#guolupaiyanwendugaobaojing", 448, 2, "3#锅炉排烟温度高报警", 5));
            _this.addPoint(new meta_1.ExceptionField("ex_1#ranshaojiguzhang", 448, 2, "1#燃烧机故障", 6));
            _this.addPoint(new meta_1.ExceptionField("ex_2#ranshaojiguzhang", 448, 2, "2#燃烧机故障", 7));
            _this.addPoint(new meta_1.ExceptionField("ex_3#ranshaojiguzhang", 448, 2, "3#燃烧机故障", 8));
            _this.addPoint(new meta_1.ExceptionField("ex_xunhuanbianpinguzhang", 448, 2, "循环变频故障", 9));
            _this.addPoint(new meta_1.ExceptionField("ex_bushuibianpinguzhang", 448, 2, "补水变频故障", 10));
            _this.addPoint(new meta_1.ExceptionField("ex_1#luqianbengguzhang", 448, 2, "1#炉前泵故障", 12));
            _this.addPoint(new meta_1.ExceptionField("ex_2#luqianbengguzhang", 448, 2, "2#炉前泵故障", 13));
            _this.addPoint(new meta_1.ExceptionField("ex_3#luqianbengguzhang", 448, 2, "3#炉前泵故障", 14));
            _this.addPoint(new meta_1.ExceptionField("ex_1#reshuibengguzhang", 448, 2, "1#热水泵故障", 15));
            _this.addPoint(new meta_1.ExceptionField("ex_2#reshuibengguzhang", 450, 2, "2#热水泵故障", 0));
            return _this;
        }
        return Map_PLC_QT_RYRS_BingLian3;
    }(BaseMap_1.Map_PLC)),
    _a.rsq_status = {
        0: "停止",
        1: "运行",
        2: "运行20%",
        3: "运行30%",
        4: "运行40%",
        5: "运行50%",
        6: "运行60%",
        7: "运行70%",
        8: "运行80%",
        9: "运行90%",
        10: "运行100%",
    },
    _a);
