class TypeFive extends ImgPublicClass {
	private countIndex:number=0;
	public constructor(count:number) {
		super();
		// console.log("方格类型5");
		this.countIndex=count;
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
		this.img_content.width=80;
		this.img_content.height=240;
		// this.img_content.texture= RES.getRes("img_five_png");
		if(this.countIndex==1){this.img_content.texture= RES.getRes("img_five_1_png")};
		if(this.countIndex==2){this.img_content.texture= RES.getRes("img_five_2_png")};
		if(this.countIndex==3){this.img_content.texture= RES.getRes("img_five_3_png")};
		if(this.countIndex==4){this.img_content.texture= RES.getRes("img_five_4_png")};
		if(this.countIndex==5){this.img_content.texture= RES.getRes("img_five_5_png")};
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