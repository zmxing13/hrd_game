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
//游戏操作区域
var GameOperationArea = (function (_super) {
    __extends(GameOperationArea, _super);
    function GameOperationArea() {
        var _this = _super.call(this) || this;
        //全局-当前关卡数
        _this.currCheckpointNum = 0;
        _this.currCheckpointArr = [];
        _this.currAnswerId = 0;
        _this.currAnswerPointArr = [];
        _this.checkpointInit();
        return _this;
    }
    /**
     * 动态加载可视化内容
     * 动态刷新可视化内容
     * 清空本轮或上一轮游戏资源
     */
    /**
     * 初始化关卡数据
     */
    GameOperationArea.prototype.checkpointInit = function () {
        var obj;
        if (DataBus.checkpointJsonDataObject != undefined) {
            obj = DataBus.checkpointJsonDataObject;
            this.currCheckpointArr = obj.checkpointJsonDataObject[this.currCheckpointNum].checkpointDataArr;
            this.currAnswerId = obj.checkpointJsonDataObject[this.currCheckpointNum].answerId;
            this.currAnswerPointArr = obj.checkpointJsonDataObject[this.currCheckpointNum].answerPointArr;
            this.initSprite();
            this.UpWindowData();
            this.initMessage();
        }
        else {
            console.log('无舞台数据配置信息');
        }
    };
    /**
     * 创建图形界面
     */
    GameOperationArea.prototype.initSprite = function () {
        this.width = Main.W;
        this.height = Main.H * .85;
        // this.tempBg = new egret.Sprite();
        // this.tempBg.graphics.beginFill(0x000fff,.3);
        // this.tempBg.graphics.drawRoundRect(0,0,this.width,this.height,20,20);
        // this.tempBg.graphics.endFill();
        // this.addChild(this.tempBg);
        this.displaySp = new egret.Sprite();
        this.addChild(this.displaySp);
        this.unitArea = new UnitAreaClass();
        this.displaySp.addChild(this.unitArea);
        this.unitArea.getLayoutData(this.currCheckpointNum, this.currCheckpointArr, this.currAnswerId, this.currAnswerPointArr);
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    GameOperationArea.prototype.UpWindowData = function () {
        // this.tempBg.graphics.clear()
        // this.tempBg.graphics.beginFill(0x000fff,.3);
        // this.tempBg.graphics.drawRoundRect(0,0,this.width,this.height,20,20);
        // this.tempBg.graphics.endFill();
        var scaleNum = 0;
        var scaleXNum = 0;
        var scaleYNum = 0;
        scaleXNum = (Main.W / (this.displaySp.width * 1.2));
        scaleYNum = (Main.H / (this.displaySp.height * 1.2));
        if (scaleXNum < scaleYNum) {
            scaleNum = scaleXNum;
        }
        else {
            scaleNum = scaleYNum;
        }
        DataBus.scaleNum = scaleNum;
        this.displaySp.scaleX = this.displaySp.scaleY = scaleNum;
        this.displaySp.x = (this.width - this.displaySp.width * scaleNum) / 2;
        this.displaySp.y = (this.height - this.displaySp.height * scaleNum) / 2;
    };
    /**
     * 初始化事件消息
     */
    GameOperationArea.prototype.initMessage = function () {
        this.unitArea.addEventListener(EventEnumerate.SELECT_COMPLETE, this.unitAreaComplete, this);
    };
    GameOperationArea.prototype.unitAreaComplete = function (e) {
        console.log(e.data);
        if (e.data == 'startTouch') {
            this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, 'startTouch'));
        }
        if (e.data == 'gameover') {
            this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, 'gameover'));
        }
    };
    //设置/更新下一关闯关数据
    GameOperationArea.prototype.setNextCheckpointData = function () {
        console.log('下一关');
        var obj;
        if (DataBus.checkpointJsonDataObject != undefined) {
            obj = DataBus.checkpointJsonDataObject;
            this.currCheckpointNum++;
            this.currCheckpointArr = obj.checkpointJsonDataObject[this.currCheckpointNum].checkpointDataArr;
            this.currAnswerId = obj.checkpointJsonDataObject[this.currCheckpointNum].answerId;
            this.currAnswerPointArr = obj.checkpointJsonDataObject[this.currCheckpointNum].answerPointArr;
            this.unitArea.resetEvent();
            this.unitArea = new UnitAreaClass();
            this.unitArea.alpha = 0;
            this.displaySp.addChild(this.unitArea);
            this.unitArea.hiddenOut(.1, .2, 1);
            this.unitArea.getLayoutData(this.currCheckpointNum, this.currCheckpointArr, this.currAnswerId, this.currAnswerPointArr);
            this.unitArea.addEventListener(EventEnumerate.SELECT_COMPLETE, this.unitAreaComplete, this);
        }
    };
    return GameOperationArea;
}(BaseContainer));
__reflect(GameOperationArea.prototype, "GameOperationArea");
//# sourceMappingURL=GameOperationArea.js.map