var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
* 骨骼动画对象
*/
var DragonBonesAnimation = (function (_super) {
    __extends(DragonBonesAnimation, _super);
    function DragonBonesAnimation(name, armatureStr) {
        if (armatureStr === void 0) { armatureStr = "Armature"; }
        var _this = _super.call(this) || this;
        _this.factory = new dragonBones.EgretFactory();
        _this.addArmatureToFactory(_this.factory, name);
        _this.armature = _this.factory.buildArmature(armatureStr);
        _this.newObject = _this.armature.display;
        _this.addChild(_this.newObject);
        dragonBones.WorldClock.clock.add(_this.armature);
        return _this;
    }
    /**
    * 替换新图
    * @param oldName {string} 骨头名
    * @param textureName {string} 新图
    */
    DragonBonesAnimation.prototype.setNewTexture = function (oldName, textureName) {
        var W = 0;
        var H = 0;
        var _bone = this.armature.getBone(oldName);
        W = _bone.slot.display.texture.textureWidth;
        H = _bone.slot.display.texture.textureHeight;
        var _image = new egret.Bitmap();
        _image.texture = RES.getRes(textureName);
        _image.anchorOffsetX = _image.width / 2;
        _image.anchorOffsetY = _image.height / 2;
        //用image替换bone.display完成换装（注意bone.display的回收）
        _bone.slot.display = _image;
        return [W, H, _image];
    };
    /**
    * 换肤
    * @param boneSlotName {string} 骨头名
    * @param index {number} 图
    */
    DragonBonesAnimation.prototype.upSlotDisplay = function (boneSlotName, newSlotName) {
        var image = this.factory.getTextureDisplay(newSlotName); //创建新的图片用于换装
        var slot = this.armature.getSlot(boneSlotName); //找到包含要换装的图片的插槽
        slot.setDisplay(image); //替换插槽的显示对象
    };
    /**
        * 开始播放指定名称的动画。
        * 要播放的动画将经过指定时间的淡入过程，然后开始播放，同时之前播放的动画会经过相同时间的淡出过程。
        * @param animationName {string} 指定播放动画的名称.
        * @param fadeInTime {number} 动画淡入时间 (>= 0), 默认值：-1 意味着使用动画数据中的淡入时间.
        * @param duration {number} 动画播放时间。默认值：-1 意味着使用动画数据中的播放时间.
        * @param playTimes {number} 动画播放次数(0:循环播放, >=1:播放次数, NaN:使用动画数据中的播放时间), 默认值：NaN
   */
    DragonBonesAnimation.prototype.playAction = function (animationName, fadeInTime, duration, playTimes) {
        if (fadeInTime === void 0) { fadeInTime = 0; }
        if (duration === void 0) { duration = -1; }
        if (playTimes === void 0) { playTimes = NaN; }
        return this.armature.animation.gotoAndPlay(animationName, fadeInTime, duration, playTimes);
    };
    /**
    * 播放当前动画
    */
    DragonBonesAnimation.prototype.play = function () {
        this.armature.animation.play();
    };
    /**
    * 停止当前动画
    */
    DragonBonesAnimation.prototype.stop = function () {
        this.armature.animation.stop();
    };
    /**
    * 播放指定名称的动画并停止于某个时间点
    * @param animationName {string} 指定播放的动画名称.
    * @param time {number} 动画停止的绝对时间
    * @param normalizedTime {number} 动画停止的相对动画总时间的系数，这个参数和time参数是互斥的（例如 0.2：动画停止总时间的20%位置） 默认值：-1 意味着使用绝对时间。
    * @see dragonBones.AnimationState.
    */
    DragonBonesAnimation.prototype.gotoAndStop = function (animationName, time, normalizedTime) {
        if (time === void 0) { time = 0; }
        if (normalizedTime === void 0) { normalizedTime = -1; }
        this.armature.animation.gotoAndStop(animationName, time);
        return this.armature.animation.lastAnimationState;
    };
    Object.defineProperty(DragonBonesAnimation.prototype, "playing", {
        /**
        * 是否正在播放
        */
        get: function () {
            this._playing = this.armature.animation.isPlaying;
            return this._playing;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragonBonesAnimation.prototype, "lastAnimationState", {
        get: function () {
            return this.armature.animation.lastAnimationState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragonBonesAnimation.prototype, "isComplete", {
        /**
        * 最近播放的动画是否播放完成.
        */
        get: function () {
            this._isComplete = this.armature.animation.isCompleted;
            return this._isComplete;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 时间缩放倍数
     * @member {number} dragonBones.Animation#timeScale
     */
    DragonBonesAnimation.prototype.setTimeScale = function (member) {
        this.armature.animation.timeScale = member;
    };
    DragonBonesAnimation.prototype.addArmatureToFactory = function (factory, directory) {
        var skeletonData = RES.getRes(directory + "_ske_json");
        var textureData = RES.getRes(directory + "_tex_json");
        var texture = RES.getRes(directory + "_tex_png");
        texture.pixelHitTest = true;
        factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
        factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
    };
    return DragonBonesAnimation;
}(egret.DisplayObjectContainer));
__reflect(DragonBonesAnimation.prototype, "DragonBonesAnimation");
//# sourceMappingURL=DragonBonesAnimation.js.map