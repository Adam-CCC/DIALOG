qx.Mixin.define("scada.mnemo.dialog.demo.group.MDoubleQuestionGroup", {

    construct() {
        //GroupBox "Калькулятор"
        this.dblQuestGroup = new qx.ui.groupbox.GroupBox("Двойной вопрос");
        const gridDblQuestGroup = new qx.ui.layout.Grid(2);
        gridDblQuestGroup.setSpacing(3);
        gridDblQuestGroup.setColumnAlign(0, "left", "middle");
        this.dblQuestGroup.setLayout(gridDblQuestGroup);

        //GroupBox "Позиция"
        this.posBoxDblQuest = new qx.ui.groupbox.GroupBox("Позиция");
        const gridPosDblQuest = new qx.ui.layout.Grid();
        gridPosDblQuest.setSpacing(5);
        gridPosDblQuest.setColumnAlign(0, "left", "middle");
        this.posBoxDblQuest.setLayout(gridPosDblQuest);

        //Содержимое "Позиция"
        this.chkCenterDblQuest = new qx.ui.form.CheckBox("Центр");
        this.leftLabelDblQuest = new qx.ui.basic.Label("Влево: ");
        this.topLabelDblQuest = new qx.ui.basic.Label("Вверх: ");
        this.leftInputDblQuest = new qx.ui.form.TextField();
        this.topInputDblQuest = new qx.ui.form.TextField();

        this.btnEnterDblQuest = new qx.ui.form.Button("Применить");

        //Добавление в "Позиция"
        this.posBoxDblQuest.add(this.chkCenterDblQuest, {row: 0, column: 0});
        this.posBoxDblQuest.add(this.leftLabelDblQuest, {row: 1, column: 0});
        this.posBoxDblQuest.add(this.topLabelDblQuest, {row: 2, column: 0});
        this.posBoxDblQuest.add(this.leftInputDblQuest, {row: 1, column: 1});
        this.posBoxDblQuest.add(this.topInputDblQuest, {row: 2, column: 1});

        //Добавление в "Калькулятор"
        this.dblQuestGroup.add(this.posBoxDblQuest, {row: 0, column: 0});
        this.dblQuestGroup.add(this.btnEnterDblQuest, {row: 1, column: 0});

        this.__setPosDblQuest();
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
        __setPosDblQuest(){
            this.chkCenterDblQuest.addListener("changeValue", function (e) {
                const value = e.getData();
                this.setDialogCenter(value, this.getPropDblQuest(), this.leftInputDblQuest, this.topInputDblQuest);
            }, this)

            this.btnEnterDblQuest.addListener("execute", function(){
                this.getPropDblQuest().leftCoord = parseInt(this.leftInputDblQuest.getValue());
                this.getPropDblQuest().topCoord = parseInt(this.topInputDblQuest.getValue());

                this.refreshDialog(this.getPropDblQuest());
            }, this)
        }
    }
});