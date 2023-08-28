qx.Class.define("scada.mnemo.dialog.dialogs.Keyboard", {
    extend: scada.mnemo.dialog.dialogs.Dialog,

    members: {
        _createWidgetContent(){
            const window = new scada.widget.Calculator();
            this.__outputData = "";
            window.addListener("outData", this._onOutputData, this);
            window.setInputFieldValue("0");
            this._mainWindow = window;
        },

        _onOutputData(e){
            this.__outputData = e.getData();
            this.next();
        },

        _onConfirm(){
            const data = {};
            data[this.getOutputKey()] = parseInt(this.__outputData);
            this.setOutData(data);
        },

        show(){
            super.show();
            this._mainWindow.setInputFocus();
        }
    }
});