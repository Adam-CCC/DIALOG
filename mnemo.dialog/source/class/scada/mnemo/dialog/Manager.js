qx.Class.define("scada.mnemo.dialog.Manager", {
    extend : qx.core.Object,

    destruct() {
        this.__destroyLastDialog();
    },

    properties: {
        data: {
            init: "",
            nullable: true,
            event: "changeData"
        },

        outData: {
            init: "",
            nullable: true,
            event: "changeOutData"
        },

        dialogFactory: {
            init: null,
            nullable: true
        }
    },

    events: {
        "goTo": "qx.event.type.Data"
    },

    members: {
        __currentDialog: null,

        setDialog(config){
            this.__destroyLastDialog();

            const dialog = this.__createDialog(config.name)
            this._inDataBindingId = this.bind("data", dialog, "data");
            this._outDataBindingId = dialog.bind("outData", this, "outData");
            dialog.initSettingsFromJson(config);
            this.__currentDialog = dialog;
        },

        openDialog(position, value){
            const dialog = this.__currentDialog;
            dialog.set({ 
                leftCoord: position.x,
                topCoord: position.y
            });
            dialog.setData(value);
            dialog.show();
            dialog.setActive(true);
        },

        __destroyLastDialog(){
            if (!this.__currentDialog){
                return;
            }

            if (this._inDataBindingId){
                this.removeBinding(this._inDataBindingId);
                this._inDataBindingId = null;
            }
            if (this._outDataBindingId){
                this.removeBinding(this._outDataBindingId);
                this._outDataBindingId = null;
            }
            this.__currentDialog.dispose();
            this.__currentDialog = null;
        },

        __createDialog(name){
            let factory = this.getDialogFactory();
            if (!factory){
                throw new Error("No dialog factory was set up");
            }
            const dialog = factory.getDialog(name);
            dialog.addListener("goto", function(e){
                this.fireDataEvent("goTo", e.getData())
            }, this);
            return dialog;
        }
    }
});