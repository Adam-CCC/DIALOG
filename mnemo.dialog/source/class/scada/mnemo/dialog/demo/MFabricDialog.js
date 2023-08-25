qx.Mixin.define("scada.mnemo.dialog.demo.MFabricDialog", {
    members: {
        __manager: new scada.mnemo.dialog.Manager(),
        __dialogs: new scada.mnemo.dialog.demo.Dialogs(),

        setDialog(config) {
            this.__manager.setDialogFactory(this.__dialogs);
            this.__manager.setDialog(config);
        },

        openDialog(position, value){
            this.__manager.openDialog(position, value);
        }
    }
});