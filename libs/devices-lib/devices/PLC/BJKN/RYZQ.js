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
var RanYou_1 = require("../RanYou");
var SdcSoftDevice_1 = require("../../SdcSoftDevice");
var Collections_1 = require("../../../entities/Collections");
module.exports = (_a = /** @class */ (function (_super) {
        __extends(PLC_BJKN_RYZQ, _super);
        function PLC_BJKN_RYZQ() {
            var _this = _super.call(this) || this;
            _this.BYTE_ARRAY_LENGTH = 28;
            return _this;
        }
        PLC_BJKN_RYZQ.prototype.getDeviceFocusFields = function () {
            var baseMap = this.getBaseInfoFields();
            var f = baseMap.getItem(PLC_BJKN_RYZQ.KEY_POINT_SHUI_WEI_STATUS);
            var openMap = this.getOpenCloseFields();
            var a = openMap.getItem('oc_shuiweijidi').getValue();
            var a1 = openMap.getItem('oc_shuiweidi').getValue();
            var b = openMap.getItem('oc_shuiweizhong').getValue();
            var b1 = openMap.getItem('oc_shuiweizhonggao').getValue();
            var c = openMap.getItem('oc_shuiweigao').getValue();
            var d = openMap.getItem('oc_shuiweijigao').getValue();
            var x = a + a1 + b + b1 + c + d;
            f.setValue(x);
            var deviceMap = this.getDeviceFields();
            var field = baseMap.getItem(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_SYSTEM_STATUS);
            field.setValue(deviceMap.getItem('de_ranshaoyunxingfankui').getValue());
            var list = new Collections_1.List();
            list.push(baseMap.getItem(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_DAYS));
            list.push(baseMap.getItem(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_HOURS));
            var map2 = this.getMockFields();
            list.push(map2.getItem('mo_zhengqiyali'));
            list.push(map2.getItem('mo_guolupaiyanwendu'));
            list.push(map2.getItem('mo_guolupaiyanwendu'));
            return list.toArray();
        };
        PLC_BJKN_RYZQ.prototype.getPowerInfo = function () {
            if (this.getDeviceFields().getItem('de_ranshaoyunxingfankui').getValue()) {
                var map = this.getDeviceFields();
                return map.getItem('de_jidianqidahuoshuchuxinhao').getValue() ? 2 : 1;
            }
            return 0;
        };
        return PLC_BJKN_RYZQ;
    }(RanYou_1.PLC_RanYou)),
    _a.KEY_POINT_SHUI_WEI_STATUS = 'ba_shuiwei_status',
    _a);
