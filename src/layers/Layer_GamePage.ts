class Layer_GamePage extends egret.DisplayObjectContainer {
	public constructor() {
		super();
		// console.log("game");
		this.init_Sprite();
		this.upPosition();
		this.initEvent();
	}
	private  _layout:StageLayout;

	/**
	 * 初始化对象
	 */
	private init_Sprite(): void {
		this._layout=new StageLayout();
        this.addChild(this._layout);
	}
	/**
	 * 位置更新
	 */
	public upPosition(): void {
		// this._layout.scaleX = Main.scaleNum + .5;
		// this._layout.scaleY = Main.scaleNum + .5;
		// this._layout.x = (Main.W - this._layout.width)/2;
		// this._layout.y = (Main.H - this._layout.height)/2;
		this._layout.upPosition();
	}
	/**
	 * 初始化事件
	 */
	private initEvent(): void {

	}

	/**
	 * 刷新事件
	 */
	public resetEvent(): void {
		this._layout.resetEvent();
	}
}