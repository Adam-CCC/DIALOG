qx.Class.define("scada.mnemo.dialog.dialogs.HeatResist", {
    extend: scada.mnemo.dialog.dialogs.Dialog,

    members: {
        _sorts: null,
        _updateValues: null,

        _onLoadSettings(settings){
            super._onLoadSettings(settings);
            this._mainWindow.removeButtons();

            const tempClasses = this.extractOptionFromSettings("temp_classes", settings);
            if (tempClasses){
                this._sorts = tempClasses.slice();
                this._mainWindow.addButtons(this._sorts);
            }

            const updateValues = this.extractOptionFromSettings("update_values", settings);
            if (updateValues){
                this._updateValues = updateValues.slice();
            }
        },

        _createWidgetContent(){
            this._mainWindow = this.__createWindow();
        },

        __createWindow(){
            const wm1 = new scada.widget.window.VButtonPanel();
            wm1.addListener("outData", this._onOutputData, this);
            return wm1;
        },

        _onOutputData(e){
            const data = {};
            const i = this._sorts.indexOf(e.getData());
            data[this.getOutputKey()] = this._updateValues[i];
            this.setOutData(data);
        }
    }
});