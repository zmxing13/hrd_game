class SoundManage extends egret.DisplayObjectContainer {
	private static _soundManage:SoundManage



	/**
	 * 聲音倉庫，所有播放声音暂存处
	 */
	private static _sounds:Array<any>;
	public constructor(se:SingletonEnforcer) {
		super()
		SoundManage._sounds=[];
	}
	public static getInstance():SoundManage{
		if (SoundManage._soundManage == null){
            SoundManage._soundManage=new SoundManage(new SingletonEnforcer())
        }
		return SoundManage._soundManage
	}
	/**
	 * 播放声音
	 * @param soundStr<string> 	声音资源的名字
	 * @param loop<boolean>		是否重复播放
	 */
	public play(soundStr:string,loop=false):void{
		var _sound:egret.Sound;
		var _soundChannel:egret.SoundChannel;
		_sound=new egret.Sound();
		_sound=RES.getRes(soundStr);

		var tempSound:egret.SoundChannel
		_soundChannel=_sound.play(0,(loop?-1:1));
		tempSound=_soundChannel;

		SoundManage._sounds.push([_sound,tempSound,soundStr]);
		tempSound.addEventListener(egret.Event.SOUND_COMPLETE,this.currSoundComplete,this);
	}
	/**
	 * 停止声音播放
	 * @param soundStr<string> 		要停止的，声音资源的名字
	 */
	public stopSound(soundStr:string):void{
		var tempSoundData:Array<any>
		var soundId:number=0;
		var stopSoundStr:string="";
		for(var i:number=0; i<SoundManage._sounds.length; i++){
			if(SoundManage._sounds[i][2]==soundStr){
				soundId=i;
				break;
			}
		}
		
		tempSoundData=SoundManage._sounds.splice(soundId,1)[0]
		tempSoundData[1].stop();
		stopSoundStr=tempSoundData[2]
		tempSoundData=[];
		this.dispatchEvent(new EventManage(EventManage.SOUND_CYCLE_SOUND,stopSoundStr))
	}
	private currSoundComplete(e:egret.Event):void{
		e.currentTarget.removeEventListener(egret.Event.SOUND_COMPLETE,this.currSoundComplete,this);
		var soundId:number=0;
		for(var i:number=0; i<SoundManage._sounds.length; i++){
			if(SoundManage._sounds[i][0]==e.currentTarget){
				soundId=i;
				break;
			}
		}
		this.dispatchEvent(new EventManage(EventManage.SOUND_COMPLETE,SoundManage._sounds[soundId][2]))
		SoundManage._sounds.splice(soundId,1)
	}
}
class SingletonEnforcer {}