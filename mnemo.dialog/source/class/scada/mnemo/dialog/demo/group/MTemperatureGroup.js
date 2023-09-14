qx.Mixin.define("scada.mnemo.dialog.demo.group.MTemperatureGroup", {

    construct() {
        //GroupBox "Калькулятор"
        this.tempGroup = new qx.ui.groupbox.GroupBox("Температура");
        const gridTempGroup = new qx.ui.layout.Grid(2);
        gridTempGroup.setSpacing(3);
        gridTempGroup.setColumnAlign(0, "left", "middle");
        this.tempGroup.setLayout(gridTempGroup);

        //GroupBox "Позиция"
        this.posBoxTepm = new qx.ui.groupbox.GroupBox("Позиция");
        const gridPosTemp = new qx.ui.layout.Grid();
        gridPosTemp.setSpacing(5);
        gridPosTemp.setColumnAlign(0, "left", "middle");
        this.posBoxTepm.setLayout(gridPosTemp);

        //Содержимое "Позиция"
        this.chkCenterTemp = new qx.ui.form.CheckBox("Центр");
        this.leftLabelTemp = new qx.ui.basic.Label("Влево: ");
        this.topLabelTemp = new qx.ui.basic.Label("Вверх: ");
        this.leftInputTemp = new qx.ui.form.TextField();
        this.topInputTemp = new qx.ui.form.TextField();

        this.btnEnterTemp = new qx.ui.form.Button("Применить");

        //Добавление в "Позиция"
        this.posBoxTepm.add(this.chkCenterTemp, {row: 0, column: 0});
        this.posBoxTepm.add(this.leftLabelTemp, {row: 1, column: 0});
        this.posBoxTepm.add(this.topLabelTemp, {row: 2, column: 0});
        this.posBoxTepm.add(this.leftInputTemp, {row: 1, column: 1});
        this.posBoxTepm.add(this.topInputTemp, {row: 2, column: 1});

        //Добавление в "Калькулятор"
        this.tempGroup.add(this.posBoxTepm, {row: 0, column: 0});
        this.tempGroup.add(this.btnEnterTemp, {row: 1, column: 0});

        this.__setPosTemp();
    },

    properties: {
        propTemp: {
            init: {
                name: "Temperature",
                key: "",
                center: true,
                leftCoord: 300,
                topCoord: 300,
                protection: {
                    key: "aaa",
                    show_message: true
                }
            }
        }
    },

    members: {
        __setPosTemp(){
            this.chkCenterTemp.addListener("changeValue", function (e) {
                const value = e.getData();
                this.setDialogCenter(value, this.getPropTemp(), this.leftInputTemp, this.topInputTemp);
            }, this)

            this.btnEnterTemp.addListener("execute", function(){
                this.getPropTemp().leftCoord = parseInt(this.leftInputTemp.getValue());
                this.getPropTemp().topCoord = parseInt(this.topInputTemp.getValue());

                this.refreshDialog(this.getPropTemp());
            }, this)
        }
    }
});