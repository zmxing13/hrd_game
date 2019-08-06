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
var SoundExampleClass = (function (_super) {
    __extends(SoundExampleClass, _super);
    /**
     * _soundName:	播放音频路径+名称
     * loop:		循环次数
     */
    function SoundExampleClass(_soundName, _loop) {
        if (_loop === void 0) { _loop = 1; }
        var _this = _super.call(this) || this;
        _this.soundName = _soundName;
        _this.loop = _loop;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddtoStage, _this);
        return _this;
    }
    SoundExampleClass.prototype.onAddtoStage = function () {
        this.startLoad();
    };
    SoundExampleClass.prototype.startLoad = function () {
        //创建 URLLoader 对象
        var loader = new egret.URLLoader();
        //设置加载方式为声音
        loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
        //添加加载完成侦听
        loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        //音频资源放在resource文件夹下
        var url = "resource/assets/mp3/" + this.soundName + ".mp3";
        var request = new egret.URLRequest(url);
        //开始加载
        loader.load(request);
    };
    SoundExampleClass.prototype.onLoadComplete = function (event) {
        var loader = event.target;
        //获取加载到的 Sound 对象
        var sound = loader.data;
        this.sound = sound;
    };
    //播放音频
    SoundExampleClass.prototype.playSound = function () {
        var channel = this.soundChannel;
        channel = this.sound.play(0, -1);
        console.log(this.sound.length);
        channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
        this.soundChannel = channel;
    };
    //停止音频
    SoundExampleClass.prototype.stopSound = function () {
        var channel = this.soundChannel;
        channel.stop();
        this.soundChannel = null;
    };
    //音频播放完成
    SoundExampleClass.prototype.onSoundComplete = function (event) {
        console.log("音频播放完成");
    };
    return SoundExampleClass;
}(egret.DisplayObjectContainer));
__reflect(SoundExampleClass.prototype, "SoundExampleClass");
//# sourceMappingURL=SoundExampleClass.js.map