var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
//数据池
var DataBus = (function (_super) {
    __extends(DataBus, _super);
    function DataBus() {
        var _this = _super.call(this) || this;
        _this._curCheckpointDataArr = [];
        return _this;
    }
    /**
     * 当前关卡
    */
    DataBus._curCheckpointNum = 0;
    /**
     * 总关卡数
     */
    DataBus.totalCheckpointNum = 0;
    /**
     * 耗时
     */
    DataBus.totalTimeConsuming = 0; //总耗时
    DataBus.curTimeConsuming = 0; //当前关卡耗时
    /**
     * 步数
     */
    DataBus.totalTheyCount = 0; //总步数
    DataBus.curTheyCount = 0; //当前关卡步数
    DataBus.scaleNum = 0;
    return DataBus;
}(egret.DisplayObjectContainer));
__reflect(DataBus.prototype, "DataBus");
//# sourceMappingURL=DataBus.js.map