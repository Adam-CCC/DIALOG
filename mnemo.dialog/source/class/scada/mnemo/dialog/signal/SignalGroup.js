qx.Class.define("scada.mnemo.dialog.signal.SignalGroup", {
    extend: qx.ui.container.Composite,

    construct(label = "Сигналы"){
        this.base(arguments);
        this.__setupLayout();
        this.__createAndAddLabel(label);
    },

    destruct() {
        if (this.__table){
            this.__table.dispose();
            this.__table = null;
        }
    },

    members: {
        getTable(){
            return this.__table;
        },

        __setupLayout(){
            const layout = new qx.ui.layout.VBox();
            layout.setAlignX("center");
            this.setLayout(layout);
        },

        __createAndAddLabel(name){
            const label = new qx.ui.basic.Label(name);
            this.add(label);
        },

        __createAndAddTable(signals, width, height){
            const table = new scada.mnemo.dialog.signal.Table(signals, width, height);
            this.add(table);
            return table;
        },

        addSignals(signals, width, height){
            this.__table = this.__createAndAddTable(signals, width, height)
        }
    }
});
