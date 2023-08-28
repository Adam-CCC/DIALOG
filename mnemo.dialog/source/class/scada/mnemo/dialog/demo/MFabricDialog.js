qx.Mixin.define("scada.mnemo.dialog.demo.MFabricDialog", {

    construct() {
        this.radioOpenDialog = new qx.ui.form.RadioButton("Открыть диалог");
        this.radioCalculate = new qx.ui.form.RadioButton("Калькулятор");       
        this.radioQuestion = new qx.ui.form.RadioButton("Вопрос");            
        this.radioDoubleQuestion = new qx.ui.form.RadioButton("Двойной вопрос");            
        this.radioTemperature = new qx.ui.form.RadioButton("Температура");  

        this.managerRadioBtn = new qx.ui.form.RadioGroup(this.radioOpenDialog, this.radioCalculate, this.radioQuestion, this.radioDoubleQuestion, this.radioTemperature);
    },
    
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