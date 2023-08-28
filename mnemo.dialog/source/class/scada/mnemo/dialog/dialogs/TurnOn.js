qx.Class.define("scada.mnemo.dialog.dialogs.TurnOn", {
    extend: scada.mnemo.dialog.dialogs.Dialog,

    members: {
        _onConfirm(){
            const data = {};
            data[this.getOutputKey()] = true;
            this.setOutData(data);
        }
    }
});