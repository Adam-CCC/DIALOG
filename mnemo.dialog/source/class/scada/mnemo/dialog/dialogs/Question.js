qx.Class.define("scada.mnemo.dialog.dialogs.Question", {
    extend: scada.mnemo.dialog.dialogs.Dialog,

    members: {
        _createWidgetContent(){
            const dialog = new scada.widget.window.confirm.Dialog();
            dialog.addListener("confirmed", this._onQuestionConfirmed, this);
            dialog.addListener("denied", this._onQuestionDenied, this);
            this._mainWindow = dialog;
        },

        _onLoadSettings(settings){
            super._onLoadSettings(settings);
            const label = this.extractOptionFromSettings("label", settings.question)
            this._mainWindow.setQuestion(label);
        },

        _onQuestionConfirmed(){
            this.next();
        },

        _onQuestionDenied(){
            this.close();
        },

        _onConfirm(){
            this.setOutData({[this.getOutputKey()]: true});
        }
    }
});