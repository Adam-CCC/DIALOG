qx.Mixin.define("scada.mnemo.dialog.demo.group.MDoubleQuestionGroup", {

    construct() {
        //GroupBox "Калькулятор"
        this.dblQuestGroup = new qx.ui.groupbox.GroupBox(this.getPropDblQuest().name);
        const gridDblQuestGroup = new qx.ui.layout.Grid(2);
        gridDblQuestGroup.setSpacing(3);
        gridDblQuestGroup.setColumnAlign(0, "left", "middle");
        this.dblQuestGroup.setLayout(gridDblQuestGroup);

        // Добавляем текстовое поле для вопроса
        this.dblQuestLabel = new qx.ui.basic.Label("Надпись:");
        this.dblQuestText = new qx.ui.form.TextField();
        this.dblQuestGroup.add(this.dblQuestLabel, { row: 0, column: 0 });
        this.dblQuestGroup.add(this.dblQuestText, { row: 0, column: 1 });

        // Добавляем кнопку "Применить" на всю ширину GroupBox
        this.applyDblQuest = new qx.ui.form.Button("Применить");
        this.dblQuestGroup.add(this.applyDblQuest, { row: 2, column: 0, colSpan: 2 });

        this.applyListenerDblQuest()
    },

    properties: {
        propDblQuest: {
            init: {
                name: "DoubleQuestion",
                question: {label: "Вы хотите продолжить?", key: "aaa", answers: {"Включить": ["Да"], "Отключить": ["Нет"]}},
                protections: "",
                confirmation: true,
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
        __changeDataDblQuest() {
            if(this.dblQuestText.getValue() != null){
                this.getPropDblQuest().question.label = this.dblQuestText.getValue();

                this.refreshDialog(this.getPropDblQuest());
            }
        },
        
        applyListenerDblQuest() {
            this.applyDblQuest.addListener("execute", this.__changeDataDblQuest, this);
        }
    }
});