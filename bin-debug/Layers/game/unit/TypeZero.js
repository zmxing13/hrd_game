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
var TypeZero = (function (_super) {
    __extends(TypeZero, _super);
    function TypeZero(imgType) {
        if (imgType === void 0) { imgType = 'tra'; }
        var _this = _super.call(this) || this;
        _this.imgType = "";
        _this.imgType = imgType;
        // console.log("方格类型0");
        _this.init_Sprite();
        _this.upPosition();
        _this.initEvent();
        return _this;
    }
    /**
     * 初始化对象
     */
    TypeZero.prototype.init_Sprite = function () {
        this.img_content = new egret.Bitmap();
        this.img_content.width = 80;
        this.img_content.height = 80;
        this.img_content.texture = RES.getRes("img_" + this.imgType + "_zero" + '_png');
        this.addChild(this.img_content);
    };
    /**
     * 位置更新
     */
    TypeZero.prototype.upPosition = function () {
    };
    /**
     * 初始化事件
     */
    TypeZero.prototype.initEvent = function () {
    };
    /**
     * 刷新事件
     */
    TypeZero.prototype.resetEvent = function () {
    };
    return TypeZero;
}(ImageBasisClass));
__reflect(TypeZero.prototype, "TypeZero");
//# sourceMappingURL=TypeZero.js.map