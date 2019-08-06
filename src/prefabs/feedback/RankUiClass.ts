/** 
 *排行榜组件,主要包含下面两部分
 *1. 年级选项卡：1-6年级
 *2. 玩家列表：名次-头像-年级-昵称-积分-pk按钮
 *功能：
 *1.从服务器取玩家排行信息 
 *2.使用数据渲染年级选项卡
 *3.使用数据渲染玩家列表，并为列表按钮添加事件
 *
 *输入： 排行榜皮肤
        年级选项卡皮肤
        玩家列表皮肤
        一至六年级玩家排行榜数据
*/

class RankUiClass extends eui.Component {

    private listPlayers:eui.List;//玩家列表，需要渲染器渲染
    private datas = DataBus.rankDataArr;
	
	public constructor() {
		super();
        this.percentWidth=100;
        this.percentHeight=100;
		this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/assets/rankUISkin.exml";
	}

	private uiCompHandler():void{
         this.renderPlayerList();
	}

	protected createChildren():void {
        super.createChildren();
    }
 

    /*
    *渲染器渲染玩家列表
    */

    private renderPlayerList():void{
		this.listPlayers.itemRenderer=PlayerListRNKIR;
        //初始数据为一年级
        let datas=this.datas.map((item,index)=>{
            return {order:index+1,...item};
        });
        this.listPlayers.dataProvider=new eui.ArrayCollection(datas);
    }
	
}

/*玩家列表渲染器*/
class PlayerListRNKIR extends eui.ItemRenderer {
    
    private pkBtn:eui.Button;

    constructor() {
        super();
        this.skinName = "resource/assets/playerListSkin.exml";
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this);     
    }

    private uiCompHandler():void{
      
	}

    protected createChildren():void {
        super.createChildren();
    }

    protected dataChanged():void {
      
    }
}
