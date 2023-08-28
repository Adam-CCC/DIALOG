qx.Mixin.define("scada.mnemo.dialog.dialogs.MConfirmation", {
    destruct() {
        if (this.__sureDialog){
            this.__sureDialog.dispose();
            this.__sureDialog = null;
        }
    },

    properties: {
        confirmation: {
            init: false,
            check: "Boolean",
            apply: "_applyConfirmation"
        }
    },

    members: {
        openConfirmation(){
            if (this.__sureDialog){
                this._dialogStack.add(this.__sureDialog);
                this._dialogStack.setSelection([this.__sureDialog]);
            }
        },

        _applyConfirmation(value){
            if (value && !this.__sureDialog){
                this.__sureDialog = this.__createDialog();
            }
        },

        __createDialog(){
            const message = qx.locale.Manager.tr("Are you sure") + "?";
            const dialog = new scada.widget.window.confirm.Dialog(message);
            dialog.addListener("confirmed", function(){
                this._onConfirm();
                this._onConfirmButtonPressed();
            }, this);
            dialog.addListener("denied", this._onConfirmButtonPressed, this);
            this._dialogStack.add(dialog);
            return dialog;
        },

        initConfirmationByJson(settings){
            this.setConfirmation(qx.data.Conversion.toBoolean(settings));
        },

        _onConfirmButtonPressed(){
            this.hide();
        }
    }
});