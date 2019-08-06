
//Load弹框类
class LoadFeedbackClass extends BaseContainer {
	//反馈板
	public static feedback:LoadFeedbackClass;
	//显示容器
	private displaySp:egret.Sprite;

	private bgColor:egret.Sprite;
	//反馈面板下标
	public feedbackName:string='';
	//反馈背景框
	private feedbackBg:egret.Sprite;
	//关闭按钮容器
	private shutDownSp:egret.Sprite;
	//关闭按钮✖
	private shutDownBtn:egret.TextField;
	//当前显示类型
	private currDisplayObj;
	private currDisplayTypeNum:number=0;

	//1.文字
	private feedbackText:feedbackTypeText;
	//2.注册
	private feedbackLogin:feedbackTypeLogin;
	//3.闯关状态
	private feedbackAnimmation:feedbackTypeAnimation;
	//4.排行
	private feedbackRank:feedbackTypeRank;
	
	private feedbackBgWidth:number=0;
	private feedbackBgHeight:number=0;

	// //反馈版text内容
	private feedbackStr:string='';

	/**
	 * 弹板类型：
	 * 1。默认状态： 提示，说明，以寸文字显示为主
	 * 2。注册状态： 注册用户信息
	 * 3。闯关反馈： 闯关成功/失败动效
	 */
	public constructor() {
		super();
		if(LoadFeedbackClass.feedback){
			throw new Error('已存在,无需创建');
		}
		LoadFeedbackClass.feedback = this;
		
		this.feedbackBgWidth = Main.W*.9;
		this.feedbackBgHeight = Main.H/1.5;

		this.initSprite();
		this.UpWindowData();
		this.initMessage();
		this.displaySp.alpha=0;
		this.displaySp.touchEnabled=false;
		
	}
	/**
	 * 1.text
	 * 2.login
	 * 3.animmation
	 * 4.rank
	 */
	public setLable(val:string,boo:boolean=true,stateType:number=1){
		if(this.currDisplayObj){
			console.log('清空弹板上一环节内容');
			this.currDisplayObj.DestroyOut(0,0)
			console.log('清空弹板上一环节内容完成');
		}
		
		switch(stateType){
			case 1:
				this.feedbackText = new feedbackTypeText(this.feedbackStr);
				this.feedbackText.x = (this.displaySp.width - this.feedbackText.width)/2;
				this.feedbackText.y = (this.displaySp.height - this.feedbackText.height)/2;
				this.displaySp.addChild(this.feedbackText);
				this.currDisplayObj = this.feedbackText;
				this.currDisplayTypeNum=1;
				this.currDisplayObj.feedbackText.text= val;
			break;
			case 2:
				this.feedbackLogin = new feedbackTypeLogin();
				this.feedbackLogin.x = (this.displaySp.width - this.feedbackLogin.width)/2;
				this.feedbackLogin.y = (this.displaySp.height - this.feedbackLogin.height)/2;
				this.displaySp.addChild(this.feedbackLogin);
				this.currDisplayObj = this.feedbackLogin;
				this.currDisplayTypeNum=2;
			break;
			case 3:
				this.feedbackAnimmation = new feedbackTypeAnimation();
				this.feedbackAnimmation.x = (this.displaySp.width - this.feedbackAnimmation.width)/2;
				this.feedbackAnimmation.y = (this.displaySp.height - this.feedbackAnimmation.height)/2;
				this.displaySp.addChild(this.feedbackAnimmation);
				this.currDisplayObj = this.feedbackAnimmation;
				this.currDisplayTypeNum=3;
				this.feedbackAnimmation.addEventListener(EventEnumerate.SELECT_COMPLETE,this.feedbackAnimmationComplete,this)
			break;
			case 4:
				this.feedbackRank = new feedbackTypeRank();
				this.displaySp.addChild(this.feedbackRank);
				this.feedbackRank.x = (Main.W - this.displaySp.width)/2;
				this.feedbackRank.y = (Main.H - this.displaySp.height)/2;
				this.currDisplayObj = this.feedbackRank;
				this.currDisplayTypeNum=4;
				this.feedbackRank.touchEnabled=false;
			break;
		}
		this.isHiddenOut(.3,0,1);
	}

