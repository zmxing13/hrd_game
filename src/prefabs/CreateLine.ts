// TypeScript file
class CreateLine extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        //  console.log("CreateLine");
    }
   
    public createGridHander(Xnumber,Ynumber):void{
        var num,length;
        length=80*(Ynumber-1);
        for (var i=0;i<Xnumber;i++){
            num=80*i;
            this.drawLineHander(num,length,"x");
        }
        length=80*(Xnumber-1);
        for (i=0;i<Ynumber;i++){
            num=80*i;
            this.drawLineHander(num,length,"y");
        }
    }

    private drawLineHander(numA,length,str):void{
        var myShape:egret.Shape = new egret.Shape();  
        myShape.graphics.lineStyle(2, 0x000000,.5,true,'',egret.CapsStyle.ROUND,egret.JointStyle.ROUND,0,[2,5]);
        if(str=="x"){
            myShape.graphics.moveTo(numA, 0);    //将画笔移动到起点位置
            myShape.graphics.lineTo(numA, length);   //从起点位置划线到终点
        }
         if(str=="y"){
            myShape.graphics.moveTo(0,numA);    //将画笔移动到起点位置
            myShape.graphics.lineTo(length, numA);   //从起点位置划线到终点
        }
        myShape.graphics.endFill();
        this.addChild(myShape);
    }
}
