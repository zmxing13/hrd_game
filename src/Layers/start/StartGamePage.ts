//游戏开始页
class StartGamePage extends BaseContainer {
	private _public:PublicClass = new PublicClass(); 
	private displaySp:egret.Sprite;
	private bg:egret.Bitmap;
	private sky:egret.Bitmap;
	private ground:egret.Bitmap;
	private stone:egret.Bitmap;
	private vsbg:egret.Bitmap;
	private vs:egret.Bitmap;
	private cao:egret.Bitmap;
	private guan:egret.Bitmap;
	private startBtn:egret.Bitmap;
	private rankBtn:egret.Bitmap;
	private gameInstruc:egret.Bitmap;

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

		this.bg = this._public.createBitmapByName('img_start_bg');
		this.displaySp.addChild(this.bg);

		this.sky = this._public.createBitmapByName('img_start_sky');
		this.displaySp.addChild(this.sky);

		this.ground = this._public.createBitmapByName('img_start_ground');
		this.displaySp.addChild(this.ground);

		this.stone = this._public.createBitmapByName('img_start_stone');
		this.displaySp.addChild(this.stone);

		this.cao = this._public.createBitmapByName('img_start_cao');
		this.displaySp.addChild(this.cao);

		this.guan = this._public.createBitmapByName('img_start_guan');
		this.displaySp.addChild(this.guan);

		this.vsbg = this._public.createBitmapByName('img_start_vsBg');
		this.displaySp.addChild(this.vsbg);

		this.vs = this._public.createBitmapByName('img_start_vs');
		this.displaySp.addChild(this.vs);

		this.startBtn = this._public.createBitmapByName('img_start_startBtn');
		this.displaySp.addChild(this.startBtn);

		this.rankBtn = this._public.createBitmapByName('img_start_rankBtn');
		this.displaySp.addChild(this.rankBtn);

		this.gameInstruc = this._public.createBitmapByName('img_start_gameInstructions');
		this.displaySp.addChild(this.gameInstruc);

	}

	/**
     * 界面布局 (尺寸发生变化时会执行)
	 * 【初始化时需要 图形创建后执行一次】  
     */
	public UpWindowData(){
       this.bg.x=this.bg.y=0;
       this.bg.width=Main.W;
       this.bg.height=Main.H;

       this.sky.width=this.bg.width;
	   this.sky.x = (this.bg.width - this.sky.width) /2;
	   this.sky.y = (this.bg.height - this.sky.height) /1.5;

	   this.ground.x = (this.bg.width - this.ground.width) /2;
	   this.ground.y = this.sky.y + this.sky.height - (this.ground.height/3);

	   this.stone.x = this.sky.x;
	   this.stone.y = this.sky.y;

	   this.cao.x = 0;
	   this.cao.y = this.bg.height - this.cao.height/1.2;

	   this.guan.x = this.bg.width - this.guan.width;
	   this.guan.y = -this.guan.height/6;

	   this.vsbg.x = (this.bg.width - this.vsbg.width) /2;
	   this.vsbg.height = this.bg.height;

	   this.vs.x = (this.bg.width - this.vs.width) /2;
	   this.vs.y = (this.bg.height - this.vs.height) /2;

	   this.startBtn.x=(this.bg.width - this.startBtn.width) /2;
	   this.startBtn.y=this.vs.y + this.vs.height;

	   this.rankBtn.x = this.bg.width - this.rankBtn.width * 1.5;
	   this.rankBtn.y = this.startBtn.y;

	   this.gameInstruc.x = this.bg.width - this.gameInstruc.width * 1.5;
	   this.gameInstruc.y = this.rankBtn.y + this.gameInstruc.height * 1.5;
	}

	/**
     * 初始化事件消息
     */
	private initMessage(){
		this.startBtn.touchEnabled=true;
		this.rankBtn.touchEnabled=true;
		this.gameInstruc.touchEnabled=true;
		this.startBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.startBtnTouch,this)
		this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.rankBtnTouch,this)
		this.gameInstruc.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.gameInstrucTouch,this)
	}

	private startBtnTouch(e:egret.TouchEvent){
		// console.log('start game');
		this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,'startGame'));
	}

	private rankBtnTouch(e:egret.TouchEvent){
		console.log('rank');
		//获取排行榜数据用户接口
		LoadFeedbackClass.feedback.setLable('',true,2);
	}

	//获取排行榜数据完成后，显示
	private getRankDataDone(){
		/**
		*把数据库传递来的数据一一渲染至舞台
		* 1.处理排行榜数据，排序，渲染显示前一百名
		*/
		
	}

	private gameInstrucTouch(e:egret.TouchEvent){
		console.log('start instrcu');
		LoadFeedbackClass.feedback.setLable('游戏说明文字内容\n\n游戏说明文字内容');
	}
}