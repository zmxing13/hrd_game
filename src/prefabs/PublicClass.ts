//公共方法类
class PublicClass extends egret.DisplayObjectContainer {
	public constructor() {
		super();
	}

    /**
     * 根据name关键字创建一个Bitmap对象。
     * name属性请参考resources/resource.json配置文件的内容
     */
    public createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name + '_png');
        result.texture = texture;
        return result;
    }


    /**
     * 根据textStr关键字创建一个TextField对象
     * textStr:  文字内容
     * sizeNum:  文字大小 默认30
     * colorStr: 文字颜色 默认白色
    */
    public createTextByName(textStr:string, sizeNum:number=30, colorStr=0xffffff): egret.TextField{
        let textContent:egret.TextField = new egret.TextField;
        textContent.verticalAlign=egret.VerticalAlign.MIDDLE;
        textContent.textAlign=egret.HorizontalAlign.CENTER;
		textContent.fontFamily = "微软雅黑";
        textContent.textColor= colorStr;
        textContent.text=textStr;
        textContent.size=sizeNum;
        textContent.textAlign = egret.HorizontalAlign.RIGHT;  //水平右对齐，相对于 textField 控件自身的 width 与 height
        textContent.verticalAlign = egret.VerticalAlign.TOP;  //垂直上对齐
        return textContent;
    }

    
    /**
     * 清空数组内容返回空数组
     */
    public emptyArray(arr){
        let i,oj;
        for (i=arr.length-1;i>=0;i--){
            oj=arr[i];
            oj.parent.removeChild(oj);
            arr.splice(i,arr.length)
        }
        return arr;
    }



    /**
     * 验证用户名是否符合标准
    */
    public validationUserName(_userName:string=''):string{
        let userName = _userName;
        let returnStr:string;
        let re = /^[0-9a-zA-Z_]*$/g;
        let reg = re.test(userName);
        returnStr = 'pass';//合格
        if(userName.length==0){
            returnStr = '用户名不能为空'
        }else if(userName.length<6){
            returnStr = '用户名不能小于6个字符'
        }else if(userName.length>18){
            returnStr = '用户名不能大于18个字符'
        } else if(reg==false){
            returnStr = '用户名不能有特殊字符'            
        }
        return returnStr;
    }

    /**
     * 验证密码是否符合标准
     * _password        第一次输入密码
     * _passwordExplain 第二次输入的确认密码
     * signBoo          是否是注册
    */
    public validationPassWord(_password:string='',_passwordExplain:string='',_signBoo:boolean=true):string{
        let password = _password;
        let passwordExplain = _passwordExplain;
        let returnStr:string;
        let re = /^[0-9a-zA-Z_]*$/g;
        let reg = re.test(password);
        
        if(_signBoo==true){
            if(password != passwordExplain){
                return '两次密码不一致,请重新输入';
            }
        }
        returnStr = 'pass';//合格
        if(password.length==0){
            returnStr = '密码不能为空'
        }else if(password.length<6){
            returnStr = '密码不能小于6个字符'
        }else if(password.length>18){
            returnStr = '密码不能大于18个字符'
        } else if(reg==false){
            returnStr = '密码不能有特殊字符例如:-,%,*,$...'            
        }
        return returnStr;
    }

    /**
     * 验证手机号是否符合标准
     */
    public validationPhone(_phoneNum:string):string{
        let phoneNum = _phoneNum;
        let re = /^[0-9]/g;
        let reg = re.test(phoneNum);
        let returnStr:string;
        returnStr = 'pass';//合格
        if(phoneNum.length==0){
            returnStr = '手机号不能为空'
        }else if(phoneNum.length!=11){
            returnStr = '手机号长度不符'
        } else if(reg==false){
            returnStr = '手机号不能含非数字的内容'            
        }
        return returnStr;
    }


    /**
     * 这里交换类型1的数据；一对一交换数据
     */
    public typeOneHander(totalArr:Array<any>,pointA:Array<any>,pointB:Array<any>){
        let tempHead,
            tempBody,
            c;
        tempHead=totalArr[pointA[1]][pointA[0]];
        tempBody=totalArr[pointB[1]][pointB[0]];
        c=totalArr[pointA[1]][pointA[0]];
        totalArr[pointA[1]][pointA[0]]=tempBody;
        totalArr[pointB[1]][pointB[0]]=c;
    }

     /**
     * 这里交换类型2的数据；二对二交换数据
     */
    public typeTwoHander(totalArr:Array<any>,pointA:Array<any>,pointB:Array<any>,directionStr:string){
        //  console.log("更改前的totalArr："+totalArr+"更改前PointA:"+pointA+"更改前PointB:"+pointB);
         var tempNumA=0,
             tempNumB=0,
             tempNumC=0,
             tempNumD=0,
            numA1=pointA[0][1],
            numA2=pointA[0][0],
            numB1=pointA[1][1],
            numB2=pointA[1][0];
            if(directionStr=="top"||directionStr=="low"){
                var numC1=pointB[1],
                    numC2=pointB[0];
            }
            if(directionStr=="left"||directionStr=="right"){
                var numC1=pointB[0][1],
                    numC2=pointB[0][0],
                    numD1=pointB[1][1],
                    numD2=pointB[1][0];
            }
         switch(directionStr){
             case "top":
                // console.log("run top");
                tempNumA=totalArr[numB1][numB2];
                totalArr[numB1][numB2]=totalArr[numC1][numC2];
                totalArr[numC1][numC2]=tempNumA;
             break;
             case "low":
                // console.log("run low")
                tempNumA=totalArr[numA1][numA2];
                totalArr[numA1][numA2]=totalArr[numC1][numC2];
                totalArr[numC1][numC2]=tempNumA;
             break;
             case "left":
                // console.log("run left")
                tempNumA=totalArr[numA1][numA2];
                tempNumB=totalArr[numB1][numB2];
                tempNumC=totalArr[numC1][numC2];
                tempNumD=totalArr[numD1][numD2];
                totalArr[numC1][numC2]=tempNumA;
                totalArr[numD1][numD2]=tempNumB;
                totalArr[numA1][numA2]=tempNumC;
                totalArr[numB1][numB2]=tempNumD;
             break;
             case "right":
                // console.log("run right")
                tempNumA=totalArr[numA1][numA2];
                tempNumB=totalArr[numB1][numB2];
                tempNumC=totalArr[numC1][numC2];
                tempNumD=totalArr[numD1][numD2];
                totalArr[numC1][numC2]=tempNumA;
                totalArr[numD1][numD2]=tempNumB;
                totalArr[numA1][numA2]=tempNumC;
                totalArr[numB1][numB2]=tempNumD;
             break;
         }
            // console.log(totalArr)
    }

    /**
     * 这里交换类型3的数据；二对二交换数据
     */
    public typeThreeHander(totalArr:Array<any>,pointA:Array<any>,pointB:Array<any>,directionStr:string){
        //  console.log("更改前的totalArr："+totalArr+"更改前PointA:"+pointA+"更改前PointB:"+pointB);
         var tempNumA=0,
             tempNumB=0,
             tempNumC=0,
             tempNumD=0,
            numA1=pointA[0][1],
            numA2=pointA[0][0],
            numB1=pointA[1][1],
            numB2=pointA[1][0];
            if(directionStr=="left"||directionStr=="right"){
                var numC1=pointB[1],
                    numC2=pointB[0];
            }
            if(directionStr=="top"||directionStr=="low"){
                var numC1=pointB[0][1],
                    numC2=pointB[0][0],
                    numD1=pointB[1][1],
                    numD2=pointB[1][0];
            }
         switch(directionStr){
             case "top":
                // console.log("run top");
                tempNumA=totalArr[numA1][numA2];
                tempNumB=totalArr[numB1][numB2];
                tempNumC=totalArr[numC1][numC2];
                tempNumD=totalArr[numD1][numD2];
                totalArr[numC1][numC2]=tempNumA;
                totalArr[numD1][numD2]=tempNumB;
                totalArr[numA1][numA2]=tempNumC;
                totalArr[numB1][numB2]=tempNumD;
             break;
             case "low":
                // console.log("run low")
                tempNumA=totalArr[numA1][numA2];
                tempNumB=totalArr[numB1][numB2];
                tempNumC=totalArr[numC1][numC2];
                tempNumD=totalArr[numD1][numD2];
                totalArr[numC1][numC2]=tempNumA;
                totalArr[numD1][numD2]=tempNumB;
                totalArr[numA1][numA2]=tempNumC;
                totalArr[numB1][numB2]=tempNumD;
             break;
             case "left":
                // console.log("run left")
                tempNumA=totalArr[numB1][numB2];
                totalArr[numB1][numB2]=totalArr[numC1][numC2];
                totalArr[numC1][numC2]=tempNumA;
             break;
             case "right":
                // console.log("run right")
                tempNumA=totalArr[numA1][numA2];
                totalArr[numA1][numA2]=totalArr[numC1][numC2];
                totalArr[numC1][numC2]=tempNumA;
             break;
         }
            // console.log(totalArr) 
    }

     /**
     * 这里交换类型4的数据；四对二交换数据
     */
    public typeFourHander(totalArr:Array<any>,pointA:Array<any>,pointB:Array<any>,directionStr:string){
             var tempNumA=0,
                 tempNumB=0,
                 tempNumC=0,
                 tempNumD=0,
                 tempNumE=0,
                 tempNumF=0,
                 numA1=pointA[0][1],
                 numA2=pointA[0][0],
                 numB1=pointA[1][1],
                 numB2=pointA[1][0],
                 numC1=pointA[2][1],
                 numC2=pointA[2][0],
                 numD1=pointA[3][1],
                 numD2=pointA[3][0],
                 numE1=pointB[0][1],
                 numE2=pointB[0][0],
                 numF1=pointB[1][1],
                 numF2=pointB[1][0];
                 tempNumA=totalArr[numA1][numA2];
                 tempNumB=totalArr[numB1][numB2];
                 tempNumC=totalArr[numC1][numC2];
                 tempNumD=totalArr[numD1][numD2];
                 tempNumE=totalArr[numE1][numE2];
                 tempNumF=totalArr[numF1][numF2];
                
            switch(directionStr){
                case "top":
                // console.log("run top")
                totalArr[numC1][numC2]=tempNumE;
                totalArr[numD1][numD2]=tempNumF;
                totalArr[numE1][numE2]=tempNumA;
                totalArr[numF1][numF2]=tempNumB;
                break;
                case "low":
                // console.log("run low")
                totalArr[numA1][numA2]=tempNumE;
                totalArr[numB1][numB2]=tempNumF;
                totalArr[numE1][numE2]=tempNumA;
                totalArr[numF1][numF2]=tempNumB;
                break;
                case "left":
                // console.log("run left")
                totalArr[numB1][numB2]=tempNumE;
                totalArr[numD1][numD2]=tempNumF;
                totalArr[numE1][numE2]=tempNumB;
                totalArr[numF1][numF2]=tempNumD;
                break;
                case "right":
                // console.log("run right")
                totalArr[numA1][numA2]=tempNumE;
                totalArr[numC1][numC2]=tempNumF;
                totalArr[numE1][numE2]=tempNumA;
                totalArr[numF1][numF2]=tempNumB;
                break;
            }
                // console.log(totalArr)
    }
    /**
     * 这里交换类型5的数据；一对三交换数据
     * 
     */
    public typeFiveHander(totalArr:Array<any>,pointA:Array<any>,pointB:Array<any>,directionStr:string){
        //  console.log("更改前的totalArr："+totalArr+"更改前PointA:"+pointA+"更改前PointB:"+pointB);
         var tempNumA=0,
             tempNumB=0,
             tempNumC=0,
             tempNumD=0,
            numA1=pointA[0][1],
            numA2=pointA[0][0],
            numB1=pointA[1][1],
            numB2=pointA[1][0],
            numC1=pointA[2][1],
            numC2=pointA[2][0];
            
             if(directionStr=="top"||directionStr=="low"){
                var numD1=pointB[1],
                    numD2=pointB[0];
                    tempNumA=totalArr[numA1][numA2];
                    tempNumB=totalArr[numB1][numB2];
                    tempNumC=totalArr[numC1][numC2];
                    tempNumD=totalArr[numD1][numD2];
            }
         switch(directionStr){
             case "top":
                // console.log("run top");
                totalArr[numA1][numA2]=tempNumA;
                totalArr[numB1][numB2]=tempNumB;
                totalArr[numC1][numC2]=tempNumD;
                totalArr[numD1][numD2]=tempNumC;
             break;
             case "low":
                // console.log("run low")
                totalArr[numA1][numA2]=tempNumD;
                totalArr[numB1][numB2]=tempNumC;
                totalArr[numC1][numC2]=tempNumB;
                totalArr[numD1][numD2]=tempNumA;
             break;
         }
    }

     /**
     * 这里交换类型6的数据；一对三交换数据
     * 
     */
    public typeSixeHander(totalArr:Array<any>,pointA:Array<any>,pointB:Array<any>,directionStr:string){
        //   console.log("更改前的totalArr："+totalArr+"更改前PointA:"+pointA+"更改前PointB:"+pointB);
        //   console.log("更改前PointA:"+pointA+"更改前PointB:"+pointB);
            if(directionStr=="left"||directionStr=="right"){
                var tempNumA=0,
                    tempNumB=0,
                    tempNumC=0,
                    tempNumD=0;
                var numA1=pointA[0][1],
                    numA2=pointA[0][0],
                    numB1=pointA[1][1],
                    numB2=pointA[1][0],
                    numC1=pointA[2][1],
                    numC2=pointA[2][0],
                    numD1=pointB[1],
                    numD2=pointB[0];
            }
            if(directionStr=="top"||directionStr=="low"){
                var tempNumA=0,
                    tempNumB=0,
                    tempNumC=0,
                    tempNumD=0,
                    tempNumE=0,
                    tempNumF=0,
                    numA1=pointA[0][1],
                    numA2=pointA[0][0],
                    numB1=pointA[1][1],
                    numB2=pointA[1][0],
                    numC1=pointA[2][1],
                    numC2=pointA[2][0],
                    numD1=pointB[0][1],
                    numD2=pointB[0][0],
                    numE1=pointB[1][1],
                    numE2=pointB[1][0],
                    numF1=pointB[2][1],
                    numF2=pointB[2][0];
            }
            
         switch(directionStr){
             case "top":
                tempNumA=totalArr[numA1][numA2];
                tempNumB=totalArr[numB1][numB2];
                tempNumC=totalArr[numC1][numC2];
                tempNumD=totalArr[numD1][numD2];
                tempNumE=totalArr[numE1][numE2];
                tempNumF=totalArr[numF1][numF2];
                
                totalArr[numA1][numA2]=tempNumD;
                totalArr[numB1][numB2]=tempNumE;
                totalArr[numC1][numC2]=tempNumF;
                totalArr[numD1][numD2]=tempNumA;
                totalArr[numE1][numE2]=tempNumB;
                totalArr[numF1][numF2]=tempNumC;

             break;
             case "low":
                tempNumA=totalArr[numA1][numA2];
                tempNumB=totalArr[numB1][numB2];
                tempNumC=totalArr[numC1][numC2];
                tempNumD=totalArr[numD1][numD2];
                tempNumE=totalArr[numE1][numE2];
                tempNumF=totalArr[numF1][numF2];

                totalArr[numA1][numA2]=tempNumD;
                totalArr[numB1][numB2]=tempNumE;
                totalArr[numC1][numC2]=tempNumF;
                totalArr[numD1][numD2]=tempNumA;
                totalArr[numE1][numE2]=tempNumB;
                totalArr[numF1][numF2]=tempNumC;

             break;
             case "left":
                tempNumA=totalArr[numA1][numA2];
                tempNumB=totalArr[numB1][numB2];
                tempNumC=totalArr[numC1][numC2];
                tempNumD=totalArr[numD1][numD2];

                totalArr[numA1][numA2]=tempNumA;
                totalArr[numB1][numB2]=tempNumB;
                totalArr[numC1][numC2]=tempNumD;
                totalArr[numD1][numD2]=tempNumC;
             break;
             case "right":
                tempNumA=totalArr[numA1][numA2];
                tempNumB=totalArr[numB1][numB2];
                tempNumC=totalArr[numC1][numC2];
                tempNumD=totalArr[numD1][numD2];

                totalArr[numA1][numA2]=tempNumD;
                totalArr[numB1][numB2]=tempNumC;
                totalArr[numC1][numC2]=tempNumB;
                totalArr[numD1][numD2]=tempNumA;
             break;
         }
        //  console.log(totalArr)
    }
    //计算两点之间距离
    public twoPointDistance(x1,y1,x2,y2):number{
        let sum;
        var _x = Math.abs(x1 - x2);
       	var _y = Math.abs(y1 - y2);
     	return Math.sqrt(_x * _x + _y * _y);
    }

}