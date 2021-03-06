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
var meta_1 = require("../../../../../../../meta/RT/meta");
var _4J_1 = require("./4J");
var gfrm_1 = require("@sdcsoft/gfrm");
var Map_CTL_RT_T2_RYZQ_4JBS = /** @class */ (function (_super) {
    __extends(Map_CTL_RT_T2_RYZQ_4JBS, _super);
    //4电极压力变送器内置比调
    function Map_CTL_RT_T2_RYZQ_4JBS() {
        var _this = _super.call(this) || this;
        _this.addPoint(new meta_1.MockField(gfrm_1.GroupFieldsRelationalMapping.KEY_MOCK_ZhengQiYaLi, 17, 2, "蒸汽压力", "MPa", 100), "mo_zhengqiyali");
        _this.addPoint(new meta_1.ExceptionField("ex_yalibiansongqiduanlu", 45, 2, "压力变送器断路", 0));
        _this.addPoint(new meta_1.ExceptionField("ex_yalibiansongqiduanlu1", 45, 2, "压力变送器短路", 1));
        _this.addPoint(new meta_1.ExceptionField(gfrm_1.GroupFieldsRelationalMapping.KEY_Expt_ChaoYa, 45, 2, "超压报警(变送器)", 2), "ex_chaoyabaojing");
        _this.addPoint(new meta_1.ExceptionField(gfrm_1.GroupFieldsRelationalMapping.KEY_Expt_ChaoYa, 45, 2, "超压报警(控制器)", 13), "ex_chaoyabaojing_kongzhiqi");
        return _this;
    }
    return Map_CTL_RT_T2_RYZQ_4JBS;
}(_4J_1.Map_CTL_RT_T2_RYZQ_4J));
exports.Map_CTL_RT_T2_RYZQ_4JBS = Map_CTL_RT_T2_RYZQ_4JBS;
