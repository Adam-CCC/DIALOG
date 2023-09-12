qx.Class.define("scada.mnemo.dialog.signal.ResetAlarmsGroup", {
    extend: qx.ui.container.Composite,

    construct(){
        super(new qx.ui.layout.VBox);
    },

    events: {
        "resetAlarm": "qx.event.type.Data"
    },

    members: {
        addButtonsForKeys(keys){
            this.__createAndAddButtons(keys);
        },

        __createAndAddButtons(keys) {
            qx.core.Assert.assertArray(keys);
            keys.forEach(this.__createAndAddButton, this);
        },

        __createAndAddButton(button){
            const resetAlarmPart = qx.locale.Manager.tr("Reset alarm");
            const label = `${resetAlarmPart} ${button.label}`;
            const btn = new scada.mnemo.dialog.signal.ResetAlarmButton(label, button.key);
            btn.addListener("resetAlarm", this._onResetAlarm, this);
            this.add(btn);
        },

        _onResetAlarm(e){
            const key = e.getData();
            this.fireDataEvent("resetAlarm", key);
        }
    }
});
