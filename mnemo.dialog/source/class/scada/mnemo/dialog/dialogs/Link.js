qx.Class.define("scada.mnemo.dialog.dialogs.Link", {
    extend: scada.mnemo.dialog.dialogs.Dialog,

    members: {
        _onLoadSettings(settings){
            super._onLoadSettings(settings);
            this.__path = this.extractOptionFromSettings("path", settings);
        },

        _onConfirm(){
            this.fireDataEvent("goto", this.__path);
        }
    }
});