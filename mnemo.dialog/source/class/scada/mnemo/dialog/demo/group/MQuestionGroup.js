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

        //GroupBox "Настройки"
        this.setGenQuest = new qx.ui.groupbox.GroupBox("Настройки");
        const gridGenQuest = new qx.ui.layout.Grid();
        gridGenQuest.setSpacing(5);
        gridGenQuest.setColumnAlign(0, "left", "middle");
        this.setGenQuest.setLayout(gridGenQuest);

        this.labelQuest = new qx.ui.basic.Label("Надпись: ");
        this.inputQuest= new qx.ui.form.TextField();
        this.btnEnterQuest = new qx.ui.form.Button("Применить");

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

        this.setGenQuest.add(this.labelQuest, {row: 0, column: 0})
        this.setGenQuest.add(this.inputQuest, {row: 0, column: 1})

        //Содержимое "Калькулятор"
        this.maxLengthLabel = new qx.ui.basic.Label("Макс. длина: ");
        this.maxLengthInput = new qx.ui.form.TextField();
        this.btnEnterQuest = new qx.ui.form.Button("Применить");

        //Добавление в "Калькулятор"
        this.questGroup.add(this.posBoxQuest, {row: 0, column: 0});
        this.questGroup.add(this.setGenQuest, {row: 1, column: 0});
        this.questGroup.add(this.btnEnterQuest, {row: 2, column: 0});

        this.__setPosQuest();
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
        __setPosQuest(){
            this.chkCenterQuest.addListener("changeValue", function (e) {
                const value = e.getData();
                this.setDialogCenter(value, this.getPropQuest(), this.leftInputQuest, this.topInputQuest);
            }, this)

            this.btnEnterQuest.addListener("execute", function(){

                if (this.inputQuest.getValue() != null){
                    this.getPropQuest().question.label = this.inputQuest.getValue();
                }


                this.getPropQuest().leftCoord = parseInt(this.leftInputQuest.getValue());
                this.getPropQuest().topCoord = parseInt(this.topInputQuest.getValue());

                this.refreshDialog(this.getPropQuest());
            }, this)
        }
    }
});