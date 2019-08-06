//////////////////////////////////////////////////////////////////////////////////////
//
//  ProjectMould
//
//////////////////////////////////////////////////////////////////////////////////////
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        var _this = this;
        egret.lifecycle.addLifecycleListener(function (context) {
            Main.os = egret.Capabilities.os;
            Main.runtimeType = egret.Capabilities.runtimeType;
            //初始化龙骨时钟频率
            egret.Ticker.getInstance().register(function (advancedTime) {
                dragonBones.WorldClock.clock.advanceTime(advancedTime / 1000);
            }, _this);
            _this.onWindowStatus();
            //窗口尺寸状态监听
            _this.stage.addEventListener(egret.Event.RESIZE, _this.onWindowStatus, _this);
            context.onUpdate = function () {
                //每一帧都运行
            };
        });
        egret.lifecycle.onPause = function () {
            // 关闭渲染与心跳
            egret.ticker.pause();
            //console.log("app 进入后台");
        };
        egret.lifecycle.onResume = function () {
            // 打开渲染与心跳
            egret.ticker.resume();
            //console.log("app 进入前台");
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    /**
     * 窗口尺寸状态
     */
    Main.prototype.onWindowStatus = function () {
        //宽高信息
        Main.W = this.stage.stageWidth;
        Main.H = this.stage.stageHeight;
        //缩放信息
        var scale_X = Main.W / 750;
        var scale_Y = Main.H / 1334;
        Main.scaleNum = Math.min(scale_X, scale_Y);
    };
    //初始化Resource资源加载库
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
                RES.loadConfig("resource/default.res.json", "resource/");
                return [2 /*return*/];
            });
        });
    };
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 预加载loading资源组
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("loadingAssets");
    };
    /**
     * 资源组preload加载
     * platform 初始化
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(event.groupName == "preload")) return [3 /*break*/, 2];
                        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
                        //接口初始化
                        return [4 /*yield*/, platform.login()];
                    case 1:
                        //接口初始化
                        _a.sent();
                        //const userInfo = await platform.getUserInfo();
                        // console.log(userInfo);
                        this.loadingView.DestroyOut(0.1);
                        this.initGameScene();
                        return [3 /*break*/, 3];
                    case 2:
                        if (event.groupName == "loadingAssets") {
                            this.loadingView = new LoadingUI();
                            this.stage.addChild(this.loadingView);
                            RES.loadGroup("preload");
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 资源组加载出错
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        this.onResourceLoadComplete(event);
    };
    /**
    * 资源组加载出错
    */
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * preload资源组加载进度
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.onProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 初始化场景
     */
    Main.prototype.initGameScene = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.createGameScene();
                return [2 /*return*/];
            });
        });
    };
    /**
     * 创建游戏场景
     */
    Main.prototype.createGameScene = function () {
        this.feedbackBounced = new LoadFeedbackClass();
        this.addChildAt(this.feedbackBounced, 1);
        // LoadFeedbackClass.feedback.setLable('资源加载中');
        this.webServer = WebServerData.getInstance();
        this._gameContent = new LayerGameClass();
        this.addChildAt(this._gameContent, 0);
    };
    /**
     * 设备
     */
    Main.os = "";
    /**
     * 平台
     */
    Main.runtimeType = "";
    /**
     * 缩放比例
     */
    Main.scaleNum = 1;
    /**
     * 舞台宽
     */
    Main.W = 750;
    /**
     * 舞台高
     */
    Main.H = 1334;
    /**
     * “流海” 高度
     */
    Main.titleBarHeight = 0;
    Main.bitmapText = null;
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map