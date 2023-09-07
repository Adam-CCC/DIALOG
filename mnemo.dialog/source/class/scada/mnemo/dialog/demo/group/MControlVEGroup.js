qx.Mixin.define("scada.mnemo.dialog.demo.group.MControlVEGroup", {

    construct() {
        this.controlVEGroup = new qx.ui.groupbox.GroupBox("Диалоги ВЕ");
        this.controlVEGroup.setLayout(new qx.ui.layout.VBox());

        //GroupBox "Позиция"
        this.positionBox = new qx.ui.groupbox.GroupBox("Позиция");
        this.positionBox.setLayout(new qx.ui.layout.HBox());
        this.controlVEGroup.add(this.positionBox);

        //RadioButtons in "Позиция"
        this.centerBtn = new qx.ui.form.RadioButton("Центр");
        this.leftBtn = new qx.ui.form.RadioButton("Левая");
        this.topBtn = new qx.ui.form.RadioButton("Верхняя");

        //Create input
        this.inputText = new qx.ui.form.TextField();

        this.buttonEnter = new qx.ui.form.Button("Применить");

        //RadioButtons in "Позиция" group
        this.positionManager = new qx.ui.form.RadioGroup(this.centerBtn, this.leftBtn, this.topBtn);

        //RadioButtons in "Позиция" add
        this.positionBox.add(this.centerBtn);
        this.positionBox.add(this.leftBtn);
        this.positionBox.add(this.topBtn);

        //Add input
        this.controlVEGroup.add(this.inputText);
        this.controlVEGroup.add(this.buttonEnter);

        this.setDialogPos()
    },

    members: {
        setDialogPos(){
            this.positionManager.addListener("changeSelection", function (e) {
                const selectedButton = e.getData()[0];
                const value = selectedButton.getLabel();
                if(value == "Центр") {
                    
                }
            }, this)
            
        }
    }
});