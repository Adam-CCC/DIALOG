qx.Class.define("scada.mnemo.dialog.TurnOn", {
    extend: scada.mnemo.dialog.Dialog,

    members: {
        _onConfirm(){
            const data = {};
            data[this.getOutputKey()] = true;
            this.setOutData(data);
        }
    }
});