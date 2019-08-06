//反馈弹板类型1
class feedbackTypeText extends BaseContainer {
	//反馈板文字显示内容
	public feedbackText:egret.TextField;
	//反馈版text内容
	public feedbackStr:string='';

	public constructor(_feedbackStr:string) {
		super();
		this.feedbackStr=_feedbackStr;
		this.initSprite();
		this.UpWindowData();
		this.initMessage();
	}

	/**
     * 创建图形界面
     */
	private initSprite(){
		this.feedbackText = new egret.TextField();
		this.feedbackText.verticalAlign=egret.VerticalAlign.MIDDLE;
        this.feedbackText.textAlign=egret.HorizontalAlign.CENTER;
		this.feedbackText.width = Main.W*.8;
		this.feedbackText.height = Main.H;
		this.feedbackText.multiline=true;
		this.feedbackText.wordWrap=true;
		this.feedbackText.fontFamily = "微软雅黑";
        this.feedbackText.textColor= 0x000000;
        this.feedbackText.text=this.feedbackStr;
        this.feedbackText.size=Main.W/20;
		this.addChild(this.feedbackText);
	}

	/**
     * 界面布局 (尺寸发生变化时会执行)
	 * 【初始化时需要 图形创建后执行一次】  
     */
	public UpWindowData(){
       
	}

	/**
     * 初始化事件消息
     */
	private initMessage(){
		
	}
}