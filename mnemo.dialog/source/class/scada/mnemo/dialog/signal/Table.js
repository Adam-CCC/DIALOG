qx.Class.define("scada.mnemo.dialog.signal.Table", {
    extend: qx.ui.table.Table,

    construct(signals, width, height){
        qx.core.Assert.assertArray(signals, "something wrong with signal section");
        const model = this.__createDataModel(signals);
        this.base(arguments, model, { tableColumnModel: (table) => this.__createColumnModel(table, width) });

        this.__setupTableColumnModel(width);
        this.setHeight(height);
    },

    properties: {
        columnVisibilityButtonVisible: {
            init: false,
            refine: true
        },

        statusBarVisible: {
            init: false,
            refine: true
        },

        defaultSignalValue: {
            init: "?",
            check: "String"
        }
    },

    statics: {
        NAME_WIDTH_PERCENT: 0.8,
        VALUE_WIDTH_PERCENT: 0.2
    },

    members: {
        hasSignalWithId(searchedId){
            const model = this.getTableModel();

            for (let i = 0; i < model.getRowCount(); i++){
                const id = model.getValue(0, i);
                if (id === searchedId){
                    return true;
                }
            }

            return false;
        },

        setSignalValue(searchedId, value){
            const model = this.getTableModel();

            for (let i = 0; i < model.getRowCount(); i++){
                const id = model.getValue(0, i);
                if (id === searchedId){
                    model.setValue(2, i, value);
                    break;
                }
            }
        },

        __createColumnModel(table){
            return new qx.ui.table.columnmodel.Resize(table);
        },

        __setupTableColumnModel(width){
            const model = this.getTableColumnModel();
            model.setColumnVisible(0, false);

            const behavior = model.getBehavior();
            behavior.setWidth(1, Math.trunc(width * this.constructor.NAME_WIDTH_PERCENT));
            behavior.setWidth(2, Math.trunc(width * this.constructor.VALUE_WIDTH_PERCENT));
        },

        __createDataModel(signals){
            const model = new qx.ui.table.model.Simple();
            model.setColumns(["ID", "Сигнал", "Значение"]);
            model.setColumnSortable(1, false);
            model.setColumnSortable(2, false);

            const processedData = signals.map(signalConfig => [signalConfig.key, signalConfig.label, this.getDefaultSignalValue()]);
            model.setData(processedData);
            return model;
        }
    }
});