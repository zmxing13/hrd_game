//游戏操作区域
class GameOperationArea extends BaseContainer {
	
	private displaySp:egret.Sprite;
	private unitArea:UnitAreaClass;
	public tempBg:egret.Sprite;

	//全局-当前关卡数
	private currCheckpointNum:number=0;
	//当前关卡数据
	private currCheckpointArr:Array<any>;
	//当前关卡正确对象id
	private currAnswerId:number;
	//当前关卡正确坐标
	private currAnswerPointArr:Array<any>;
		
	public constructor() {
		super();
		this.currCheckpointArr=[];
		this.currAnswerId=0;
		this.currAnswerPointArr=[];
		this.checkpointInit();
	}

	/**
	 * 动态加载可视化内容
	 * 动态刷新可视化内容
	 * 清空本轮或上一轮游戏资源
	 */


	/**
	 * 初始化关卡数据
	 */
	private checkpointInit(){
		let obj;
		if(DataBus.checkpointJsonDataObject!=undefined){
			obj = DataBus.checkpointJsonDataObject;
			this.currCheckpointArr = obj.checkpointJsonDataObject[this.currCheckpointNum].checkpointDataArr;
			this.currAnswerId = obj.checkpointJsonDataObject[this.currCheckpointNum].answerId;
			this.currAnswerPointArr = obj.checkpointJsonDataObject[this.currCheckpointNum].answerPointArr;

			this.initSprite();
			this.UpWindowData();
			this.initMessage();
		}else{
			console.log('无舞台数据配置信息');
		}
	}


	/**
     * 创建图形界面
     */
	private initSprite(){
		this.width = Main.W;
		this.height = Main.H*.85;

		// this.tempBg = new egret.Sprite();
		// this.tempBg.graphics.beginFill(0x000fff,.3);
		// this.tempBg.graphics.drawRoundRect(0,0,this.width,this.height,20,20);
		// this.tempBg.graphics.endFill();
		// this.addChild(this.tempBg);

		this.displaySp = new egret.Sprite();
		this.addChild(this.displaySp);

		this.unitArea = new UnitAreaClass();
		this.displaySp.addChild(this.unitArea);
		this.unitArea.getLayoutData(this.currCheckpointNum,this.currCheckpointArr,this.currAnswerId,this.currAnswerPointArr)
	}

	/**
     * 界面布局 (尺寸发生变化时会执行)
	 * 【初始化时需要 图形创建后执行一次】  
     */
	public UpWindowData(){

		// this.tempBg.graphics.clear()
    	// this.tempBg.graphics.beginFill(0x000fff,.3);
		// this.tempBg.graphics.drawRoundRect(0,0,this.width,this.height,20,20);
		// this.tempBg.graphics.endFill();

		let scaleNum:number=0;
		let scaleXNum:number=0;
		let scaleYNum:number=0;
		scaleXNum = (Main.W/(this.displaySp.width*1.2));
		scaleYNum = (Main.H/(this.displaySp.height*1.2));
		if(scaleXNum<scaleYNum){
			scaleNum = scaleXNum;
		}else{
			scaleNum = scaleYNum;			
		}
		DataBus.scaleNum = scaleNum;
		this.displaySp.scaleX=this.displaySp.scaleY=scaleNum;
		this.displaySp.x = (this.width - this.displaySp.width*scaleNum)/2;
		this.displaySp.y = (this.height - this.displaySp.height*scaleNum)/2;
	}

	/**
     * 初始化事件消息
     */
	private initMessage(){
		this.unitArea.addEventListener(EventEnumerate.SELECT_COMPLETE,this.unitAreaComplete,this);
	}

	private unitAreaComplete(e:EventManage){
		console.log(e.data)
		if(e.data=='startTouch'){
			this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,'startTouch'));
		}
		if(e.data=='gameover'){
			this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,'gameover'));
		}
	}

	//设置/更新下一关闯关数据
	public setNextCheckpointData(){
		console.log('下一关');
		let obj;
		if(DataBus.checkpointJsonDataObject!=undefined){
			obj = DataBus.checkpointJsonDataObject;
			this.currCheckpointNum++;
			this.currCheckpointArr = obj.checkpointJsonDataObject[this.currCheckpointNum].checkpointDataArr;
			this.currAnswerId = obj.checkpointJsonDataObject[this.currCheckpointNum].answerId;
			this.currAnswerPointArr = obj.checkpointJsonDataObject[this.currCheckpointNum].answerPointArr;
			this.unitArea.resetEvent();
			this.unitArea = new UnitAreaClass();
			this.unitArea.alpha=0;
			this.displaySp.addChild(this.unitArea);
			this.unitArea.hiddenOut(.1,.2,1)		
			this.unitArea.getLayoutData(this.currCheckpointNum,this.currCheckpointArr,this.currAnswerId,this.currAnswerPointArr)
			this.unitArea.addEventListener(EventEnumerate.SELECT_COMPLETE,this.unitAreaComplete,this)
		}
	}
}