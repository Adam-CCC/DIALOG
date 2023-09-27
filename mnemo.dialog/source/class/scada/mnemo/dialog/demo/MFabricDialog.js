qx.Mixin.define("scada.mnemo.dialog.demo.MFabricDialog", {

    construct() {
        this.groupDialogs = new qx.ui.groupbox.GroupBox("Диалоги");
        this.groupDialogs.setLayout(new qx.ui.layout.VBox());

        this.radioOpenDialog = new qx.ui.form.RadioButton("Открыть диалог");
        this.radioCalculate = new qx.ui.form.RadioButton("Калькулятор");       
        this.radioQuestion = new qx.ui.form.RadioButton("Вопрос");            
        this.radioDoubleQuestion = new qx.ui.form.RadioButton("Двойной вопрос");            
        this.radioTemperature = new qx.ui.form.RadioButton("Температура");  

        this.managerRadioBtn = new qx.ui.form.RadioGroup(this.radioOpenDialog, this.radioCalculate, this.radioQuestion, this.radioDoubleQuestion, this.radioTemperature);

        this.add(this.groupDialogs);
    },

    properties: {

    },
    
    members: {
        __manager: new scada.mnemo.dialog.dialogs.Manager(),
        __dialogs: new scada.mnemo.dialog.demo.Dialogs(),

        setDialog(config, value) {
            this.__manager.setDialogFactory(this.__dialogs);
            this.__manager.setDialog(config);
            this.__manager.openDialog({x: config.leftCoord, y: config.topCoord}, value);
        },

        refreshDialog(settings) {
            this.setDialog(settings, {x: settings.leftCoord, y: settings.topCoord}, this.getProtections());
        }
    }
});