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
var BaseDevice_1 = require("./BaseDevice");
var SdcSoftDevice_1 = require("../SdcSoftDevice");
var Collections_1 = require("../../entities/Collections");
var gfrm_1 = require("@sdcsoft/gfrm");
module.exports = /** @class */ (function (_super) {
    __extends(PLC_RanMeiDaoReYou, _super);
    function PLC_RanMeiDaoReYou() {
        var _this = _super.call(this) || this;
        _this.BYTE_ARRAY_LENGTH = 490;
        return _this;
    }
    PLC_RanMeiDaoReYou.prototype.getDeviceFocusFields = function () {
        var map = this.getBaseInfoFields();
        var list = new Collections_1.List();
        list.push(map.getItem(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_DAYS));
        list.push(map.getItem(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_HOURS));
        list.push(map.getItem('ba_shuiweizhuangtai'));
        var map2 = this.getMockFields();
        list.push(map2.getItem(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_ChuKouWenDu));
        list.push(map2.getItem(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_HuiLiuWenDu));
        list.push(map2.getItem(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_PaiYanWenDu));
        return list.toArray();
    };
    PLC_RanMeiDaoReYou.prototype.getPowerInfo = function () {
        return this.getDeviceFields().getItem(BaseDevice_1.PLC.KEY_POINT_YIN_FENG_FAN_1).getValue() > 0x7F ? 1 : 0;
    };
    return PLC_RanMeiDaoReYou;
}(BaseDevice_1.PLC));
