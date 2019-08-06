class ImageBasisClass extends egret.DisplayObjectContainer {
	public constructor() {
		super();
		// console.log("图片共有属性类");
	}
	/**
	 * 给当前对象赋值，值是二维数组的下标
	 */
	public indexNums:Array<any>=new Array<any>();
	public initIndex:Array<any>=new Array<any>();
	/**
	 * 给当前对象添加id，值是二维数组的数
	 */
	public id:number=0;
	/**
	 * 给当前对象添加布尔值
	 */
	public boo:Boolean=false;
	/**
	 * 记录当前对象x位置信息
	 */
	public ox:number=0;
	/**
	 * 记录当前对象y位置信息
	 */
	public oy:number=0;

	public typeNumber:number=0;
}