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
//反馈弹板类型1
var feedbackTypeText = (function (_super) {
    __extends(feedbackTypeText, _super);
    function feedbackTypeText(_feedbackStr) {
        var _this = _super.call(this) || this;
        //反馈版text内容
        _this.feedbackStr = '';
        _this.feedbackStr = _feedbackStr;
        _this.initSprite();
        _this.UpWindowData();
        _this.initMessage();
        return _this;
    }
    /**
     * 创建图形界面
     */
    feedbackTypeText.prototype.initSprite = function () {
        this.feedbackText = new egret.TextField();
        this.feedbackText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.feedbackText.textAlign = egret.HorizontalAlign.CENTER;
        this.feedbackText.width = Main.W * .8;
        this.feedbackText.height = Main.H;
        this.feedbackText.multiline = true;
        this.feedbackText.wordWrap = true;
        this.feedbackText.fontFamily = "微软雅黑";
        this.feedbackText.textColor = 0x000000;
        this.feedbackText.text = this.feedbackStr;
        this.feedbackText.size = Main.W / 20;
        this.addChild(this.feedbackText);
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    feedbackTypeText.prototype.UpWindowData = function () {
    };
    /**
     * 初始化事件消息
     */
    feedbackTypeText.prototype.initMessage = function () {
    };
    return feedbackTypeText;
}(BaseContainer));
__reflect(feedbackTypeText.prototype, "feedbackTypeText");
//# sourceMappingURL=feedbackTypeText.js.map