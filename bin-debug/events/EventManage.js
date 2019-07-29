var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @hushanjing
 */
var EventManage = (function (_super) {
    __extends(EventManage, _super);
    function EventManage(type, data) {
        if (data === void 0) { data = null; }
        var _this = _super.call(this, type) || this;
        _this.data = data;
        return _this;
    }
    return EventManage;
}(egret.Event));
/**
 * 播放结束
 */
EventManage.SOUND_COMPLETE = "sound_complete";
/**
 * 停止的循环声音
 */
EventManage.SOUND_CYCLE_SOUND = "sound_cycle_sound";
/**
 * 动画播放结束
 */
EventManage.STATE_ANIMATE_END = "stage_animate_end";
EventManage.STATE_MOVE_END = "move_end";
__reflect(EventManage.prototype, "EventManage");
//# sourceMappingURL=EventManage.js.map