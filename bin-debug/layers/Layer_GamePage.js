var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Layer_GamePage = (function (_super) {
    __extends(Layer_GamePage, _super);
    function Layer_GamePage() {
        var _this = _super.call(this) || this;
        // console.log("game");
        _this.init_Sprite();
        _this.upPosition();
        _this.initEvent();
        return _this;
    }
    /**
     * 初始化对象
     */
    Layer_GamePage.prototype.init_Sprite = function () {
        this._layout = new StageLayout();
        this.addChild(this._layout);
    };
    /**
     * 位置更新
     */
    Layer_GamePage.prototype.upPosition = function () {
        // this._layout.scaleX = Main.scaleNum + .5;
        // this._layout.scaleY = Main.scaleNum + .5;
        // this._layout.x = (Main.W - this._layout.width)/2;
        // this._layout.y = (Main.H - this._layout.height)/2;
        this._layout.upPosition();
    };
    /**
     * 初始化事件
     */
    Layer_GamePage.prototype.initEvent = function () {
    };
    /**
     * 刷新事件
     */
    Layer_GamePage.prototype.resetEvent = function () {
        this._layout.resetEvent();
    };
    return Layer_GamePage;
}(egret.DisplayObjectContainer));
__reflect(Layer_GamePage.prototype, "Layer_GamePage");
//# sourceMappingURL=Layer_GamePage.js.map