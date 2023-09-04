qx.Class.define("scada.mnemo.dialog.demo.group.ControlVEGroup", {
    extend: qx.ui.groupbox.GroupBox,

    construct() {
        super("Диалог ВЕ");
        this.setLayout(new qx.ui.layout.VBox());

        this.positionBox = new qx.ui.groupbox.GroupBox("Позиция")
        this.positionBox.setLayout(new qx.ui.layout.HBox());

        this.add(this.positionBox);

        this.centerBtn = new qx.ui.form.RadioButton("Центр");
        this.leftBtn = new qx.ui.form.RadioButton("Левая");
        this.topBtn = new qx.ui.form.RadioButton("Верхняя");

        this.positionManager = new qx.ui.form.RadioGroup(this.centerBtn, this.leftBtn, this.topBtn);

        this.positionBox.add(this.centerBtn);
        this.positionBox.add(this.leftBtn);
        this.positionBox.add(this.topBtn);
    },

    members: {

    }
});