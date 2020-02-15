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
var meta_1 = require("../HNWE/meta");
var A_Meta_Comms_Actions_1 = require("../A_Meta_Comms_Actions");
var BaseInfoField = /** @class */ (function (_super) {
    __extends(BaseInfoField, _super);
    function BaseInfoField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BaseInfoField;
}(meta_1.BaseInfoField));
exports.BaseInfoField = BaseInfoField;
var DemandField = /** @class */ (function (_super) {
    __extends(DemandField, _super);
    function DemandField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DemandField.prototype.haveValue = function () {
        var bytes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            bytes[_i] = arguments[_i];
        }
        this.value = A_Meta_Comms_Actions_1.Meta_Comms_Actions.Check_Bytes_Bit_Is_Set(true, this.bit, bytes);
        return true;
    };
    return DemandField;
}(BaseInfoField));
exports.DemandField = DemandField;
var ExceptionField_1 = require("../ExceptionField");
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
        return A_Meta_Comms_Actions_1.Meta_Comms_Actions.Check_Bytes_Bit_Is_Set(true, this.bit, bytes) == 1;
    };
    return ExceptionField;
}(ExceptionField_1.ExceptionField));
exports.ExceptionField = ExceptionField;
var MockField_1 = require("../MockField");
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
        var result = A_Meta_Comms_Actions_1.Meta_Comms_Actions.Handle_Mock_Bytes(0, 0, true, false, bytes, null);
        this.value = result.value;
        return result.ok;
    };
    return MockField;
}(MockField_1.MockField));
exports.MockField = MockField;
var MockField_BaseNumber = /** @class */ (function (_super) {
    __extends(MockField_BaseNumber, _super);
    function MockField_BaseNumber(name, startIndex, bytesLength, title, unit, baseNumber) {
        if (unit === void 0) { unit = ''; }
        return _super.call(this, name, startIndex, bytesLength, title, unit, baseNumber) || this;
    }
    MockField_BaseNumber.prototype.haveValue = function () {
        var bytes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            bytes[_i] = arguments[_i];
        }
        var result = A_Meta_Comms_Actions_1.Meta_Comms_Actions.Handle_Mock_Bytes(this.baseNumber, 0, true, false, bytes, null);
        this.value = result.value;
        return result.ok;
    };
    return MockField_BaseNumber;
}(MockField));
exports.MockField_BaseNumber = MockField_BaseNumber;
var MockField_BaseNumber_Ignore = /** @class */ (function (_super) {
    __extends(MockField_BaseNumber_Ignore, _super);
    function MockField_BaseNumber_Ignore(name, startIndex, bytesLength, title, unit, baseNumber) {
        if (unit === void 0) { unit = ''; }
        return _super.call(this, name, startIndex, bytesLength, title, unit, baseNumber) || this;
    }
    MockField_BaseNumber_Ignore.prototype.haveValue = function () {
        var bytes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            bytes[_i] = arguments[_i];
        }
        var result = A_Meta_Comms_Actions_1.Meta_Comms_Actions.Handle_Mock_Bytes(this.baseNumber, 0x7FFF, true, false, bytes, null);
        this.value = result.value;
        return result.ok;
    };
    return MockField_BaseNumber_Ignore;
}(MockField));
exports.MockField_BaseNumber_Ignore = MockField_BaseNumber_Ignore;
var comms_1 = require("@sdcsoft/comms");
var SettingField = /** @class */ (function (_super) {
    __extends(SettingField, _super);
    function SettingField(name, startIndex, bytesLength, title, unit) {
        if (unit === void 0) { unit = ''; }
        return _super.call(this, name, startIndex, bytesLength, title, unit) || this;
    }
    SettingField.prototype.setDeviceFieldForUIKey = function (fieldForUI) {
        fieldForUI.setKey(comms_1.GroupKeys.KEY_SETTING);
    };
    return SettingField;
}(MockField));
exports.SettingField = SettingField;
var SettingField_BaseNumber = /** @class */ (function (_super) {
    __extends(SettingField_BaseNumber, _super);
    function SettingField_BaseNumber(name, startIndex, bytesLength, title, unit, baseNumber) {
        if (unit === void 0) { unit = ''; }
        return _super.call(this, name, startIndex, bytesLength, title, unit, baseNumber) || this;
    }
    SettingField_BaseNumber.prototype.setDeviceFieldForUIKey = function (fieldForUI) {
        fieldForUI.setKey(comms_1.GroupKeys.KEY_SETTING);
    };
    return SettingField_BaseNumber;
}(MockField_BaseNumber));
exports.SettingField_BaseNumber = SettingField_BaseNumber;
var SettingField_Count = /** @class */ (function (_super) {
    __extends(SettingField_Count, _super);
    function SettingField_Count(name, startIndex, bytesLength, title, unit) {
        if (unit === void 0) { unit = ''; }
        return _super.call(this, name, startIndex, bytesLength, title, unit, 0) || this;
    }
    SettingField_Count.prototype.haveValue = function () {
        var bytes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            bytes[_i] = arguments[_i];
        }
        var result = A_Meta_Comms_Actions_1.Meta_Comms_Actions.Handle_Mock_Bytes(0, 0, true, false, bytes, function (v) {
            return (v - 500) / 10;
        });
        this.value = result.value;
        return result.ok;
    };
    return SettingField_Count;
}(MockField_BaseNumber));
exports.SettingField_Count = SettingField_Count;
