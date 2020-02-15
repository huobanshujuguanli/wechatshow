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
var DeviceField_1 = require("../../DeviceField");
var ExceptionField_1 = require("../../ExceptionField");
var OpenCloseField_1 = require("../../OpenCloseField");
var Collections_1 = require("../../../entities/Collections");
var DeviceField = /** @class */ (function (_super) {
    __extends(DeviceField, _super);
    function DeviceField(name, startIndex, bytesLength, title, bit, valueMap) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.startIndex = startIndex;
        _this.bytesLength = bytesLength;
        _this.title = title;
        _this.bit = bit;
        if (valueMap) {
            _this.valueMap = new Collections_1.NumberHashMap(valueMap);
        }
        return _this;
    }
    DeviceField.prototype.haveValue = function () {
        var bytes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            bytes[_i] = arguments[_i];
        }
        this.value = (bytes[0] & 0xFF) << 8 | bytes[1] & 0xFF;
        var i = 1 << this.bit;
        if ((i & this.value) == i) {
            this.value = 1;
        }
        else {
            this.value = 0;
        }
        return true;
    };
    DeviceField.prototype.getValueString = function () {
        if (null != this.valueMap)
            return this.valueMap.getItem(this.value);
        return _super.prototype.getValueString.call(this);
    };
    return DeviceField;
}(DeviceField_1.DeviceField));
exports.DeviceField = DeviceField;
var OpenCloseField = /** @class */ (function (_super) {
    __extends(OpenCloseField, _super);
    function OpenCloseField(name, startIndex, bytesLength, title, bit) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.startIndex = startIndex;
        _this.bytesLength = bytesLength;
        _this.title = title;
        _this.bit = bit;
        return _this;
    }
    OpenCloseField.prototype.haveValue = function () {
        var bytes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            bytes[_i] = arguments[_i];
        }
        this.value = (bytes[0] & 0xFF) << 8 | bytes[1] & 0xFF;
        var i = 1 << this.bit;
        if ((i & this.value) == i) {
            this.value = 1;
        }
        else {
            this.value = 0;
        }
        return true;
    };
    return OpenCloseField;
}(OpenCloseField_1.OpenCloseField));
exports.OpenCloseField = OpenCloseField;
var ExceptionField = /** @class */ (function (_super) {
    __extends(ExceptionField, _super);
    function ExceptionField(name, startIndex, bytesLength, title, bit, level) {
        if (level === void 0) { level = ExceptionField.Exception_Waring; }
        var _this = _super.call(this) || this;
        _this.level = level;
        _this.name = name;
        _this.startIndex = startIndex;
        _this.bytesLength = bytesLength;
        _this.title = title;
        _this.bit = bit;
        return _this;
    }
    ExceptionField.prototype.haveValue = function () {
        var bytes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            bytes[_i] = arguments[_i];
        }
        this.value = (bytes[0] & 0xFF) << 8 | bytes[1] & 0xFF;
        var i = 1 << this.bit;
        if ((i & this.value) == i) {
            this.value = 1;
            return true;
        }
        else {
            this.value = 0;
            return false;
        }
    };
    return ExceptionField;
}(ExceptionField_1.ExceptionField));
exports.ExceptionField = ExceptionField;
var SimpleDeviceField = /** @class */ (function (_super) {
    __extends(SimpleDeviceField, _super);
    function SimpleDeviceField(name, startIndex, bytesLength, title, bit, valueMap) {
        return _super.call(this, name, startIndex, bytesLength, title, bit, valueMap) || this;
    }
    SimpleDeviceField.prototype.haveValue = function () {
        var bytes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            bytes[_i] = arguments[_i];
        }
        this.value = (bytes[0] & 0xFF);
        var i = 1 << this.bit;
        if ((i & this.value) == i) {
            this.value = 1;
        }
        else {
            this.value = 0;
        }
        return true;
    };
    return SimpleDeviceField;
}(DeviceField));
exports.SimpleDeviceField = SimpleDeviceField;
var MockField_1 = require("../../MockField");
var MockField = /** @class */ (function (_super) {
    __extends(MockField, _super);
    function MockField(name, startIndex, bytesLength, title, unit, baseNumber) {
        if (unit === void 0) { unit = ''; }
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.startIndex = startIndex;
        _this.bytesLength = bytesLength;
        _this.title = title;
        _this.unit = unit;
        if (baseNumber) {
            _this.baseNumber = baseNumber;
        }
        return _this;
    }
    MockField.prototype.haveValue = function () {
        var bytes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            bytes[_i] = arguments[_i];
        }
        var i = bytes[0] << 8 | bytes[1];
        //console.log(this.title+' basenumber:='+this.getBaseNumber()+' value:='+i.toString() )
        var dv = new DataView(new ArrayBuffer(2));
        dv.setInt16(0, i);
        i = dv.getInt16(0);
        this.value = i;
        if (this.getBaseNumber()) {
            this.value = i / this.getBaseNumber();
        }
        return true;
    };
    return MockField;
}(MockField_1.MockField));
exports.MockField = MockField;
