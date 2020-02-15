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
var BaseMap_1 = require("../BaseMap");
var BaseDevice_1 = require("../../../../devices/PLC/BaseDevice");
var CountField_1 = require("../../../../meta/CountField");
var meta_1 = require("../../../../meta/PLC/BJKN/meta");
var SdcSoftDevice_1 = require("../../../../devices/SdcSoftDevice");
var FixedValueField_1 = require("../../../../meta/FixedValueField");
var CountShowField_1 = require("../../../../meta/CountShowField");
var comms_1 = require("@sdcsoft/comms");
var PLC_BJKN_RYZQ = require("../../../../devices/PLC/BJKN/RYZQ");
module.exports = (_a = /** @class */ (function (_super) {
        __extends(Map_PLC_BJKN_RYZQ, _super);
        function Map_PLC_BJKN_RYZQ() {
            var _this = _super.call(this) || this;
            _this.addPoint(new CountField_1.CountField(BaseDevice_1.PLC.KEY_POINT_Add_SHUI_BENG, "给水泵"));
            _this.addPoint(new CountField_1.CountField(BaseDevice_1.PLC.KEY_POINT_XUN_HUAN_BENG, "冷凝泵"));
            _this.addPoint(new FixedValueField_1.FixedValueField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_POWER, "燃料类型", 0, Map_PLC_BJKN_RYZQ.coms_power));
            _this.addPoint(new FixedValueField_1.FixedValueField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_MEDIA, "介质类型", 1, Map_PLC_BJKN_RYZQ.coms_media));
            _this.addPoint(new FixedValueField_1.FixedValueField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_HOURS, '运行小时数', 0, Map_PLC_BJKN_RYZQ.coms_fix_value));
            _this.addPoint(new FixedValueField_1.FixedValueField(SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_RUN_DAYS, '运行天数', 0, Map_PLC_BJKN_RYZQ.coms_fix_value));
            _this.addPoint(new CountShowField_1.CountShowField(comms_1.GroupKeys.KEY_BASE, SdcSoftDevice_1.SdcSoftDevice.KEY_POINT_SYSTEM_STATUS, '系统状态', '', false, Map_PLC_BJKN_RYZQ.coms_status));
            _this.addPoint(new CountShowField_1.CountShowField(comms_1.GroupKeys.KEY_BASE, PLC_BJKN_RYZQ.KEY_POINT_SHUI_WEI_STATUS, "水位", '', false, Map_PLC_BJKN_RYZQ.ShuiWeiStatus));
            _this.addPoint(new meta_1.ExceptionField("de_fengmingqichangguiguzhangshuchuxinhao", 3, 2, "常规故障", 14));
            _this.addPoint(new meta_1.ExceptionField("de_jinjiguzhangshuchuxinhao", 3, 2, "紧急故障", 15));
            _this.addPoint(new meta_1.ExceptionField("de_jishuibengbianpinqiguzhangfankui", 10, 2, "给水泵变频器故障", 8));
            _this.addPoint(new meta_1.ExceptionField("de_lengningbengguozaifankui", 10, 2, "冷凝泵过载", 9));
            _this.addPoint(new meta_1.ExceptionField("de_fengjirukoudusaifankui", 10, 2, "风机入口堵塞", 10));
            _this.addPoint(new meta_1.ExceptionField("de_zhengqiyaligao/lutichaowenfankui", 10, 2, "蒸汽压力高/炉体超温", 11));
            _this.addPoint(new meta_1.ExceptionField("de_xihuoguzhangfankui", 10, 2, "熄火故障", 12));
            _this.addPoint(new meta_1.ExceptionField("de_fengjiguozaifankui", 12, 1, "风机过载", 0));
            _this.addPoint(new meta_1.OpenCloseField("oc_shuiweijigao", 10, 2, "水位极高", 13));
            _this.addPoint(new meta_1.OpenCloseField("oc_shuiweigao", 10, 2, "水位高", 14));
            _this.addPoint(new meta_1.OpenCloseField("oc_shuiweizhonggao", 10, 2, "水位中高", 15));
            _this.addPoint(new meta_1.OpenCloseField("oc_shuiweizhong", 10, 2, "水位中", 0));
            _this.addPoint(new meta_1.OpenCloseField("oc_shuiweidi", 10, 2, "水位低", 1));
            _this.addPoint(new meta_1.OpenCloseField("oc_shuiweijidi", 10, 2, "水位极低", 2));
            _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_XUN_HUAN_BENG_1, 3, 2, "冷凝泵", 8, Map_PLC_BJKN_RYZQ.coms_open_close));
            _this.addPoint(new meta_1.DeviceField("de_qitinglushuchuxinhao", 3, 2, "启停炉", 9, Map_PLC_BJKN_RYZQ.coms_open_close));
            _this.addPoint(new meta_1.DeviceField(BaseDevice_1.PLC.KEY_POINT_Add_SHUI_BENG_1, 3, 2, "给水泵1", 10, Map_PLC_BJKN_RYZQ.coms_open_close));
            _this.addPoint(new meta_1.DeviceField("de_biaopaidiancifadongzuoxinhao", 3, 2, "表排电磁阀动作", 11, Map_PLC_BJKN_RYZQ.coms_open_close));
            _this.addPoint(new meta_1.DeviceField("de_gaoshuiweitingbengxinhao", 3, 2, "高水位停泵", 12, Map_PLC_BJKN_RYZQ.coms_open_close));
            _this.addPoint(new meta_1.DeviceField("de_jidianqixiaohuoshuchuxinhao", 3, 2, "小火输出", 13, Map_PLC_BJKN_RYZQ.coms_open_close));
            _this.addPoint(new meta_1.DeviceField("de_jidianqidahuoshuchuxinhao", 3, 2, "大火输出", 0, Map_PLC_BJKN_RYZQ.coms_open_close));
            _this.addPoint(new meta_1.DeviceField("de_jishuibengbianpinqiyunxingfankui", 10, 2, "给水泵变频器运行反馈", 3, Map_PLC_BJKN_RYZQ.coms_open_close));
            _this.addPoint(new meta_1.SimpleDeviceField("de_ranshaoyunxingfankui", 12, 1, "燃烧运行反馈", 1, Map_PLC_BJKN_RYZQ.coms_open_close));
            _this.addPoint(new meta_1.SimpleDeviceField("de_guoluyuanchengxuanzefankui", 12, 1, "锅炉远程选择反馈", 2, Map_PLC_BJKN_RYZQ.coms_open_close));
            _this.addPoint(new meta_1.SimpleDeviceField("de_guoluyuanchengqidongfankui", 12, 1, "锅炉远程启动反馈", 3, Map_PLC_BJKN_RYZQ.coms_open_close));
            _this.addPoint(new meta_1.MockField("mo_zhengqiyali", 18, 2, "蒸汽压力", "MPa", 1000));
            _this.addPoint(new meta_1.MockField("mo_guoluyanxiangwendu", 20, 2, "锅炉烟箱温度", "℃"));
            _this.addPoint(new meta_1.MockField("mo_guolupaiyanwendu", 22, 2, "锅炉排烟温度", "℃"));
            return _this;
        }
        return Map_PLC_BJKN_RYZQ;
    }(BaseMap_1.Map_PLC)),
    _a.KEY_POINT_SHUI_WEI_STATUS = 'ba_shuiwei_status',
    _a.coms_level = {
        0: '缺水',
        1: '低报警',
        2: '低位',
        3: '正常',
        4: '高位',
        5: '超高位',
        6: '逻辑错',
    },
    _a.ShuiWeiStatus = {
        0: '缺水',
        1: '极低',
        2: '低',
        3: '中',
        4: '中高',
        5: '高',
        6: '极高'
    },
    _a);
