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
//Layer_gameClass 
var LayerGameClass = (function (_super) {
    __extends(LayerGameClass, _super);
    function LayerGameClass() {
        var _this = _super.call(this) || this;
        _this.initSprite();
        _this.UpWindowData();
        _this.initMessage();
        return _this;
    }
    /**
     * 创建图形界面
     */
    LayerGameClass.prototype.initSprite = function () {
        // this.soundExample = new SoundExampleClass('bg',0);
        // this.addChildAt(this.soundExample,1);
        // this.soundExample.playSound();
        this.startPage = new StartGamePage();
        this.addChildAt(this.startPage, 1);
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    LayerGameClass.prototype.UpWindowData = function () {
    };
    /**
     * 初始化事件消息
     */
    LayerGameClass.prototype.initMessage = function () {
        this.startPage.addEventListener(EventEnumerate.SELECT_COMPLETE, this.startPageComplete, this);
    };
    LayerGameClass.prototype.startPageComplete = function (e) {
        // console.log('数据:', e.data);
        this.startPage.DestroyOut();
        this.gameLayout = new GameStageLayout();
        this.addChildAt(this.gameLayout, 0);
    };
    return LayerGameClass;
}(BaseContainer));
__reflect(LayerGameClass.prototype, "LayerGameClass");
//# sourceMappingURL=LayerGameClass.js.map