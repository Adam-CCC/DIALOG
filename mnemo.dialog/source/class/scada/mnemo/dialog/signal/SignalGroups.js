qx.Class.define("scada.mnemo.dialog.signal.SignalGroups", {
    extend: qx.ui.container.Composite,

    construct(){
        this.base(arguments);
        this.setLayout(new qx.ui.layout.Flow());
        this.__groups = [];
        this.__signals = [];
    },

    destruct() {
        this._disposeArray("__groups");
        this.__signals = null;
    },

    members: {
        __createGroupOrGroups(){
            const sizeHelper = scada.mnemo.dialog.signal.SizeHelper;

            if (this.__areSignalsGrouped()) {
                const groupCount = Object.entries(this.__signals).length;
                const width = sizeHelper.getElementWidth(groupCount);
                const height = sizeHelper.getElementHeight(groupCount);
                this.__createAndAddGroups(width, height);
            }
            else {
                const groupCount = 1;
                const width = sizeHelper.getElementWidth(groupCount);
                const height = sizeHelper.getElementHeight(groupCount);
                this.__createAndAddGroup(this.__signals, width, height);
            }
        },

        __areSignalsGrouped(){
            return qx.lang.Type.isObject(this.__signals);
        },

        __createAndAddGroups(width, height){
            Object.entries(this.__signals).forEach(function([name, groupSignals]){
                if (groupSignals.length){
                    this.__createAndAddGroup(groupSignals, width, height, name);
                }
            }, this);
        },

        __createAndAddGroup(signals, width, height, title){
            const group = new scada.mnemo.dialog.signal.SignalGroup(title);
            group.addSignals(signals, width, height);
            this.__groups.push(group);
            this.add(group);
        },

        setValueForSignal(key, value){
            const foundGroup = this.__groups.find(group => group.getTable().hasSignalWithId(key));
            if (foundGroup){
                foundGroup.getTable().setSignalValue(key, value);
            }
        },

        addSignals(signals){
            this.__signals = signals;
            this.__createGroupOrGroups();
        }
    }
});
