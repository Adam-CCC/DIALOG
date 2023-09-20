qx.Mixin.define("scada.mnemo.dialog.demo.group.MDoubleQuestionGroup", {

    construct() {
        //GroupBox "Калькулятор"
        this.dblQuestGroup = new qx.ui.groupbox.GroupBox("Двойной вопрос");
        const gridDblQuestGroup = new qx.ui.layout.Grid(2);
        gridDblQuestGroup.setSpacing(3);
        gridDblQuestGroup.setColumnAlign(0, "left", "middle");
        this.dblQuestGroup.setLayout(gridDblQuestGroup);
    },

    properties: {
        propDblQuest: {
            init: {
                name: "DoubleQuestion",
                question: {label: "Вы хотите продолжить?", key: "hi"},
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