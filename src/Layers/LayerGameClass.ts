//Layer_gameClass 
class LayerGameClass extends BaseContainer {

	private soundExample:SoundExampleClass;
	private startPage:StartGamePage;
    private gameLayout:GameStageLayout;
	
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
		// this.soundExample = new SoundExampleClass('bg',0);
		// this.addChildAt(this.soundExample,1);
		// this.soundExample.playSound();

		this.startPage = new StartGamePage();
		this.addChildAt(this.startPage,1);
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
		this.startPage.addEventListener(EventEnumerate.SELECT_COMPLETE,this.startPageComplete,this);
	}

	private startPageComplete(e:EventManage){
		// console.log('数据:', e.data);
		this.startPage.DestroyOut();
        this.gameLayout = new GameStageLayout();
        this.addChildAt(this.gameLayout,0);
	}
}