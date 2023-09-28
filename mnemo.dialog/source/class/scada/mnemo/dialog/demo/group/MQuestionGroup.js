qx.Mixin.define("scada.mnemo.dialog.demo.group.MQuestionGroup", {

    construct() {
        //GroupBox "Калькулятор"
        this.questGroup = new qx.ui.groupbox.GroupBox("Вопрос");
        const gridQuestGroup = new qx.ui.layout.Grid(2);
        gridQuestGroup.setSpacing(3);
        gridQuestGroup.setColumnAlign(0, "left", "middle");
        this.questGroup.setLayout(gridQuestGroup);

        // Добавляем текстовое поле для вопроса
        this.questLabel = new qx.ui.basic.Label("Надпись:");
        this.questText = new qx.ui.form.TextField();
        this.questGroup.add(this.questLabel, { row: 0, column: 0 });
        this.questGroup.add(this.questText, { row: 0, column: 1 });

        // Добавляем кнопку "Применить" на всю ширину GroupBox
        this.applyButtonQuest = new qx.ui.form.Button("Применить");
        this.questGroup.add(this.applyButtonQuest, { row: 2, column: 0, colSpan: 2 });

        this.applyListenerQuest();
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
        __changeDataQuest() {
            if(this.questText.getValue() != null){
                this.getPropQuest().question.label = this.questText.getValue();

                this.refreshDialog(this.getPropQuest());
            }
        },
        
        applyListenerQuest() {
            this.applyButtonQuest.addListener("execute", this.__changeDataQuest, this);
        }
    }
});