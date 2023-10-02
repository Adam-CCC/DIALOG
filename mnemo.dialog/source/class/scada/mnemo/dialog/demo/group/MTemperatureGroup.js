qx.Mixin.define("scada.mnemo.dialog.demo.group.MTemperatureGroup", {

    construct() {
        //GroupBox "Калькулятор"
        this.tempGroup = new qx.ui.groupbox.GroupBox("Температура");
        const gridTempGroup = new qx.ui.layout.Grid(2);
        gridTempGroup.setSpacing(3);
        gridTempGroup.setColumnAlign(0, "left", "middle");
        this.tempGroup.setLayout(gridTempGroup);

        // Добавляем текстовое поле для вопроса
        this.tempLabel = new qx.ui.basic.Label("Температура: ");
        this.tempText = new qx.ui.form.TextField();
        this.tempGroup.add(this.tempLabel, { row: 0, column: 0 });
        this.tempGroup.add(this.tempText, { row: 0, column: 1 });

        // Добавляем кнопку "Применить" на всю ширину GroupBox
        this.applyButtonTemp = new qx.ui.form.Button("Применить");
        this.tempGroup.add(this.applyButtonTemp, { row: 2, column: 0, colSpan: 2 });

    },

    properties: {
        propTemp: {
            init: {
                name: "Temperature",
                key: "temperature",
                protections: "",
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

    }
});