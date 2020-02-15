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
var meta_1 = require("../meta");
var RanShaoQiField = /** @class */ (function (_super) {
    __extends(RanShaoQiField, _super);
    function RanShaoQiField(name, startIndex, bytesLength, title, unit, valueMap) {
        return _super.call(this, name, startIndex, bytesLength, title, unit, valueMap) || this;
    }
    RanShaoQiField.prototype.haveValue = function () {
        var bytes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            bytes[_i] = arguments[_i];
        }
        var v = ((bytes[0] & 0xFF) << 8) | (bytes[1] & 0xFF);
        this.value = v ? 1 : 0;
        return true;
    };
    RanShaoQiField.prototype.getValueString = function () {
        if (null != this.valueMap)
            return this.valueMap.getItem(this.value);
        return _super.prototype.getValueString.call(this);
    };
    return RanShaoQiField;
}(meta_1.BaseInfoField));
exports.RanShaoQiField = RanShaoQiField;
