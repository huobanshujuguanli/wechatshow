"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SdcSoftDevice_1 = require("../devices/SdcSoftDevice");
var Wechat_DeviceAdapter = /** @class */ (function () {
    function Wechat_DeviceAdapter() {
    }
    Wechat_DeviceAdapter.setLang = function (lang) {
        if (lang === void 0) { lang = 'zh-cn'; }
        this.lang = lang;
        return new Wechat_DeviceAdapter();
    };
    Wechat_DeviceAdapter.prototype.createDeviceFunc = function (type) {
        var strs = type.split('_');
        var path = '../devices/' + strs.join('/');
        // console.log(path)
        var deviceType = require(path);
        var d = new deviceType();
        return d;
    };
    Wechat_DeviceAdapter.prototype.createMapFunc = function (type) {
        var strs = type.split('_');
        var path = '../map/' + Wechat_DeviceAdapter.lang + '/' + strs.join('/');
        var mapType = require(path);
        var d = new mapType();
        return d;
    };
    /**
     * 获取子类别设备对象
     */
    Wechat_DeviceAdapter.prototype.getSubDevice = function (type, sub, data) {
        var t = type + '_' + sub;
        var device = this.createDeviceFunc(t);
        var map = this.createMapFunc(t);
        if (device.validateFalse(data.byteLength)) {
            return null;
        }
        device.setTypeName(t);
        map.getPointMap().each(function (key, value) {
            // console.log(value.getTitle()+' index->'+value.getStartIndex()+' length->'+value.getBytesLength())
            device.handleByteField(value, data);
        });
        device.handleCommandFields(map.getCommandsMap());
        return device;
    };
    Wechat_DeviceAdapter.prototype.getSdcSoftDevice = function (type, data, power, media) {
        if (power === void 0) { power = SdcSoftDevice_1.SdcSoftDevice.POWER_MEDIA_VALUE_NULL; }
        if (media === void 0) { media = SdcSoftDevice_1.SdcSoftDevice.POWER_MEDIA_VALUE_NULL; }
        var device = this.createDeviceFunc(type);
        var map = this.createMapFunc(type);
        if (device.validateFalse(data.byteLength)) {
            return null;
        }
        /*用户确认设备类型时的逻辑
        *设置设备警告信息
        device.setWarningMsg(map.getwarningMsg())
        *设置子类设备信息
        device.setSubTypes(map.getSubTypes())
         */
        map.getPointMap().each(function (key, value) {
            /*
            if (key == SdcSoftDevice.KEY_POINT_RUN_DAYS) {
                console.log('hhhhhhh')
            }*/
            //console.log(value.getTitle()+' index->'+value.getStartIndex()+' length->'+value.getBytesLength())
            device.handleByteField(value, data);
        });
        //自动进行子类型确认
        if (device.getSubDeviceType() != SdcSoftDevice_1.SdcSoftDevice.NO_SUB_DEVICE_TYPE) {
            var subDevice = this.getSubDevice(type, device.getSubDeviceType(), data);
            if (null == subDevice)
                return null;
            device = subDevice;
        }
        else {
            device.setTypeName(type);
            device.handleCommandFields(map.getCommandsMap());
        }
        var powerUI = device.getBaseInfoFields().getItem(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_POWER);
        var mediaUI = device.getBaseInfoFields().getItem(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_MEDIA);
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
    };
    Wechat_DeviceAdapter.lang = 'zh-cn';
    return Wechat_DeviceAdapter;
}());
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
var Web_DeviceAdapter = /** @class */ (function () {
    function Web_DeviceAdapter() {
    }
    Web_DeviceAdapter.setLang = function (lang) {
        if (lang === void 0) { lang = 'zh-cn'; }
        this.lang = lang;
        return new Web_DeviceAdapter();
    };
    Web_DeviceAdapter.prototype.createMapFunc = function (type) {
        return new Promise(function (resolve, reject) {
            var strs = type.split('_');
            Promise.resolve().then(function () { return require('../map/' + Web_DeviceAdapter.lang + '/' + strs.join('/')); }).then(function (data) {
                resolve(new data());
            }).catch(function (r) {
                console.log(r);
                reject(r);
            });
        });
    };
    Web_DeviceAdapter.prototype.createDeviceFunc = function (type) {
        return new Promise(function (resolve, reject) {
            var strs = type.split('_');
            Promise.resolve().then(function () { return require('../devices/' + strs.join('/')); }).then(function (data) {
                resolve(new data());
            }).catch(function (r) {
                console.log(r);
                reject(r);
            });
        });
    };
    Web_DeviceAdapter.prototype.getSubDevice = function (type, sub, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var t = type + '_' + sub;
            Promise.all([_this.createDeviceFunc(t), _this.createMapFunc(t)]).then(function (result) {
                var device = result[0];
                var map = result[1];
                if (device.validateFalse(data.byteLength)) {
                    throw new Error("子类型设备要求的data长度不足！");
                }
                map.getPointMap().each(function (key, value) {
                    device.handleByteField(value, data);
                });
                device.handleCommandFields(map.getCommandsMap());
                resolve(device);
            }).catch(function (r) {
                console.log(r);
                reject(r);
            });
        });
    };
    Web_DeviceAdapter.prototype.getSdcSoftDevice = function (type, data, power, media) {
        var _this = this;
        if (power === void 0) { power = SdcSoftDevice_1.SdcSoftDevice.POWER_MEDIA_VALUE_NULL; }
        if (media === void 0) { media = SdcSoftDevice_1.SdcSoftDevice.POWER_MEDIA_VALUE_NULL; }
        return new Promise(function (resolve, reject) {
            Promise.all([_this.createMapFunc(type), _this.createDeviceFunc(type)]).then(function (result) {
                var map = result[0];
                var device = result[1];
                if (device.validateFalse(data.byteLength)) {
                    throw new Error("设备要求的data长度不足！");
                }
                map.getPointMap().each(function (key, value) {
                    device.handleByteField(value, data);
                });
                if (device.getSubDeviceType() != SdcSoftDevice_1.SdcSoftDevice.NO_SUB_DEVICE_TYPE) {
                    _this.getSubDevice(type, device.getSubDeviceType(), data).then(function (result) {
                        device = result;
                    });
                }
                else {
                    device.setTypeName(type);
                    device.handleCommandFields(map.getCommandsMap());
                }
                var powerUI = device.getBaseInfoFields().getItem(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_POWER);
                var mediaUI = device.getBaseInfoFields().getItem(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_MEDIA);
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
    };
    Web_DeviceAdapter.lang = 'zh-cn';
    return Web_DeviceAdapter;
}());
exports.Web_DeviceAdapter = Web_DeviceAdapter;
