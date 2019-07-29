var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ImgPublicClass = (function (_super) {
    __extends(ImgPublicClass, _super);
    function ImgPublicClass() {
        var _this = _super.call(this) || this;
        /**
         * 给当前对象赋值，值是二维数组的下标
         */
        _this.indexNums = new Array();
        _this.initIndex = new Array();
        /**
         * 给当前对象添加id，值是二维数组的数
         */
        _this.id = 0;
        /**
         * 给当前对象添加布尔值
         */
        _this.boo = false;
        /**
         * 记录当前对象x位置信息
         */
        _this.ox = 0;
        /**
         * 记录当前对象y位置信息
         */
        _this.oy = 0;
        _this.typeNumber = 0;
        return _this;
        // console.log("图片共有属性类");
    }
    return ImgPublicClass;
}(egret.DisplayObjectContainer));
__reflect(ImgPublicClass.prototype, "ImgPublicClass");
//# sourceMappingURL=ImgPublicClass.js.map