class RankPanel extends eui.UILayer {
	public constructor() {
		super();
		let rank=new RankUiClass();
        this.addChild(rank);
		rank.touchEnabled=false;
	}    
}