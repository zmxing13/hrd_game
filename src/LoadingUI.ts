//////////////////////////////////////////////////////////////////////////////////////
//
// 加载进度
//
//////////////////////////////////////////////////////////////////////////////////////

class LoadingUI extends egret.Sprite {

    public constructor() {
        super();
        this.createView();
    }

    private _bg:egret.Sprite;
    private _bar:egret.Sprite;

    private _newW:number=0;
    private createView():void {

        this._bg = new egret.Sprite();
        this._bg.graphics.beginFill(0x000000,1)
        this._bg.graphics.drawRect(0,0,Main.W,Main.H)
        this._bg.graphics.endFill();
        this.addChild(this._bg);
        this._bg.width = Main.W;
        this._bg.height = Main.H;		
		
        this._bar = new egret.Sprite();
        this._bar.graphics.beginFill(0x009966,1)
        this._bar.graphics.drawRect(0,0,1,5)
        this._bar.graphics.endFill();
        this.addChild(this._bar);
        
    }

    public setProgress(current:number, total:number):void {
        this._newW=Main.W*current/total;
        this._bar.graphics.clear();
        this._bar.graphics.beginFill(0x009966,1)
        this._bar.graphics.drawRect(0,0,this._newW,5)
        this._bar.graphics.endFill();
        this._bar.y=Main.H-5;
    }
}
