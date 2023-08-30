qx.Mixin.define("scada.mnemo.dialog.demo.MFabricDialog", {

    construct() {
        this.groupDialogs = new qx.ui.groupbox.GroupBox("Диалоги");
        this.groupDialogs.setLayout(new qx.ui.layout.VBox());

        this.radioOpenDialog = new qx.ui.form.RadioButton("Открыть диалог");
        this.radioCalculate = new qx.ui.form.RadioButton("Калькулятор");       
        this.radioQuestion = new qx.ui.form.RadioButton("Вопрос");            
        this.radioDoubleQuestion = new qx.ui.form.RadioButton("Двойной вопрос");            
        this.radioTemperature = new qx.ui.form.RadioButton("Температура");  

        this.groupDialogs.add(this.radioOpenDialog);
        this.groupDialogs.add(this.radioCalculate);
        this.groupDialogs.add(this.radioQuestion);
        this.groupDialogs.add(this.radioDoubleQuestion);
        this.groupDialogs.add(this.radioTemperature);

        this.managerRadioBtn = new qx.ui.form.RadioGroup(this.radioOpenDialog, this.radioCalculate, this.radioQuestion, this.radioDoubleQuestion, this.radioTemperature);
    },

    properties: {

    },
    
    members: {
        __manager: new scada.mnemo.dialog.dialogs.Manager(),
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