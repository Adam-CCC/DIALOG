qx.Mixin.define("scada.mnemo.dialog.demo.group.MCalculateGroup", {

    construct() {
        //GroupBox "Калькулятор"
        this.сalcGroup = new qx.ui.groupbox.GroupBox("Калькулятор"); 
        const gridCalcGroup = new qx.ui.layout.Grid(2);
        gridCalcGroup.setSpacing(3);
        gridCalcGroup.setColumnAlign(0, "left", "middle");
        this.сalcGroup.setLayout(gridCalcGroup);
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
    }
});