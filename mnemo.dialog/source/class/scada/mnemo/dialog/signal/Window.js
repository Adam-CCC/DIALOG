qx.Class.define("scada.mnemo.dialog.signal.Window", {
    extend: qx.ui.container.Composite,

    construct(){
        super(new qx.ui.layout.VBox);
        this.__resetGroup = this.__createAndAddResetAlarmGroup();
    },

    destruct() {
        if (this.__signalButton){
            this.__signalButton.dispose();
            this.__signalButton = null;
        }
        if (this.__signalWindow){
            this.__signalWindow.dispose();
            this.__signalWindow = null;
        }
        this._disposeObjects("__resetGroup");
    },

    events: {
        "resetAlarm": "qx.event.type.Data"
    },

    members: {
        setConfig(config){
            if (config.hasOwnProperty("signals")){
                this.__signalButton = this.__createShowTerminalButton();
                this.__signalWindow = this.__createAndOpenSignalWindow(config.signals, config.caption);
            }
            this.__resetGroup.addButtonsForKeys(config.reset_keys);
        },

        __createAndOpenSignalWindow(signals, caption){
            const window = new scada.mnemo.dialog.signal.SignalWindow(caption);
            window.setSignals(signals)
            window.addListener("resize", function(){ this.center(); });
            return window;
        },

        __createShowTerminalButton(){
            const button = new qx.ui.form.Button("Окно терминала");
            button.addListener("execute", this._onPressShowTerminalButton, this);
            this.addBefore(button, this.__resetGroup);
            return button;
        },

        _onPressShowTerminalButton(){
            this.__signalWindow.open();
        },

        setKeyForSignal(key, value) {
            if (this.__signalWindow){
                this.__signalWindow.setKeyForSignal(key, value);
            }
        },

        __createAndAddResetAlarmGroup(){
            const group = new scada.mnemo.dialog.signal.ResetAlarmsGroup();
            group.addListener("resetAlarm", function(e){
                this.fireDataEvent("resetAlarm", e.getData());
            }, this);
            this.add(group);
            return group;
        }
    }
});