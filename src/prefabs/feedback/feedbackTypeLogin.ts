//反馈弹板类型2-用户注册
class feedbackTypeLogin extends BaseContainer {
	private _public:PublicClass = new PublicClass();

    private userNameSp:egret.Sprite;            //用户名
    private phoneSp:egret.Sprite;            //确认密码容器
    // private confirmPassWordSp:egret.Sprite;     //再次确认密码容器
    //账户名
    private userNameBox:egret.TextField;
    private userNameExplain:egret.TextField;    //输入提示说明
    //密码
    private phoneBox:egret.TextField;
    private phoneExplain:egret.TextField;    //输入密码提示说明
    //确认密码
    // private confirmPassWordBox:egret.TextField;
    // private confirmPassWordExplain:egret.TextField;

    //访问服务器数据
    private webServer:WebServerData;
    private signBtn:egret.Bitmap;

	public constructor() {
		super();
		this.initSprite();
		this.UpWindowData();
		this.initMessage();
	}

	/**
     * 创建图形界面
     */
	private initSprite(){
		this.userNameSp = new egret.Sprite();
        this.userNameSp.graphics.beginFill(0x00ff00,.5);
        this.userNameSp.graphics.drawRoundRect(0,0,Main.W/2,100,50,50);
        this.userNameSp.graphics.endFill();
        this.addChild(this.userNameSp);

        this.phoneSp = new egret.Sprite();
        this.phoneSp.graphics.beginFill(0x00ff00,.5);
        this.phoneSp.graphics.drawRoundRect(0,0,Main.W/2,100,50,50);
        this.phoneSp.graphics.endFill();
        this.addChild(this.phoneSp);

        // this.confirmPassWordSp = new egret.Sprite();
        // this.confirmPassWordSp.graphics.beginFill(0x00ff00,.5);
        // this.confirmPassWordSp.graphics.drawRoundRect(0,0,Main.W/2,100,50,50);
        // this.confirmPassWordSp.graphics.endFill();
        // this.addChild(this.confirmPassWordSp);

		//--------------------------------
        
        this.userNameBox = new egret.TextField();
        this.userNameBox.type = egret.TextFieldType.INPUT;
        this.userNameBox.size=50;
        this.userNameBox.width = Main.W/2;
        this.userNameBox.height = 100;
        this.userNameBox.verticalAlign=egret.VerticalAlign.MIDDLE;
        this.userNameBox.textAlign =egret.HorizontalAlign.CENTER;
        this.userNameBox.textColor = 0x000000;
        this.userNameBox.text=''
        this.userNameSp.addChild(this.userNameBox);

        this.userNameExplain = new egret.TextField();
        this.userNameExplain.size=30;
        this.userNameExplain.width = Main.W/2;
        this.userNameExplain.height = 50;
        this.userNameExplain.verticalAlign=egret.VerticalAlign.MIDDLE;
        this.userNameExplain.textAlign =egret.HorizontalAlign.CENTER;
        this.userNameExplain.textColor = 0x000000;
        this.userNameExplain.text='请输入账户名';
        this.userNameSp.addChild(this.userNameExplain);

        //--------------------------------
        
        this.phoneBox = new egret.TextField();
        this.phoneBox.type = egret.TextFieldType.INPUT;
        // this.phoneBox.inputType = egret.TextFieldInputType.PASSWORD;
        // this.phoneBox.displayAsPassword = true;//密码填写完成后，点击屏幕空白处，该处EditableText为*格式
        this.phoneBox.size=50;
        this.phoneBox.width = Main.W/2;
        this.phoneBox.height = 100;
        this.phoneBox.verticalAlign=egret.VerticalAlign.MIDDLE;
        this.phoneBox.textAlign =egret.HorizontalAlign.CENTER;
        this.phoneBox.textColor = 0x000000;
        this.phoneBox.text=''
        this.phoneSp.addChild(this.phoneBox);

        this.phoneExplain = new egret.TextField();
        this.phoneExplain.size=30;
        this.phoneExplain.width = Main.W/2;
        this.phoneExplain.height = 50;
        this.phoneExplain.verticalAlign=egret.VerticalAlign.MIDDLE;
        this.phoneExplain.textAlign =egret.HorizontalAlign.CENTER;
        this.phoneExplain.textColor = 0x000000;
        this.phoneExplain.text='请输入手机号';
        this.phoneSp.addChild(this.phoneExplain);

        //--------------------------------

        // this.confirmPassWordBox = new egret.TextField();
        // this.confirmPassWordBox.inputType = egret.TextFieldInputType.PASSWORD;
        // this.confirmPassWordBox.type = egret.TextFieldType.INPUT;
        // this.confirmPassWordBox.displayAsPassword = true;//密码填写完成后，点击屏幕空白处，该处EditableText为*格式
        // this.confirmPassWordBox.size=50;
        // this.confirmPassWordBox.width = Main.W/2;
        // this.confirmPassWordBox.height = 100;
        // this.confirmPassWordBox.verticalAlign=egret.VerticalAlign.MIDDLE;
        // this.confirmPassWordBox.textAlign =egret.HorizontalAlign.CENTER;
        // this.confirmPassWordBox.textColor = 0x000000;
        // this.confirmPassWordBox.text=''
        // this.confirmPassWordSp.addChild(this.confirmPassWordBox);

        // this.confirmPassWordExplain = new egret.TextField();
        // this.confirmPassWordExplain.size=30;
        // this.confirmPassWordExplain.width = Main.W/2;
        // this.confirmPassWordExplain.height = 50;
        // this.confirmPassWordExplain.verticalAlign=egret.VerticalAlign.MIDDLE;
        // this.confirmPassWordExplain.textAlign =egret.HorizontalAlign.CENTER;
        // this.confirmPassWordExplain.textColor = 0x000000;
        // this.confirmPassWordExplain.text='请再次输入密码';
        // this.confirmPassWordSp.addChild(this.confirmPassWordExplain);

        //--------------------------------        

        this.signBtn = this._public.createBitmapByName('doneSignBtn');
        this.addChild(this.signBtn);

	}

