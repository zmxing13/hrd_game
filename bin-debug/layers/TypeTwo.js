var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TypeTwo = (function (_super) {
    __extends(TypeTwo, _super);
    function TypeTwo(count) {
        var _this = _super.call(this) || this;
        _this.countIndex = 0;
        // console.log("方格类型2");
        _this.countIndex = count;
        _this.init_Sprite();
        _this.upPosition();
        _this.initEvent();
        return _this;
    }
    /**
     * 初始化对象
     */
    TypeTwo.prototype.init_Sprite = function () {
        this.img_content = new egret.Bitmap();
        this.img_content.width = 80;
        this.img_content.height = 160;
        if (this.countIndex == 1) {
            this.img_content.texture = RES.getRes("img_two_1_png");
        }
        ;
        if (this.countIndex == 2) {
            this.img_content.texture = RES.getRes("img_two_2_png");
        }
        ;
        if (this.countIndex == 3) {
            this.img_content.texture = RES.getRes("img_two_3_png");
        }
        ;
        if (this.countIndex == 4) {
            this.img_content.texture = RES.getRes("img_two_4_png");
        }
        ;
        this.addChild(this.img_content);
    };
    /**
     * 位置更新
     */
    TypeTwo.prototype.upPosition = function () {
    };
    /**
     * 初始化事件
     */
    TypeTwo.prototype.initEvent = function () {
    };
    /**
     * 刷新事件
     */
    TypeTwo.prototype.resetEvent = function () {
    };
    return TypeTwo;
}(ImgPublicClass));
__reflect(TypeTwo.prototype, "TypeTwo");
//# sourceMappingURL=TypeTwo.js.map