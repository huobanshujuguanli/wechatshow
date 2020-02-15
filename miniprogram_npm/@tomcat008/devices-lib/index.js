module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1573525725022, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
const SdcSoftDevice_1 = require("./devices/SdcSoftDevice");
exports.SdcSoftDevice = SdcSoftDevice_1.SdcSoftDevice;
const DeviceAdapterUtil_1 = require("./utils/DeviceAdapterUtil");
exports.Wechat_DeviceAdapter = DeviceAdapterUtil_1.Wechat_DeviceAdapter;
exports.Web_DeviceAdapter = DeviceAdapterUtil_1.Web_DeviceAdapter;
const Commands = require("./command/Command");
exports.Commands = Commands;

}, function(modId) {var map = {"./devices/SdcSoftDevice":1573525725023,"./utils/DeviceAdapterUtil":1573525725034,"./command/Command":1573525725029}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1573525725023, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
const comms_1 = require("@sdcsoft/comms");
const DeviceFieldForUI_1 = require("../meta/DeviceFieldForUI");
const Element_1 = require("../entities/Element");
const comms_2 = require("@sdcsoft/comms");
const ByteField_1 = require("../meta/ByteField");
const map_1 = require("../map/map");
var Media;
(function (Media) {
    Media[Media["ReShui"] = 0] = "ReShui";
    Media[Media["ZhengQi"] = 1] = "ZhengQi";
    Media[Media["DaoReYou"] = 2] = "DaoReYou";
    Media[Media["ReFeng"] = 3] = "ReFeng";
    Media[Media["ZhenKong"] = 4] = "ZhenKong";
})(Media = exports.Media || (exports.Media = {}));
var Power;
(function (Power) {
    Power[Power["YouQi"] = 0] = "YouQi";
    Power[Power["Dian"] = 1] = "Dian";
    Power[Power["Mei"] = 2] = "Mei";
    Power[Power["ShengWuZhi"] = 3] = "ShengWuZhi";
    Power[Power["YuRe"] = 30] = "YuRe";
})(Power = exports.Power || (exports.Power = {}));
class SdcSoftDevice {
    constructor() {
        this.fieldMap = new comms_1.StringHashMap();
        this.commandMap = new comms_1.StringHashMap();
        this.modbusNo = 1;
        this.BYTE_ARRAY_LENGTH = 0;
        this.power = SdcSoftDevice.POWER_MEDIA_VALUE_NULL;
        this.media = SdcSoftDevice.POWER_MEDIA_VALUE_NULL;
        this.deviceNo = '';
        this.warningMsg = '';
        /**
         * 设置设备类型信息
         */
        this.typeName = '';
        this.fieldMap.addItem(comms_2.GroupKeys.KEY_BASE, new comms_1.StringHashMap());
        this.fieldMap.addItem(comms_2.GroupKeys.KEY_EXCEPTION, new comms_1.StringHashMap());
        this.fieldMap.addItem(comms_2.GroupKeys.KEY_MOCK, new comms_1.StringHashMap());
        this.fieldMap.addItem(comms_2.GroupKeys.KEY_SETTING, new comms_1.StringHashMap());
        this.fieldMap.addItem(comms_2.GroupKeys.KEY_DEVICE, new comms_1.StringHashMap());
        this.fieldMap.addItem(comms_2.GroupKeys.KEY_START_STOP, new comms_1.StringHashMap());
        this.fieldMap.addItem(comms_2.GroupKeys.KEY_OPEN_CLOSE, new comms_1.StringHashMap());
        this.fieldMap.addItem(map_1.map.KEY_Count_Fields, new comms_1.StringHashMap());
    }
    initCommandsMapKeys(map) {
        this.commandMap = map;
    }
    setPower(power) {
        this.power = power;
    }
    setMedia(media) {
        this.media = media;
    }
    setDeviceNo(deviceNo) {
        this.deviceNo = deviceNo;
    }
    getFieldsMap(groupKey) {
        return this.fieldMap.getItem(groupKey);
    }
    getBaseInfoFields() {
        return this.getFieldsMap(comms_2.GroupKeys.KEY_BASE);
    }
    getDeviceFields() {
        return this.getFieldsMap(comms_2.GroupKeys.KEY_DEVICE);
    }
    getExceptionFields() {
        return this.getFieldsMap(comms_2.GroupKeys.KEY_EXCEPTION);
    }
    getMockFields() {
        return this.getFieldsMap(comms_2.GroupKeys.KEY_MOCK);
    }
    getSettingFields() {
        return this.getFieldsMap(comms_2.GroupKeys.KEY_SETTING);
    }
    getStartStopFields() {
        return this.getFieldsMap(comms_2.GroupKeys.KEY_START_STOP);
    }
    getOpenCloseFields() {
        return this.getFieldsMap(comms_2.GroupKeys.KEY_OPEN_CLOSE);
    }
    getCountFields() {
        return this.getFieldsMap(map_1.map.KEY_Count_Fields);
    }
    getExceptionCount() {
        return this.getExceptionFields().count;
    }
    getDeviceStatus() {
        return this.getBaseInfoFields().getItem(SdcSoftDevice.KEY_POINT_SYSTEM_STATUS);
    }
    addCommand(cmdGroupKey, cmd) {
        if (this.commandMap.containsKey(cmdGroupKey)) {
            this.commandMap.getItem(cmdGroupKey).push(cmd);
        }
        else {
            let value = [cmd];
            this.commandMap.addItem(cmdGroupKey, value);
        }
    }
    addUIField(field) {
        if (null == field)
            return;
        let key = field.getKey();
        if (this.fieldMap.containsKey(key)) {
            this.fieldMap.getItem(key).addItem(field.getName(), field);
        }
    }
    addField(field) {
        if (field instanceof ByteField_1.ByteField) {
            //需要剔除纯控制程序点位
            let ui = field.getDeviceFieldForUI();
            if (ui) {
                this.addUIField(ui);
            }
            //处理保护执行命令的点位
            let cmd = field.getCommand();
            if (cmd) {
                this.addCommand(field.getCommandGroupKey(), cmd);
            }
            return;
        }
        if (field instanceof DeviceFieldForUI_1.DeviceFieldForUI) {
            this.addUIField(field);
        }
    }
    removeField(groupKey, fieldName) {
        this.fieldMap.getItem(groupKey).remove(fieldName);
    }
    /**
     * 获取炉子元素信息
     * @returns AElement
     */
    getStoveElement() {
        let element = new Element_1.Element();
        element.setPrefix(Element_1.Element.Prefix_Stove);
        element.setTitle('锅炉');
        element.SetValues(Element_1.Element.Index_A_Power, this.power, this.media, this.getPowerInfo(), SdcSoftDevice.Style_Horizontal);
        return element;
    }
    validateFalse(bytesLength) {
        return this.BYTE_ARRAY_LENGTH > bytesLength;
    }
    getCommands() {
        this.commandMap.each((key, value) => {
            for (let index in value) {
                value[index].setModbusNo(this.modbusNo);
            }
        });
        return this.commandMap;
    }
    /**
     * 获取设备的子类型命令
     */
    getSubDeviceType() {
        return SdcSoftDevice.NO_SUB_DEVICE_TYPE;
    }
    setTypeName(typeName) {
        this.typeName = typeName;
    }
    /**
     * 获取设备类型信息
     */
    getTypeName() {
        return this.typeName;
    }
    handleCommandFields(commandsGroup) {
        commandsGroup.each((key, values) => {
            values.forEach((v) => {
                this.addCommand(key, v);
            });
        });
        commandsGroup.clear();
    }
}
SdcSoftDevice.POWER_MEDIA_VALUE_NULL = -1;
SdcSoftDevice.KEY_POINT_SYSTEM_STATUS = 'o_system_status';
SdcSoftDevice.KEY_POINT_POWER = 'o_power';
SdcSoftDevice.KEY_POINT_MEDIA = 'o_media';
SdcSoftDevice.KEY_POINT_RUN_LIFE = 'ba_yunxingshijian';
SdcSoftDevice.KEY_POINT_RUN_DAYS = 'ba_yunxingtianshu';
SdcSoftDevice.KEY_POINT_RUN_HOURS = 'ba_yunxingxiaoshishu';
SdcSoftDevice.KEY_POINT_JIA_RE_ZU = 'jia_re_zu_count';
SdcSoftDevice.Style_Horizontal = 0;
SdcSoftDevice.Style_Vertical = 1;
/*
设备类型由用户确认时执行的逻辑
 子类型映射map

private subTypes = new StringHashMap<string>()


getDeviceType(): string {
    return ''
}

setSubTypes(map:StringHashMap<string>):void{
    this.subTypes = map
}

/
 * 根据子类型展示名称获取子类型名称
 * @param key 子类型展示名称
 
getSubDeviceType(key: string): string {
    return this.subTypes.getItem(key)
}

 * 获取子类型展示名称列表
 
getSubTypesNameArray() {
    return this.subTypes.Keys
}

 * 获取设备的警告信息
 
getWarningMsg(){
    return this.warningMsg
}

 * 设置设备的警告信息
 
setWarningMsg(msg:string){
    this.warningMsg = msg
}
*/
/**
 * 自动确认设备类型的逻辑
 */
/**
 * 无子类型的标识
 */
SdcSoftDevice.NO_SUB_DEVICE_TYPE = '-1';
exports.SdcSoftDevice = SdcSoftDevice;

}, function(modId) { var map = {"../meta/DeviceFieldForUI":1573525725024,"../entities/Element":1573525725032,"../meta/ByteField":1573525725026,"../map/map":1573525725033}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1573525725024, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
const ExceptionField_1 = require("./ExceptionField");
//namespace DevicesLib.meta {
class DeviceFieldForUI {
    constructor(valueMap) {
        this.name = '';
        this.value = 0;
        this.key = '';
        this.title = '';
        this.valueString = null;
        this.exceptionLevel = null;
        this.valueMap = null;
        this.unit = '';
        if (valueMap) {
            this.valueMap = valueMap;
        }
    }
    getValueMap() {
        return this.valueMap;
    }
    getUnit() {
        return this.unit;
    }
    setUnit(unit) {
        this.unit = unit;
    }
    setExcptionLevel(level) {
        this.exceptionLevel = level;
    }
    // setNeedFormat(needFormat: boolean) {
    //     this.needFormat = needFormat
    // }
    //private needFormat: boolean =false
    getKey() {
        return this.key;
    }
    setKey(key) {
        this.key = key;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getValue() {
        if (this.value)
            return this.value;
        return 0;
    }
    setValue(value) {
        this.value = value;
        if (this.valueMap) {
            this.valueString = this.valueMap.getItem(value);
        }
    }
    getTitle() {
        return this.title;
    }
    setTitle(title) {
        this.title = title;
    }
    getValueString() {
        // if (this.needFormat){
        //     return this.valueString.replace('%s', this.value.toString())
        // }
        if (this.valueString)
            return this.valueString;
        return '';
    }
    setValueString(valueString) {
        this.valueString = valueString;
    }
    getExceptionLevel() {
        if (this.exceptionLevel)
            return this.exceptionLevel;
        return ExceptionField_1.ExceptionField.Exception_NULL;
    }
}
exports.DeviceFieldForUI = DeviceFieldForUI;
//}

}, function(modId) { var map = {"./ExceptionField":1573525725025}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1573525725025, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
const ByteField_1 = require("./ByteField");
const DeviceFieldForUI_1 = require("./DeviceFieldForUI");
const comms_1 = require("@sdcsoft/comms");
//namespace DevicesLib.meta {
class ExceptionField extends ByteField_1.ByteField {
    constructor() {
        super(...arguments);
        /**
         * 异常等级
         */
        this.level = 0;
    }
    setDeviceFieldForUIKey(fieldForUI) {
        fieldForUI.setKey(comms_1.GroupKeys.KEY_EXCEPTION);
    }
    getExceptionLevel() {
        return this.level;
    }
    getDeviceFieldForUI(value) {
        let fieldForUI = new DeviceFieldForUI_1.DeviceFieldForUI();
        this.setDeviceFieldForUIKey(fieldForUI);
        fieldForUI.setName(this.getName());
        fieldForUI.setTitle(this.getTitle());
        fieldForUI.setExcptionLevel(this.level);
        fieldForUI.setValue(this.value);
        return fieldForUI;
    }
}
ExceptionField.Exception_NULL = -1;
ExceptionField.Exception_Waring = 0;
ExceptionField.Exception_Error = 1;
exports.ExceptionField = ExceptionField;
//}

}, function(modId) { var map = {"./ByteField":1573525725026,"./DeviceFieldForUI":1573525725024}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1573525725026, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
const CommandField_1 = require("./CommandField");
const DeviceFieldForUI_1 = require("./DeviceFieldForUI");
const Command_1 = require("../command/Command");
//namespace DevicesLib.meta {
class ByteField extends CommandField_1.CommandField {
    constructor() {
        super(...arguments);
        this.startIndex = 0;
        this.bytesLength = 0;
        this.baseNumber = 0;
        this.bit = 0;
        this.needFormat = false;
        this.value = 0;
        //传递valueMap到UI
        this.tranValueMapToUi = false;
        /**
         * 485内存地址
         */
        this.address = '';
        this.maxValue = 100;
        this.minValue = 0;
    }
    getTranValueMapFlag() {
        return this.tranValueMapToUi;
    }
    getValue() {
        return this.value;
    }
    getAddress() {
        return this.address;
    }
    setAddress(address) {
        this.address = address;
    }
    getStartIndex() {
        return this.startIndex;
    }
    setStartIndex(startIndex) {
        this.startIndex = startIndex;
    }
    getBytesLength() {
        return this.bytesLength;
    }
    setBytesLength(bytesLength) {
        this.bytesLength = bytesLength;
    }
    getBaseNumber() {
        return this.baseNumber;
    }
    setBaseNumber(baseNumber) {
        this.baseNumber = baseNumber;
    }
    setBit(bit) {
        this.bit = bit;
    }
    setValueMap(valueMap) {
        this.valueMap = valueMap;
    }
    createCommandAndInitValue() {
        let cmd = new Command_1.IntCommand(this.title, this.address, this.maxValue, this.minValue);
        cmd.initValue(this.getValue());
        return cmd;
    }
    getValueBitString() {
        return this.getValue().toString(10);
    }
    getValueString() {
        // if (this.bytesLength > 0) {//bytesLength>0表示点位在数据中真实存储
        //     return this.getValueBitString() + this.getUnit()
        // }
        // return this.getUnit()
        return this.value + this.getUnit();
    }
    getDeviceFieldForUI(value) {
        let fieldForUI;
        if (this.tranValueMapToUi) {
            fieldForUI = new DeviceFieldForUI_1.DeviceFieldForUI(this.valueMap);
        }
        else {
            fieldForUI = new DeviceFieldForUI_1.DeviceFieldForUI();
        }
        this.setDeviceFieldForUIKey(fieldForUI);
        fieldForUI.setName(this.getName());
        fieldForUI.setTitle(this.getTitle());
        fieldForUI.setValueString(this.getValueString());
        //fieldForUI.setNeedFormat(this.needFormat)
        fieldForUI.setUnit(this.getUnit());
        if (value) {
            fieldForUI.setValue(value);
        }
        else {
            fieldForUI.setValue(this.value);
        }
        return fieldForUI;
    }
}
exports.ByteField = ByteField;
//}

}, function(modId) { var map = {"./CommandField":1573525725027,"./DeviceFieldForUI":1573525725024,"../command/Command":1573525725029}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1573525725027, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
const PointField_1 = require("./PointField");
//namespace DevicesLib.meta {
class CommandField extends PointField_1.PointField {
    constructor() {
        super(...arguments);
        /**
         * 485内存地址
         */
        this.address = '';
        this.maxValue = 100;
        this.minValue = 0;
        this.commandGroupKey = '';
    }
    getAddress() {
        return this.address;
    }
    setAddress(address) {
        this.address = address;
    }
    getMaxValue() {
        return this.maxValue;
    }
    setMaxValue(maxValue) {
        this.maxValue = maxValue;
    }
    getMinValue() {
        return this.minValue;
    }
    setMinValue(minValue) {
        this.minValue = minValue;
    }
    getCommandGroupKey() {
        return this.commandGroupKey;
    }
    setCommandGroupKey(commandGroupKey) {
        this.commandGroupKey = commandGroupKey;
    }
    /**
     * 获取写入命令
     * @return
     */
    getCommand() {
        if (null == this.getAddress() || this.getAddress().length < 4)
            return null;
        let cmd = this.createCommandAndInitValue();
        if (cmd) {
            cmd.setAddress(this.getAddress());
            cmd.setUnit(this.getUnit());
            cmd.setTitle(this.getTitle());
            cmd.setMinValue(this.getMinValue());
            cmd.setMaxValue(this.getMaxValue());
        }
        return cmd;
    }
}
exports.CommandField = CommandField;
//}

}, function(modId) { var map = {"./PointField":1573525725028}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1573525725028, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
//namespace DevicesLib.meta {
class PointField {
    constructor() {
        this.name = '';
        this.unit = '';
        this.title = '';
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getUnit() {
        return null == this.unit ? '' : this.unit;
    }
    setUnit(unit) {
        this.unit = unit;
    }
    getTitle() {
        return this.title;
    }
    setTitle(title) {
        this.title = title;
    }
}
exports.PointField = PointField;
//}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1573525725029, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
const CRC16Util_1 = require("../utils/CRC16Util");
const NumberUtil_1 = require("../utils/NumberUtil");
//namespace DevicesLib.cmd {
class Command {
    constructor(title, address, maxValue, minValue) {
        //protected name: string = ''
        this.address = '';
        this.valueString = '';
        this.value = '';
        this.modbusNo = 1;
        this.unit = '';
        this.title = '';
        this.action = '06';
        this.valueType = Command.INT_VALUE;
        this.valueIsSet = false;
        this.maxValue = 100;
        this.minValue = 0;
        this.script = '';
        this.title = title;
        this.title = address;
        this.minValue = minValue;
        this.maxValue = maxValue;
    }
    getValueString() {
        return this.valueString;
    }
    getCommandString() {
        if (this.valueIsSet) {
            this.valueIsSet = false;
            let str = this.convertToString();
            this.valueString = '';
            return str.toUpperCase();
        }
        return '';
    }
    setModbusNo(modbusNo) {
        this.modbusNo = modbusNo;
    }
    getModbusNo() {
        return this.modbusNo;
    }
    setUnit(unit) {
        this.unit = unit;
    }
    setTitle(title) {
        this.title = title;
    }
    setMaxValue(maxValue) {
        this.maxValue = maxValue;
    }
    setMinValue(minValue) {
        this.minValue = minValue;
    }
    setScript(script) {
        this.script = script;
    }
    setAddress(address) {
        this.address = address;
    }
    getValueType() {
        return this.valueType;
    }
    getMaxValue() {
        return this.maxValue;
    }
    getMinValue() {
        return this.minValue;
    }
    // public getName() {
    //     return this.name
    // }
    // setName(name: string) {
    //     this.name = name
    // }
    /**
     * 用于呈现数据的初始化，数据初始化不影响命令设置状态
     * @param values
     */
    initValue(...values) {
        this.handleValue(values);
    }
    /**
     * 用户设置命令值，影响命令设置状态
     * @param values
     */
    setValue(...values) {
        if (null == values)
            return;
        if (null == values[0])
            return;
        this.handleValue(values);
        this.valueIsSet = true;
    }
    getValue() {
        return this.value;
    }
    getTitle() {
        return this.title;
    }
    getUnit() {
        return this.unit;
    }
    getCommand() {
        if (this.valueIsSet) {
            this.valueIsSet = false;
            let str = this.convertToString();
            this.value = '';
            return str.toUpperCase();
        }
        return '';
    }
    static hexStringToBytes(str) {
        if (null != str && str.length != 0) {
            let len = str.length / 2;
            let bytes = new ArrayBuffer(len);
            let v = new Uint8Array(bytes);
            for (let i = 0; i < len; i++) {
                v[i] = (parseInt(str.substr(i * 2, 2), 16));
            }
            return v;
        }
        return null;
    }
    static toNumbers(str) {
        let numbers = [];
        if (null != str && str.length != 0) {
            let len = str.length / 2;
            for (let i = 0; i < len; i++) {
                //console.log(str.substr(i * 2, 2))
                numbers.push(parseInt(str.substr(i * 2, 2), 16));
            }
        }
        return numbers;
    }
    /**
    static intToHexString(x: number, hexLength: number = 4): string {
        let str = x.toString(16)
        for (let i = str.length i < hexLength i++) {
            str += ('0' + str)
        }
        return str
    }
*/
    static intToBytes4(n) {
        let b = new ArrayBuffer(4);
        let v = new Uint8Array(b);
        for (let i = 0; i < 4; i++) {
            v[i] = (n >> (24 - i * 8));
        }
        return b;
    }
    initCommand(title, address, maxValue, minValue, value) {
        this.setTitle(title);
        this.setAddress(address);
        this.setMinValue(minValue);
        this.setMaxValue(maxValue);
        this.initValue(value);
    }
    evalScriptText(value) {
    }
}
Command.INT_VALUE = 1;
Command.FLOAT_VALUE = 2;
Command.FLOAT_MAP_VALUE = 3;
Command.TIME_VALUE = 4;
Command.OPEN_CLOSE_VALUE = 5;
Command.SYSTEM_VALUE = 6;
exports.Command = Command;
class IntCommand extends Command {
    constructor(title, address, maxValue, minValue) {
        super(title, address, minValue, maxValue);
        this.valueType = Command.INT_VALUE;
    }
    handleValue(values) {
        this.valueString = values[0].toString();
        this.value = NumberUtil_1.NumberUtil.NumberToString(values[0], 16, 4); // Command.intToHexString(values[0])
    }
    convertToString() {
        let no = NumberUtil_1.NumberUtil.NumberToString(this.getModbusNo(), 16, 2); //Command.intToHexString(this.getModbusNo())
        let baseStr = no + this.action + this.address + this.value;
        let data = Command.toNumbers(baseStr);
        return baseStr + CRC16Util_1.CRC16Util.getCrc(CRC16Util_1.CRC16Util.calcCrc16(data, 0, data.length)) + '0000000000';
    }
}
exports.IntCommand = IntCommand;
class TimeCommand extends IntCommand {
    constructor(title, address) {
        super(title, address, 0, 0);
        this.valueType = Command.TIME_VALUE;
        this.script = '';
    }
    handleValue(values) {
        let hstr = (values[0] / 60).toString();
        let mstr = (values[1] % 60).toString();
        if (2 > hstr.length)
            hstr = '0' + hstr;
        if (2 > mstr.length)
            mstr = '0' + mstr;
        this.valueString = hstr + ':' + mstr;
        this.value = NumberUtil_1.NumberUtil.NumberToString(values[0] * 60 + values[1], 16, 4); //Command.intToHexString(values[0] * 60 + values[1])
    }
}
exports.TimeCommand = TimeCommand;
class SystemCommand extends IntCommand {
    constructor(title, address, maxValue, minValue) {
        super(title, address, minValue, maxValue);
        this.valueType = Command.SYSTEM_VALUE;
        this.valueIsSet = false;
    }
}
exports.SystemCommand = SystemCommand;
class FloatCommand extends Command {
    constructor(title, address, maxValue, minValue) {
        super(title, address, minValue, maxValue);
        this.action = '10';
        this.valueType = Command.FLOAT_VALUE;
    }
    handleValue(values) {
        this.valueString = values[0].toFixed(2);
        let data = new ArrayBuffer(4);
        let view = new DataView(data);
        view.setFloat32(0, values[0], false);
        this.value = NumberUtil_1.NumberUtil.NumberToString(view.getUint8(0), 16, 2) +
            NumberUtil_1.NumberUtil.NumberToString(view.getUint8(1), 16, 2) +
            NumberUtil_1.NumberUtil.NumberToString(view.getUint8(2), 16, 2) +
            NumberUtil_1.NumberUtil.NumberToString(view.getUint8(3), 16, 2);
    }
    convertToString() {
        let no = NumberUtil_1.NumberUtil.NumberToString(this.getModbusNo(), 16, 2);
        let baseStr = no + this.action + this.address + '000204' + this.value;
        let data = Command.toNumbers(baseStr);
        return baseStr + CRC16Util_1.CRC16Util.getCrc(CRC16Util_1.CRC16Util.calcCrc16(data, 0, data.length));
    }
}
exports.FloatCommand = FloatCommand;
class OpenCloseCommand extends IntCommand {
    constructor(title, address, maxValue, minValue) {
        super(title, address, minValue, maxValue);
        this.valueType = Command.OPEN_CLOSE_VALUE;
    }
}
exports.OpenCloseCommand = OpenCloseCommand;
//}

}, function(modId) { var map = {"../utils/CRC16Util":1573525725030,"../utils/NumberUtil":1573525725031}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1573525725030, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
const NumberUtil_1 = require("./NumberUtil");
//namespace DevicesLib.utils {
class CRC16Util {
    /**
     * 计算CRC16校验
     *
     * @param data   需要计算的数组
     * @param offset 起始位置
     * @param len    长度
     * @param preval 之前的校验值
     * @return CRC16校验值
     */
    static calcCrc16(data, offset, len, preval = 0xffff) {
        let ucCRCHi = (preval & 0xff00) >> 8;
        let ucCRCLo = preval & 0x00ff;
        let iIndex;
        for (let i = 0; i < len; ++i) {
            iIndex = (ucCRCLo ^ data[offset + i]) & 0x00ff;
            ucCRCLo = ucCRCHi ^ CRC16Util.crc16_tab_h[iIndex];
            ucCRCHi = CRC16Util.crc16_tab_l[iIndex];
        }
        return ((ucCRCHi & 0x00ff) << 8) | (ucCRCLo & 0x00ff) & 0xffff;
    }
    /**
     * 将计算的CRC值 转换为加空格的  比如  ： crc值为 A30A -> A3 0A
     *
     * @param res
     * @return
     */
    static getCrc(res, bigEndian = false) {
        let str = NumberUtil_1.NumberUtil.NumberToString(res, 16, 4); //Command.intToHexString(res)
        if (bigEndian)
            return str;
        let substring = str.substring(0, 2);
        let substring1 = str.substring(2, 4);
        return substring1.concat('').concat(substring);
    }
}
CRC16Util.crc16_tab_h = [0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0,
    0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1,
    0x81, 0x40, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0,
    0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0,
    0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40];
CRC16Util.crc16_tab_l = [0x00, 0xC0, 0xC1, 0x01, 0xC3, 0x03, 0x02, 0xC2, 0xC6, 0x06, 0x07, 0xC7, 0x05, 0xC5, 0xC4, 0x04, 0xCC, 0x0C, 0x0D, 0xCD, 0x0F, 0xCF, 0xCE, 0x0E, 0x0A, 0xCA, 0xCB, 0x0B, 0xC9, 0x09, 0x08, 0xC8, 0xD8, 0x18, 0x19, 0xD9, 0x1B, 0xDB, 0xDA, 0x1A, 0x1E, 0xDE, 0xDF, 0x1F, 0xDD, 0x1D, 0x1C, 0xDC, 0x14, 0xD4, 0xD5, 0x15, 0xD7, 0x17, 0x16, 0xD6, 0xD2, 0x12,
    0x13, 0xD3, 0x11, 0xD1, 0xD0, 0x10, 0xF0, 0x30, 0x31, 0xF1, 0x33, 0xF3, 0xF2, 0x32, 0x36, 0xF6, 0xF7, 0x37, 0xF5, 0x35, 0x34, 0xF4, 0x3C, 0xFC, 0xFD, 0x3D, 0xFF, 0x3F, 0x3E, 0xFE, 0xFA, 0x3A, 0x3B, 0xFB, 0x39, 0xF9, 0xF8, 0x38, 0x28, 0xE8, 0xE9, 0x29, 0xEB, 0x2B, 0x2A, 0xEA, 0xEE, 0x2E, 0x2F, 0xEF, 0x2D, 0xED, 0xEC, 0x2C, 0xE4, 0x24, 0x25, 0xE5, 0x27, 0xE7,
    0xE6, 0x26, 0x22, 0xE2, 0xE3, 0x23, 0xE1, 0x21, 0x20, 0xE0, 0xA0, 0x60, 0x61, 0xA1, 0x63, 0xA3, 0xA2, 0x62, 0x66, 0xA6, 0xA7, 0x67, 0xA5, 0x65, 0x64, 0xA4, 0x6C, 0xAC, 0xAD, 0x6D, 0xAF, 0x6F, 0x6E, 0xAE, 0xAA, 0x6A, 0x6B, 0xAB, 0x69, 0xA9, 0xA8, 0x68, 0x78, 0xB8, 0xB9, 0x79, 0xBB, 0x7B, 0x7A, 0xBA, 0xBE, 0x7E, 0x7F, 0xBF, 0x7D, 0xBD, 0xBC, 0x7C, 0xB4, 0x74,
    0x75, 0xB5, 0x77, 0xB7, 0xB6, 0x76, 0x72, 0xB2, 0xB3, 0x73, 0xB1, 0x71, 0x70, 0xB0, 0x50, 0x90, 0x91, 0x51, 0x93, 0x53, 0x52, 0x92, 0x96, 0x56, 0x57, 0x97, 0x55, 0x95, 0x94, 0x54, 0x9C, 0x5C, 0x5D, 0x9D, 0x5F, 0x9F, 0x9E, 0x5E, 0x5A, 0x9A, 0x9B, 0x5B, 0x99, 0x59, 0x58, 0x98, 0x88, 0x48, 0x49, 0x89, 0x4B, 0x8B, 0x8A, 0x4A, 0x4E, 0x8E, 0x8F, 0x4F, 0x8D, 0x4D,
    0x4C, 0x8C, 0x44, 0x84, 0x85, 0x45, 0x87, 0x47, 0x46, 0x86, 0x82, 0x42, 0x43, 0x83, 0x41, 0x81, 0x80, 0x40];
exports.CRC16Util = CRC16Util;
//}

}, function(modId) { var map = {"./NumberUtil":1573525725031}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1573525725031, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
class NumberUtil {
    static NumberToString(x, stringType = 10, length = 10) {
        let str = x.toString(stringType);
        for (let i = str.length; i < length; i++) {
            str = ('0' + str);
        }
        return str;
    }
}
exports.NumberUtil = NumberUtil;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1573525725032, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
class Element {
    constructor() {
        this.values = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
        this.title = '';
        this.prefix = '';
    }
    getTitle() {
        return this.title;
    }
    setTitle(title) {
        this.title = title;
    }
    getPrefix() {
        return this.prefix;
    }
    setPrefix(prefix) {
        this.prefix = prefix;
    }
    ClearValues() {
        for (let i = 0; i < this.values.length; i++) {
            this.values[i] = -1;
        }
    }
    SetValues(index, ...data) {
        for (let i = index, j = 0; j < data.length; i++, j++) {
            this.values[i] = data[j];
        }
    }
    getElementPrefixAndValuesString(spacerString = '-') {
        let sb = this.prefix;
        for (let i in this.values) {
            if (this.values[i] > -1) {
                sb += spacerString;
                sb += this.values[i].toString();
                continue;
            }
            break;
        }
        if (this.prefix == Element.Prefix_Stove) {
            return sb.substr(0, sb.length - 1) + '0';
        }
        return sb;
    }
}
Element.Prefix_Stove = 'a';
Element.Prefix_Beng = 'b';
Element.Prefix_Fan = 'c';
Element.Index_A_Power = 0;
Element.Index_A_Media = 1;
Element.Index_A_Status = 2;
Element.Index_A_Style = 3;
Element.Index_Beng_Count = 0;
Element.Index_Beng_Status = 1;
Element.Index_Fan_Count = 0;
Element.Index_Fan_Status = 1;
exports.Element = Element;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1573525725033, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
const comms_1 = require("@sdcsoft/comms");
class map {
    constructor() {
        this.pointMap = new comms_1.StringHashMap();
        //protected commandMap: StringHashMap<Command[] | null> = new StringHashMap<Command[] | null>()
        this.commandMap = new comms_1.StringHashMap();
    }
    //protected subTypes: StringHashMap<string> = new StringHashMap<string>()
    //protected warningMsg:string = ''
    getPointMap() {
        return this.pointMap;
    }
    getCommandsMap() {
        return this.commandMap;
    }
    addPoint(byteField, key) {
        if (key) {
            this.pointMap.addItem(key, byteField);
            return;
        }
        this.pointMap.addItem(byteField.getName(), byteField);
    }
    addCommand(groupKey, cmd) {
        if (this.commandMap.containsKey(groupKey)) {
            let cmds = this.commandMap.getItem(groupKey);
            cmds.push(cmd);
        }
        else {
            let cmds = [cmd];
            this.commandMap.addItem(groupKey, cmds);
        }
    }
}
// static readonly KEY_BASE = 'baseInfo'
// static readonly KEY_RUN = 'runInfo'
// static readonly KEY_EXCEPTION = 'exceptionInfo'
// static readonly KEY_MOCK = 'mockInfo'
// static readonly KEY_SETTING = 'settingInfo'
// static readonly KEY_START_STOP = 'startStopInfo'
// static readonly KEY_DEVICE = 'deviceInfo'
// static readonly KEY_OPEN_CLOSE = 'openclose'
/**
 * 计算属性的KEY
 */
map.KEY_Count_Fields = 'countfields';
map.KEY_POINT_SYSTEM_STATUS = 'o_system_status';
map.KEY_POINT_POWER = 'o_power';
map.KEY_POINT_MEDIA = 'o_media';
map.KEY_POINT_RUN_LIFE = 'ba_yunxingshijian';
map.KEY_POINT_RUN_DAYS = 'ba_yunxingtianshu';
map.KEY_POINT_RUN_HOURS = 'ba_yunxingxiaoshishu';
exports.map = map;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1573525725034, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
const SdcSoftDevice_1 = require("../devices/SdcSoftDevice");
class Wechat_DeviceAdapter {
    static setLang(lang = 'zh-cn') {
        this.lang = lang;
        return new Wechat_DeviceAdapter();
    }
    createDeviceFunc(type) {
        let strs = type.split('_');
        let path = '../devices/' + strs.join('/');
        let deviceType = require(path);
        let d = new deviceType();
        return d;
    }
    createMapFunc(type) {
        let strs = type.split('_');
        let path = '../map/' + Wechat_DeviceAdapter.lang + '/' + strs.join('/');
        let mapType = require(path);
        let d = new mapType();
        return d;
    }
    /**
     * 获取子类别设备对象
     */
    getSubDevice(type, sub, data) {
        let t = type + '_' + sub;
        let device = this.createDeviceFunc(t);
        let map = this.createMapFunc(t);
        if (device.validateFalse(data.byteLength)) {
            return null;
        }
        device.setTypeName(t);
        map.getPointMap().each((key, value) => {
            device.handleByteField(value, data);
        });
        device.handleCommandFields(map.getCommandsMap());
        return device;
    }
    getSdcSoftDevice(type, data, power = SdcSoftDevice_1.SdcSoftDevice.POWER_MEDIA_VALUE_NULL, media = SdcSoftDevice_1.SdcSoftDevice.POWER_MEDIA_VALUE_NULL) {
        let device = this.createDeviceFunc(type);
        let map = this.createMapFunc(type);
        if (device.validateFalse(data.byteLength)) {
            return null;
        }
        /*用户确认设备类型时的逻辑
        *设置设备警告信息
        device.setWarningMsg(map.getwarningMsg())
        *设置子类设备信息
        device.setSubTypes(map.getSubTypes())
         */
        map.getPointMap().each((key, value) => {
            /*
            if (key == SdcSoftDevice.KEY_POINT_RUN_DAYS) {
                console.log('hhhhhhh')
            }*/
            device.handleByteField(value, data);
        });
        //自动进行子类型确认
        if (device.getSubDeviceType() != SdcSoftDevice_1.SdcSoftDevice.NO_SUB_DEVICE_TYPE) {
            let subDevice = this.getSubDevice(type, device.getSubDeviceType(), data);
            if (null == subDevice)
                return null;
            device = subDevice;
        }
        else {
            device.setTypeName(type);
            device.handleCommandFields(map.getCommandsMap());
        }
        let powerUI = device.getBaseInfoFields().getItem(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_POWER);
        let mediaUI = device.getBaseInfoFields().getItem(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_MEDIA);
        if (powerUI && mediaUI) {
            if (power != SdcSoftDevice_1.SdcSoftDevice.POWER_MEDIA_VALUE_NULL &&
                media != SdcSoftDevice_1.SdcSoftDevice.POWER_MEDIA_VALUE_NULL) {
                //设备中需要显示的点位都必须出现在点位表中，即使通过header传递的点位也必需在点位表中设置。
                //只有出现在点位表中的点位才能进行多语言转换，如燃料。如果“燃料”不在点位表中添加，则“燃料”
                // 的多语言翻译无法在程序中确认。
                powerUI.setValue(power);
                powerUI.setValueString(map.getPowerString(power));
                mediaUI.setValue(media);
                mediaUI.setValueString(map.getMediaString(media));
            }
            else {
                device.setPower(powerUI.getValue());
                device.setMedia(mediaUI.getValue());
            }
        }
        else {
            device.setPower(0);
            device.setMedia(0);
        }
        return device;
    }
}
Wechat_DeviceAdapter.lang = 'zh-cn';
exports.Wechat_DeviceAdapter = Wechat_DeviceAdapter;
// export class Web_DeviceAdapter2 {
//     private static lang: Language = 'zh-cn'
//     static setLang(lang: Language = 'zh-cn'): Web_DeviceAdapter2 {
//         this.lang = lang
//         return new Web_DeviceAdapter2()
//     }
//     private async createDeviceFunc(type: string): Promise<SdcSoftDevice> {
//         let strs = type.split('_')
//         let path = '../devices/' + strs.join('/');
//         let deviceType = await import(path);
//         let d = new deviceType();
//         return d;
//     }
//     private async createMapFunc(type: string): Promise<PointMap> {
//         let strs = type.split('_')
//         let path = '../map/' + Web_DeviceAdapter2.lang + '/' + strs.join('/');
//         let mapType = await import(path);
//         let d = new mapType();
//         return d;
//     }
//     /**
//      * 获取子类别设备对象
//      */
//     private async getSubDevice(type: string, sub: string, data: Uint8Array): Promise<SdcSoftDevice | null> {
//         let t: string = type + '_' + sub
//         let device = await this.createDeviceFunc(t)
//         if (device.validateFalse(data.byteLength)) {
//             //throw new Error("byte data length to short.")
//             return null
//         }
//         device.setTypeName(t)
//         let map = await this.createMapFunc(t)
//         map.getPointMap().each((key, value) => {
//             device.handleByteField(value, data)
//         })
//         device.handleCommandFields(map.getCommandsMap())
//         return device
//     }
//     async getSdcSoftDevice(type: string, data: Uint8Array, power: number = SdcSoftDevice.POWER_MEDIA_VALUE_NULL, media: number = SdcSoftDevice.POWER_MEDIA_VALUE_NULL): Promise<SdcSoftDevice | null> {
//         let device = await this.createDeviceFunc(type)
//         let map = await this.createMapFunc(type)
//         if (device.validateFalse(data.byteLength)) {
//             return null
//         }
//         map.getPointMap().each((key, value) => {
//             /*
//             if (key == SdcSoftDevice.KEY_POINT_RUN_DAYS) {
//                 console.log('hhhhhhh')
//             }*/
//             device.handleByteField(value, data)
//         })
//         //自动进行子类型确认
//         if (device.getSubDeviceType() != SdcSoftDevice.NO_SUB_DEVICE_TYPE) {
//             let subDevice: SdcSoftDevice | null = await this.getSubDevice(type, device.getSubDeviceType(), data)
//             if (null == subDevice)
//                 return null
//             device = subDevice
//         }
//         else {
//             device.setTypeName(type)
//             device.handleCommandFields(map.getCommandsMap())
//         }
//         let powerUI = device.getBaseInfoFields().getItem(SdcSoftDevice.KEY_POINT_POWER)
//         let mediaUI = device.getBaseInfoFields().getItem(SdcSoftDevice.KEY_POINT_MEDIA)
//         if (powerUI && mediaUI) {
//             if (power != SdcSoftDevice.POWER_MEDIA_VALUE_NULL &&
//                 media != SdcSoftDevice.POWER_MEDIA_VALUE_NULL) {
//                 //设备中需要显示的点位都必须出现在点位表中，即使通过header传递的点位也必需在点位表中设置。
//                 //只有出现在点位表中的点位才能进行多语言转换，如燃料。如果“燃料”不在点位表中添加，则“燃料”
//                 // 的多语言翻译无法在程序中确认。
//                 powerUI.setValue(power)
//                 powerUI.setValueString(map.getPowerString(power))
//                 mediaUI.setValue(media)
//                 mediaUI.setValueString(map.getMediaString(media))
//             } else {
//                 device.setPower(powerUI.getValue())
//                 device.setMedia(mediaUI.getValue())
//             }
//         }
//         else {
//             device.setPower(0)
//             device.setMedia(0)
//         }
//         return device
//     }
// }
class Web_DeviceAdapter {
    static setLang(lang = 'zh-cn') {
        this.lang = lang;
        return new Web_DeviceAdapter();
    }
    createMapFunc(type) {
        return new Promise((resolve, reject) => {
            let strs = type.split('_');
            Promise.resolve().then(() => require('../map/' + Web_DeviceAdapter.lang + '/' + strs.join('/'))).then(data => {
                resolve(new data());
            }).catch((r) => {
                console.log(r);
                reject(r);
            });
        });
    }
    createDeviceFunc(type) {
        return new Promise((resolve, reject) => {
            let strs = type.split('_');
            Promise.resolve().then(() => require('../devices/' + strs.join('/'))).then(data => {
                resolve(new data());
            }).catch(function (r) {
                console.log(r);
                reject(r);
            });
        });
    }
    getSubDevice(type, sub, data) {
        return new Promise((resolve, reject) => {
            let t = type + '_' + sub;
            Promise.all([this.createDeviceFunc(t), this.createMapFunc(t)]).then((result) => {
                let device = result[0];
                let map = result[1];
                if (device.validateFalse(data.byteLength)) {
                    throw new Error("子类型设备要求的data长度不足！");
                }
                map.getPointMap().each((key, value) => {
                    device.handleByteField(value, data);
                });
                device.handleCommandFields(map.getCommandsMap());
                resolve(device);
            }).catch(function (r) {
                console.log(r);
                reject(r);
            });
        });
    }
    getSdcSoftDevice(type, data, power = SdcSoftDevice_1.SdcSoftDevice.POWER_MEDIA_VALUE_NULL, media = SdcSoftDevice_1.SdcSoftDevice.POWER_MEDIA_VALUE_NULL) {
        return new Promise((resolve, reject) => {
            Promise.all([this.createMapFunc(type), this.createDeviceFunc(type)]).then((result) => {
                let map = result[0];
                let device = result[1];
                if (device.validateFalse(data.byteLength)) {
                    throw new Error("设备要求的data长度不足！");
                }
                map.getPointMap().each((key, value) => {
                    device.handleByteField(value, data);
                });
                if (device.getSubDeviceType() != SdcSoftDevice_1.SdcSoftDevice.NO_SUB_DEVICE_TYPE) {
                    this.getSubDevice(type, device.getSubDeviceType(), data).then(result => {
                        device = result;
                    });
                }
                else {
                    device.setTypeName(type);
                    device.handleCommandFields(map.getCommandsMap());
                }
                let powerUI = device.getBaseInfoFields().getItem(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_POWER);
                let mediaUI = device.getBaseInfoFields().getItem(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_MEDIA);
                if (powerUI && mediaUI) {
                    if (power != SdcSoftDevice_1.SdcSoftDevice.POWER_MEDIA_VALUE_NULL &&
                        media != SdcSoftDevice_1.SdcSoftDevice.POWER_MEDIA_VALUE_NULL) {
                        //设备中需要显示的点位都必须出现在点位表中，即使通过header传递的点位也必需在点位表中设置。
                        //只有出现在点位表中的点位才能进行多语言转换，如燃料。如果“燃料”不在点位表中添加，则“燃料”
                        // 的多语言翻译无法在程序中确认。
                        powerUI.setValue(power);
                        powerUI.setValueString(map.getPowerString(power));
                        mediaUI.setValue(media);
                        mediaUI.setValueString(map.getMediaString(media));
                    }
                    else {
                        device.setPower(powerUI.getValue());
                        device.setMedia(mediaUI.getValue());
                    }
                }
                else {
                    device.setPower(0);
                    device.setMedia(0);
                }
                resolve(device);
            }).catch(function (r) {
                console.log(r);
                reject(r);
            });
        });
    }
}
Web_DeviceAdapter.lang = 'zh-cn';
exports.Web_DeviceAdapter = Web_DeviceAdapter;

}, function(modId) { var map = {"../devices/SdcSoftDevice":1573525725023}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1573525725022);
})()
//# sourceMappingURL=index.js.map