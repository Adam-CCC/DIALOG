qx.Class.define("scada.mnemo.dialog.dialogs.TempShow", {
    extend: scada.mnemo.dialog.dialogs.Dialog,

    members: {
        _onLoadSettings(settings){
            super._onLoadSettings(settings);
            this.__key = this.extractOptionFromSettings("key", settings);
        },

        _createWidgetContent(){
            this._mainWindow = new qx.ui.container.Composite(new qx.ui.layout.HBox);
            const valueLabel = this.__createLabel("0");
            this.bind("data", valueLabel, "value", {
                converter: this._onDataInc.bind(this)
            });
            this.__createLabel("°C");
        },

        __createLabel(defaultValue){
            const label = new qx.ui.basic.Label(defaultValue);
            const font = new qx.bom.Font(28);
            label.setFont(font);
            this._mainWindow.add(label);
            return label;
        },

        _onDataInc(data){
            if (this._isUnknownValue(data[this.__key])){
                return "?";
            }
            return data[this.__key].toString();
        }
    }
});