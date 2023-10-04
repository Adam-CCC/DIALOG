qx.Class.define("scada.mnemo.dialog.Link", {
    extend: scada.mnemo.dialog.Dialog,

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