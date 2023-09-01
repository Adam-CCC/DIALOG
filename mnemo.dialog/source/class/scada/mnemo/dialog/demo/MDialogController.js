qx.Mixin.define("scada.mnemo.dialog.demo.MDialogController", {
    construct() {
        this.groupControlDialogs = new qx.ui.groupbox.GroupBox("Управление диалогами");
        this.groupControlDialogs.setLayout(new qx.ui.layout.VBox());

        this.radioProtection = new qx.ui.form.RadioButton("Заблокировать");
        this.radioRemoveProtection = new qx.ui.form.RadioButton("Разблокировать");
        
        this.manager = new qx.ui.form.RadioGroup(this.radioProtection, this.radioRemoveProtection);

        this.add(this.groupControlDialogs);
    },
    
    members: {
        setMaket(){
            const groupBox = new qx.ui.groupbox.GroupBox("Управление диалогами");
            groupBox.setLayout(new qx.ui.layout.VBox(5));
        },

        managerAddlistener() {
            this.setMaket();
            this.manager.addListener("changeSelection", function (e) {
                const selectedButton = e.getData()[0];
                const value = selectedButton.getLabel();
                if(value == "Заблокировать") {
                    this.setProtections({"aaa":1});  
                } else if (value == "Разблокировать") {
                    this.setProtections({"aaa":0});  
                }
            }, this)
            this.groupControlDialogs.add(this.radioProtection);
            this.groupControlDialogs.add(this.radioRemoveProtection);
        }
    }
});