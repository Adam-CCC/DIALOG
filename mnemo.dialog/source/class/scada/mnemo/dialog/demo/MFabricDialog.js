qx.Mixin.define("scada.mnemo.dialog.demo.MFabricDialog", {

    construct() {
        this.groupDialogs = new qx.ui.groupbox.GroupBox(this.basename);
        this.groupDialogs.setLayout(new qx.ui.layout.VBox());

        this.radioOpenDialog = new qx.ui.form.RadioButton(this.__dialogs.getDialog("controlVE").basename);
        this.radioCalculate = new qx.ui.form.RadioButton(this.__dialogs.getDialog("Calculate").basename);       
        this.radioQuestion = new qx.ui.form.RadioButton(this.__dialogs.getDialog("Question").basename);            
        this.radioDoubleQuestion = new qx.ui.form.RadioButton(this.__dialogs.getDialog("DoubleQuestion").basename);            
        this.radioTemperature = new qx.ui.form.RadioButton(this.__dialogs.getDialog("Temperature").basename);  

        this.managerRadioBtn = new qx.ui.form.RadioGroup(this.radioOpenDialog, this.radioCalculate, this.radioQuestion, this.radioDoubleQuestion, this.radioTemperature);

        this.add(this.groupDialogs);
    },

    properties: {

    },
    
    members: {
        __manager: new scada.mnemo.dialog.Manager(),
        __dialogs: new scada.mnemo.dialog.demo.Dialogs(),

        setDialog(config) {
            this.__manager.setDialogFactory(this.__dialogs);
            this.__manager.setDialog(config);
            this.__manager.openDialog({x: config.leftCoord, y: config.topCoord}, this.getBufferData());
        },

        refreshDialog(settings) {
            this.setDialog(settings, {x: settings.leftCoord, y: settings.topCoord}, this.getBufferData());
        }
    }
});