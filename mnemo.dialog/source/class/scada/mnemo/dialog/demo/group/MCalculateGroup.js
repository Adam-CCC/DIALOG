qx.Mixin.define("scada.mnemo.dialog.demo.group.MCalculateGroup", {

    construct() {
        //GroupBox "Калькулятор"
        this.сalcGroup = new qx.ui.groupbox.GroupBox("Калькулятор");
        const gridCalcGroup = new qx.ui.layout.Grid(2);
        gridCalcGroup.setSpacing(3);
        gridCalcGroup.setColumnAlign(0, "left", "middle");
        this.сalcGroup.setLayout(gridCalcGroup);

        //GroupBox "Позиция"
        this.posBoxCalc = new qx.ui.groupbox.GroupBox("Позиция");
        const gridPosCalc = new qx.ui.layout.Grid();
        gridPosCalc.setSpacing(5);
        gridPosCalc.setColumnAlign(0, "left", "middle");
        this.posBoxCalc.setLayout(gridPosCalc);

        //Содержимое "Позиция"
        this.chkCenterCalc = new qx.ui.form.CheckBox("Центр");
        this.leftLabelCalc = new qx.ui.basic.Label("Влево: ");
        this.topLabelCalc = new qx.ui.basic.Label("Вверх: ");
        this.leftInputCalc = new qx.ui.form.TextField();
        this.topInputCalc = new qx.ui.form.TextField();

        //Добавление в "Позиция"
        this.posBoxCalc.add(this.chkCenterCalc, {row: 0, column: 0});
        this.posBoxCalc.add(this.leftLabelCalc, {row: 1, column: 0});
        this.posBoxCalc.add(this.topLabelCalc, {row: 2, column: 0});
        this.posBoxCalc.add(this.leftInputCalc, {row: 1, column: 1});
        this.posBoxCalc.add(this.topInputCalc, {row: 2, column: 1});

        //Содержимое "Калькулятор"
        this.maxLengthLabel = new qx.ui.basic.Label("Макс. длина: ");
        this.maxLengthInput = new qx.ui.form.TextField();
        this.btnEnterCalc = new qx.ui.form.Button("Применить");

        //Добавление в "Калькулятор"
        this.сalcGroup.add(this.posBoxCalc, {row: 0, column: 0});
        this.сalcGroup.add(this.maxLengthInput, {row: 1, column: 1});
        this.сalcGroup.add(this.maxLengthLabel, {row: 1, column: 0});
        this.сalcGroup.add(this.btnEnterCalc, {row: 3, column: 0});

        this.__setPosCalculate();
    },

    properties: {
        propCalculate: {
            init: {
                name: "Calculate",
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
        __setPosCalculate(){
            this.chkCenterCalc.addListener("changeValue", function (e) {
                const value = e.getData();
                this.setDialogCenter(value, this.getPropCalculate(), this.leftInputCalc, this.topInputCalc);
            }, this)

            this.btnEnterCalc.addListener("execute", function(){
                this.getPropCalculate().leftCoord = parseInt(this.leftInputCalc.getValue());
                this.getPropCalculate().topCoord = parseInt(this.topInputCalc.getValue());

                this.refreshDialog(this.getPropCalculate());
            }, this)
        }
    }
});