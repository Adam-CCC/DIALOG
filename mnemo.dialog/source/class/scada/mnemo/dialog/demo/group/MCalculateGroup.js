qx.Mixin.define("scada.mnemo.dialog.demo.group.MCalculateGroup", {
    construct() {
        //GroupBox "Калькулятор"
        this.сalcGroup = new qx.ui.groupbox.GroupBox(this.getPropCalculate().name); 
        const gridCalcGroup = new qx.ui.layout.Grid(2);
        gridCalcGroup.setSpacing(3);
        gridCalcGroup.setColumnAlign(0, "left", "middle");
        this.сalcGroup.setLayout(gridCalcGroup);

        // Добавляем текстовое поле для точности
        this.precisionLabel = new qx.ui.basic.Label("Точность:");
        this.precisionTextField = new qx.ui.form.TextField();
        this.сalcGroup.add(this.precisionLabel, { row: 0, column: 0 });
        this.сalcGroup.add(this.precisionTextField, { row: 0, column: 1 });

        // Добавляем текстовое поле для максимального количества чисел
        this.digitCountLabel = new qx.ui.basic.Label("Макс. количество чисел:");
        this.digitCountTextField = new qx.ui.form.TextField();
        this.сalcGroup.add(this.digitCountLabel, { row: 1, column: 0 });
        this.сalcGroup.add(this.digitCountTextField, { row: 1, column: 1 });

        // Добавляем кнопку "Применить"
        this.applyButtonCacl = new qx.ui.form.Button("Применить");
        this.сalcGroup.add(this.applyButtonCacl, { row: 2, column: 0, colSpan: 2 });

        this.applyListener();
    },

    properties: {
        propCalculate: {
            init: {
                name: "Calculate",
                protections: "",
                precision: 5,
                digit_count: 6,
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
        __changeDataCalc() {
            if(this.precisionTextField.getValue() || this.digitCountTextField.getValue() != NaN){
                this.getPropCalculate().precision = parseInt(this.precisionTextField.getValue());
                this.getPropCalculate().digit_count = parseInt(this.digitCountTextField.getValue());

                this.refreshDialog(this.getPropCalculate());
            }
        },
        
        applyListener() {
            this.applyButtonCacl.addListener("execute", this.__changeDataCalc, this);
        }
    }
});