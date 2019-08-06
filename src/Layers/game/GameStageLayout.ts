//游戏舞台布局
class GameStageLayout extends BaseContainer {
	private _public:PublicClass = new PublicClass();

	//关卡配置json数据
	private urlloader:egret.URLLoader;
	private urlreq:egret.URLRequest;

	private checkpointData:Object;
	private displaySp:egret.Sprite;
	private gameBg:egret.Bitmap;

	private playShow:PlayDataShow;
	private operationArea:GameOperationArea;
	
	public constructor() {
		super();
		this.checkpointInit();
	}

	//关卡数据初始化
	private checkpointInit(){
		if(DataBus.checkpointJsonDataObject==undefined){
			console.log('无.关卡配置信息->开始加载json')
			this.urlloaderOnComplete(RES.getRes("checkpoint_json"));
		}else{
			console.log('有.关卡配置信息')
			this.checkpointData = DataBus.checkpointJsonDataObject;
		}
	}

	//读取关卡配置文件完成
	private urlloaderOnComplete(_data):void{       
		DataBus.checkpointJsonDataObject = _data;
		DataBus.totalCheckpointNum = _data.checkpointJsonDataObject.length;
		console.log('总关卡数：'+DataBus.totalCheckpointNum)
		// console.log('加载后关卡配置信息：',DataBus.checkpointJsonDataObject);
		this.initSprite();
		this.UpWindowData();
		this.initMessage();
	}

	/**
     * 创建图形界面
     */
	private initSprite(){
		// console.log('游戏布局页')
		this.displaySp = new egret.Sprite();
		this.addChild(this.displaySp);

		this.gameBg = this._public.createBitmapByName('img_start_bg');
		this.displaySp.addChild(this.gameBg);

		this.playShow = new PlayDataShow();
		this.displaySp.addChild(this.playShow);
		
		this.operationArea = new GameOperationArea();
		this.displaySp.addChild(this.operationArea);
	}

	/**
     * 界面布局 (尺寸发生变化时会执行)
	 * 【初始化时需要 图形创建后执行一次】  
     */
	public UpWindowData(){
		this.gameBg.x=this.gameBg.y=0;
		this.gameBg.width=Main.W;
		this.gameBg.height=Main.H;

		let scaleNum:number=0;
		scaleNum = (Main.W/(this.playShow.width*1.5))
		this.playShow.scaleX=this.playShow.scaleY=scaleNum;
		this.playShow.x = (this.gameBg.width - this.playShow.width*scaleNum)/2;
		this.playShow.y = this.playShow.height/6;
		this.playShow.height = Main.H*.1;

		this.operationArea.y=this.playShow.height;
		this.operationArea.width = Main.W;
		this.operationArea.height = Main.H*.85;
	}

	/**
     * 初始化事件消息
     */
	private initMessage(){
		// this.playShow.addEventListener(EventEnumerate.SELECT_COMPLETE,this.playShowComplete,this)
		LoadFeedbackClass.feedback.addEventListener(EventEnumerate.SELECT_COMPLETE,this.playShowComplete,this)
		this.operationArea.addEventListener(EventEnumerate.SELECT_COMPLETE,this.operationAreaComplete,this)
	}
	//下一关
	private playShowComplete(e:EventManage){
		// console.log(e.data)
		if(e.data=="nextCheckpoint"){
			if(this.playShow.currCheckpointNum < DataBus.totalCheckpointNum){
				this.operationArea.setNextCheckpointData();
				this.playShow.currCheckpointText.text= '关卡 '+(this.playShow.currCheckpointNum+=1).toString()+ '/'+this.playShow.totalCheckpointNum.toString();
				LoadFeedbackClass.feedback.isHiddenOut(.1,.2,0)
			}else{
				LoadFeedbackClass.feedback.setLable('已是最后一关卡');
			}
		}
	}
	//开始计时计步-游戏结束
	private operationAreaComplete(e:EventManage){
		console.log(e.data)
		if(e.data=='gameover'){
			// LoadFeedbackClass.feedback.setLable('成功脱困->\n\n耗时：'+DataBus.curTimeConsuming+'秒'+ '\n\n共用'+DataBus.curTheyCount + '步' + '\n\n[下一关]');
			LoadFeedbackClass.feedback.setLable('',true,3);
			this.playShow.stopTime();
			return;
		}
		if(e.data=="startTouch"){
			this.playShow.startTime();
			this.playShow.mapText.text=(this.playShow.mapNum++).toString()+'步';
			DataBus.curTheyCount = this.playShow.mapNum;
		}
	}

	//重置舞台布局
	private resetStageLayout(){

	}
}