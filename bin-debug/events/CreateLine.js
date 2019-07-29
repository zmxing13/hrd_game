var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var CreateLine = (function (_super) {
    __extends(CreateLine, _super);
    function CreateLine() {
        return _super.call(this) || this;
        //  console.log("CreateLine");
    }
    CreateLine.prototype.createGridHander = function (Xnumber, Ynumber) {
        var num, length;
        length = 80 * (Ynumber - 1);
        for (var i = 0; i < Xnumber; i++) {
            num = 80 * i;
            this.drawLineHander(num, length, "x");
        }
        length = 80 * (Xnumber - 1);
        for (i = 0; i < Ynumber; i++) {
            num = 80 * i;
            this.drawLineHander(num, length, "y");
        }
    };
    CreateLine.prototype.drawLineHander = function (numA, length, str) {
        var myShape = new egret.Shape();
        myShape.graphics.lineStyle(3, 0x5C3B14, 1);
        if (str == "x") {
            myShape.graphics.moveTo(numA, 0); //将画笔移动到起点位置
            myShape.graphics.lineTo(numA, length); //从起点位置划线到终点
        }
        if (str == "y") {
            myShape.graphics.moveTo(0, numA); //将画笔移动到起点位置
            myShape.graphics.lineTo(length, numA); //从起点位置划线到终点
        }
        myShape.graphics.endFill();
        this.addChild(myShape);
    };
    return CreateLine;
}(egret.DisplayObjectContainer));
__reflect(CreateLine.prototype, "CreateLine");
//# sourceMappingURL=CreateLine.js.map