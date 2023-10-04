qx.Class.define("scada.mnemo.dialog.Toggle", {
    extend: scada.mnemo.dialog.Dialog,

    members: {
        _onConfirm(){
            const data = {};
            const outputKey = this.getOutputKey();
            data[outputKey] = !(this.getData()[outputKey]);
            this.setOutData(data);
        }
    }
});