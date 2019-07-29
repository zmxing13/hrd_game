//////////////////////////////////////////////////////////////////////////////////////
//
// 加载进度
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this._newW = 0;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this._bg = new egret.Sprite();
        this._bg.graphics.beginFill(0x000000, 1);
        this._bg.graphics.drawRect(0, 0, Main.W, Main.H);
        this._bg.graphics.endFill();
        this.addChild(this._bg);
        this._bg.width = Main.W;
        this._bg.height = Main.H;
        this._bar = new egret.Sprite();
        this._bar.graphics.beginFill(0x009966, 1);
        this._bar.graphics.drawRect(0, 0, 1, 5);
        this._bar.graphics.endFill();
        this.addChild(this._bar);
    };
    LoadingUI.prototype.setProgress = function (current, total) {
        this._newW = Main.W * current / total;
        this._bar.graphics.clear();
        this._bar.graphics.beginFill(0x009966, 1);
        this._bar.graphics.drawRect(0, 0, this._newW, 5);
        this._bar.graphics.endFill();
        this._bar.y = Main.H - 5;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI");
//# sourceMappingURL=LoadingUI.js.map