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
//
var checkpointClass = (function (_super) {
    __extends(checkpointClass, _super);
    function checkpointClass() {
        var _this = _super.call(this) || this;
        _this.initSprite();
        _this.UpWindowData();
        _this.initMessage();
        return _this;
    }
    /**
     * 创建图形界面
     */
    checkpointClass.prototype.initSprite = function () {
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    checkpointClass.prototype.UpWindowData = function () {
    };
    /**
     * 初始化事件消息
     */
    checkpointClass.prototype.initMessage = function () {
    };
    return checkpointClass;
}(BaseContainer));
__reflect(checkpointClass.prototype, "checkpointClass");
//# sourceMappingURL=checkpointClass.js.map