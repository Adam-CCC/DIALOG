qx.Mixin.define("scada.mnemo.dialog.demo.group.MTemperatureGroup", {

    construct() {
        //GroupBox "Калькулятор"
        this.tempGroup = new qx.ui.groupbox.GroupBox("Температура");
        const gridTempGroup = new qx.ui.layout.Grid(2);
        gridTempGroup.setSpacing(3);
        gridTempGroup.setColumnAlign(0, "left", "middle");
        this.tempGroup.setLayout(gridTempGroup);
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
    }
});