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
var RT_1 = require("./RT");
var DeviceFieldForUI_1 = require("../../../meta/DeviceFieldForUI");
var Element_1 = require("../../../entities/Element");
var CTL_RT_X7 = /** @class */ (function (_super) {
    __extends(CTL_RT_X7, _super);
    //static readonly  KEY_POINT_PAI_WU_FA_2 = "oc_2_paiwufaqiting_start_stop";
    function CTL_RT_X7() {
        var _this = _super.call(this) || this;
        _this.BYTE_ARRAY_LENGTH = 57;
        return _this;
    }
    CTL_RT_X7.prototype.handleByteField = function (field, bytes) {
        if (field.haveValue(bytes[field.getStartIndex()], bytes[field.getStartIndex() + 1])) {
            this.addField(field);
        }
    };
    CTL_RT_X7.prototype.handleDeviceNo = function (bytes) {
        return '';
    };
    CTL_RT_X7.prototype.getMode = function () {
        return 0;
    };
    CTL_RT_X7.prototype.getPowerInfo = function () {
        var map = this.getDeviceFields();
        var r = map.getItem(CTL_RT_X7.KEY_POINT_RAN_SHAO_QI_KONGZHI).getValue();
        var map2 = this.getOpenCloseFields();
        var f = map2.getItem('oc_ranshaoqidahuo');
        if (f) {
            if (r) {
                return f.getValue() ? 2 : 1;
            }
            return 0;
        }
        else {
            return r;
        }
    };
    CTL_RT_X7.prototype.getFan = function () {
        var list = [];
        if (this.getCountFields().containsKey(CTL_RT_X7.KEY_POINT_PAI_WU_FA)) {
            var deviceFieldForUI = this.getCountFields().getItem(CTL_RT_X7.KEY_POINT_PAI_WU_FA);
            var element = new Element_1.Element();
            element.setTitle(deviceFieldForUI.getTitle());
            element.setPrefix(Element_1.Element.Prefix_Fan);
            var d1 = new DeviceFieldForUI_1.DeviceFieldForUI();
            var count = 0;
            if (this.getDeviceFields().containsKey(CTL_RT_X7.KEY_POINT_PAI_WU_FA_1)) {
                d1 = this.getDeviceFields().getItem(CTL_RT_X7.KEY_POINT_PAI_WU_FA_1);
                count = 1;
            }
            var v1 = 0;
            switch (count) {
                case 1:
                    v1 = d1.getValue() > 0 ? 1 : 0;
                    element.SetValues(Element_1.Element.Index_Fan_Count, 1, v1);
                    list.push(element);
                    break;
            }
        }
        return list;
    };
    CTL_RT_X7.KEY_POINT_RAN_SHAO_QI_STATUS = "oc_ranshaoqifuhetiaojie";
    CTL_RT_X7.KEY_POINT_PAI_WU_FA = '_paiwufan';
    CTL_RT_X7.KEY_POINT_PAI_WU_FA_1 = "oc_1_paiwufaqiting_start_stop";
    return CTL_RT_X7;
}(RT_1.CTL_RT));
exports.CTL_RT_X7 = CTL_RT_X7;
