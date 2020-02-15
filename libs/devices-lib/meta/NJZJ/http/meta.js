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
var BaseInfoField = /** @class */ (function (_super) {
    __extends(BaseInfoField, _super);
    function BaseInfoField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseInfoField.prototype.haveValue = function () {
        var bytes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            bytes[_i] = arguments[_i];
        }
        this.value = bytes[1] & 0xFF;
        return 0xFF != this.value;
    };
    return BaseInfoField;
}(meta_1.BaseInfoField));
exports.BaseInfoField = BaseInfoField;
var ExceptionField = /** @class */ (function (_super) {
    __extends(ExceptionField, _super);
    function ExceptionField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExceptionField.prototype.haveValue = function () {
        var bytes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            bytes[_i] = arguments[_i];
        }
        this.value = bytes[1];
        return this.value == 0xff ? false : (this.value > 0);
    };
    return ExceptionField;
}(meta_1.ExceptionField));
exports.ExceptionField = ExceptionField;
var RunDaysField = /** @class */ (function (_super) {
    __extends(RunDaysField, _super);
    function RunDaysField(name, startIndex, bytesLength, title, unit) {
        return _super.call(this, name, startIndex, bytesLength, title, unit) || this;
    }
    RunDaysField.prototype.haveValue = function () {
        var bytes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            bytes[_i] = arguments[_i];
        }
        this.value = bytes[1] | (bytes[0] << 8);
        return true;
    };
    return RunDaysField;
}(BaseInfoField));
exports.RunDaysField = RunDaysField;
var StartStopField = /** @class */ (function (_super) {
    __extends(StartStopField, _super);
    function StartStopField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StartStopField.prototype.haveValue = function () {
        var bytes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            bytes[_i] = arguments[_i];
        }
        this.value = bytes[1] | (bytes[0] << 8);
        return 0x7FFF != this.value;
    };
    return StartStopField;
}(meta_1.StartStopField));
exports.StartStopField = StartStopField;
