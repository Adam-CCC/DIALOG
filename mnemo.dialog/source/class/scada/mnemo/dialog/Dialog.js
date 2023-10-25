qx.Class.define("scada.mnemo.dialog.Dialog", {
    extend: scada.widget.window.Place,
    include: [
        scada.mnemo.dialog.MData,
        scada.mnemo.dialog.MPosition,
        scada.mnemo.dialog.MProtection,
        scada.mnemo.dialog.MConfirmation
    ],

    construct() {
        super();
        this.set(this.getCommonDialog());
        this.getChildControl("title").setFont(this.getCommonDialog().font);
        this.setLayout(new qx.ui.layout.Basic());
        this._dialogStack = this.__createStack();
        this.add(this._dialogStack);
        this._createWidgetContent();
    },

    destruct() {
        this._disposeObjects("_dialogStack");
        if (this._mainWindow){
            this._mainWindow.dispose();
            this._mainWindow = null;
        }
        this.resetData();
        this.resetOutData();
    },

    properties: {
        event: {
            init: "click",
            check: ["click", "dblclick"]
        },

        showIfBadValues: {
            init: false,
            check: "Boolean"
        }
    },

    events: {
        "goto": "qx.event.type.Data"
    },

    members: {
        _mainWindow: null,

        extractOptionFromSettings(name, settings, errorMessage){
            qx.core.Assert.assertString(name);

            if (this.settingsHasParam(settings, name)){
                return settings[name];
            }

            if (!errorMessage){
                errorMessage = `Нет ключа в конфигурации: ${name}`;
            }
            this.error(errorMessage);
            return null;
        },

        settingsHasParam(settings, name){
            return settings.hasOwnProperty(name);
        },

        _onConfirm(){
        },

        _createWidgetContent(){
        },

        __createStack(){
            const stack = new qx.ui.container.Stack();
            stack.setDynamic(true);
            return stack;
        },

        getCommonDialog(){
            const PADDING = 10;
            return {
                font: new qx.bom.Font(20, ["Lucida Grande","Tahoma","Verdana", "Bitstream Vera Sans","Liberation Sans"]),
                showClose       : true,
                showMaximize    : false,
                showMinimize    : false,
                allowMaximize   : false,
                allowMinimize   : false,
                contentPadding  : PADDING,
                resizable: [false, false, false, false]
            };
        },

        initSettingsFromJson(settings){
            this._onLoadSettings(settings);
        },

        _onLoadSettings(settings){
            this.initProtection(settings.protection);
            this.initConfirmationByJson(settings.confirmation);
            this.setCenter(qx.data.Conversion.toBoolean(settings.center));

            if (this.settingsHasParam(settings, "caption") && settings.caption){
                this.setCaption(settings.caption);
            } else {
                this._excludeChildControl("captionbar");
            }
            if (settings?.update?.key){
                this.setOutputKey(settings?.update?.key);
            }
        },

        show(){
            if (!this.getShowIfBadValues() && this.__hasBadValues()){
                return;
            }
            if (this._mainWindow){
                this._dialogStack.addAt(this._mainWindow, 0);
            }
            this.checkProtected();
            if (this._dialogStack.getChildren().length){
                this._dialogStack.setSelection([this._dialogStack.getChildren()[0]]);
                this.setupPosition();
                super.show();
            } else {
                this._onConfirm();
            }
        },

        __hasBadValues(){
            return Object.values(this.getData()).some((value) => value === undefined || value === null);
        },

        next(){
            console.log("Работает next");
            if (this._dialogStack.indexOf(this._mainWindow) === this._dialogStack.getChildren().length - 1){
                console.log("Условие 1");
                this._dialogStack.next();
                this._onConfirm();
                this.hide();
            } else {
                console.log("Условие 2");
                this._dialogStack.next();
            }
        },

        _isUnknownValue(value){
            return value === null || value === undefined;
        }
    }
});