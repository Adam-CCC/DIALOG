qx.Class.define("scada.mnemo.dialog.demo.GeneralDialogs", {
    extend : qx.ui.container.Composite,
    include: [
        scada.mnemo.dialog.demo.MFabricDialog,
        scada.mnemo.dialog.demo.MDialogController,
        scada.mnemo.dialog.demo.group.MControlVEGroup,
        scada.mnemo.dialog.demo.group.MCalculateGroup,
        scada.mnemo.dialog.demo.group.MQuestionGroup,
        scada.mnemo.dialog.demo.group.MDoubleQuestionGroup,
        scada.mnemo.dialog.demo.group.MTemperatureGroup
    ],

    construct() {
        super(new qx.ui.layout.VBox());
    },

    members: {
        __currentBox: null,
        __data: {},

        addGroupBox(groupName){
            if(this.__currentBox != null){
                this.remove(this.__currentBox);
            }
            this.__currentBox = groupName;
            this.add(this.__currentBox);
        },

        openAllDialog() {
            this._openControlVE();
            this._openCalculate();
            this._openQuestion();
            this._openDoubleQuestion();
            this._openTemperature();
        },

        _openControlVE() {
            this.managerRadioBtn.addListener("changeSelection", function (e) {
                const selectedButton = e.getData()[0];
                const value = selectedButton.getLabel();
                if(value == "Открыть диалог") {
                    this.addGroupBox(this.controlVEGroup);
                    this.chkCenterFunc(this.getPropControlVE())
                    this.setDialog(this.getPropControlVE());
                }
            }, this);
            this.groupDialogs.add(this.radioOpenDialog);
        },

        _openCalculate() {
            this.managerRadioBtn.addListener("changeSelection", function (e) {
                const selectedButton = e.getData()[0];
                const value = selectedButton.getLabel();
                if(value == "Калькулятор") {
                    this.addGroupBox(this.сalcGroup);
                    this.chkCenterFunc(this.getPropCalculate());
                    this.setDialog(this.getPropCalculate());
                }
            },  this);
            this.groupDialogs.add(this.radioCalculate);
        },

        _openQuestion() {
            this.managerRadioBtn.addListener("changeSelection", function (e) {
                const selectedButton = e.getData()[0];
                const value = selectedButton.getLabel();
                if(value == "Вопрос") {
                    this.addGroupBox(this.questGroup);
                    this.chkCenterFunc(this.getPropQuest());
                    this.setDialog(this.getPropQuest());
                }
            }, this);
            this.groupDialogs.add(this.radioQuestion);
        },

        _openDoubleQuestion() {
            this.managerRadioBtn.addListener("changeSelection", function (e) {
                const selectedButton = e.getData()[0];
                const value = selectedButton.getLabel();
                if(value == "Двойной вопрос") {
                    this.addGroupBox(this.dblQuestGroup);
                    this.chkCenterFunc(this.getPropDblQuest());
                    this.setDialog(this.getPropDblQuest());
                }
            }, this);
            this.groupDialogs.add(this.radioDoubleQuestion);
        },

        _openTemperature() {
            this.managerRadioBtn.addListener("changeSelection", function (e) {
                const selectedButton = e.getData()[0];
                const value = selectedButton.getLabel();
                if(value == "Температура") {
                    this.addGroupBox(this.tempGroup);
                    this.chkCenterFunc(this.getPropTemp());
                    this.setDialog(this.getPropTemp());
                }
            }, this);
            this.groupDialogs.add(this.radioTemperature);
        }
    }
});