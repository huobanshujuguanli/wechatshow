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
var SdcSoftDevice_1 = require("../../../../SdcSoftDevice");
var Collections_1 = require("../../../../../entities/Collections");
var CTL_UKS_GasOven_V2_Base = /** @class */ (function (_super) {
    __extends(CTL_UKS_GasOven_V2_Base, _super);
    function CTL_UKS_GasOven_V2_Base() {
        var _this = _super.call(this) || this;
        _this.BYTE_ARRAY_LENGTH = 124;
        return _this;
    }
    CTL_UKS_GasOven_V2_Base.prototype.getBeng = function () {
        throw new Error("Method not implemented.");
    };
    CTL_UKS_GasOven_V2_Base.prototype.getFan = function () {
        throw new Error("Method not implemented.");
    };
    CTL_UKS_GasOven_V2_Base.prototype.getSubDeviceType = function () {
        var t = this.getBaseInfoFields().getItem('ba_moshileixing').getValue().toString();
        return t;
    };
    CTL_UKS_GasOven_V2_Base.prototype.getPowerInfo = function () {
        return 0;
    };
    CTL_UKS_GasOven_V2_Base.prototype.handleByteField = function (field, bytes) {
        switch (field.getBytesLength()) {
            case 0:
                if (field.haveValue()) {
                    this.addField(field);
                }
                break;
            case 2:
                if (field.haveValue(bytes[field.getStartIndex()], bytes[field.getStartIndex() + 1])) {
                    this.addField(field);
                }
                break;
        }
    };
    CTL_UKS_GasOven_V2_Base.prototype.handleDeviceNo = function (bytes) {
        return '';
    };
    CTL_UKS_GasOven_V2_Base.prototype.addFocusFields = function (list) {
    };
    CTL_UKS_GasOven_V2_Base.prototype.getDeviceFocusFields = function () {
        var map = this.getBaseInfoFields();
        var list = new Collections_1.List();
        var field = map.getItem(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_DAYS);
        field.setValue(0);
        field.setValueString('无');
        list.push(field);
        field = map.getItem(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_HOURS);
        field.setValueString('无');
        list.push(field);
        this.addFocusFields(list);
        return list.toArray();
    };
    return CTL_UKS_GasOven_V2_Base;
}(SdcSoftDevice_1.SdcSoftDevice));
exports.CTL_UKS_GasOven_V2_Base = CTL_UKS_GasOven_V2_Base;
