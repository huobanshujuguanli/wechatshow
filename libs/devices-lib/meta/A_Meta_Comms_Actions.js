"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Meta公共操作代码，优化项目代码量
 */
var Meta_Comms_Actions = /** @class */ (function () {
    function Meta_Comms_Actions() {
    }
    /**
     * 检测字节数组中的特定位是否置1，置1返回1，否则返回0
     * @param little_endian 字节数组是否为：小端模式
     * @param bit 要检测的字节数组中的位
     * @param bytes 要检测的字节数组
     */
    Meta_Comms_Actions.Check_Bytes_Bit_Is_Set = function (little_endian, bit, bytes) {
        var len = bytes.length - 1;
        var i = 1 << bit;
        var value = 0;
        if (little_endian) {
            for (var i_1 = 0; i_1 <= len; i_1++) {
                value |= (bytes[i_1] << (i_1 * 8));
            }
        }
        else {
            for (var i_2 = 0; i_2 <= len; i_2++) {
                value |= (bytes[i_2] << ((len - i_2) * 8));
            }
        }
        if ((value & i) == i)
            return 1;
        return 0;
    };
    /**
     * 处理模拟量点位数据，执行结果为{ok:booleab,value:number}
     * @param baseNumber 运算基数
     * @param ignoreNumber 忽略验证数值
     * @param little_endian bytes数组是否为小端模式
     * @param isFloat 是否需要转换为float进行数据处理
     * @param bytes 模拟量数组数组
     * @param func 用户自定义模拟量运算的函数。当才参数不为null时，数据在执行完忽略验证后马上执行func运算并将运算结果返回
     */
    Meta_Comms_Actions.Handle_Mock_Bytes = function (baseNumber, ignoreNumber, little_endian, isFloat, bytes, func) {
        var len = bytes.length - 1;
        var flag = true; //数据是否有效
        var v = 0;
        if (little_endian) {
            for (var i = 0; i <= len; i++) {
                v |= (bytes[i] << (i * 8));
            }
        }
        else {
            for (var i = 0; i <= len; i++) {
                v |= (bytes[i] << ((len - i) * 8));
            }
        }
        if (ignoreNumber) {
            flag = v == ignoreNumber;
            return { ok: flag, value: v };
        }
        if (func) {
            v = func(v);
            return { ok: flag, value: v };
        }
        if (isFloat && 4 == bytes.length) {
            var dv = new DataView(new ArrayBuffer(bytes.length));
            dv.setInt32(0, v);
            v = dv.getFloat32(0);
        }
        if (baseNumber) {
            v = parseFloat((v / baseNumber).toFixed(2));
        }
        else {
            v = parseFloat(v.toFixed(2));
        }
        return { ok: flag, value: v };
    };
    return Meta_Comms_Actions;
}());
exports.Meta_Comms_Actions = Meta_Comms_Actions;
