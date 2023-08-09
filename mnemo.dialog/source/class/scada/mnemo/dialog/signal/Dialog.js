qx.Class.define("scada.mnemo.dialog.signal.Dialog", {
    extend: scada.mnemo.dialog.Dialog,

    construct() {
        super();
        this._confirmActions = [];
    },

    destruct() {
        this._confirmActions = null;
    },

    properties: {
        showIfBadValues: {
            init: true,
            refine: true
        }
    },

    members: {
        _createWidgetContent(){
            const window = new scada.mnemo.dialog.signal.Window();
            window.addListener("resetAlarm", this._onResetAlarm, this);
            this.addListener("changeData", this._onReceiveData, this);
            this._mainWindow = window;
        },

        _onLoadSettings(settings){
            super._onLoadSettings(settings);
            this._mainWindow.setConfig(settings);
        },

        _onReceiveData(e){
            const data = e.getData();
            if (!data) return;
            Object.entries(data).forEach(function([key, value]){
                this._mainWindow.setKeyForSignal(key, Number(value));
            }, this);
        },

        _onResetAlarm(e){
            const resetKey = e.getData();
            this._confirmActions.push(function(){
                this.setOutData({[resetKey]: true});
            }.bind(this));
            this.next();
        },

        _onConfirm(){
            const action = this._confirmActions.pop();
            action();
        }
    }
});