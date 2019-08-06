/**
 *排行榜组件,主要包含下面两部分
 *1. 年级选项卡：1-6年级
 *2. 玩家列表：名次-头像-年级-昵称-积分-pk按钮
 *功能：
 *1.从服务器取玩家排行信息
 *2.使用数据渲染年级选项卡
 *3.使用数据渲染玩家列表，并为列表按钮添加事件
 *
 *输入： 排行榜皮肤
        年级选项卡皮肤
        玩家列表皮肤
        一至六年级玩家排行榜数据
*/
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var RankUiClass = (function (_super) {
    __extends(RankUiClass, _super);
    function RankUiClass() {
        var _this = _super.call(this) || this;
        _this.datas = DataBus.rankDataArr;
        _this.percentWidth = 100;
        _this.percentHeight = 100;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/assets/rankUISkin.exml";
        return _this;
    }
    RankUiClass.prototype.uiCompHandler = function () {
        this.renderPlayerList();
    };
    RankUiClass.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    /*
    *渲染器渲染玩家列表
    */
    RankUiClass.prototype.renderPlayerList = function () {
        this.listPlayers.itemRenderer = PlayerListRNKIR;
        //初始数据为一年级
        var datas = this.datas.map(function (item, index) {
            return __assign({ order: index + 1 }, item);
        });
        this.listPlayers.dataProvider = new eui.ArrayCollection(datas);
    };
    return RankUiClass;
}(eui.Component));
__reflect(RankUiClass.prototype, "RankUiClass");
/*玩家列表渲染器*/
var PlayerListRNKIR = (function (_super) {
    __extends(PlayerListRNKIR, _super);
    function PlayerListRNKIR() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/assets/playerListSkin.exml";
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        return _this;
    }
    PlayerListRNKIR.prototype.uiCompHandler = function () {
    };
    PlayerListRNKIR.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    PlayerListRNKIR.prototype.dataChanged = function () {
    };
    return PlayerListRNKIR;
}(eui.ItemRenderer));
__reflect(PlayerListRNKIR.prototype, "PlayerListRNKIR");
//# sourceMappingURL=RankUiClass.js.map