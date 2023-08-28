qx.Class.define("scada.mnemo.dialog.dialogs.Toggle", {
    extend: scada.mnemo.dialog.dialogs.Dialog,

    members: {
        _onConfirm(){
            const data = {};
            const outputKey = this.getOutputKey();
            data[outputKey] = !(this.getData()[outputKey]);
            this.setOutData(data);
        }
    }
});