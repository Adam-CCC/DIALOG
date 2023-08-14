qx.Class.define("scada.mnemo.dialog.HeatResist", {
    extend: scada.mnemo.dialog.Dialog,

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
            this._getSortsAndUpdate();
        },

        _getSortsAndUpdate(){
            console.log(this._sorts);
            console.log(this._updateValues);
        },

        _createWidgetContent(){
            this._mainWindow = this.__createWindow();
        },

        __createWindow(){
            const wm1 = new scada.widget.window.VButtonPanel();
            wm1.addListener("outData", this._onOutputData, this);
            wm1.show();
            return wm1;
        },

        _onOutputData(e){
            console.log("getData " + data)
            const data = {};
            const i = this._sorts.indexOf(e.getData());
            data[this.getOutputKey()] = this._updateValues[i];
            
            this.setOutData(data);
        }
    }
});