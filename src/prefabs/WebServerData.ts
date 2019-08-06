//服务器数据
class WebServerData extends egret.DisplayObject {
	public static _netManage:WebServerData;
	private Request_Register:string='userRegister';					//注册
	private Request_Login:string='userLogin';						//登陆
	private Request_QuickLogin:string='quickLogin';					//快速登陆
	private Request_UserCheck:string='userCheck';					//验证token
	private Request_GetUserData:string='getUserData';				//获取用户数据
	private Request_GetUserInfo:string='getUserInfo';				//获取用户信息
	private Request_SetUserInfo:string='setUserInfo';				//设置用户信息
	private Request_GetPortraitList:string='getPortraitList';		//获取头像列表
	private Request_SetPassword:string='setPassword';				//设置登陆密码

	
	//url地址
	private urlAddress:string=''
	private func:Function;
	private currThis:egret.DisplayObjectContainer;
	public constructor(wd:SingletonEnforcer) {
		super();
		this.urlAddress = 'http://10.8.9.10/MathPlay/ability/';
		//http://www.maidian.com/index/zsqgame/getwordUsers
	}
	public static getInstance():WebServerData{
		if (WebServerData._netManage == null){
				WebServerData._netManage=new WebServerData(new SingletonEnforcer())
			}
		return WebServerData._netManage
	}
	/**
	 * 用户注册
	 */
	public userRegister(_username:string,_password:string,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "username="+ _username + "&password="+_password;
		this.currThis=newThis;
		this.sendRequest(this.Request_Register,params,_func)
	}

	/**
	 * 用户登陆
	 */
	public userLogin(_username:string,_password:string,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "username="+ _username + "&password="+_password;
		this.currThis=newThis;
		this.sendRequest(this.Request_Login,params,_func)
	}

	/**
	 * 快速登陆
	 */
	public userQuickLogin(_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		this.currThis=newThis;
		this.sendRequest(this.Request_QuickLogin,null,_func)
	}

	/**
	 * 验证token是否过期
	 */
	public userCheckToken(_token:string,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token;	
		this.currThis=newThis;
		this.sendRequest(this.Request_UserCheck,params,_func)
	}

	/**
	 * 获取用户数据
	 * 用户数据包含： 等级，积分，体力
	 */
	public getUserData(_token:string,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token;
		this.currThis=newThis;
		this.sendRequest(this.Request_GetUserData,params,_func)
	}

	/**
	 * 获取用户信息
	 * 用户信息包含： 昵称，头像
	 */
	public getUserInfo(_token:string,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token;		
		this.currThis=newThis;
		this.sendRequest(this.Request_GetUserInfo,params,_func)
	}
	/**
	 * 设置用户信息 自定义头像，自定义昵称
	 * _nickName 	自定义昵称
	 * _pictureId 	自定义头像id-服务器传递时
	 */
	public setUserInfo(_token:string,_nickName:string,_pictureId:number,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token +"&nickname="+ _nickName +"&pictureId="+ _pictureId;		
		this.currThis=newThis;
		this.sendRequest(this.Request_SetUserInfo,params,_func)
	}
	/**
	 * 获取头像列表
	 */
	public getPortraitList(_token:string,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token;		
		this.currThis=newThis;
		this.sendRequest(this.Request_GetPortraitList,params,_func)
	}

	/**
	 * 设置登陆密码
	 * _token 		token值
	 * password 	旧密码
	 * newpassword	新密码
	 */
	public setPassword(_token:string,_password:string,_newpassword:string,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token + "&password="+ _password + "&newpassword="+_newpassword;
		this.currThis=newThis;
		this.sendRequest(this.Request_SetPassword,params,_func)
	}



	/**
	 * 获取排行榜数据
	 * _token 		token值
	 * password 	旧密码
	 * newpassword	新密码
	 */
	public getRankData(_token:string,_password:string,_newpassword:string,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token + "&password="+ _password + "&newpassword="+_newpassword;
		this.currThis=newThis;
		this.sendRequest(this.Request_SetPassword,params,_func)
	}







	//---------------------------------------------
	//-----------------华丽的分割线-----------------
	//---------------------------------------------

	/**
	 * 发送请求
	 * url:  	接口
	 * data:	参数
	 * func:	回调方法 
	 */
	public sendRequest(_url:string,_data:any=null,_func:Function=null){
		this.func = _func;
		var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
			request.open(this.urlAddress + _url +"/",egret.HttpMethod.POST);
            request.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
			request.send(_data);
            request.addEventListener(egret.Event.COMPLETE,this.onPostComplete,this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onPostIOError,this);
            request.addEventListener(egret.ProgressEvent.PROGRESS,this.onPostProgress,this);
	}
	//成功
	private onPostComplete(event:egret.Event):void {
        var request = <egret.HttpRequest>event.currentTarget;
		if(this.func!=null){
		this.func([JSON.parse(request.response),this.currThis]);
		}
    }
	//失败	
    private onPostIOError(event:egret.IOErrorEvent):void {
        // console.log("post error : " , event);
    }
	//进程	
    private onPostProgress(event:egret.ProgressEvent):void {
        // console.log("post progress : " , Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
    }	
}
class SingletonEnforcer{}