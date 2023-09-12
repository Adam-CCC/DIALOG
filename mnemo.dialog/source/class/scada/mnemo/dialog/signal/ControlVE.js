qx.Class.define("scada.mnemo.dialog.signal.ControlVE", {
    extend: scada.mnemo.dialog.signal.Dialog,

    construct() {
        this.__veBlock = this.__createAndAddVEBlock();
        super();
        this.__veConfirmWin = this.__createConfirmWindow();
    },

    destruct() {
        this._disposeObjects("__veBlock", "__veConfirmWin");
    },

    members: {
        _createWidgetContent(){
            super._createWidgetContent();
            this._mainWindow.add(this.__veBlock);
        },

        _onLoadSettings(settings){
            super._onLoadSettings(settings);
            const dialogSettings = settings.control_ve;
            if (!dialogSettings){
                return;
            }
            this.__key = this.extractOptionFromSettings("key", dialogSettings);
            this.__veStateKey = this.extractOptionFromSettings("state_key", dialogSettings);
        },

        _onReceiveData(e){
            super._onReceiveData(e);
            this.__updateQuestionLabel(e.getData());
        },

        __createConfirmWindow(){
            const win = new scada.widget.window.confirm.Dialog();
            win.addListener("confirmed", this._onWindowConfirm, this);
            win.addListener("denied", this._onWindowDeny, this);
            return win;
        },

        __updateQuestionLabel(data){
            if (this.__veStateKey && data.hasOwnProperty(this.__veStateKey) && data[this.__veStateKey] !== undefined){
                let stateLabel;
                if (data[this.__veStateKey]){
                    stateLabel = this.tr("control state");
                }
                else {
                    stateLabel = this.tr("work state");
                }
                this.__veConfirmWin.setQuestion(stateLabel.toUpperCase());
            }
        },

        __createControlVEButton(){
            const button = new qx.ui.form.Button("Управление ВЭ");
            button.addListener("execute", this._onPressControlVEButton, this);
            return button;
        },

        __createAndAddVEBlock(){
            const layout = new qx.ui.layout.Flow();
            layout.setAlignX("center");
            const block = new qx.ui.container.Composite(layout);
            block.add(this.__createControlVEButton());
            return block;
        },

        _onWindowConfirm(){
            if (this.__key){
                this._confirmActions.push(function(){
                    this.setOutData({[this.__key]: true});
                }.bind(this));
                this.next();
                
            }
        },

        _onWindowDeny(){
            this.hide();
        },

        _onPressControlVEButton(){
            this._dialogStack.addAfter(this.__veConfirmWin, this._mainWindow);
            this.next();
        },

        show(){
            super.show();
            if (this._dialogStack.indexOf(this.__veConfirmWin) !== -1){
                this._dialogStack.remove(this.__veConfirmWin);
            }
        }
    }
});