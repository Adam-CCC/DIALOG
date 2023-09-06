qx.Class.define("scada.mnemo.dialog.demo.group.ControlVEGroup", {
    extend: qx.ui.groupbox.GroupBox,

    construct() {
        super("Диалог ВЕ");
        this.setLayout(new qx.ui.layout.VBox());

        //GroupBox "Позиция"
        this.positionBox = new qx.ui.groupbox.GroupBox("Позиция")
        this.positionBox.setLayout(new qx.ui.layout.HBox());
        this.add(this.positionBox);

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
        this.add(this.inputText);
        this.add(this.buttonEnter);

        this.setDialogPos();
    },

    members: {
        setDialogPos(){
            const binder = new qx.data.SingleValueBinding();
            binder.bind(this.inputText, "value", this.getControlVE(), "key");

            // Добавляем слушателя события input к полю ввода
            this.inputText.addListener("input", function(e) {
                binder.sync();
            }, this);

            // Добавляем слушателя события "execute" к кнопке
            this.buttonEnter.addListener("execute", function(e) {
                binder.sync();
            }, this);
        }
    }
});