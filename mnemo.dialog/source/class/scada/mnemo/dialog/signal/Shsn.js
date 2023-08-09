qx.Class.define("scada.mnemo.dialog.signal.Shsn", {
    extend: scada.mnemo.dialog.signal.Dialog,

    members: {
        _createWidgetContent(){
            super._createWidgetContent();
            const button = this.__createAvrButton();
            this._mainWindow.add(button);
        },

        _onLoadSettings(settings){
            super._onLoadSettings(settings);
            this.__avrKey = this.extractOptionFromSettings("key", settings.avr);
        },

        __createAvrButton(){
            const button = new qx.ui.form.Button("АВР");
            button.addListener("execute", this._onPressAVRButton, this);
            return button;
        },

        _onPressAVRButton(){
            this._confirmActions.push(function(){
                this.setOutData({[this.__avrKey]: true});
            }.bind(this));
            this.next();
        }
    }
});