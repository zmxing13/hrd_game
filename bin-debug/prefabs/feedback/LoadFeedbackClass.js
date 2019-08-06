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
//Load弹框类
var LoadFeedbackClass = (function (_super) {
    __extends(LoadFeedbackClass, _super);
    /**
     * 弹板类型：
     * 1。默认状态： 提示，说明，以寸文字显示为主
     * 2。注册状态： 注册用户信息
     * 3。闯关反馈： 闯关成功/失败动效
     */
    function LoadFeedbackClass() {
        var _this = _super.call(this) || this;
        //反馈面板下标
        _this.feedbackName = '';
        _this.currDisplayTypeNum = 0;
        _this.feedbackBgWidth = 0;
        _this.feedbackBgHeight = 0;
        // //反馈版text内容
        _this.feedbackStr = '';
        if (LoadFeedbackClass.feedback) {
            throw new Error('已存在,无需创建');
        }
        LoadFeedbackClass.feedback = _this;
        _this.feedbackBgWidth = Main.W * .9;
        _this.feedbackBgHeight = Main.H / 1.5;
        _this.initSprite();
        _this.UpWindowData();
        _this.initMessage();
        _this.displaySp.alpha = 0;
        _this.displaySp.touchEnabled = false;
        return _this;
    }
    /**
     * 1.text
     * 2.login
     * 3.animmation
     * 4.rank
     */
    LoadFeedbackClass.prototype.setLable = function (val, boo, stateType) {
        if (boo === void 0) { boo = true; }
        if (stateType === void 0) { stateType = 1; }
        if (this.currDisplayObj) {
            console.log('清空弹板上一环节内容');
            this.currDisplayObj.DestroyOut(0, 0);
            console.log('清空弹板上一环节内容完成');
        }
        switch (stateType) {
            case 1:
                this.feedbackText = new feedbackTypeText(this.feedbackStr);
                this.feedbackText.x = (this.displaySp.width - this.feedbackText.width) / 2;
                this.feedbackText.y = (this.displaySp.height - this.feedbackText.height) / 2;
                this.displaySp.addChild(this.feedbackText);
                this.currDisplayObj = this.feedbackText;
                this.currDisplayTypeNum = 1;
                this.currDisplayObj.feedbackText.text = val;
                break;
            case 2:
                this.feedbackLogin = new feedbackTypeLogin();
                this.feedbackLogin.x = (this.displaySp.width - this.feedbackLogin.width) / 2;
                this.feedbackLogin.y = (this.displaySp.height - this.feedbackLogin.height) / 2;
                this.displaySp.addChild(this.feedbackLogin);
                this.currDisplayObj = this.feedbackLogin;
                this.currDisplayTypeNum = 2;
                break;
            case 3:
                this.feedbackAnimmation = new feedbackTypeAnimation();
                this.feedbackAnimmation.x = (this.displaySp.width - this.feedbackAnimmation.width) / 2;
                this.feedbackAnimmation.y = (this.displaySp.height - this.feedbackAnimmation.height) / 2;
                this.displaySp.addChild(this.feedbackAnimmation);
                this.currDisplayObj = this.feedbackAnimmation;
                this.currDisplayTypeNum = 3;
                this.feedbackAnimmation.addEventListener(EventEnumerate.SELECT_COMPLETE, this.feedbackAnimmationComplete, this);
                break;
            case 4:
                this.feedbackRank = new feedbackTypeRank();
                this.displaySp.addChild(this.feedbackRank);
                this.feedbackRank.x = (Main.W - this.displaySp.width) / 2;
                this.feedbackRank.y = (Main.H - this.displaySp.height) / 2;
                this.currDisplayObj = this.feedbackRank;
                this.currDisplayTypeNum = 4;
                this.feedbackRank.touchEnabled = false;
                break;
        }
        this.isHiddenOut(.3, 0, 1);
    };
    /**
     * 创建图形界面
     */
    LoadFeedbackClass.prototype.initSprite = function () {
        this.displaySp = new egret.Sprite();
        this.addChild(this.displaySp);
        this.bgColor = new egret.Sprite();
        this.bgColor.graphics.beginFill(0x000000, .3);
        this.bgColor.graphics.drawRect(0, 0, Main.W, Main.H);
        this.bgColor.graphics.endFill();
        this.displaySp.addChild(this.bgColor);
        this.feedbackBg = new egret.Sprite();
        this.feedbackBg.graphics.beginFill(0xffffff, 1);
        this.feedbackBg.graphics.drawRoundRect(0, 0, this.feedbackBgWidth, this.feedbackBgHeight, 50, 50);
        this.feedbackBg.graphics.endFill();
        this.displaySp.addChild(this.feedbackBg);
        this.shutDownSp = new egret.Sprite();
        this.shutDownSp.graphics.beginFill(0xD83838);
        this.shutDownSp.graphics.drawCircle(0, 0, Main.W / 20);
        this.shutDownSp.graphics.endFill();
        this.displaySp.addChild(this.shutDownSp);
        this.shutDownBtn = new egret.TextField();
        this.shutDownBtn.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.shutDownBtn.textAlign = egret.HorizontalAlign.CENTER;
        this.shutDownBtn.fontFamily = "微软雅黑";
        this.shutDownBtn.textColor = 0xffffff;
        this.shutDownBtn.text = '✖';
        this.shutDownBtn.size = Main.W / 20;
        this.shutDownSp.addChild(this.shutDownBtn);
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    LoadFeedbackClass.prototype.UpWindowData = function () {
        this.displaySp.x = 0;
        this.displaySp.y = 0;
        this.bgColor.graphics.clear();
        this.bgColor.graphics.beginFill(0x000000, .3);
        this.bgColor.graphics.drawRect(0, 0, Main.W, Main.H);
        this.bgColor.graphics.endFill();
        this.feedbackBg.graphics.clear();
        this.feedbackBg.width = this.feedbackBgWidth;
        this.feedbackBg.height = this.feedbackBgHeight;
        this.feedbackBg.graphics.beginFill(0xffffff, 1);
        this.feedbackBg.graphics.drawRoundRect((Main.W - this.feedbackBg.width) / 2, (Main.H - this.feedbackBg.height) / 2, this.feedbackBgWidth, this.feedbackBgHeight, 50, 50);
        this.feedbackBg.graphics.endFill();
        this.shutDownSp.x = (Main.W - this.feedbackBg.width) / 2 + this.feedbackBg.width;
        this.shutDownSp.y = (Main.H - this.feedbackBg.height) / 2;
        this.shutDownBtn.x = (this.shutDownSp.width - this.shutDownSp.width * 1.5) / 2;
        this.shutDownBtn.y = (this.shutDownSp.height - this.shutDownSp.height * 1.5) / 2;
        if (this.currDisplayObj != null) {
            this.currDisplayObj.x = (Main.W - this.currDisplayObj.width) / 2;
            this.currDisplayObj.y = (Main.H - this.currDisplayObj.height) / 2;
        }
    };
    /**
     * 初始化事件消息
     */
    LoadFeedbackClass.prototype.initMessage = function () {
        this.feedbackBg.touchEnabled = false;
        this.bgColor.touchEnabled = false;
        this.shutDownSp.touchEnabled = false;
        this.bgColor.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.shutDownSpTouch, this);
        this.shutDownSp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.shutDownSpTouch, this);
    };
    LoadFeedbackClass.prototype.shutDownSpTouch = function (e) {
        console.log('关闭shutdown');
        this.isHiddenOut(.3, 0, 0);
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, 'shutdownFeedback'));
    };
    LoadFeedbackClass.prototype.feedbackAnimmationComplete = function (e) {
        if (e.data == 'nextCheckpoint') {
            this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, 'nextCheckpoint'));
        }
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    LoadFeedbackClass.prototype.isHiddenOut = function (exitTime, waitTime, stateAlpha) {
        if (exitTime === void 0) { exitTime = 0.1; }
        if (waitTime === void 0) { waitTime = 0.1; }
        if (stateAlpha === void 0) { stateAlpha = 1; }
        egret.Tween.get(this.displaySp, {
            onChangeObj: this
        })
            .wait(waitTime * 1000)
            .to({ alpha: stateAlpha }, exitTime * 1000)
            .call(function () {
            if (stateAlpha == 0) {
                this.bgColor.touchEnabled = false;
                this.feedbackBg.touchEnabled = false;
                this.shutDownSp.touchEnabled = false;
                this.displaySp.touchEnabled = false;
                this.touchEnabled = false;
                if (this.feedbackAnimmation) {
                    this.feedbackAnimmation.nextBtn.touchEnabled = false;
                    this.feedbackAnimmation.restBtn.touchEnabled = false;
                }
            }
            else if (stateAlpha == 1) {
                this.bgColor.touchEnabled = true;
                this.feedbackBg.touchEnabled = true;
                this.shutDownSp.touchEnabled = true;
                this.displaySp.touchEnabled = true;
                this.touchEnabled = true;
                if (this.feedbackAnimmation) {
                    this.feedbackAnimmation.nextBtn.touchEnabled = true;
                    this.feedbackAnimmation.restBtn.touchEnabled = true;
                }
            }
        }, this);
    };
    return LoadFeedbackClass;
}(BaseContainer));
__reflect(LoadFeedbackClass.prototype, "LoadFeedbackClass");
//# sourceMappingURL=LoadFeedbackClass.js.map