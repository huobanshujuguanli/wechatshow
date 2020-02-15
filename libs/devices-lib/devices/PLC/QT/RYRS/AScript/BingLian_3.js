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
var RanYou_1 = require("../../../RanYou");
var DeviceFieldForUI_1 = require("../../../../../meta/DeviceFieldForUI");
var SdcSoftDevice_1 = require("../../../../SdcSoftDevice");
var Collections_1 = require("../../../../../entities/Collections");
//import { GroupFieldsRelationalMapping as FixFieldNames } from '@sdcsoft/gfrm'
var Element_1 = require("../../../../../entities/Element");
var PLC_QT_RYRS_BingLian_3 = /** @class */ (function (_super) {
    __extends(PLC_QT_RYRS_BingLian_3, _super);
    function PLC_QT_RYRS_BingLian_3() {
        var _this = _super.call(this) || this;
        _this.BYTE_ARRAY_LENGTH = 490;
        return _this;
    }
    PLC_QT_RYRS_BingLian_3.prototype.getDeviceFocusFields = function () {
        var map = this.getBaseInfoFields();
        var list = new Collections_1.List();
        list.push(map.getItem(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_DAYS));
        list.push(map.getItem(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_HOURS));
        var map2 = this.getMockFields();
        list.push(map2.getItem('mo_1#guoluchushuiwendu'));
        list.push(map2.getItem('mo_2#guoluchushuiwendu'));
        list.push(map2.getItem('mo_3#guoluchushuiwendu'));
        return list.toArray();
    };
    PLC_QT_RYRS_BingLian_3.prototype.getPowerInfo = function () {
        var baseInfos = this.getBaseInfoFields();
        return baseInfos.getItem('ba_1#ranshaoqizhuangtai').getValue() ? 1 : baseInfos.getItem('ba_2#ranshaoqizhuangtai') ? 1 : baseInfos.getItem('ba_3#ranshaoqizhuangtai') ? 1 : 0;
    };
    PLC_QT_RYRS_BingLian_3.prototype.getBeng = function () {
        var beng = _super.prototype.getBeng.call(this);
        if (this.getCountFields().containsKey(PLC_QT_RYRS_BingLian_3.KEY_POINT_RE_SHUI_BENG)) {
            var deviceFieldForUI = this.getCountFields().getItem(PLC_QT_RYRS_BingLian_3.KEY_POINT_RE_SHUI_BENG);
            var element = new Element_1.Element();
            element.setTitle(deviceFieldForUI.getTitle());
            element.setPrefix(Element_1.Element.Prefix_Beng);
            var d1 = new DeviceFieldForUI_1.DeviceFieldForUI();
            var d2 = d1;
            var count = 0;
            if (this.getDeviceFields().containsKey(PLC_QT_RYRS_BingLian_3.KEY_POINT_RE_SHUI_BENG_1)) {
                d1 = this.getDeviceFields().getItem(PLC_QT_RYRS_BingLian_3.KEY_POINT_RE_SHUI_BENG_1);
                count = 1;
            }
            if (this.getDeviceFields().containsKey(PLC_QT_RYRS_BingLian_3.KEY_POINT_RE_SHUI_BENG_2)) {
                d2 = this.getDeviceFields().getItem(PLC_QT_RYRS_BingLian_3.KEY_POINT_RE_SHUI_BENG_2);
                count += 2;
            }
            var v1 = 0, v2 = 0;
            switch (count) {
                case 1:
                    v1 = d1.getValue() > 0 ? 1 : 0;
                    element.SetValues(Element_1.Element.Index_Beng_Count, 1, v1);
                    beng.push(element);
                    break;
                case 2:
                    v2 = d2.getValue() > 0 ? 1 : 0;
                    element.SetValues(Element_1.Element.Index_Beng_Count, 1, v2);
                    beng.push(element);
                    break;
                case 3:
                    v1 = d1.getValue() > 0 ? 1 : 0;
                    v2 = d2.getValue() > 0 ? 2 : 0;
                    element.SetValues(Element_1.Element.Index_Beng_Count, 2, v1 + v2);
                    beng.push(element);
                    break;
            }
        }
        if (this.getCountFields().containsKey(PLC_QT_RYRS_BingLian_3.KEY_POINT_XUN_HUAN_BENG)) {
            var deviceFieldForUI = this.getCountFields().getItem(PLC_QT_RYRS_BingLian_3.KEY_POINT_XUN_HUAN_BENG);
            var element = new Element_1.Element();
            element.setTitle(deviceFieldForUI.getTitle());
            element.setPrefix(Element_1.Element.Prefix_Beng);
            var d1 = new DeviceFieldForUI_1.DeviceFieldForUI();
            var d2 = d1;
            var d3 = d1;
            var count = 0;
            if (this.getDeviceFields().containsKey(PLC_QT_RYRS_BingLian_3.KEY_POINT_XUN_HUAN_BENG_1)) {
                d1 = this.getDeviceFields().getItem(PLC_QT_RYRS_BingLian_3.KEY_POINT_XUN_HUAN_BENG_1);
                count = 1;
            }
            if (this.getDeviceFields().containsKey(PLC_QT_RYRS_BingLian_3.KEY_POINT_XUN_HUAN_BENG_2)) {
                d2 = this.getDeviceFields().getItem(PLC_QT_RYRS_BingLian_3.KEY_POINT_XUN_HUAN_BENG_2);
                count += 2;
            }
            if (this.getDeviceFields().containsKey(PLC_QT_RYRS_BingLian_3.KEY_POINT_XUN_HUAN_BENG_3)) {
                d3 = this.getDeviceFields().getItem(PLC_QT_RYRS_BingLian_3.KEY_POINT_XUN_HUAN_BENG_3);
                count += 4;
            }
            var v1 = 0, v2 = 0, v3 = 0;
            switch (count) {
                case 1:
                    v1 = d1.getValue() > 0 ? 1 : 0;
                    element.SetValues(Element_1.Element.Index_Beng_Count, 1, v1);
                    beng.push(element);
                    break;
                case 2:
                    v2 = d2.getValue() > 0 ? 1 : 0;
                    element.SetValues(Element_1.Element.Index_Beng_Count, 1, v2);
                    beng.push(element);
                    break;
                case 3:
                    v1 = d1.getValue() > 0 ? 1 : 0;
                    v2 = d2.getValue() > 0 ? 2 : 0;
                    element.SetValues(Element_1.Element.Index_Beng_Count, 2, v1 + v2);
                    beng.push(element);
                    break;
                case 4:
                    v2 = d2.getValue() > 0 ? 1 : 0;
                    element.SetValues(Element_1.Element.Index_Beng_Count, 1, v2);
                    beng.push(element);
                    break;
                case 5:
                    v1 = d1.getValue() > 0 ? 1 : 0;
                    v3 = d3.getValue() > 0 ? 4 : 0;
                    element.SetValues(Element_1.Element.Index_Beng_Count, 2, v1 + v3);
                    beng.push(element);
                    break;
                case 6:
                    v2 = d2.getValue() > 0 ? 2 : 0;
                    v3 = d3.getValue() > 0 ? 4 : 0;
                    element.SetValues(Element_1.Element.Index_Beng_Count, 2, v2 + v3);
                    beng.push(element);
                    break;
                case 7:
                    v1 = d1.getValue() > 0 ? 1 : 0;
                    v2 = d2.getValue() > 0 ? 2 : 0;
                    v3 = d3.getValue() > 0 ? 4 : 0;
                    element.SetValues(Element_1.Element.Index_Beng_Count, 3, v1 + v2 + v3);
                    beng.push(element);
                    break;
            }
        }
        return beng;
    };
    PLC_QT_RYRS_BingLian_3.KEY_POINT_RE_SHUI_BENG = "_reshuibeng";
    PLC_QT_RYRS_BingLian_3.KEY_POINT_RE_SHUI_BENG_1 = "de_1__reshuibeng_start_stop";
    PLC_QT_RYRS_BingLian_3.KEY_POINT_RE_SHUI_BENG_2 = "de_2__reshuibeng_start_stop";
    PLC_QT_RYRS_BingLian_3.KEY_POINT_LU_QIAN_BENG = "_luqianbeng";
    PLC_QT_RYRS_BingLian_3.KEY_POINT_LU_QIAN_BENG_1 = "de_1_luqianbeng_start_stop";
    PLC_QT_RYRS_BingLian_3.KEY_POINT_LU_QIAN_BENG_2 = "de_2_luqianbeng_start_stop";
    PLC_QT_RYRS_BingLian_3.KEY_POINT_LU_QIAN_BENG_3 = "de_3_luqianbeng_start_stop";
    return PLC_QT_RYRS_BingLian_3;
}(RanYou_1.PLC_RanYou));
exports.PLC_QT_RYRS_BingLian_3 = PLC_QT_RYRS_BingLian_3;
