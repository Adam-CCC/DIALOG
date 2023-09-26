qx.Mixin.define("scada.mnemo.dialog.demo.group.MCalculateGroup", {

    construct() {
        //GroupBox "Калькулятор"
        this.сalcGroup = new qx.ui.groupbox.GroupBox("Калькулятор"); 
        const gridCalcGroup = new qx.ui.layout.Grid(2);
        gridCalcGroup.setSpacing(3);
        gridCalcGroup.setColumnAlign(0, "left", "middle");
        this.сalcGroup.setLayout(gridCalcGroup);

        // Добавляем текстовое поле для точности
        const precisionLabel = new qx.ui.basic.Label("Точность:");
        const precisionTextField = new qx.ui.form.TextField();
        this.сalcGroup.add(precisionLabel, { row: 0, column: 0 });
        this.сalcGroup.add(precisionTextField, { row: 0, column: 1 });

        // Добавляем текстовое поле для максимального количества чисел
        const digitCountLabel = new qx.ui.basic.Label("Макс. количество чисел:");
        const digitCountTextField = new qx.ui.form.TextField();
        this.сalcGroup.add(digitCountLabel, { row: 1, column: 0 });
        this.сalcGroup.add(digitCountTextField, { row: 1, column: 1 });

        // Добавляем кнопку "Применить"
        const applyButtonCacl = new qx.ui.form.Button("Применить");
        this.сalcGroup.add(applyButtonCacl, { row: 2, column: 0, colSpan: 2 });
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
        changePropCalc(){
            
        }
    }
});