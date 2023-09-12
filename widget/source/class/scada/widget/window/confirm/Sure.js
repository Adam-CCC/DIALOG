qx.Class.define("scada.widget.window.confirm.Sure", {
    extend : scada.widget.window.confirm.Window,

    construct(){
        this.base(arguments);
        this.set({
            allowMaximize   : false,
            allowMinimize   : false,
            contentPadding  : 10,
            resizable: [false, false, false, false],
        });

        this._excludeChildControl("captionbar");
        this.setLayout(new qx.ui.layout.Basic());
        this.add(this.__createDialog());
    },

    members: {
        __createDialog(){
            const dialog = new scada.widget.window.confirm.Dialog(qx.locale.Manager.tr("Are you sure") + "?");
            dialog.addListener("confirmed", function(){ 
                this.fireEvent("confirmed");
                this.fireEvent("pressed");
            }, this);
            dialog.addListener("denied", function(){ this.fireEvent("pressed"); }, this);
            return dialog;
        }
    }
});