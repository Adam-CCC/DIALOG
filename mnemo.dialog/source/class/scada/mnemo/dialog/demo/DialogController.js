qx.Class.define("scada.mnemo.dialog.demo.DialogController", {
    extend: scada.mnemo.dialog.demo.ListDialog,

    construct(name) {
        super(name);
        this.setLayout(new qx.ui.layout.VBox(5));

        this.radioProtection = new qx.ui.form.RadioButton("Заблокировать");
        this.radioRemoveProtection = new qx.ui.form.RadioButton("Разблокировать");

        this.managerRadioController = new qx.ui.form.RadioGroup(this.radioProtection, this.radioRemoveProtection);
        this.add(this.radioProtection);
        this.add(this.radioRemoveProtection);

        this.protect();
    },

    members: {
        protect() {
            this.managerRadioController.addListener("changeSelection", function (e) {
                const selectedButton = e.getData()[0];
                const value = selectedButton.getLabel();
                if(value == "Заблокировать") {
                    this.setProtections({"aaa":1})
                    console.log(this.getProtections());
                } else if (value == "Разблокировать") {
                    this.setProtections({"aaa":0})
                    console.log("Ввел: " + this.getProtections());
                }
            }, this)
        }
    }
});