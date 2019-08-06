var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
//服务器数据
var WebServerData = (function (_super) {
    __extends(WebServerData, _super);
    function WebServerData(wd) {
        var _this = _super.call(this) || this;
        _this.Request_Register = 'userRegister'; //注册
        _this.Request_Login = 'userLogin'; //登陆
        _this.Request_QuickLogin = 'quickLogin'; //快速登陆
        _this.Request_UserCheck = 'userCheck'; //验证token
        _this.Request_GetUserData = 'getUserData'; //获取用户数据
        _this.Request_GetUserInfo = 'getUserInfo'; //获取用户信息
        _this.Request_SetUserInfo = 'setUserInfo'; //设置用户信息
        _this.Request_GetPortraitList = 'getPortraitList'; //获取头像列表
        _this.Request_SetPassword = 'setPassword'; //设置登陆密码
        //url地址
        _this.urlAddress = '';
        _this.urlAddress = 'http://10.8.9.10/MathPlay/ability/';
        return _this;
        //http://www.maidian.com/index/zsqgame/getwordUsers
    }
    WebServerData.getInstance = function () {
        if (WebServerData._netManage == null) {
            WebServerData._netManage = new WebServerData(new SingletonEnforcer());
        }
        return WebServerData._netManage;
    };
    /**
     * 用户注册
     */
    WebServerData.prototype.userRegister = function (_username, _password, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "username=" + _username + "&password=" + _password;
        this.currThis = newThis;
        this.sendRequest(this.Request_Register, params, _func);
    };
    /**
     * 用户登陆
     */
    WebServerData.prototype.userLogin = function (_username, _password, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "username=" + _username + "&password=" + _password;
        this.currThis = newThis;
        this.sendRequest(this.Request_Login, params, _func);
    };
    /**
     * 快速登陆
     */
    WebServerData.prototype.userQuickLogin = function (_func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        this.currThis = newThis;
        this.sendRequest(this.Request_QuickLogin, null, _func);
    };
    /**
     * 验证token是否过期
     */
    WebServerData.prototype.userCheckToken = function (_token, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token;
        this.currThis = newThis;
        this.sendRequest(this.Request_UserCheck, params, _func);
    };
    /**
     * 获取用户数据
     * 用户数据包含： 等级，积分，体力
     */
    WebServerData.prototype.getUserData = function (_token, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token;
        this.currThis = newThis;
        this.sendRequest(this.Request_GetUserData, params, _func);
    };
    /**
     * 获取用户信息
     * 用户信息包含： 昵称，头像
     */
    WebServerData.prototype.getUserInfo = function (_token, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token;
        this.currThis = newThis;
        this.sendRequest(this.Request_GetUserInfo, params, _func);
    };
    /**
     * 设置用户信息 自定义头像，自定义昵称
     * _nickName 	自定义昵称
     * _pictureId 	自定义头像id-服务器传递时
     */
    WebServerData.prototype.setUserInfo = function (_token, _nickName, _pictureId, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token + "&nickname=" + _nickName + "&pictureId=" + _pictureId;
        this.currThis = newThis;
        this.sendRequest(this.Request_SetUserInfo, params, _func);
    };
    /**
     * 获取头像列表
     */
    WebServerData.prototype.getPortraitList = function (_token, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token;
        this.currThis = newThis;
        this.sendRequest(this.Request_GetPortraitList, params, _func);
    };
    /**
     * 设置登陆密码
     * _token 		token值
     * password 	旧密码
     * newpassword	新密码
     */
    WebServerData.prototype.setPassword = function (_token, _password, _newpassword, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token + "&password=" + _password + "&newpassword=" + _newpassword;
        this.currThis = newThis;
        this.sendRequest(this.Request_SetPassword, params, _func);
    };
    /**
     * 获取排行榜数据
     * _token 		token值
     * password 	旧密码
     * newpassword	新密码
     */
    WebServerData.prototype.getRankData = function (_token, _password, _newpassword, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token + "&password=" + _password + "&newpassword=" + _newpassword;
        this.currThis = newThis;
        this.sendRequest(this.Request_SetPassword, params, _func);
    };
    //---------------------------------------------
    //-----------------华丽的分割线-----------------
    //---------------------------------------------
    /**
     * 发送请求
     * url:  	接口
     * data:	参数
     * func:	回调方法
     */
    WebServerData.prototype.sendRequest = function (_url, _data, _func) {
        if (_data === void 0) { _data = null; }
        if (_func === void 0) { _func = null; }
        this.func = _func;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(this.urlAddress + _url + "/", egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        request.send(_data);
        request.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onPostProgress, this);
    };
    //成功
    WebServerData.prototype.onPostComplete = function (event) {
        var request = event.currentTarget;
        if (this.func != null) {
            this.func([JSON.parse(request.response), this.currThis]);
        }
    };
    //失败	
    WebServerData.prototype.onPostIOError = function (event) {
        // console.log("post error : " , event);
    };
    //进程	
    WebServerData.prototype.onPostProgress = function (event) {
        // console.log("post progress : " , Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
    };
    return WebServerData;
}(egret.DisplayObject));
__reflect(WebServerData.prototype, "WebServerData");
var SingletonEnforcer = (function () {
    function SingletonEnforcer() {
    }
    return SingletonEnforcer;
}());
__reflect(SingletonEnforcer.prototype, "SingletonEnforcer");
//# sourceMappingURL=WebServerData.js.map