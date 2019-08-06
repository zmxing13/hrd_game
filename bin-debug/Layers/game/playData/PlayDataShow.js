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
//玩家数据展示 耗时，步数
var PlayDataShow = (function (_super) {
    __extends(PlayDataShow, _super);
    function PlayDataShow() {
        var _this = _super.call(this) || this;
        _this._public = new PublicClass();
        _this.timeNum = 0;
        _this.mapNum = 0;
        _this.currCheckpointNum = 1;
        _this.totalCheckpointNum = DataBus.totalCheckpointNum;
        _this.initSprite();
        _this.UpWindowData();
        _this.initMessage();
        return _this;
    }
    /**
     * 创建图形界面
     */
    PlayDataShow.prototype.initSprite = function () {
        this.displaySp = new egret.Sprite();
        this.addChild(this.displaySp);
        this.timeImg = this._public.createBitmapByName('img_game_time');
        this.displaySp.addChild(this.timeImg);
        this.timeText = this._public.createTextByName(this.timeNum.toString() + ' 秒', 90);
        this.displaySp.addChild(this.timeText);
        this.mapImg = this._public.createBitmapByName('img_game_map');
        this.displaySp.addChild(this.mapImg);
        this.mapText = this._public.createTextByName(this.mapNum.toString() + ' 步', 90);
        this.displaySp.addChild(this.mapText);
        this.currCheckpointText = this._public.createTextByName('关卡 ' + this.currCheckpointNum.toString() + '/' +
            this.totalCheckpointNum.toString(), 90);
        this.displaySp.addChild(this.currCheckpointText);
        this.nextImg = this._public.createBitmapByName('img_game_win');
        this.displaySp.addChild(this.nextImg);
        this.timer = new egret.Timer(1000, 0);
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    PlayDataShow.prototype.UpWindowData = function () {
        this.timeImg.x = 0;
        this.timeImg.y = 0;
        this.timeText.x = this.timeImg.x + this.timeImg.width * 1.3;
        this.timeText.y = this.timeImg.y + this.timeImg.height / 2 - (this.timeText.height / 2);
        this.mapImg.x = this.timeText.x + this.mapImg.width * 2;
        this.mapImg.y = this.timeImg.y;
        this.mapText.x = this.mapImg.x + this.mapImg.width * 1.3;
        this.mapText.y = this.mapImg.y + this.mapImg.height / 2 - (this.mapText.height / 2);
        this.currCheckpointText.x = this.mapText.x + this.mapText.width * 2;
        this.currCheckpointText.y = this.mapText.y + this.mapText.height / 2 - (this.currCheckpointText.height / 2);
        this.nextImg.x = this.currCheckpointText.x + this.currCheckpointText.width * 1.5;
        this.nextImg.y = this.currCheckpointText.y;
    };
    /**
     * 初始化事件消息
     */
    PlayDataShow.prototype.initMessage = function () {
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        this.nextImg.touchEnabled = true;
        this.nextImg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.nextImgTouch, this);
    };
    PlayDataShow.prototype.nextImgTouch = function (e) {
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, 'nextCheckpoint'));
    };
    PlayDataShow.prototype.timerFunc = function () {
        // console.log("计时");
        this.timeNum++;
        this.timeText.text = this.timeNum.toString() + ' 秒';
        DataBus.curTimeConsuming = this.timeNum;
    };
    PlayDataShow.prototype.timerComFunc = function () {
        console.log("计时结束");
    };
    //开始计时
    PlayDataShow.prototype.startTime = function () {
        this.timer.start();
    };
    //停止计时
    PlayDataShow.prototype.stopTime = function () {
        this.timer.stop();
    };
    return PlayDataShow;
}(BaseContainer));
__reflect(PlayDataShow.prototype, "PlayDataShow");
//# sourceMappingURL=PlayDataShow.js.map