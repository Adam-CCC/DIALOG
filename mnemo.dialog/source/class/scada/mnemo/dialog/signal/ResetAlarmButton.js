qx.Class.define("scada.mnemo.dialog.signal.ResetAlarmButton", {
    extend: qx.ui.form.Button,

    construct(label, key){
        super(label);
        this.__key = key;
        this.addListener("execute", this._onBtnPressed, this);
    },

    events: {
        "resetAlarm": "qx.event.type.Data"
    },

    members: {
        _onBtnPressed(){
            this.fireDataEvent("resetAlarm", this.__key);
        }
    }
});