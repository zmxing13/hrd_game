
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/modules/dragonBones/dragonBones.js",
	"bin-debug/layers/ImgPublicClass.js",
	"bin-debug/events/EventManage.js",
	"bin-debug/events/PublicClass.js",
	"bin-debug/events/CreateLine.js",
	"bin-debug/layers/Layer_GamePage.js",
	"bin-debug/layers/StageLayout.js",
	"bin-debug/layers/TypeFive.js",
	"bin-debug/layers/TypeFour.js",
	"bin-debug/layers/TypeOne.js",
	"bin-debug/prefabs/SoundManage.js",
	"bin-debug/layers/TypeThree.js",
	"bin-debug/layers/TypeTwo.js",
	"bin-debug/layers/TypeZero.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/prefabs/DragonBonesAnimation.js",
	"bin-debug/prefabs/MovieClipAnimation.js",
	"bin-debug/layers/TypeSix.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 60,
		scaleMode: "fixedWidth",
		contentWidth: 1024,
		contentHeight: 768,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};