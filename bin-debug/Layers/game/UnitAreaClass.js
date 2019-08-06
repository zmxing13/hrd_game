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
//单元格实例化
var UnitAreaClass = (function (_super) {
    __extends(UnitAreaClass, _super);
    function UnitAreaClass() {
        var _this = _super.call(this) || this;
        _this._public = new PublicClass();
        _this.spriteArr = new Array(); //存储舞台显示对象的数组
        _this.scopeX = 0; //矩阵X轴数量
        _this.longitudinalY = 0; //矩阵Y轴数量
        _this.directionStr = ""; //判断可以交换成功后，对象的移动方向
        _this._distance = new egret.Point(); //鼠标点击时，鼠标全局坐标与_bird的位置差
        _this.answerPoint = new egret.Point();
        _this.speedTime = 0;
        _this.currAngle = "";
        _this.typeTwoImgIndex = 0;
        _this.typeThreeImgIndex = 0;
        _this.typeFourImgIndex = 0;
        _this.typeFiveImgIndex = 0;
        _this.typeSixImgIndex = 0;
        _this.oldX = 0;
        _this.oldY = 0;
        _this.newX = 0;
        _this.newY = 0;
        _this.prevX = 0;
        _this.prevY = 0;
        _this.topAround = 0;
        _this.lowAround = 0;
        _this.leftAround = 0;
        _this.rightAround = 0;
        _this.moveDirWH = "";
        _this.checkBoo = false;
        _this._touchStatus = false; //当前触摸状态，按下时，值为true
        _this.distanceSum = 0;
        _this.directionAround = 0; //当前对象拖拽范围，超出距离则赋值
        _this.startTouchBoo = false; //开始游戏->发给父级，开始计时，计步
        _this._stagePointArr = [];
        _this._copyStagePointArr = [];
        _this._answerPointArr = [];
        _this._answerObjId = 0;
        return _this;
    }
    /**
     * 获取关卡布局数据
     * curCheckpoint:		当前关卡数
     * checkpointData:		当前关卡数据
     * _currAnswerId:		正确答案对象id
     * _currAnswerPointArr:	出口坐标
     */
    UnitAreaClass.prototype.getLayoutData = function (_curCheckpoint, _checkpointDataArr, _currAnswerId, _currAnswerPointArr) {
        this._stagePointArr = _checkpointDataArr.slice();
        this._answerObjId = _currAnswerId;
        this._answerPointArr = _currAnswerPointArr;
        console.log('当前关卡数:' + _curCheckpoint);
        console.log('当前关卡数据:' + this._stagePointArr);
        console.log('当前关卡正确id:' + this._answerObjId);
        console.log('当前关卡正确坐标:' + this._answerPointArr);
        this.initSprite();
        this.UpWindowData();
        this.initMessage();
    };
    /**
     * 创建图形界面
     */
    UnitAreaClass.prototype.initSprite = function () {
        this.displaySp = new egret.Sprite();
        this.addChild(this.displaySp);
        var i, l, o, k, currArrObj = 0, tempBoo = false, tempBooFour = false, TwotempCurrNum, TwotempCurrNums, ThrteetempCurrNum, FourtempCurrNum, FourtempCurrNums, FivetempCurrNum, FivetempCurrNums, SixtempCurrNum, SixtempCurrNums;
        TwotempCurrNum = [];
        TwotempCurrNums = [];
        ThrteetempCurrNum = [];
        FourtempCurrNum = [];
        FourtempCurrNums = [];
        FivetempCurrNum = [];
        FivetempCurrNums = [];
        SixtempCurrNum = [];
        SixtempCurrNums = [];
        //矩阵X轴数量
        // this.scopeX=4;
        this.scopeX = this._stagePointArr[0].length;
        //矩阵Y轴数量
        this.longitudinalY = this._stagePointArr.length;
        //变量初始化
        this.speedTime = 100;
        //正确答案坐标
        this.answerPoint.x = this._answerPointArr[0];
        this.answerPoint.y = this._answerPointArr[1];
        //拖拽范围，超出值则赋值
        this.directionAround = 40;
        //变量初始化
        this.typeTwoImgIndex = 1;
        this.typeThreeImgIndex = 1;
        this.typeFourImgIndex = 1;
        this.typeFiveImgIndex = 1;
        this.typeSixImgIndex = 1;
        this.distanceSum = 0;
        this.topAround = 0;
        this.lowAround = 0;
        this.leftAround = 0;
        this.rightAround = 0;
        this.moveDirWH = "";
        this.checkBoo = false;
        this._copyStagePointArr = [];
        this.touchEnabled = true;
        this.touchChildren = true;
        //背景线
        this._createLine = new CreateLine();
        this._createLine.createGridHander(this.scopeX + 1, this.longitudinalY + 1);
        this.displaySp.addChild(this._createLine);
        for (i = 0; i < this._stagePointArr.length; i++) {
            this._copyStagePointArr[i] = this._stagePointArr[i].slice();
        }
        for (i = 0; i < this._copyStagePointArr.length; i++) {
            for (l = 0; l < this._copyStagePointArr[i].length; l++) {
                currArrObj = this._copyStagePointArr[i][l];
                //--------------0
                if (currArrObj == 0) {
                    this._typeZero = new TypeZero();
                    this._typeZero.x = 80 * l;
                    this._typeZero.y = 80 * i;
                    this._typeZero.indexNums = [l, i];
                    this._typeZero.initIndex = this._typeZero.indexNums;
                    this._typeZero.touchEnabled = false;
                    this._typeZero.touchChildren = false;
                    this._typeZero.ox = this._typeZero.x;
                    this._typeZero.oy = this._typeZero.y;
                    this._typeZero.alpha = 0.01;
                    this._typeZero.id = currArrObj;
                    this.displaySp.addChild(this._typeZero);
                    this.spriteArr.push(this._typeZero);
                }
                //--------------1
                if (currArrObj == 1) {
                    this._typeOne = new TypeOne();
                    this._typeOne.x = 80 * l;
                    this._typeOne.y = 80 * i;
                    this._typeOne.id = 1;
                    this._typeOne.indexNums = [l, i];
                    this._typeOne.initIndex = this._typeOne.indexNums.slice();
                    this._typeOne.touchEnabled = true;
                    this._typeOne.ox = this._typeOne.x;
                    this._typeOne.oy = this._typeOne.y;
                    this._typeOne.id = currArrObj;
                    this.displaySp.addChild(this._typeOne);
                    this._typeOne.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.currTypeDown, this);
                    // console.log("new obj == 1  当前对象的下标是"+this._typeOne.inedxNums);
                }
                //--------------2
                if (currArrObj == 2) {
                    for (o = 0; o < TwotempCurrNums.length; o++) {
                        if (l == TwotempCurrNums[(o)][0] && i == TwotempCurrNums[o][1]) {
                            // console.log("找到了另一半  new obj == 2  当前对象的下标是"+this._typeTwo.indexNums+"   i:"+i+"   l:"+l);
                            tempBoo = true;
                            continue;
                        }
                    }
                    if (tempBoo == true) {
                        tempBoo = false;
                        continue;
                    }
                    TwotempCurrNum = [];
                    this._typeTwo = new TypeTwo(this.typeTwoImgIndex);
                    this._typeTwo.x = 80 * l;
                    this._typeTwo.y = 80 * i;
                    this._typeTwo.id = 2;
                    this._typeTwo.indexNums = [
                        [l, i],
                        [l, i + 1]
                    ];
                    TwotempCurrNum = [l, i + 1];
                    this._typeTwo.initIndex = this._typeTwo.indexNums.slice();
                    this._typeTwo.touchEnabled = true;
                    this.typeTwoImgIndex += 1;
                    this._typeTwo.ox = this._typeTwo.x;
                    this._typeTwo.oy = this._typeTwo.y;
                    this._typeTwo.id = currArrObj;
                    TwotempCurrNums.push(TwotempCurrNum);
                    this.displaySp.addChild(this._typeTwo);
                    this.spriteArr.push(this._typeTwo);
                    this._typeTwo.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.currTypeDown, this);
                    tempBoo = false;
                }
                if (currArrObj == 3) {
                    if (l == ThrteetempCurrNum[0] && i == ThrteetempCurrNum[1]) {
                        continue;
                    }
                    this._typeThree = new TypeThree(this.typeThreeImgIndex);
                    this._typeThree.x = 80 * l;
                    this._typeThree.y = 80 * i;
                    this._typeThree.id = 3;
                    this._typeThree.indexNums = [
                        [l, i],
                        [l + 1, i]
                    ];
                    ThrteetempCurrNum = [l + 1, i];
                    this._typeThree.initIndex = this._typeThree.indexNums.slice();
                    this._typeThree.touchEnabled = true;
                    this.typeThreeImgIndex += 1;
                    this._typeThree.ox = this._typeThree.x;
                    this._typeThree.oy = this._typeThree.y;
                    this.spriteArr.push(this._typeThree);
                    this._typeThree.id = currArrObj;
                    this.displaySp.addChild(this._typeThree);
                    this._typeThree.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.currTypeDown, this);
                }
                //--------------4
                if (currArrObj == 4) {
                    for (o = 0; o < FourtempCurrNums.length; o++) {
                        for (k = 0; k < 3; k++) {
                            if (l == FourtempCurrNums[o][k][0] && i == FourtempCurrNums[o][k][1]) {
                                // console.log("找到了另一半  new obj == 4  当前对象的下标是"+this._typeFour.indexNums+"   l:"+l+"   i:"+i);
                                tempBoo = true;
                                continue;
                            }
                            if (tempBoo == true) {
                                continue;
                            }
                        }
                    }
                    //当前数组下标如果是下半部分，则跳出本次循环
                    if (tempBoo == true) {
                        tempBoo = false;
                        continue;
                    }
                    FourtempCurrNum = [];
                    this._typeFour = new TypeFour(this.typeFourImgIndex);
                    this._typeFour.x = 80 * l;
                    this._typeFour.y = 80 * i;
                    this._typeFour.indexNums = [
                        [l, i],
                        [l + 1, i],
                        [l, i + 1],
                        [l + 1, i + 1]
                    ];
                    FourtempCurrNum = [[l + 1, i], [l, i + 1], [l + 1, i + 1]];
                    this._typeFour.initIndex = this._typeFour.indexNums.slice();
                    this._typeFour.touchEnabled = true;
                    this._typeFour.typeNumber = this.typeFourImgIndex;
                    this.typeFourImgIndex += 1;
                    this._typeFour.ox = this._typeFour.x;
                    this._typeFour.oy = this._typeFour.y;
                    this._typeFour.id = currArrObj;
                    this.displaySp.addChild(this._typeFour);
                    this.spriteArr.push(this._typeFour);
                    FourtempCurrNums.push(FourtempCurrNum);
                    this._typeFour.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.currTypeDown, this);
                    tempBooFour = true;
                }
                //--------------5
                if (currArrObj == 5) {
                    for (o = 0; o < FivetempCurrNums.length; o++) {
                        if (l == FivetempCurrNums[(o)][0][0] && i == FivetempCurrNums[o][0][1] ||
                            l == FivetempCurrNums[(o)][1][0] && i == FivetempCurrNums[o][1][1]) {
                            // console.log("找到了另一半  new obj == 5  当前对象的下标是"+this._typeTwo.indexNums+"   i:"+i+"   l:"+l);
                            tempBoo = true;
                            continue;
                        }
                    }
                    //当前数组下标如果是下半部分，则跳出本次循环
                    if (tempBoo == true) {
                        tempBoo = false;
                        continue;
                    }
                    FivetempCurrNum = [];
                    this._typeFive = new TypeFive(this.typeFiveImgIndex);
                    this._typeFive.x = 20 + 80 * l;
                    this._typeFive.y = 15 + 80 * i;
                    this._typeFive.id = 5;
                    this._typeFive.indexNums = [
                        [l, i],
                        [l, i + 1],
                        [l, i + 2]
                    ];
                    FivetempCurrNum = [[l, i + 1], [l, i + 2]];
                    this._typeFive.initIndex = this._typeFive.indexNums.slice();
                    this._typeFive.touchEnabled = true;
                    this.typeFiveImgIndex += 1;
                    this._typeFive.ox = this._typeFive.x;
                    this._typeFive.oy = this._typeFive.y;
                    FivetempCurrNums.push(FivetempCurrNum);
                    this._typeFive.id = currArrObj;
                    this.displaySp.addChild(this._typeFive);
                    this.spriteArr.push(this._typeFive);
                    this._typeFive.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.currTypeDown, this);
                    tempBoo = false;
                }
                //--------------6
                if (currArrObj == 6) {
                    for (o = 0; o < SixtempCurrNums.length; o++) {
                        if (l == SixtempCurrNums[(o)][0][0] && i == SixtempCurrNums[o][0][1] || l == SixtempCurrNums[(o)][1][0] && i == SixtempCurrNums[o][1][1]) {
                            // console.log("找到了另一半  new obj == 6  当前对象的下标是"+this._typeTwo.indexNums+"   i:"+i+"   l:"+l);
                            tempBoo = true;
                            continue;
                        }
                    }
                    //当前数组下标如果是下半部分，则跳出本次循环
                    if (tempBoo == true) {
                        tempBoo = false;
                        continue;
                    }
                    SixtempCurrNum = [];
                    this._typeSix = new TypeSix(this.typeSixImgIndex);
                    this._typeSix.x = 20 + 80 * l;
                    this._typeSix.y = 15 + 80 * i;
                    this._typeSix.id = 6;
                    this._typeSix.indexNums = [
                        [l, i],
                        [l + 1, i],
                        [l + 2, i]
                    ];
                    SixtempCurrNum = [[l + 1, i], [l + 2, i]];
                    this._typeSix.initIndex = this._typeSix.indexNums.slice();
                    this._typeSix.touchEnabled = true;
                    this.typeSixImgIndex += 1;
                    this._typeSix.ox = this._typeSix.x;
                    this._typeSix.oy = this._typeSix.y;
                    this._typeSix.id = currArrObj;
                    SixtempCurrNums.push(SixtempCurrNum);
                    this.displaySp.addChild(this._typeSix);
                    this.spriteArr.push(this._typeSix);
                    this._typeSix.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.currTypeDown, this);
                    tempBoo = false;
                }
            }
        }
        TwotempCurrNum = [];
        TwotempCurrNums = [];
        ThrteetempCurrNum = [];
        FivetempCurrNum = [];
        FivetempCurrNums = [];
        SixtempCurrNum = [];
        SixtempCurrNums = [];
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    UnitAreaClass.prototype.UpWindowData = function () {
    };
    /**
     * 初始化事件消息
     */
    UnitAreaClass.prototype.initMessage = function () {
    };
    //检测当前类型，执行对应类型的方法
    UnitAreaClass.prototype.currTypeDown = function (e) {
        if (this.returnBoo || this._touchStatus == true) {
            return;
        }
        if (this._touchStatus == false) {
            // //开始游戏，发给父级，计时计步
            // this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,'startTouch'));
            var mc = e.currentTarget;
            this.currObj = mc;
            this.oldX = e.stageX;
            this.oldY = e.stageY;
            this.prevX = mc.x;
            this.prevY = mc.y;
            this._distance.x = e.stageX - this.currObj.x;
            this._distance.y = e.stageY - this.currObj.y;
            this.checkBoo = false;
            this._touchStatus = true;
            this.checkAroundAllowLocation(); // 检测当前对象在数组中的位置，并判断四周是否有可移动位置
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.currTypeMove, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.currTypeEnd, this);
            // console.log("当前对象的类型ID是："+mc.id+"___当前对象的下标是：_"+mc.indexNums);
        }
    };
    UnitAreaClass.prototype.currTypeMove = function (e) {
        if (this.returnBoo) {
            return;
        }
        if (this._touchStatus == true) {
            // this.currObj.x = e.stageX - this._distance.x;
            // this.currObj.y = e.stageY - this._distance.y;
            if (this.checkBoo == false) {
                this.newX = e.stageX;
                this.newY = e.stageY;
                this.currAngle = this.angle({ x: this.oldX, y: this.oldY }, { x: this.newX, y: this.newY });
                this.distanceSum = this._public.twoPointDistance(this.oldX, this.oldY, this.newX, this.newY); //计算两点距离，超出范围则赋值
                if (this.distanceSum >= this.directionAround) {
                    this.checkBoo = true;
                    // console.log('********本轮方向是：'+this.currAngle+'*******');
                }
            }
            if (this.currAngle == "left" || this.currAngle == "right") {
                this.moveDirWH = "H";
            }
            else if (this.currAngle == "top" || this.currAngle == "low") {
                this.moveDirWH = "V";
            }
            if (this.moveDirWH == "H") {
                //判断当前对象，在水平方向是否超出可移动范围
                if (this.leftAround != 0) {
                    this.currObj.x = e.stageX - this._distance.x;
                }
                else if (this.rightAround != 0) {
                    this.currObj.x = e.stageX - this._distance.x;
                }
                if (this.currObj.x <= this.prevX - (80 * this.leftAround)) {
                    this.currObj.x = this.prevX - (80 * this.leftAround);
                }
                else if (this.currObj.x >= this.prevX + (80 * this.rightAround)) {
                    this.currObj.x = this.prevX + (80 * this.rightAround);
                }
            }
            else if (this.moveDirWH == "V") {
                //判断当前对象，在垂直方向是否超出可移动范围
                if (this.topAround != 0) {
                    this.currObj.y = e.stageY - this._distance.y;
                }
                else if (this.lowAround != 0) {
                    this.currObj.y = e.stageY - this._distance.y;
                }
                if (this.currObj.y <= this.prevY - (80 * this.topAround)) {
                    this.currObj.y = this.prevY - (80 * this.topAround);
                }
                else if (this.currObj.y >= this.prevY + (80 * this.lowAround)) {
                    this.currObj.y = this.prevY + (80 * this.lowAround);
                }
            }
        }
    };
    //检测鼠标滑动方向
    UnitAreaClass.prototype.currTypeEnd = function (e) {
        if (this.returnBoo) {
            return;
        }
        var mc = e.currentTarget;
        var num = 0, i, directionStr = "", currAngle = "", moveDirWH = "", multipleNumber = 0;
        this._touchStatus = false;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.currTypeMove, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.currTypeEnd, this);
        this.newX = e.stageX;
        this.newY = e.stageY;
        currAngle = this.angle({ x: this.oldX, y: this.oldY }, { x: this.newX, y: this.newY });
        this.distanceSum = this._public.twoPointDistance(this.prevX, this.prevY, this.currObj.x, this.currObj.y); //计算两点距离，超出范围则赋值
        multipleNumber = Math.ceil(this.distanceSum);
        num = Math.round(multipleNumber / 80);
        console.log('移动倍数：' + num);
        if (num == 0) {
            egret.Tween.get(this.currObj).to({ x: this.prevX, y: this.prevY }, this.speedTime).call(this.callReturnHander, this);
            return;
        }
        if (currAngle == "left" || currAngle == "right") {
            moveDirWH = "H";
        }
        else if (currAngle == "top" || currAngle == "low") {
            moveDirWH = "V";
        }
        if (currAngle == this.currAngle) {
            console.log('两次方向判定一致');
            this.currentTatgetMoveHander(currAngle, num);
        }
        else {
            console.log('两次方向判定不一致,并且鼠标有移出舞台行为');
            if (moveDirWH == this.moveDirWH) {
                console.log('type==1:   ' + currAngle);
                //超出舞台后，两次的方向不一致，但在一个水平线
                this.currentTatgetMoveHander(currAngle, num);
                this.currAngle = currAngle;
            }
            else {
                console.log('type==2');
                //超出舞台后，两次的方向不一致，并且不在一个水平线
                this.currentTatgetMoveHander(this.currAngle, num);
            }
        }
        switch (this.currObj.id) {
            case 1:
                for (i = 1; i <= num; i++) {
                    this.judgeDirectionTypeOneHander();
                }
                break;
            case 2:
                for (i = 1; i <= num; i++) {
                    this.judgeDirectionTypeTwoHander();
                }
                break;
            case 3:
                for (i = 1; i <= num; i++) {
                    this.judgeDirectionTypeThreeHander();
                }
                break;
            case 4:
                for (i = 1; i <= num; i++) {
                    this.judgeDirectionTypeFourHander();
                }
                if (this.currObj.indexNums[0].toString() == [this.answerPoint.x, this.answerPoint.y].toString()) {
                    this.currGameOverClick();
                    console.log('over');
                    return;
                }
                break;
            case 5:
                for (i = 1; i <= num; i++) {
                    this.judgeDirectionTypeFiveHander();
                }
                break;
            case 6:
                for (i = 1; i <= num; i++) {
                    this.judgeDirectionTypeSixHander();
                }
                break;
        }
        console.log(this._copyStagePointArr);
        //开始游戏，发给父级，计时计步
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, 'startTouch'));
    };
    UnitAreaClass.prototype.currentTatgetMoveHander = function (str, num) {
        switch (str) {
            case "top":
                egret.Tween.get(this.currObj).to({ x: this.prevX, y: this.prevY - (num * 80) }, this.speedTime).call(this.callReturnHander, this);
                break;
            case "low":
                egret.Tween.get(this.currObj).to({ x: this.prevX, y: this.prevY + (num * 80) }, this.speedTime).call(this.callReturnHander, this);
                break;
            case "left":
                egret.Tween.get(this.currObj).to({ x: this.prevX - (num * 80), y: this.prevY }, this.speedTime).call(this.callReturnHander, this);
                break;
            case "right":
                egret.Tween.get(this.currObj).to({ x: this.prevX + (num * 80), y: this.prevY }, this.speedTime).call(this.callReturnHander, this);
                break;
        }
    };
    //判断方向-类型1
    UnitAreaClass.prototype.judgeDirectionTypeOneHander = function () {
        // console.log("类型：1");
        var currIndexA, currIndexB, currObjArrNum;
        var currArrA = new Array();
        var currArrB = new Array();
        var boo = false;
        currArrA = [];
        currArrB = [];
        currIndexA = this.currObj.indexNums[0];
        currIndexB = this.currObj.indexNums[1];
        this.directionStr = "";
        if (this.currAngle == "top") {
            // console.log("无超出边界&&向上检测ok");
            this.directionStr = "top";
            currArrA = [currIndexA, currIndexB];
            currArrB = [currIndexA, currIndexB - 1];
            boo = true;
        }
        if (this.currAngle == "low") {
            // console.log("无超出边界&&向下检测ok");
            this.directionStr = "low";
            currArrA = [currIndexA, currIndexB];
            currArrB = [currIndexA, currIndexB + 1];
            boo = true;
        }
        if (this.currAngle == "left") {
            // console.log("无超出边界&&向左检测ok");
            this.directionStr = "left";
            currArrA = [currIndexA, currIndexB];
            currArrB = [currIndexA - 1, currIndexB];
            boo = true;
        }
        if (this.currAngle == "right") {
            // console.log("无超出边界&&向右检测ok");
            this.directionStr = "right";
            currArrA = [currIndexA, currIndexB];
            currArrB = [currIndexA + 1, currIndexB];
            boo = true;
        }
        if (boo == true) {
            this._public.typeOneHander(this._copyStagePointArr, currArrA, currArrB);
            this.typeOneReasonFineHitObjHander(currArrB);
            this.typeOneExchangeDataHander();
        }
    };
    //判断方向-类型2
    UnitAreaClass.prototype.judgeDirectionTypeTwoHander = function () {
        // console.log("类型：2_____下标："+this.currObj.indexNums);
        var currIndexA1, currIndexA2, currIndexB1, currIndexB2;
        var currArrA = new Array();
        var currArrB = new Array();
        var boo = false;
        currArrA = [];
        currArrB = [];
        currIndexA1 = this.currObj.indexNums[0][0];
        currIndexA2 = this.currObj.indexNums[0][1];
        currIndexB1 = this.currObj.indexNums[1][0];
        currIndexB2 = this.currObj.indexNums[1][1];
        this.directionStr = "";
        //向上判断，需要一位零
        if (this.currAngle == "top") {
            // console.log("无超出边界&&向上检测ok");
            this.directionStr = "top";
            currArrA = [[currIndexA1, currIndexA2], [currIndexA1, currIndexA2 + 1]];
            currArrB = [currIndexA1, currIndexA2 - 1];
            boo = true;
        }
        //向下判断，需要一位零
        if (this.currAngle == "low") {
            // console.log("无超出边界&&向下检测ok");
            this.directionStr = "low";
            currArrA = [[currIndexB1, currIndexB2 - 1], [currIndexB1, currIndexB2]];
            currArrB = [currIndexB1, currIndexB2 + 1];
            boo = true;
        }
        //向左判断，需要两位零
        if (this.currAngle == "left") {
            // console.log("无超出边界&&向左检测ok");
            this.directionStr = "left";
            currArrA = [[currIndexA1, currIndexA2], [currIndexB1, currIndexB2]];
            currArrB = [[currIndexA1 - 1, currIndexA2], [currIndexB1 - 1, currIndexB2]];
            boo = true;
        }
        //向右判断，需要两位零
        if (this.currAngle == "right") {
            // console.log("无超出边界&&向右检测ok");
            this.directionStr = "right";
            currArrA = [[currIndexA1, currIndexA2], [currIndexB1, currIndexB2]];
            currArrB = [[currIndexA1 + 1, currIndexA2], [currIndexB1 + 1, currIndexB2]];
            boo = true;
        }
        if (boo == true) {
            this._public.typeTwoHander(this._copyStagePointArr, currArrA, currArrB, this.directionStr);
            this.typeTwoReasonFineHitObjHander(currArrB, this.directionStr);
        }
    };
    //判断方向-类型3
    UnitAreaClass.prototype.judgeDirectionTypeThreeHander = function () {
        // console.log("类型：3")
        var currIndexA1, currIndexA2, currIndexB1, currIndexB2;
        var currArrA = new Array();
        var currArrB = new Array();
        var boo = false;
        currArrA = [];
        currArrB = [];
        currIndexA1 = this.currObj.indexNums[0][0];
        currIndexA2 = this.currObj.indexNums[0][1];
        currIndexB1 = this.currObj.indexNums[1][0];
        currIndexB2 = this.currObj.indexNums[1][1];
        if (this.currAngle == "top") {
            boo = true;
            currArrA = [[currIndexA1, currIndexB2], [currIndexA1 + 1, currIndexA2]];
            currArrB = [[currIndexA1, currIndexA2 - 1], [currIndexA1 + 1, currIndexA2 - 1]];
        }
        else if (this.currAngle == "low") {
            boo = true;
            currArrA = [[currIndexA1, currIndexA2], [currIndexA1 + 1, currIndexA2]];
            currArrB = [[currIndexA1, currIndexA2 + 1], [currIndexB1, currIndexB2 + 1]];
        }
        else if (this.currAngle == "left") {
            boo = true;
            currArrA = [[currIndexA1, currIndexA2], [currIndexB1, currIndexB2]];
            currArrB = [currIndexA1 - 1, currIndexA2];
        }
        else if (this.currAngle == "right") {
            boo = true;
            currArrA = [[currIndexA1, currIndexA2], [currIndexB1, currIndexB2]];
            currArrB = [currIndexB1 + 1, currIndexB2];
        }
        if (boo == true) {
            this._public.typeThreeHander(this._copyStagePointArr, currArrA, currArrB, this.currAngle);
            this.typeThreeReasonFineHitObjHander(currArrB, this.currAngle);
        }
    };
    //判断方向-类型4
    UnitAreaClass.prototype.judgeDirectionTypeFourHander = function () {
        // console.log("类型：4");
        var currIndexA1, currIndexA2, currIndexB1, currIndexB2, currIndexC1, currIndexC2, currIndexD1, currIndexD2;
        var currArrA = new Array();
        var currArrB = new Array();
        var boo = false;
        currArrA = [];
        currArrB = [];
        currIndexA1 = this.currObj.indexNums[0][0];
        currIndexA2 = this.currObj.indexNums[0][1];
        currIndexB1 = this.currObj.indexNums[1][0];
        currIndexB2 = this.currObj.indexNums[1][1];
        currIndexC1 = this.currObj.indexNums[2][0];
        currIndexC2 = this.currObj.indexNums[2][1];
        currIndexD1 = this.currObj.indexNums[3][0];
        currIndexD2 = this.currObj.indexNums[3][1];
        this.directionStr = "";
        //向下判断，需要两位零
        if (this.currAngle == "low") {
            // console.log("无超出边界&&向下检测ok");	
            this.directionStr = "low";
            currArrA = [[currIndexA1, currIndexA2], [currIndexB1, currIndexB2], [currIndexC1, currIndexC2], [currIndexD1, currIndexD2]];
            currArrB = [[currIndexC1, currIndexC2 + 1], [currIndexD1, currIndexD2 + 1]];
            boo = true;
        }
        //向上判断，需要两位零
        if (this.currAngle == "top") {
            // console.log("无超出边界&&向上检测ok");	
            this.directionStr = "top";
            currArrA = [[currIndexA1, currIndexA2], [currIndexB1, currIndexB2], [currIndexC1, currIndexC2], [currIndexD1, currIndexD2]];
            currArrB = [[currIndexA1, currIndexA2 - 1], [currIndexB1, currIndexB2 - 1]];
            boo = true;
        }
        //向左判断，需要两位零
        if (this.currAngle == "left") {
            // console.log("无超出边界&&向左检测ok");	
            this.directionStr = "left";
            currArrA = [[currIndexA1, currIndexA2], [currIndexB1, currIndexB2], [currIndexC1, currIndexC2], [currIndexD1, currIndexD2]];
            currArrB = [[currIndexA1 - 1, currIndexA2], [currIndexC1 - 1, currIndexC2]];
            boo = true;
        }
        //向右判断，需要两位零
        if (this.currAngle == "right") {
            // console.log("无超出边界&&向右检测ok");	
            this.directionStr = "right";
            currArrA = [[currIndexA1, currIndexA2], [currIndexB1, currIndexB2], [currIndexC1, currIndexC2], [currIndexD1, currIndexD2]];
            currArrB = [[currIndexB1 + 1, currIndexB2], [currIndexD1 + 1, currIndexD2]];
            boo = true;
        }
        if (boo == true) {
            this._public.typeFourHander(this._copyStagePointArr, currArrA, currArrB, this.directionStr);
            this.typeFourReasonFineHitObjHander(currArrB, this.directionStr);
        }
    };
    //判断方向-类型5
    UnitAreaClass.prototype.judgeDirectionTypeFiveHander = function () {
        // console.log("类型：5_____下标："+this.currObj.indexNums);
        var currIndexA1, currIndexA2, currIndexB1, currIndexB2, currIndexC1, currIndexC2;
        var currArrA = new Array();
        var currArrB = new Array();
        var currArrC = new Array();
        var boo = false;
        currArrA = [];
        currArrB = [];
        currArrC = [];
        currIndexA1 = this.currObj.indexNums[0][0];
        currIndexA2 = this.currObj.indexNums[0][1];
        currIndexB1 = this.currObj.indexNums[1][0];
        currIndexB2 = this.currObj.indexNums[1][1];
        currIndexC1 = this.currObj.indexNums[2][0];
        currIndexC2 = this.currObj.indexNums[2][1];
        this.directionStr = "";
        if (this.currAngle == "top") {
            currArrA = [[currIndexA1, currIndexA2], [currIndexA1, currIndexA2 + 1], [currIndexA1, currIndexA2 + 2]];
            currArrB = [currIndexA1, currIndexA2 - 1];
            boo = true;
        }
        else if (this.currAngle == "low") {
            currArrA = [[currIndexB1, currIndexB2 - 1], [currIndexB1, currIndexB2], [currIndexB1, currIndexB2 + 1]];
            currArrB = [currIndexB1, currIndexB2 + 2];
            boo = true;
        }
        else if (this.currAngle == "left") {
            boo = true;
        }
        else if (this.currAngle == "right") {
            boo = true;
        }
        if (boo == true) {
            this._public.typeFiveHander(this._copyStagePointArr, currArrA, currArrB, this.currAngle);
            this.typeFiveReasonFiveHitObjHander(currArrB, this.currAngle);
        }
    };
    //判断方向-类型6
    UnitAreaClass.prototype.judgeDirectionTypeSixHander = function () {
        // console.log("类型：6_____下标："+this.currObj.indexNums);
        var currIndexA1, currIndexA2, currIndexB1, currIndexB2, currIndexC1, currIndexC2;
        var currArrA = new Array();
        var currArrB = new Array();
        var currArrC = new Array();
        var boo = false;
        currArrA = [];
        currArrB = [];
        currArrC = [];
        currIndexA1 = this.currObj.indexNums[0][0];
        currIndexA2 = this.currObj.indexNums[0][1];
        currIndexB1 = this.currObj.indexNums[1][0];
        currIndexB2 = this.currObj.indexNums[1][1];
        currIndexC1 = this.currObj.indexNums[2][0];
        currIndexC2 = this.currObj.indexNums[2][1];
        this.directionStr = "";
        if (this.currAngle == "top") {
            boo = true;
            currArrA = [[currIndexA1, currIndexA2], [currIndexB1, currIndexB2], [currIndexC1, currIndexC2]];
            currArrB = [[currIndexA1, currIndexA2 - 1], [currIndexB1, currIndexB2 - 1], [currIndexC1, currIndexC2 - 1]];
            console.log(currArrA);
            console.log(currArrB);
        }
        else if (this.currAngle == "low") {
            boo = true;
            currArrA = [[currIndexA1, currIndexA2], [currIndexB1, currIndexB2], [currIndexC1, currIndexC2]];
            currArrB = [[currIndexA1, currIndexA2 + 1], [currIndexB1, currIndexB2 + 1], [currIndexC1, currIndexC2 + 1]];
            console.log(currArrA);
            console.log(currArrB);
        }
        else if (this.currAngle == "left") {
            currArrA = [[currIndexA1, currIndexA2], [currIndexB1, currIndexB2], [currIndexC1, currIndexC2]];
            currArrB = [currIndexA1 - 1, currIndexA2];
            boo = true;
        }
        else if (this.currAngle == "right") {
            currArrA = [[currIndexA1, currIndexA2], [currIndexB1, currIndexB2], [currIndexC1, currIndexC2]];
            currArrB = [currIndexC1 + 1, currIndexC2];
            boo = true;
        }
        if (boo == true) {
            this._public.typeSixeHander(this._copyStagePointArr, currArrA, currArrB, this.currAngle);
            this.typeSixReasonSixHitObjHander(currArrB, this.currAngle);
        }
    };
    //类型一根据hitobj下标，查找在spriteArr数组的位置，并赋值给当前临时对象变量this.hitObj;
    UnitAreaClass.prototype.typeOneReasonFineHitObjHander = function (currArrB) {
        var boo = false;
        var i, l, obj, hitObj;
        for (i = 0; i < this.spriteArr.length; i++) {
            obj = this.spriteArr[i].indexNums;
            hitObj = this.spriteArr[i];
            boo = true;
            for (l = 0; l < obj.length; l++) {
                if (currArrB[l] != obj[l]) {
                    boo = false;
                    break;
                }
            }
            if (boo == true) {
                // console.log("arr1:  "+" == "+currArrB+"obj: "+obj);
                this.hitObj = hitObj;
            }
        }
    };
    //类型一根据数据交换数组内容，更改下标
    UnitAreaClass.prototype.typeOneExchangeDataHander = function () {
        var ox, oy, currIndex;
        this.returnBoo = true;
        currIndex = this.currObj.indexNums;
        this.currObj.indexNums = this.hitObj.indexNums;
        this.hitObj.indexNums = currIndex;
    };
    //类型二
    UnitAreaClass.prototype.typeTwoReasonFineHitObjHander = function (currArrB, directionStr) {
        // console.log(this._copyStagePointArr);
        var boo = false;
        var i, l, j, obj, hitObj, hitObjA, hitObjB, ox, oy, count = 0, oxA, oyA, oxB, oyB, tempArr = new Array(), numA, numB, numC, numD;
        //检查类型为0的对象，并赋值给hitobj	****************Main,,,检测对象的数量是几个
        if (directionStr == "top" || directionStr == "low") {
            for (i = 0; i < this.spriteArr.length; i++) {
                obj = this.spriteArr[i].indexNums;
                hitObj = this.spriteArr[i];
                boo = true;
                for (l = 0; l < obj.length; l++) {
                    if (currArrB[l] != obj[l]) {
                        boo = false;
                        break;
                    }
                }
                if (boo == true) {
                    this.hitObj = hitObj;
                }
            }
        }
        //找到两个零的对象
        if (directionStr == "left" || directionStr == "right") {
            for (j = 0; j < 2; j++) {
                tempArr = currArrB[count];
                for (i = 0; i < this.spriteArr.length; i++) {
                    obj = this.spriteArr[i].indexNums;
                    hitObj = this.spriteArr[i];
                    boo = true;
                    for (l = 0; l < obj.length; l++) {
                        if (tempArr[l] != obj[l]) {
                            boo = false;
                            break;
                        }
                    }
                    if (boo == true) {
                        if (count == 0) {
                            this.hitObjA = hitObj;
                            count += 1;
                        }
                        if (count == 1) {
                            this.hitObjB = hitObj;
                        }
                    }
                }
            }
        }
        switch (directionStr) {
            case "top":
                this.returnBoo = true;
                numA = this.currObj.indexNums[0];
                numB = this.currObj.indexNums[1];
                numC = this.hitObj.indexNums;
                this.currObj.indexNums[0] = numC;
                this.currObj.indexNums[1] = numA;
                this.hitObj.indexNums = numB;
                break;
            case "low":
                this.returnBoo = true;
                numA = this.currObj.indexNums[0];
                numB = this.currObj.indexNums[1];
                numC = this.hitObj.indexNums;
                this.currObj.indexNums[1] = numC;
                this.currObj.indexNums[0] = numB;
                this.hitObj.indexNums = numA;
                break;
            case "left":
                this.returnBoo = true;
                numA = this.currObj.indexNums[0];
                numB = this.currObj.indexNums[1];
                numC = this.hitObjA.indexNums;
                numD = this.hitObjB.indexNums;
                this.currObj.indexNums[0] = numC;
                this.currObj.indexNums[1] = numD;
                this.hitObjA.indexNums = numA;
                this.hitObjB.indexNums = numB;
                break;
            case "right":
                this.returnBoo = true;
                numA = this.currObj.indexNums[0];
                numB = this.currObj.indexNums[1];
                numC = this.hitObjA.indexNums;
                numD = this.hitObjB.indexNums;
                this.currObj.indexNums[0] = numC;
                this.currObj.indexNums[1] = numD;
                this.hitObjA.indexNums = numA;
                this.hitObjB.indexNums = numB;
                break;
        }
    };
    //类型三
    UnitAreaClass.prototype.typeThreeReasonFineHitObjHander = function (currArrB, directionStr) {
        var boo = false;
        var i, l, j, obj, hitObj, hitObjA, hitObjB, ox, oy, count = 0, tempArr = new Array(), numA, numB, numC, numD;
        //检查类型为0的对象，并赋值给hitobj	****************Main,,,检测对象的数量是几个
        if (directionStr == "left" || directionStr == "right") {
            for (i = 0; i < this.spriteArr.length; i++) {
                obj = this.spriteArr[i].indexNums;
                hitObj = this.spriteArr[i];
                boo = true;
                for (l = 0; l < obj.length; l++) {
                    if (currArrB[l] != obj[l]) {
                        boo = false;
                        break;
                    }
                }
                if (boo == true) {
                    // console.log("arr1:  "+" == "+currArrB+"obj: "+obj);
                    this.hitObj = hitObj;
                }
            }
        }
        if (directionStr == "top" || directionStr == "low") {
            for (j = 0; j < 2; j++) {
                tempArr = currArrB[count];
                for (i = 0; i < this.spriteArr.length; i++) {
                    obj = this.spriteArr[i].indexNums;
                    hitObj = this.spriteArr[i];
                    boo = true;
                    for (l = 0; l < obj.length; l++) {
                        if (tempArr[l] != obj[l]) {
                            boo = false;
                            break;
                        }
                    }
                    if (boo == true) {
                        if (count == 0) {
                            this.hitObjA = hitObj;
                            count += 1;
                        }
                        if (count == 1) {
                            this.hitObjB = hitObj;
                        }
                    }
                }
            }
        }
        switch (directionStr) {
            case "top":
                this.returnBoo = true;
                numA = this.currObj.indexNums[0];
                numB = this.currObj.indexNums[1];
                numC = this.hitObjA.indexNums;
                numD = this.hitObjB.indexNums;
                this.currObj.indexNums[0] = numC;
                this.currObj.indexNums[1] = numD;
                this.hitObjA.indexNums = numA;
                this.hitObjB.indexNums = numB;
                break;
            case "low":
                this.returnBoo = true;
                numA = this.currObj.indexNums[0];
                numB = this.currObj.indexNums[1];
                numC = this.hitObjA.indexNums;
                numD = this.hitObjB.indexNums;
                this.currObj.indexNums[0] = numC;
                this.currObj.indexNums[1] = numD;
                this.hitObjA.indexNums = numA;
                this.hitObjB.indexNums = numB;
                break;
            case "left":
                this.returnBoo = true;
                numA = this.currObj.indexNums[0];
                numB = this.currObj.indexNums[1];
                numC = this.hitObj.indexNums;
                this.currObj.indexNums[0] = numC;
                this.currObj.indexNums[1] = numA;
                this.hitObj.indexNums = numB;
                break;
            case "right":
                this.returnBoo = true;
                numA = this.currObj.indexNums[0];
                numB = this.currObj.indexNums[1];
                numC = this.hitObj.indexNums;
                this.currObj.indexNums[0] = numB;
                this.currObj.indexNums[1] = numC;
                this.hitObj.indexNums = numA;
                break;
        }
        // this.currObj=this.hitObj=null;
    };
    //类型四
    UnitAreaClass.prototype.typeFourReasonFineHitObjHander = function (currArrB, directionStr) {
        var boo = false;
        var i, l, j, obj, hitObj, hitObjA, hitObjB, ox, oy, count = 0, tempArr = new Array(), numA, numB, numC, numD, numE, numF;
        for (j = 0; j < 2; j++) {
            tempArr = currArrB[count];
            for (i = 0; i < this.spriteArr.length; i++) {
                obj = this.spriteArr[i].indexNums;
                hitObj = this.spriteArr[i];
                boo = true;
                for (l = 0; l < obj.length; l++) {
                    if (tempArr[l] != obj[l]) {
                        boo = false;
                        break;
                    }
                }
                if (boo == true) {
                    if (count == 0) {
                        this.hitObjA = hitObj;
                        count += 1;
                    }
                    if (count == 1) {
                        this.hitObjB = hitObj;
                    }
                }
            }
        }
        switch (directionStr) {
            case "top":
                this.returnBoo = true;
                numA = this.currObj.indexNums[0];
                numB = this.currObj.indexNums[1];
                numC = this.currObj.indexNums[2];
                numD = this.currObj.indexNums[3];
                numE = this.hitObjA.indexNums;
                numF = this.hitObjB.indexNums;
                this.currObj.indexNums[0] = numE;
                this.currObj.indexNums[1] = numF;
                this.currObj.indexNums[2] = numA;
                this.currObj.indexNums[3] = numB;
                this.hitObjA.indexNums = numC;
                this.hitObjB.indexNums = numD;
                break;
            case "low":
                this.returnBoo = true;
                numA = this.currObj.indexNums[0];
                numB = this.currObj.indexNums[1];
                numC = this.currObj.indexNums[2];
                numD = this.currObj.indexNums[3];
                numE = this.hitObjA.indexNums;
                numF = this.hitObjB.indexNums;
                this.currObj.indexNums[0] = numC;
                this.currObj.indexNums[1] = numD;
                this.currObj.indexNums[2] = numE;
                this.currObj.indexNums[3] = numF;
                this.hitObjA.indexNums = numA;
                this.hitObjB.indexNums = numB;
                break;
            case "left":
                this.returnBoo = true;
                numA = this.currObj.indexNums[0];
                numB = this.currObj.indexNums[1];
                numC = this.currObj.indexNums[2];
                numD = this.currObj.indexNums[3];
                numE = this.hitObjA.indexNums;
                numF = this.hitObjB.indexNums;
                this.currObj.indexNums[0] = numE;
                this.currObj.indexNums[1] = numA;
                this.currObj.indexNums[2] = numF;
                this.currObj.indexNums[3] = numC;
                this.hitObjA.indexNums = numB;
                this.hitObjB.indexNums = numD;
                break;
            case "right":
                this.returnBoo = true;
                numA = this.currObj.indexNums[0];
                numB = this.currObj.indexNums[1];
                numC = this.currObj.indexNums[2];
                numD = this.currObj.indexNums[3];
                numE = this.hitObjA.indexNums;
                numF = this.hitObjB.indexNums;
                this.currObj.indexNums[0] = numB;
                this.currObj.indexNums[1] = numE;
                this.currObj.indexNums[2] = numD;
                this.currObj.indexNums[3] = numF;
                this.hitObjA.indexNums = numA;
                this.hitObjB.indexNums = numC;
                break;
        }
    };
    //类型五
    UnitAreaClass.prototype.typeFiveReasonFiveHitObjHander = function (currArrB, directionStr) {
        // console.log(this._copyStagePointArr);
        var boo = false;
        var i, l, j, obj, hitObj, hitObjA, hitObjB, hitObjC, ox, oy, count = 0, tempArr = new Array(), numA, numB, numC, numD, numE, numF;
        if (directionStr == "top" || directionStr == "low") {
            for (i = 0; i < this.spriteArr.length; i++) {
                obj = this.spriteArr[i].indexNums;
                hitObj = this.spriteArr[i];
                boo = true;
                for (l = 0; l < obj.length; l++) {
                    if (currArrB[l] != obj[l]) {
                        boo = false;
                        break;
                    }
                }
                if (boo == true) {
                    // console.log("arr1:  "+" == "+currArrB+"obj: "+obj);
                    this.hitObj = hitObj;
                }
            }
        }
        switch (directionStr) {
            case "top":
                this.returnBoo = true;
                numA = this.currObj.indexNums[0];
                numB = this.currObj.indexNums[1];
                numC = this.currObj.indexNums[2];
                numD = this.hitObj.indexNums;
                this.currObj.indexNums[0] = numD;
                this.currObj.indexNums[1] = numA;
                this.currObj.indexNums[2] = numB;
                this.hitObj.indexNums = numC;
                break;
            case "low":
                this.returnBoo = true;
                numA = this.currObj.indexNums[0];
                numB = this.currObj.indexNums[1];
                numC = this.currObj.indexNums[2];
                numD = this.hitObj.indexNums;
                this.currObj.indexNums[0] = numB;
                this.currObj.indexNums[1] = numC;
                this.currObj.indexNums[2] = numD;
                this.hitObj.indexNums = numA;
                break;
        }
    };
    //类型六
    UnitAreaClass.prototype.typeSixReasonSixHitObjHander = function (currArrB, directionStr) {
        // console.log(this._copyStagePointArr);
        var boo = false;
        var i, l, j, obj, hitObj, hitObjA, hitObjB, hitObjC, ox, oy, count = 0, tempArr = new Array(), numA, numB, numC, numD, numE, numF;
        if (directionStr == "left" || directionStr == "right") {
            for (i = 0; i < this.spriteArr.length; i++) {
                obj = this.spriteArr[i].indexNums;
                hitObj = this.spriteArr[i];
                boo = true;
                for (l = 0; l < obj.length; l++) {
                    if (currArrB[l] != obj[l]) {
                        boo = false;
                        break;
                    }
                }
                if (boo == true) {
                    // console.log("arr1:  "+" == "+currArrB+"obj: "+obj);
                    this.hitObj = hitObj;
                }
            }
        }
        switch (directionStr) {
            case "left":
                ox = this.currObj.x;
                oy = this.currObj.y;
                egret.Tween.get(this.currObj).to({ x: this.hitObj.x, y: this.hitObj.y }, this.speedTime).call(this.callReturnHander, this);
                this.returnBoo = true;
                this.hitObj.x = ox + 160;
                this.hitObj.y = oy;
                numA = this.currObj.indexNums[0];
                numB = this.currObj.indexNums[1];
                numC = this.currObj.indexNums[2];
                numD = this.hitObj.indexNums;
                this.currObj.indexNums[0] = numD;
                this.currObj.indexNums[1] = numA;
                this.currObj.indexNums[2] = numB;
                this.hitObj.indexNums = numC;
                break;
            case "right":
                ox = this.currObj.x;
                oy = this.currObj.y;
                egret.Tween.get(this.currObj).to({ x: this.hitObj.x - 160, y: this.hitObj.y }, this.speedTime).call(this.callReturnHander, this);
                this.returnBoo = true;
                this.hitObj.x = ox;
                this.hitObj.y = oy;
                numA = this.currObj.indexNums[0];
                numB = this.currObj.indexNums[1];
                numC = this.currObj.indexNums[2];
                numD = this.hitObj.indexNums;
                this.currObj.indexNums[0] = numB;
                this.currObj.indexNums[1] = numC;
                this.currObj.indexNums[2] = numD;
                this.hitObj.indexNums = numA;
                break;
        }
    };
    //当前对象位移结束后，方可二次点击
    UnitAreaClass.prototype.callReturnHander = function () {
        //  console.log('当前对象位移结束'+this.returnBoo)
        this.returnBoo = false;
    };
    //计算两点之间的角度，判断当前对象的滑动方向
    UnitAreaClass.prototype.angle = function (start, end) {
        var _angle = Math.atan2((end.y - start.y), (end.x - start.x)); //弧度  0.6435011087932844
        var theta = _angle * (180 / Math.PI); //角度  36.86989764584402
        var anngleDirection = "";
        // console.log(theta);
        if (theta > -135 && theta < -45) {
            anngleDirection = "top";
        }
        else if (theta >= -45 && theta <= 45) {
            anngleDirection = "right";
        }
        else if (theta > 45 && theta <= 135) {
            anngleDirection = "low";
        }
        else if (theta <= -135 && theta >= -180 || theta > 135 && theta <= 180) {
            anngleDirection = "left";
        }
        return anngleDirection;
    };
    //游戏结束
    UnitAreaClass.prototype.currGameOverClick = function () {
        egret.Tween.get(this.currObj).to({ x: this.currObj.x, y: this.currObj.y + (this.currObj.height), alpha: 0 }, 600);
        var i, obj;
        for (i = 0; i < this.spriteArr.length; i++) {
            obj = this.spriteArr[i];
            obj.touchEnabled = false;
        }
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, 'gameover'));
        this._touchStatus = true;
        this.returnBoo = true;
    };
    //刷新按钮
    UnitAreaClass.prototype.restBtnClick = function (e) {
        this.resetEvent();
    };
    //刷新方法
    UnitAreaClass.prototype.resetEvent = function () {
        this.DestroyOut();
        // this.touchEnabled=true;
        // this.returnBoo=false;
        // this.checkBoo=false;
        // this.directionStr="";
        // this.currAngle="";
        // this.topAround=0;
        // this.lowAround=0;
        // this.leftAround=0;
        // this.rightAround=0;
        // this.moveDirWH="";
        // this.distanceSum=0;
        // this.oldX=this.oldY=this.newX=this.newY=this.prevX=this.prevY=0;
        // this.scopeX=this._copyStagePointArr[0].length;
        // this.longitudinalY=this._copyStagePointArr.length;
        // this._copyStagePointArr=[];
        // var i,obj;
        // for (i=0;i<this._stagePointArr.length;i++){
        // 	this._copyStagePointArr[i]=this._stagePointArr[i].slice();
        // }
        // for (i=0;i<this.spriteArr.length;i++){
        // 	obj=this.spriteArr[i];
        // 	obj.x=obj.ox;
        // 	obj.y=obj.oy;
        // 	obj.indexNums=obj.initIndex.slice();
        // 	if(obj.id==0){continue}
        // 	obj.touchEnabled=true;
        // }
        // if(this.currObj!=null){
        // 	this.currObj.alpha=1;
        // 	this.currObj=this.hitObj=this.hitObjA=this.hitObjB=null;
        // }
    };
    //检查当前对象的周围，是否有可移动的区域，并返回
    UnitAreaClass.prototype.checkCurrTatgetAround = function (numId) {
        var aroundArr = [], topDir, lowDir, leftDir, rightDir, xDir, yDir, topNum = 0, lowNum = 0, leftNum = 0, rightNum = 0;
        if (numId == 1) {
            topNum = 0;
            lowNum = 0;
            leftNum = 0;
            rightNum = 0;
            xDir = this.currObj.indexNums[0];
            yDir = this.currObj.indexNums[1];
            //上
            while (yDir - 1 >= 0 && this._copyStagePointArr[yDir - 1][xDir] == 0) {
                yDir = yDir - 1;
                topNum++;
            }
            xDir = this.currObj.indexNums[0];
            yDir = this.currObj.indexNums[1];
            //下
            while (yDir + 1 != this.longitudinalY && this._copyStagePointArr[yDir + 1][xDir] == 0) {
                yDir = yDir + 1;
                lowNum++;
            }
            xDir = this.currObj.indexNums[0];
            yDir = this.currObj.indexNums[1];
            //左
            while (xDir >= 0 && this._copyStagePointArr[yDir][xDir - 1] == 0) {
                xDir = xDir - 1;
                leftNum++;
            }
            xDir = this.currObj.indexNums[0];
            yDir = this.currObj.indexNums[1];
            //右
            while (xDir != this.scopeX && this._copyStagePointArr[yDir][xDir + 1] == 0) {
                xDir = xDir + 1;
                rightNum++;
            }
            aroundArr.push(topNum, lowNum, leftNum, rightNum);
            return aroundArr;
        }
        //2 竖向两格
        if (numId == 2) {
            topNum = 0;
            lowNum = 0;
            leftNum = 0;
            rightNum = 0;
            //上
            xDir = this.currObj.indexNums[0][0];
            yDir = this.currObj.indexNums[0][1];
            while (yDir - 1 >= 0 && this._copyStagePointArr[yDir - 1][xDir] == 0) {
                yDir = yDir - 1;
                topNum++;
            }
            //下
            xDir = this.currObj.indexNums[0][0];
            yDir = this.currObj.indexNums[1][1];
            while (yDir + 1 != this.longitudinalY && this._copyStagePointArr[yDir + 1][xDir] == 0) {
                yDir = yDir + 1;
                lowNum++;
            }
            //左
            xDir = this.currObj.indexNums[0][0];
            yDir = this.currObj.indexNums[0][1];
            while (xDir >= 0 && this._copyStagePointArr[yDir][xDir - 1] == 0 && this._copyStagePointArr[yDir + 1][xDir - 1] == 0) {
                xDir = xDir - 1;
                leftNum++;
            }
            //右
            xDir = this.currObj.indexNums[0][0];
            yDir = this.currObj.indexNums[0][1];
            while (xDir != this.scopeX && this._copyStagePointArr[yDir][xDir + 1] == 0 && this._copyStagePointArr[yDir + 1][xDir + 1] == 0) {
                xDir = xDir + 1;
                rightNum++;
            }
            aroundArr.push(topNum, lowNum, leftNum, rightNum);
            return aroundArr;
        }
        //3	横向两格
        if (numId == 3) {
            topNum = 0;
            lowNum = 0;
            leftNum = 0;
            rightNum = 0;
            aroundArr = [];
            //上
            xDir = this.currObj.indexNums[0][0];
            yDir = this.currObj.indexNums[0][1];
            while (yDir - 1 >= 0 && this._copyStagePointArr[yDir - 1][xDir] == 0 && this._copyStagePointArr[yDir - 1][xDir + 1] == 0) {
                yDir = yDir - 1;
                topNum++;
            }
            //下
            xDir = this.currObj.indexNums[0][0];
            yDir = this.currObj.indexNums[0][1];
            while (yDir + 1 != this.longitudinalY && this._copyStagePointArr[yDir + 1][xDir] == 0 && this._copyStagePointArr[yDir + 1][xDir + 1] == 0) {
                yDir = yDir + 1;
                lowNum++;
            }
            //左
            xDir = this.currObj.indexNums[0][0];
            yDir = this.currObj.indexNums[0][1];
            while (xDir >= 0 && this._copyStagePointArr[yDir][xDir - 1] == 0) {
                xDir = xDir - 1;
                leftNum++;
            }
            //右
            xDir = this.currObj.indexNums[1][0];
            yDir = this.currObj.indexNums[1][1];
            while (xDir != this.scopeX && this._copyStagePointArr[yDir][xDir + 1] == 0) {
                xDir = xDir + 1;
                rightNum++;
            }
            aroundArr.push(topNum, lowNum, leftNum, rightNum);
            return aroundArr;
        }
        //4 四方格
        if (numId == 4) {
            topNum = 0;
            lowNum = 0;
            leftNum = 0;
            rightNum = 0;
            aroundArr = [];
            //上
            xDir = this.currObj.indexNums[0][0];
            yDir = this.currObj.indexNums[0][1];
            while (yDir - 1 >= 0 && this._copyStagePointArr[yDir - 1][xDir] == 0 && this._copyStagePointArr[yDir - 1][xDir + 1] == 0) {
                yDir = yDir - 1;
                topNum++;
            }
            //下
            xDir = this.currObj.indexNums[2][0];
            yDir = this.currObj.indexNums[2][1];
            while (yDir + 1 != this.longitudinalY && this._copyStagePointArr[yDir + 1][xDir] == 0 && this._copyStagePointArr[yDir + 1][xDir + 1] == 0) {
                yDir = yDir + 1;
                lowNum++;
            }
            //左
            xDir = this.currObj.indexNums[0][0];
            yDir = this.currObj.indexNums[0][1];
            while (xDir >= 0 && this._copyStagePointArr[yDir][xDir - 1] == 0 && this._copyStagePointArr[yDir + 1][xDir - 1] == 0) {
                xDir = xDir - 1;
                leftNum++;
            }
            //右
            xDir = this.currObj.indexNums[1][0];
            yDir = this.currObj.indexNums[1][1];
            while (xDir != this.scopeX && this._copyStagePointArr[yDir][xDir + 1] == 0 && this._copyStagePointArr[yDir + 1][xDir + 1] == 0) {
                xDir = xDir + 1;
                rightNum++;
            }
            aroundArr.push(topNum, lowNum, leftNum, rightNum);
            return aroundArr;
        }
        //5 竖向三格
        if (numId == 5) {
            topNum = 0;
            lowNum = 0;
            leftNum = 0;
            rightNum = 0;
            //上
            xDir = this.currObj.indexNums[0][0];
            yDir = this.currObj.indexNums[0][1];
            while (yDir - 1 >= 0 && this._copyStagePointArr[yDir - 1][xDir] == 0) {
                yDir = yDir - 1;
                topNum++;
            }
            //下
            xDir = this.currObj.indexNums[2][0];
            yDir = this.currObj.indexNums[2][1];
            while (yDir + 1 != this.longitudinalY && this._copyStagePointArr[yDir + 1][xDir] == 0) {
                yDir = yDir + 1;
                lowNum++;
            }
            //左
            xDir = this.currObj.indexNums[0][0];
            yDir = this.currObj.indexNums[0][1];
            while (xDir >= 0 && this._copyStagePointArr[yDir][xDir - 1] == 0 && this._copyStagePointArr[yDir + 1][xDir - 1] == 0 && this._copyStagePointArr[yDir + 2][xDir - 1] == 0) {
                xDir = xDir - 1;
                leftNum++;
            }
            //右
            xDir = this.currObj.indexNums[0][0];
            yDir = this.currObj.indexNums[0][1];
            while (xDir != this.scopeX && this._copyStagePointArr[yDir][xDir + 1] == 0 && this._copyStagePointArr[yDir + 1][xDir + 1] == 0 && this._copyStagePointArr[yDir + 2][xDir + 1] == 0) {
                xDir = xDir + 1;
                rightNum++;
            }
            aroundArr.push(topNum, lowNum, leftNum, rightNum);
            return aroundArr;
        }
        //6 横向三格
        if (numId == 6) {
            topNum = 0;
            lowNum = 0;
            leftNum = 0;
            rightNum = 0;
            aroundArr = [];
            //上
            xDir = this.currObj.indexNums[0][0];
            yDir = this.currObj.indexNums[0][1];
            while (yDir - 1 >= 0 && this._copyStagePointArr[yDir - 1][xDir] == 0 && this._copyStagePointArr[yDir - 1][xDir + 1] == 0 && this._copyStagePointArr[yDir - 1][xDir + 2] == 0) {
                yDir = yDir - 1;
                topNum++;
            }
            //下
            xDir = this.currObj.indexNums[0][0];
            yDir = this.currObj.indexNums[0][1];
            while (yDir + 1 != this.longitudinalY && this._copyStagePointArr[yDir + 1][xDir] == 0 && this._copyStagePointArr[yDir + 1][xDir + 1] == 0 && this._copyStagePointArr[yDir + 1][xDir + 2] == 0) {
                yDir = yDir + 1;
                lowNum++;
            }
            //左
            xDir = this.currObj.indexNums[0][0];
            yDir = this.currObj.indexNums[0][1];
            while (xDir >= 0 && this._copyStagePointArr[yDir][xDir - 1] == 0) {
                xDir = xDir - 1;
                leftNum++;
            }
            //右
            xDir = this.currObj.indexNums[2][0];
            yDir = this.currObj.indexNums[2][1];
            while (xDir != this.scopeX && this._copyStagePointArr[yDir][xDir + 1] == 0) {
                xDir = xDir + 1;
                rightNum++;
            }
            aroundArr.push(topNum, lowNum, leftNum, rightNum);
            return aroundArr;
        }
    };
    // 检测当前对象在数组中的位置，并判断四周是否有可移动位置
    UnitAreaClass.prototype.checkAroundAllowLocation = function () {
        // console.log("当前对象的类型ID是："+this.currObj.id+"___当前对象的下标是：_"+this.currObj.indexNums);
        var aroundArr = [];
        aroundArr = this.checkCurrTatgetAround(this.currObj.id);
        this.topAround = aroundArr[0];
        this.lowAround = aroundArr[1];
        this.leftAround = aroundArr[2];
        this.rightAround = aroundArr[3];
        console.log('top:' + this.topAround + '   low:' + this.lowAround + '   left:' + this.leftAround + '   right:' + this.rightAround);
    };
    return UnitAreaClass;
}(BaseContainer));
__reflect(UnitAreaClass.prototype, "UnitAreaClass");
//# sourceMappingURL=UnitAreaClass.js.map