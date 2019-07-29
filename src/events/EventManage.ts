/**
 * @hushanjing 
 */
class EventManage extends egret.Event{
    /**
     * 播放结束
     */ 
    public static SOUND_COMPLETE: string = "sound_complete";
    /**
     * 停止的循环声音
     */ 
    public static SOUND_CYCLE_SOUND: string = "sound_cycle_sound";
    
    /**
     * 动画播放结束
     */ 
    public static STATE_ANIMATE_END: string = "stage_animate_end";
    
    public static STATE_MOVE_END:string="move_end";
    public data: any;
	public constructor(type:string,data:any=null) {
        super(type);
        this.data = data;
	}
}
