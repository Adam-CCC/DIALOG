qx.Class.define("scada.mnemo.dialog.Keyboard", {
    extend: scada.mnemo.dialog.Dialog,

    members: {
        _createWidgetContent(){
            const window = new scada.widget.Calculator();
            this.__outputData = "";
            window.addListener("outData", this.__onOutputData, this);
            window.setInputFieldValue("0");
            this._mainWindow = window;
        },

        __onOutputData(e){
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