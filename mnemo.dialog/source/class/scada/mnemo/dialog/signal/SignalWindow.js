qx.Class.define("scada.mnemo.dialog.signal.SignalWindow", {
    extend: qx.ui.window.Window,

    construct(caption = "") {
        super(caption);
        this.__setupWindow();
        this.__signalGroup = this.__createAndAddSignalGroups();
    },

    destruct() {
        this._disposeObjects("__signalGroup");
    },

    members: {
        setSignals(signals){
            this.__signalGroup.addSignals(signals);
        },

        setKeyForSignal(key, value) {
            if (this.__signalGroup){
                this.__signalGroup.setValueForSignal(key, value);
            }
        },

        clearContent(){
            if (this.__signalGroup){
                this.__signalGroup.removeAll();
            }
        },

        __setupWindow(){
            const CONTENT_PADDING = 10;

            this.set({
                showMaximize  : false,
                showMinimize  : false,
                allowMaximize : false,
                allowMinimize : false,
                centerOnAppear: true,
                contentPadding: CONTENT_PADDING,
                resizable: [false, false, false, false]
            });
            const width = scada.mnemo.dialog.signal.SizeHelper.getContainerWidth();
            this.setWidth(width + 2 * CONTENT_PADDING);
            this.setLayout(new qx.ui.layout.Grow);
        },

        __createAndAddSignalGroups(){
            const groups = new scada.mnemo.dialog.signal.SignalGroups();
            this.add(groups);
            return groups;
        }
    }
});