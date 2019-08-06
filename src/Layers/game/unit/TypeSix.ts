class TypeSix extends ImageBasisClass {
	private countIndex:number=0;
	private imgType:string="";
	public constructor(count:number,imgType:string='tra') {
		super();
		// console.log("方格类型6");
		this.countIndex=count;
		this.imgType = imgType;
		this.init_Sprite();
		this.upPosition();
		this.initEvent();
	}
	private img_content:egret.Bitmap;
	
	/**
	 * 初始化对象
	 */
	private init_Sprite(): void {
		this.img_content=new egret.Bitmap();
		this.img_content.width=240;
		this.img_content.height=80;
		this.img_content.texture= RES.getRes("img_"+this.imgType+"_six_"+this.countIndex+'_png')
		this.addChild(this.img_content);
	}
	/**
	 * 位置更新
	 */
	public upPosition(): void {
		
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

	}
}