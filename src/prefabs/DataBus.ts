//数据池
class DataBus extends egret.DisplayObjectContainer{
    /**
     * 当前关卡
    */
    public static _curCheckpointNum:number=0;
	/**
     * 当前关卡数据
    */
    public static _curCheckpointDataArr:Array<any>;
	_curCheckpointDataArr=[];
    /**
     * 总关卡数
     */
    public static totalCheckpointNum:number=0;
    
	/**
	 * 关卡json数据对象
	 */
    public static checkpointJsonDataObject:Object;
    /**
     * 耗时
     */
    public static totalTimeConsuming:number=0;  //总耗时
    public static curTimeConsuming:number=0;    //当前关卡耗时
    /**
     * 步数
     */
    public static totalTheyCount:number=0;      //总步数
    public static curTheyCount:number=0;        //当前关卡步数
    
    public static scaleNum:number=0;

    /**
     * 排行榜数组
     */
    public static rankDataArr:Array<any>;
    

	public constructor() {
		super();
	}
}


