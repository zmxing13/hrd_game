/**
* 骨骼动画对象
*/
class DragonBonesAnimation extends egret.DisplayObjectContainer{
    /**
    * 骨骼动画系统的核心。他包含需要加到场景的显示对象，所有的骨骼逻辑和动画系统
    */
    public armature: dragonBones.Armature;
    private factory: dragonBones.EgretFactory;
    private newObject;

    private _playing: boolean;
    private _isComplete: boolean;
    private _lastAnimationState: dragonBones.AnimationState;
    public constructor(name: string,armatureStr:string="Armature"){
        super();
        this.factory = new dragonBones.EgretFactory();
        this.addArmatureToFactory(this.factory,name);
        this.armature = this.factory.buildArmature(armatureStr);
        this.newObject = this.armature.display;
        this.addChild(this.newObject);
        dragonBones.WorldClock.clock.add(this.armature);
    }
    /**
    * 替换新图
    * @param oldName {string} 骨头名
    * @param textureName {string} 新图
    */
    public setNewTexture(oldName: string,textureName: string): Array<any> {
        var W: number = 0;
        var H: number = 0;
        var _bone: dragonBones.Bone = this.armature.getBone(oldName);
        W=_bone.slot.display.texture.textureWidth;
        H=_bone.slot.display.texture.textureHeight;
        
        var _image: egret.Bitmap = new egret.Bitmap();
        _image.texture = RES.getRes(textureName);
        _image.anchorOffsetX = _image.width/2;
        _image.anchorOffsetY = _image.height/2;
        //用image替换bone.display完成换装（注意bone.display的回收）
        _bone.slot.display = _image;
        return [W,H,_image];
    }
    /**
    * 换肤
    * @param boneSlotName {string} 骨头名
    * @param index {number} 图
    */
    public upSlotDisplay(boneSlotName: string,newSlotName: string):void{
        var image = this.factory.getTextureDisplay(newSlotName);//创建新的图片用于换装
        var slot: dragonBones.Slot = this.armature.getSlot(boneSlotName);//找到包含要换装的图片的插槽
        slot.setDisplay(image);//替换插槽的显示对象
    }
     /**
         * 开始播放指定名称的动画。
         * 要播放的动画将经过指定时间的淡入过程，然后开始播放，同时之前播放的动画会经过相同时间的淡出过程。
         * @param animationName {string} 指定播放动画的名称.
         * @param fadeInTime {number} 动画淡入时间 (>= 0), 默认值：-1 意味着使用动画数据中的淡入时间.
         * @param duration {number} 动画播放时间。默认值：-1 意味着使用动画数据中的播放时间.
         * @param playTimes {number} 动画播放次数(0:循环播放, >=1:播放次数, NaN:使用动画数据中的播放时间), 默认值：NaN
    */
    public playAction(animationName: string,fadeInTime: number = 0,duration: number = -1,playTimes: number = NaN): dragonBones.AnimationState {
        return this.armature.animation.gotoAndPlay(animationName, fadeInTime, duration, playTimes);
    }
    /**
    * 播放当前动画
    */
    public play(): void {
        this.armature.animation.play();
    }
    /**
    * 停止当前动画
    */
    public stop(): void {
        this.armature.animation.stop();
    }
    /**
    * 播放指定名称的动画并停止于某个时间点
    * @param animationName {string} 指定播放的动画名称.
    * @param time {number} 动画停止的绝对时间
    * @param normalizedTime {number} 动画停止的相对动画总时间的系数，这个参数和time参数是互斥的（例如 0.2：动画停止总时间的20%位置） 默认值：-1 意味着使用绝对时间。
    * @see dragonBones.AnimationState.
    */
    public gotoAndStop(animationName: string, time: number=0, normalizedTime: number=-1):dragonBones.AnimationState{
        this.armature.animation.gotoAndStop(animationName,time);
        return this.armature.animation.lastAnimationState;
    }
    /**
    * 是否正在播放
    */
    public get playing(): boolean {
        this._playing = this.armature.animation.isPlaying;
        return this._playing;
    }
    public get lastAnimationState():dragonBones.AnimationState{
        return this.armature.animation.lastAnimationState;
    }
    /**
    * 最近播放的动画是否播放完成.
    */
    public get isComplete():boolean{ 
        this._isComplete = this.armature.animation.isCompleted;
        return this._isComplete;
    }
    /**
     * 时间缩放倍数
     * @member {number} dragonBones.Animation#timeScale
     */
    public setTimeScale(member: number): void {
        this.armature.animation.timeScale = member;
    }
    private addArmatureToFactory(factory: dragonBones.EgretFactory,directory: string) {
        var skeletonData = RES.getRes(directory + "_ske_json");
        var textureData = RES.getRes(directory+"_tex_json");
        var texture = RES.getRes(directory+"_tex_png");
        texture.pixelHitTest=true;
        factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
        factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
    }
}