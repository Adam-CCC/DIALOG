qx.Class.define("scada.mnemo.dialog.demo.DialogController", {
    extend: scada.mnemo.dialog.demo.ListDialog,

    construct() {
        super("Управление окнами");
        this.setLayout(new qx.ui.layout.VBox(5));

        this.radioProtection = new qx.ui.form.RadioButton("Заблокировать");
        this.radioRemoveProtection = new qx.ui.form.RadioButton("Разблокировать");

        this.managerRadioController = new qx.ui.form.RadioGroup(this.radioProtection, this.radioRemoveProtection);
    },

    properties: {
    },

    members: {
        protection(){
            this.managerRadioController.addListener("changeSelection", function (e) {
                const selectedButton = e.getData()[0];
                const value = selectedButton.getLabel();
                if(value == "Заблокировать") {
                    //Тут я остановился
                }
            }, this);
        },

        removeProtection(){

        }
    }
});