qx.Mixin.define("scada.mnemo.dialog.demo.group.MQuestionGroup", {

    construct() {
        //GroupBox "Калькулятор"
        this.questGroup = new qx.ui.groupbox.GroupBox("Вопрос");
        const gridQuestGroup = new qx.ui.layout.Grid(2);
        gridQuestGroup.setSpacing(3);
        gridQuestGroup.setColumnAlign(0, "left", "middle");
        this.questGroup.setLayout(gridQuestGroup);

        //GroupBox "Позиция"
        this.posBoxQuest = new qx.ui.groupbox.GroupBox("Позиция");
        const gridPosQuest = new qx.ui.layout.Grid();
        gridPosQuest.setSpacing(5);
        gridPosQuest.setColumnAlign(0, "left", "middle");
        this.posBoxQuest.setLayout(gridPosQuest);

        //Содержимое "Позиция"
        this.chkCenterQuest = new qx.ui.form.CheckBox("Центр");
        this.leftLabelQuest = new qx.ui.basic.Label("Влево: ");
        this.topLabelQuest = new qx.ui.basic.Label("Вверх: ");
        this.leftInputQuest = new qx.ui.form.TextField();
        this.topInputQuest = new qx.ui.form.TextField();

        //Добавление в "Позиция"
        this.posBoxQuest.add(this.chkCenterQuest, {row: 0, column: 0});
        this.posBoxQuest.add(this.leftLabelQuest, {row: 1, column: 0});
        this.posBoxQuest.add(this.topLabelQuest, {row: 2, column: 0});
        this.posBoxQuest.add(this.leftInputQuest, {row: 1, column: 1});
        this.posBoxQuest.add(this.topInputQuest, {row: 2, column: 1});

        //Содержимое "Калькулятор"
        this.maxLengthLabel = new qx.ui.basic.Label("Макс. длина: ");
        this.maxLengthInput = new qx.ui.form.TextField();
        this.btnEnterQuest = new qx.ui.form.Button("Применить");

        //Добавление в "Калькулятор"
        this.questGroup.add(this.posBoxQuest, {row: 0, column: 0});
        this.questGroup.add(this.btnEnterQuest, {row: 2, column: 0});
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
        __setPosCalculate(){
            this.chkCenterQuest.addListener("changeValue", function (e) {
                const value = e.getData();
                this.setDialogCenter(value, this.getPropQuest(), this.leftInputQuest, this.topInputQuest);
            }, this)

            this.btnEnterQuest.addListener("execute", function(){
                this.getPropCalculate().leftCoord = parseInt(this.leftInputQuest.getValue());
                this.getPropCalculate().topCoord = parseInt(this.topInputQuest.getValue());

                this.refreshDialog(this.getPropQuest());
            }, this)
        }
    }
});