//玩家数据展示 耗时，步数
class PlayDataShow extends BaseContainer {

	private _public:PublicClass = new PublicClass();
	private displaySp:egret.Sprite;

	private timeImg:egret.Bitmap;
	private timeText:egret.TextField;
	
	private mapImg:egret.Bitmap;
	public mapText:egret.TextField;

	public currCheckpointText:egret.TextField;

	public timeNum:number=0;
	public mapNum:number=0;

	public currCheckpointNum:number=1;
	public totalCheckpointNum:number=DataBus.totalCheckpointNum;

	private nextImg:egret.Bitmap;
	
	private timer:egret.Timer;

	public constructor() {
		super();
		this.initSprite();
		this.UpWindowData();
		this.initMessage();
	}

	/**
     * 创建图形界面
     */
	private initSprite(){
		this.displaySp = new egret.Sprite();
		this.addChild(this.displaySp);

		this.timeImg = this._public.createBitmapByName('img_game_time');
		this.displaySp.addChild(this.timeImg);

		this.timeText = this._public.createTextByName(this.timeNum.toString()+ ' 秒',90);
		this.displaySp.addChild(this.timeText);

		this.mapImg = this._public.createBitmapByName('img_game_map');
		this.displaySp.addChild(this.mapImg);

		this.mapText = this._public.createTextByName(this.mapNum.toString()+ ' 步',90);
		this.displaySp.addChild(this.mapText);

		this.currCheckpointText = this._public.createTextByName('关卡 '+this.currCheckpointNum.toString()+ '/'+
																this.totalCheckpointNum.toString()
																,90);
		this.displaySp.addChild(this.currCheckpointText);

		this.nextImg = this._public.createBitmapByName('img_game_win');
		this.displaySp.addChild(this.nextImg);
		
		this.timer = new egret.Timer(1000,0);

	}

	/**
     * 界面布局 (尺寸发生变化时会执行)
	 * 【初始化时需要 图形创建后执行一次】  
     */
	public UpWindowData(){
		
		this.timeImg.x = 0;
		this.timeImg.y = 0;

		this.timeText.x = this.timeImg.x + this.timeImg.width*1.3;
		this.timeText.y = this.timeImg.y + this.timeImg.height/2 -(this.timeText.height/2);

		this.mapImg.x = this.timeText.x + this.mapImg.width*2;
		this.mapImg.y = this.timeImg.y ;

		this.mapText.x = this.mapImg.x + this.mapImg.width*1.3;
		this.mapText.y = this.mapImg.y + this.mapImg.height/2 -(this.mapText.height/2);

		this.currCheckpointText.x = this.mapText.x + this.mapText.width*2;
		this.currCheckpointText.y = this.mapText.y + this.mapText.height/2 -(this.currCheckpointText.height/2);

		this.nextImg.x = this.currCheckpointText.x + this.currCheckpointText.width *1.5;
		this.nextImg.y = this.currCheckpointText.y ;
		
	}

	/**
     * 初始化事件消息
     */
	private initMessage(){
		this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
		this.nextImg.touchEnabled=true;
		this.nextImg.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.nextImgTouch,this)		
	}

	private nextImgTouch(e:egret.TouchEvent){
		this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,'nextCheckpoint'));
	}

	private timerFunc(){
        // console.log("计时");
		this.timeNum++;
		this.timeText.text=this.timeNum.toString()+ ' 秒';
		DataBus.curTimeConsuming = this.timeNum;
		
    }
    private timerComFunc(){
        console.log("计时结束");
    }

	//开始计时
	public startTime(){
		this.timer.start();
	}
	//停止计时
	public stopTime(){
		this.timer.stop();
	}
}