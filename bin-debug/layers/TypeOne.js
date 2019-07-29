var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TypeOne = (function (_super) {
    __extends(TypeOne, _super);
    function TypeOne() {
        var _this = _super.call(this) || this;
        // console.log("方格类型1");
        _this.init_Sprite();
        _this.upPosition();
        _this.initEvent();
        return _this;
    }
    /**
     * 初始化对象
     */
    TypeOne.prototype.init_Sprite = function () {
        this.img_content = new egret.Bitmap();
        this.img_content.width = 80;
        this.img_content.height = 80;
        this.img_content.texture = RES.getRes("img_one_png");
        this.addChild(this.img_content);
    };
    /**
     * 位置更新
     */
    TypeOne.prototype.upPosition = function () {
    };
    /**
     * 初始化事件
     */
    TypeOne.prototype.initEvent = function () {
    };
    /**
     * 刷新事件
     */
    TypeOne.prototype.resetEvent = function () {
    };
    return TypeOne;
}(ImgPublicClass));
__reflect(TypeOne.prototype, "TypeOne");
//# sourceMappingURL=TypeOne.js.map