qx.Mixin.define("scada.mnemo.dialog.demo.group.MQuestionGroup", {

    construct() {
        //GroupBox "Калькулятор"
        this.questGroup = new qx.ui.groupbox.GroupBox("Вопрос");
        const gridQuestGroup = new qx.ui.layout.Grid(2);
        gridQuestGroup.setSpacing(3);
        gridQuestGroup.setColumnAlign(0, "left", "middle");
        this.questGroup.setLayout(gridQuestGroup);
    },

    properties: {
        propQuest: {
            init: {
                name: "Question",
                question: {label: "Вы хотите продолжить?"},
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