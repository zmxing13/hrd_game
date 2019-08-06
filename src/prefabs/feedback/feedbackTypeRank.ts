//反馈弹板类型4-排行榜
class feedbackTypeRank extends eui.Component {

	private btUpimgArr:Array<any>;// any[] = [];//存储按钮图片名称
	private btDownimgArr:Array<any>;
	private userInfoList:Array<any>;//存储同玩用户数据

	private domain="../../.."   

	public constructor() {
		super();
		this.btUpimgArr=[];
		this.btDownimgArr=[];
		this.userInfoList=[];
		this.getSendRankData()
		
	}
	//获得排行榜数据
	private getSendRankData(){
		var url = "http://xesmpcs.speiyou.com/videomaidian/public/index/zsqgame/getwordUsers"
		var data = "num=15";
		this.postAjax(url, data)
	}

	public postAjax(url, data) {
		var request: egret.HttpRequest;
		request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
		request.open(url, egret.HttpMethod.POST);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		request.send(data);
	}

	private onPostComplete(e: egret.Event): void {
		var request = <egret.HttpRequest>e.currentTarget;
		// egret.log("请求成功post data : ", request.response);

		var userdata = request.response;
		//重点由JSON字符串转换为JSON对象,这里必须使用eval,其他都不行，为什么，暂时不作答
		var obj = eval('(' + userdata + ')');
		console.log('请求成功:',obj.data)
		//封装玩家数据
		this.getfriendValueToObject(obj.data)
		//对分数进行排序
		this.userScoreMaxAndMin();

	}

	private onPostIOError(e: egret.IOErrorEvent): void {
		console.log("请求失败")
	}


	//对用户数据根据key取出来赋值给需要显示的数据对象playData
	private getfriendValueToObject(userdata) {
		let maxScore = 0
		let time = 0
		let username = ""
		let oldtime = 0
		let isSameWeeka = false
		for (var i = 0; i < userdata.length; i++) {
			maxScore = parseInt(userdata[i].onlynum)
			time = parseInt(userdata[i].time)
			username = userdata[i].nickname

			//对象封装数据；
			let playData = {
				img:this.domain+"/resource/rankingList/curr_time.png",
				rightImg: this.domain+"/resource/rankingList/qt_47.png",
				clock: this.domain+"/resource/rankingList/curr_time.png",
				name: username,
				huangguangImg: "",
				headimg:this.domain+"/resource/rankingList/Helot_09.png",
				bgimg: this.domain+"/resource/rankingList/tongyonk_bg6.png",
				shouye: this.domain+"/resource/rankingList/shouye_3.png",
				sexImg: this.domain+"/resource/rankingList/Helot_09.png",
				score: maxScore,
				time: time,
			}
			this.userInfoList.push(playData)
		}
		console.log(this.userInfoList)
	}

	//分数大小比较方法
	private compare(a, b) {
		//先根据分数排名，这里是从小到大
		if (a.score < b.score) {
			return -1;
		} else if (a.score > b.score) {
			return 1;
		} else {
			//然后在分数的基础上再根据用户使用的时间排序，时间越少，排名越往前；
			if (a.time < b.time) {
				return -1;
			} else if (a.time > b.time) {
				return 1;
			} else {
				return 0
			}

		}
	}

	//分数大小排序
	private userScoreMaxAndMin() {
		let list: any[] = []
		//对分数进行排序，按照分数从小到大的排列
		this.userInfoList.sort(this.compare);
		for (let i = 0; i < this.userInfoList.length; i++) {
			if (i > 100) { break }
			let userInfo = this.userInfoList[i];
			userInfo.key = i + 1;
			// console.log(userInfo)
			if (i == 0) {
				userInfo.huangguangImg = this.domain+"/resource/rankingList/phb1.png"
			} else if (i == 1) {
				userInfo.huangguangImg = this.domain+"/resource/rankingList/phb2.png"
			} else if (i == 2) {
				userInfo.huangguangImg = this.domain+"/resource/rankingList/phb3.png"
			}
			list.push(userInfo)
		}
		console.log(list)
		DataBus.rankDataArr = list;
		this.initSprite();
		this.UpWindowData();
		this.initMessage();
	}



	/**
     * 创建图形界面
     */
	private initSprite(){
		var rankPanel:RankPanel = new RankPanel();
		this.addChild(rankPanel);
		rankPanel.touchEnabled=false;
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
		
	}

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