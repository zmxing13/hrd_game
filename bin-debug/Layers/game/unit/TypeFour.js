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
var TypeFour = (function (_super) {
    __extends(TypeFour, _super);
    function TypeFour(count, imgType) {
        if (imgType === void 0) { imgType = 'tra'; }
        var _this = _super.call(this) || this;
        _this.countIndex = 0;
        _this.imgType = "";
        // console.log("方格类型4");
        _this.countIndex = count;
        _this.imgType = imgType;
        _this.init_Sprite();
        _this.upPosition();
        _this.initEvent();
        return _this;
    }
    /**
     * 初始化对象
     */
    TypeFour.prototype.init_Sprite = function () {
        this.img_content = new egret.Bitmap();
        this.img_content.width = 160;
        this.img_content.height = 160;
        this.img_content.texture = RES.getRes("img_" + this.imgType + "_four_" + this.countIndex + '_png');
        this.addChild(this.img_content);
    };
    /**
     * 位置更新
     */
    TypeFour.prototype.upPosition = function () {
    };
    /**
     * 初始化事件
     */
    TypeFour.prototype.initEvent = function () {
    };
    /**
     * 刷新事件
     */
    TypeFour.prototype.resetEvent = function () {
    };
    return TypeFour;
}(ImageBasisClass));
__reflect(TypeFour.prototype, "TypeFour");
//# sourceMappingURL=TypeFour.js.map