	/**
     * 创建图形界面
     */
	private initSprite(){

		this.displaySp = new egret.Sprite();
		this.addChild(this.displaySp)

		this.bgColor = new egret.Sprite();
		this.bgColor.graphics.beginFill(0x000000,.3);
		this.bgColor.graphics.drawRect(0,0,Main.W,Main.H);
		this.bgColor.graphics.endFill();
		this.displaySp.addChild(this.bgColor);

		this.feedbackBg =  new egret.Sprite();
		this.feedbackBg.graphics.beginFill(0xffffff,1);
		this.feedbackBg.graphics.drawRoundRect(0,0,this.feedbackBgWidth,this.feedbackBgHeight,50,50);
		this.feedbackBg.graphics.endFill();
		this.displaySp.addChild(this.feedbackBg);

		this.shutDownSp = new egret.Sprite();
		this.shutDownSp.graphics.beginFill(0xD83838);
        this.shutDownSp.graphics.drawCircle(0,0,Main.W/20);
        this.shutDownSp.graphics.endFill();
        this.displaySp.addChild(this.shutDownSp);

		this.shutDownBtn=new egret.TextField();
		this.shutDownBtn.verticalAlign=egret.VerticalAlign.MIDDLE;
        this.shutDownBtn.textAlign=egret.HorizontalAlign.CENTER;
		this.shutDownBtn.fontFamily = "微软雅黑";
        this.shutDownBtn.textColor= 0xffffff;
        this.shutDownBtn.text='✖';
        this.shutDownBtn.size=Main.W/20;
		this.shutDownSp.addChild(this.shutDownBtn);

	}

	/**
     * 界面布局 (尺寸发生变化时会执行)
	 * 【初始化时需要 图形创建后执行一次】  
     */
	public UpWindowData(){
		this.displaySp.x=0;
		this.displaySp.y=0;

		this.bgColor.graphics.clear();
		this.bgColor.graphics.beginFill(0x000000,.3);
		this.bgColor.graphics.drawRect(0,0,Main.W,Main.H);
		this.bgColor.graphics.endFill();

		this.feedbackBg.graphics.clear();
		this.feedbackBg.width=this.feedbackBgWidth;
		this.feedbackBg.height=this.feedbackBgHeight;
		this.feedbackBg.graphics.beginFill(0xffffff,1);
		this.feedbackBg.graphics.drawRoundRect((Main.W-this.feedbackBg.width)/2,
												(Main.H-this.feedbackBg.height)/2,
												this.feedbackBgWidth,
												this.feedbackBgHeight,
												50,50);
		this.feedbackBg.graphics.endFill();


		this.shutDownSp.x=(Main.W-this.feedbackBg.width)/2 + this.feedbackBg.width;
		this.shutDownSp.y=(Main.H-this.feedbackBg.height)/2;
		
		this.shutDownBtn.x = (this.shutDownSp.width - this.shutDownSp.width*1.5)/2;
		this.shutDownBtn.y = (this.shutDownSp.height - this.shutDownSp.height*1.5)/2;

		if(this.currDisplayObj!=null){
			this.currDisplayObj.x = (Main.W - this.currDisplayObj.width)/2;
			this.currDisplayObj.y = (Main.H - this.currDisplayObj.height)/2;
		}
	}

	/**
     * 初始化事件消息
     */
	private initMessage(){	
		this.feedbackBg.touchEnabled=false;
		this.bgColor.touchEnabled=false;
		this.shutDownSp.touchEnabled=false;
		
		this.bgColor.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.shutDownSpTouch,this);
		this.shutDownSp.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.shutDownSpTouch,this);
	}

	private shutDownSpTouch(e:egret.TouchEvent){
		console.log('关闭shutdown')
		this.isHiddenOut(.3,0,0);
		this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,'shutdownFeedback'));
	}
	
	private feedbackAnimmationComplete(e:EventManage){
		if(e.data=='nextCheckpoint'){
			this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,'nextCheckpoint'));
		}
	}

	/**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    public isHiddenOut(exitTime = 0.1, waitTime = 0.1, stateAlpha = 1){
		egret.Tween.get(this.displaySp,{
			onChangeObj: this
		})
		.wait(waitTime*1000)
		.to({alpha:stateAlpha},exitTime*1000)
		.call(function(){
			if(stateAlpha == 0 ){
				this.bgColor.touchEnabled=false;
				this.feedbackBg.touchEnabled=false;
				this.shutDownSp.touchEnabled=false;
				this.displaySp.touchEnabled=false;
				this.touchEnabled=false;
				if(this.feedbackAnimmation){
					this.feedbackAnimmation.nextBtn.touchEnabled=false;
					this.feedbackAnimmation.restBtn.touchEnabled=false;
				}
			}else if(stateAlpha ==1 ){ 
				this.bgColor.touchEnabled=true;
				this.feedbackBg.touchEnabled=true;
				this.shutDownSp.touchEnabled=true;
				this.displaySp.touchEnabled=true;
				this.touchEnabled=true;
				if(this.feedbackAnimmation){
					this.feedbackAnimmation.nextBtn.touchEnabled=true;
					this.feedbackAnimmation.restBtn.touchEnabled=true;
				}
			}
		},this)
    }
}