	/**
     * 界面布局 (尺寸发生变化时会执行)
	 * 【初始化时需要 图形创建后执行一次】  
     */
	public UpWindowData(){
		this.userNameSp.x=0;
        this.userNameSp.y=0;

        this.userNameBox.x = 0;
        this.userNameBox.y = 0;
        this.userNameExplain.x=this.userNameBox.x;
        this.userNameExplain.y=this.userNameBox.y - this.userNameBox.height/2;
        
        //--------------------------------

        this.phoneSp.x=0;
        this.phoneSp.y=this.userNameSp.y + this.phoneSp.height*2;

        this.phoneBox.x = 0;
        this.phoneBox.y = 0;
        this.phoneExplain.x=this.phoneBox.x;
        this.phoneExplain.y=this.phoneBox.y - this.phoneBox.height/2;

        //--------------------------------

        // this.confirmPassWordSp.x=0;
        // this.confirmPassWordSp.y=this.passWordSp.y + this.confirmPassWordSp.height*1.5;

        // this.confirmPassWordBox.x = 0;
        // this.confirmPassWordBox.y = 0;
        // this.confirmPassWordExplain.x=this.confirmPassWordBox.x;
        // this.confirmPassWordExplain.y=this.confirmPassWordBox.y - this.confirmPassWordBox.height/2;

        //--------------------------------
        
        // this.signBtn.scaleX=this.signBtn.scaleY=Main.scaleNum+1;        
		this.signBtn.x=(this.width - this.signBtn.width)/2;
        this.signBtn.y=this.phoneSp.y + this.signBtn.height*2;
        
	}

	/**
     * 初始化事件消息
     */
	private initMessage(){
		this.signBtn.touchEnabled=true;
        this.signBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.signBtnTouch,this)
	}

	private signBtnTouch(e:egret.TouchEvent){
        // console.log(this.passWordBox.text,this.confirmPassWordBox)
        console.log('注册账户:'+this.userNameBox.text,'注册密码:'+this.phoneBox.text)
        let userState = this._public.validationUserName(this.userNameBox.text);
        let phoneState = this._public.validationPhone(this.phoneBox.text);
        console.log('注册账户:'+userState,'注册密码:'+phoneState)

        if(userState=='pass' && phoneState == 'pass'){
            // DataBus._userName = this.userNameBox.text;
            // DataBus._password = this.passWordBox.text;
            // this.webServer = WebServerData.getInstance();
            // this.webServer.userRegister(DataBus._userName,DataBus._password,this.sendDone,this)
        }
        
        if(userState!='pass'){
            LoadFeedbackClass.feedback.setLable(userState);
        }
        if(phoneState!='pass'){
            LoadFeedbackClass.feedback.setLable(phoneState);
        }

    }
}