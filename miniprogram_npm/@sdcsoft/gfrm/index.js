module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1573525725019, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var comms_1 = require("@sdcsoft/comms");
var GroupFieldsRelationalMapping = /** @class */ (function () {
    function GroupFieldsRelationalMapping() {
        this.groupMap = new comms_1.StringHashMap();
        this.fields = [comms_1.GroupKeys.KEY_MOCK, comms_1.GroupKeys.KEY_EXCEPTION];
        var expt = new comms_1.StringSet();
        var mocks = new comms_1.StringSet();
        mocks.add(GroupFieldsRelationalMapping.KEY_MOCK_ReShuiYaLi);
        mocks.add(GroupFieldsRelationalMapping.KEY_MOCK_ZhengQiYaLi);
        mocks.add(GroupFieldsRelationalMapping.KEY_MOCK_PaiYanWenDu);
        mocks.add(GroupFieldsRelationalMapping.KEY_MOCK_ChuKouWenDu);
        mocks.add(GroupFieldsRelationalMapping.KEY_MOCK_HuiLiuWenDu);
        mocks.add(GroupFieldsRelationalMapping.KEY_MOCK_ShengHuoChuKouWenDu);
        mocks.add(GroupFieldsRelationalMapping.KEY_MOCK_ShengHuoHuiLiuWenDu);
        mocks.add(GroupFieldsRelationalMapping.KEY_MOCK_CaiNuanChuKouWenDu);
        mocks.add(GroupFieldsRelationalMapping.KEY_MOCK_CaiNuanHuiLiuWenDu);
        this.groupMap.addItem(comms_1.GroupKeys.KEY_MOCK, mocks);
        expt.add(GroupFieldsRelationalMapping.KEY_Expt_LuBiChaoWen);
        expt.add(GroupFieldsRelationalMapping.KEY_Expt_ChaoYa);
        expt.add(GroupFieldsRelationalMapping.KEY_Expt_DiYa);
        expt.add(GroupFieldsRelationalMapping.KEY_Expt_QianYa);
        expt.add(GroupFieldsRelationalMapping.KEY_Expt_ChuKouWenDuChaoGao);
        expt.add(GroupFieldsRelationalMapping.KEY_Expt_WaiBuLianSuoDuanKai);
        expt.add(GroupFieldsRelationalMapping.KEY_Expt_JiXianDiShuiWei);
        expt.add(GroupFieldsRelationalMapping.KEY_Expt_JiXianGaoShuiWei);
        expt.add(GroupFieldsRelationalMapping.KEY_Expt_RanQiXieLou);
        expt.add(GroupFieldsRelationalMapping.KEY_Expt_PaiYanWenDuChaoGao);
        expt.add(GroupFieldsRelationalMapping.KEY_Expt_QueYou);
        this.groupMap.addItem(comms_1.GroupKeys.KEY_EXCEPTION, expt);
    }
    /**
     * 获取需处理的熟悉集合名称
     */
    GroupFieldsRelationalMapping.prototype.getSelectFieldsArray = function () {
        return this.fields;
    };
    /**
     * 真空压力
     */
    GroupFieldsRelationalMapping.KEY_MOCK_ReShuiYaLi = 'mo_zhenkongyali';
    /**
     * 蒸汽压力
     */
    GroupFieldsRelationalMapping.KEY_MOCK_ZhengQiYaLi = 'mo_zhengqiyali';
    /**
     * 排烟温度
     */
    GroupFieldsRelationalMapping.KEY_MOCK_PaiYanWenDu = 'mo_paiyanwendu';
    /**
     * 出口温度
     */
    GroupFieldsRelationalMapping.KEY_MOCK_ChuKouWenDu = 'mo_chukouwendu';
    /**
     * 回流温度
     */
    GroupFieldsRelationalMapping.KEY_MOCK_HuiLiuWenDu = 'mo_huiliuwendu';
    /**
    * 出生活口温度
    */
    GroupFieldsRelationalMapping.KEY_MOCK_ShengHuoChuKouWenDu = 'mo_shenghuochukouwendu';
    /**
     * 生活回流温度
     */
    GroupFieldsRelationalMapping.KEY_MOCK_ShengHuoHuiLiuWenDu = 'mo_shenghuohuiliuwendu';
    /**
    * 采暖出口温度
    */
    GroupFieldsRelationalMapping.KEY_MOCK_CaiNuanChuKouWenDu = 'mo_cainuanchukouwendu';
    /**
     * 采暖回流温度
     */
    GroupFieldsRelationalMapping.KEY_MOCK_CaiNuanHuiLiuWenDu = 'mo_cainuanhuiliuwendu';
    /**
     * 炉壁超温报警
     */
    GroupFieldsRelationalMapping.KEY_Expt_LuBiChaoWen = 'ex_lubichaowenbaojing';
    /**
     * 超压报警
     */
    GroupFieldsRelationalMapping.KEY_Expt_ChaoYa = 'ex_chaoyabaojing';
    /**
     * 低压报警
     */
    GroupFieldsRelationalMapping.KEY_Expt_DiYa = 'ex_diyabaojing';
    /**
     * 欠压报警
     */
    GroupFieldsRelationalMapping.KEY_Expt_QianYa = 'ex_qianyabaojing';
    /**
     * 出口温度高报警
     */
    GroupFieldsRelationalMapping.KEY_Expt_ChuKouWenDuChaoGao = 'ex_chukouwendugaobaojing';
    /**
     * 外部连锁断开报警
     */
    GroupFieldsRelationalMapping.KEY_Expt_WaiBuLianSuoDuanKai = 'ex_waibuliansuoduankaibaojing';
    /**
     * 极限低水位报警
     */
    GroupFieldsRelationalMapping.KEY_Expt_JiXianDiShuiWei = 'ex_jixiandishuiweibaojing';
    /**
     * 极限高水位报警
     */
    GroupFieldsRelationalMapping.KEY_Expt_JiXianGaoShuiWei = 'ex_jixiangaoshuiweibaojing';
    /**
     * 燃气泄漏报警
     */
    GroupFieldsRelationalMapping.KEY_Expt_RanQiXieLou = 'ex_ranqixieloubaojing';
    /**
     * 排烟温度超高报警
     */
    GroupFieldsRelationalMapping.KEY_Expt_PaiYanWenDuChaoGao = 'ex_paiyanwenduchaogaobaojing';
    /**
       * 缺油报警
       */
    GroupFieldsRelationalMapping.KEY_Expt_QueYou = 'ex_queyoubaojing';
    return GroupFieldsRelationalMapping;
}());
exports.GroupFieldsRelationalMapping = GroupFieldsRelationalMapping;

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1573525725019);
})()
//# sourceMappingURL=index.js.map