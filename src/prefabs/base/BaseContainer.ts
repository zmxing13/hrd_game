abstract class BaseContainer extends egret.DisplayObjectContainer{
	public constructor() {
		super();
		if(this.stage){this.onAddToStage();}else{
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}
	}
	private onAddToStage(){
		this.stage.addEventListener(egret.Event.RESIZE,this.UpWindowData,this);
	}
	/**
	 * 更新窗口信息
	 */
	abstract UpWindowData():void;



	/**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    public hiddenOut(exitTime = 0.1, waitTime = 0.1, stateAlpha = 1){
        egret.Tween.get(this,{
            onChangeObj: this
        })
        .wait(waitTime*1000)
        .to({ alpha:stateAlpha },exitTime*1000)
    }

	/**
     * 销毁(淡出)
     * @param exitTime 退出时间
     * @param waitTime 等待时间
     */
    public DestroyOut(exitTime = 0.1, waitTime = 0.1){
        egret.Tween.get(this,{
            onChangeObj: this
        })
        .wait(waitTime*1000)
        .to({ alpha:0 },exitTime*1000)
        .call(this.Destroy,this,[]);
    }
    /**
     * 删除自己
     */
    private Destroy(){
        if(this.parent){
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    }
}