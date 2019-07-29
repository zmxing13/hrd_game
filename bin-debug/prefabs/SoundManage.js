var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SoundManage = (function (_super) {
    __extends(SoundManage, _super);
    function SoundManage(se) {
        var _this = _super.call(this) || this;
        SoundManage._sounds = [];
        return _this;
    }
    SoundManage.getInstance = function () {
        if (SoundManage._soundManage == null) {
            SoundManage._soundManage = new SoundManage(new SingletonEnforcer());
        }
        return SoundManage._soundManage;
    };
    /**
     * 播放声音
     * @param soundStr<string> 	声音资源的名字
     * @param loop<boolean>		是否重复播放
     */
    SoundManage.prototype.play = function (soundStr, loop) {
        if (loop === void 0) { loop = false; }
        var _sound;
        var _soundChannel;
        _sound = new egret.Sound();
        _sound = RES.getRes(soundStr);
        var tempSound;
        _soundChannel = _sound.play(0, (loop ? -1 : 1));
        tempSound = _soundChannel;
        SoundManage._sounds.push([_sound, tempSound, soundStr]);
        tempSound.addEventListener(egret.Event.SOUND_COMPLETE, this.currSoundComplete, this);
    };
    /**
     * 停止声音播放
     * @param soundStr<string> 		要停止的，声音资源的名字
     */
    SoundManage.prototype.stopSound = function (soundStr) {
        var tempSoundData;
        var soundId = 0;
        var stopSoundStr = "";
        for (var i = 0; i < SoundManage._sounds.length; i++) {
            if (SoundManage._sounds[i][2] == soundStr) {
                soundId = i;
                break;
            }
        }
        tempSoundData = SoundManage._sounds.splice(soundId, 1)[0];
        tempSoundData[1].stop();
        stopSoundStr = tempSoundData[2];
        tempSoundData = [];
        this.dispatchEvent(new EventManage(EventManage.SOUND_CYCLE_SOUND, stopSoundStr));
    };
    SoundManage.prototype.currSoundComplete = function (e) {
        e.currentTarget.removeEventListener(egret.Event.SOUND_COMPLETE, this.currSoundComplete, this);
        var soundId = 0;
        for (var i = 0; i < SoundManage._sounds.length; i++) {
            if (SoundManage._sounds[i][0] == e.currentTarget) {
                soundId = i;
                break;
            }
        }
        this.dispatchEvent(new EventManage(EventManage.SOUND_COMPLETE, SoundManage._sounds[soundId][2]));
        SoundManage._sounds.splice(soundId, 1);
    };
    return SoundManage;
}(egret.DisplayObjectContainer));
__reflect(SoundManage.prototype, "SoundManage");
var SingletonEnforcer = (function () {
    function SingletonEnforcer() {
    }
    return SingletonEnforcer;
}());
__reflect(SingletonEnforcer.prototype, "SingletonEnforcer");
//# sourceMappingURL=SoundManage.js.map