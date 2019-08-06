//反馈弹板类型3-播放闯关后动效
class feedbackTypeAnimation extends BaseContainer {
	private _public:PublicClass = new PublicClass();
	private displaySp:egret.Sprite;

	private timeSp:egret.Sprite;
	private whenTimeText:egret.TextField;
	public whenTimeNum:egret.TextField;
	public whenTimeUnit:egret.TextField;

	private stepSp:egret.Sprite;
	private whenStepText:egret.TextField;
	public whenStepNum:egret.TextField;
	public whenStepUnit:egret.TextField;

	private scoreSp:egret.Sprite;
	private scoreText:egret.TextField;
	public scoreNum:egret.TextField;

	private btnSp:egret.Sprite;
	public nextBtn:egret.Bitmap;
	public restBtn:egret.Bitmap;

	public constructor() {
		super();
		this.initSprite();
		this.UpWindowData();
		this.initMessage();
	}
	/**
	 * 1.成功
	 * 2.失败
	 */
	/**
     * 创建图形界面
     */
	private initSprite(){
		this.displaySp = new egret.Sprite();
		this.addChild(this.displaySp);

		this.timeSp = new egret.Sprite();
		this.displaySp.addChild(this.timeSp);

		this.stepSp = new egret.Sprite();
		this.displaySp.addChild(this.stepSp);
		
		this.scoreSp = new egret.Sprite();
		this.displaySp.addChild(this.scoreSp);

		this.btnSp = new egret.Sprite();
		this.displaySp.addChild(this.btnSp);
		

		//耗时
		this.whenTimeText = this._public.createTextByName('用时:',60,0x000000);
		this.timeSp.addChild(this.whenTimeText);
		this.whenTimeNum = this._public.createTextByName(DataBus.curTimeConsuming.toString(),90,0xFF0000);
		this.timeSp.addChild(this.whenTimeNum);
		this.whenTimeUnit = this._public.createTextByName('秒',60,0x000000);
		this.timeSp.addChild(this.whenTimeUnit);
		//耗步
		this.whenStepText = this._public.createTextByName('走了:',60,0x000000);
		this.stepSp.addChild(this.whenStepText);
		this.whenStepNum = this._public.createTextByName(DataBus.curTheyCount.toString(),90,0xFF0000);
		this.stepSp.addChild(this.whenStepNum);
		this.whenStepUnit = this._public.createTextByName('步',60,0x000000);
		this.stepSp.addChild(this.whenStepUnit);
		//得分
		this.scoreText = this._public.createTextByName('得分:',60,0x000000);
		this.scoreSp.addChild(this.scoreText);
		this.scoreNum = this._public.createTextByName(DataBus.curTheyCount.toString(),90,0xFF0000);
		this.scoreSp.addChild(this.scoreNum);

		this.nextBtn = this._public.createBitmapByName('img_nextBtn')
		this.btnSp.addChild(this.nextBtn);

		this.restBtn = this._public.createBitmapByName('img_restBtn')
		this.btnSp.addChild(this.restBtn);

	}

	/**
     * 界面布局 (尺寸发生变化时会执行)
	 * 【初始化时需要 图形创建后执行一次】  
     */
	public UpWindowData(){
		
		this.whenTimeText.x=0;
		this.whenTimeText.y=0;
		this.whenTimeNum.x=this.whenTimeText.x+this.whenTimeText.width*1.5;
		this.whenTimeNum.y=(this.whenTimeText.height - this.whenTimeNum.height)/2;
		this.whenTimeUnit.x=this.whenTimeNum.x+this.whenTimeNum.width*1.8;
		this.whenTimeUnit.y=0;
		this.timeSp.x=(this.width-this.timeSp.width)/2;
		this.timeSp.y=0;

		this.whenStepText.x=0;
		this.whenStepText.y=0;
		this.whenStepNum.x=this.whenStepText.x+this.whenStepText.width*1.5;
		this.whenStepNum.y=(this.whenStepText.height - this.whenStepNum.height)/2;
		this.whenStepUnit.x=this.whenStepNum.x+this.whenStepNum.width*1.8;
		this.whenStepUnit.y=0;
		this.stepSp.x=(this.width-this.timeSp.width)/2;
		this.stepSp.y=this.timeSp.y+this.timeSp.height*1.5;

		this.scoreText.x=0;
		this.scoreText.y=0;
		this.scoreNum.x=this.scoreText.x+this.scoreText.width*1.5;
		this.scoreNum.y=(this.scoreText.height - this.scoreNum.height)/2;
		this.scoreSp.x=this.stepSp.x;
		this.scoreSp.y=this.stepSp.y+this.stepSp.height*1.5;

		this.nextBtn.x=0;
		this.nextBtn.y=0;
		this.restBtn.x=this.nextBtn.x + this.restBtn.width*2;
		this.restBtn.y=0;
		this.btnSp.x=(this.width-this.btnSp.width)/2;
		this.btnSp.y=this.scoreSp.y+this.scoreSp.height*1.5;
		

	}

	/**
     * 初始化事件消息
     */
	private initMessage(){
		this.nextBtn.touchEnabled=true;
		this.restBtn.touchEnabled=true;
		this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.nextTouch,this);
		this.restBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.restTouch,this);
	}

	private nextTouch(e:TouchEvent){
		this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,'nextCheckpoint'));
	}

	private restTouch(e:TouchEvent){
		console.log('rest')
	}

}