class SoundExampleClass extends egret.DisplayObjectContainer {

	private sound:egret.Sound;
    private soundChannel:egret.SoundChannel;
	private soundName:string;
	private loop:number;
	
	/**
	 * _soundName:	播放音频路径+名称
	 * loop:		循环次数 
	 */
	public constructor(_soundName:string,_loop:number=1) {
		super();
		this.soundName = _soundName;
		this.loop = _loop;
		this.once(egret.Event.ADDED_TO_STAGE,this.onAddtoStage,this);
	}
	private onAddtoStage() {
        this.startLoad();
    }
	private startLoad():void {
        //创建 URLLoader 对象
        var loader:egret.URLLoader = new egret.URLLoader();
        //设置加载方式为声音
        loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
        //添加加载完成侦听
        loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        //音频资源放在resource文件夹下
        var url:string = "resource/assets/mp3/"+this.soundName+".mp3";
        var request:egret.URLRequest = new egret.URLRequest(url);
        //开始加载
        loader.load(request);
    }
    private onLoadComplete(event:egret.Event):void {
        var loader:egret.URLLoader = <egret.URLLoader>event.target;
        //获取加载到的 Sound 对象
        var sound:egret.Sound = <egret.Sound>loader.data;
        this.sound = sound;
    }
	//播放音频
	public playSound(){
		var channel:egret.SoundChannel = this.soundChannel;
		channel = this.sound.play(0,-1);
        console.log(this.sound.length);
        channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
        this.soundChannel = channel;
	}
	//停止音频
	public stopSound(){
		var channel:egret.SoundChannel = this.soundChannel;
		channel.stop();
		this.soundChannel = null;
	}
	//音频播放完成
    private onSoundComplete(event:egret.Event):void {
        console.log("音频播放完成");
    }
}


