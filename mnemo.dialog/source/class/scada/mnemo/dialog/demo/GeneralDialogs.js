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

    properties: {
        bufferData: {
            init: {}
        }
    },

    members: {
        __currentBox: null,
        
        addGroupBox(groupName){
            if(this.__currentBox != null){
                this.remove(this.__currentBox);
            }
            this.resetSlider();

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
            this.radioOpenDialog.addListener("changeValue", function (e) {
                const selectedButton = e.getTarget();
                const isSelected = selectedButton.getValue();
                if(isSelected) {
                    this.addGroupBox(this.controlVEGroup);
                    this.chkCenterFunc(this.getPropControlVE());
                    this.setDialog(this.getPropControlVE());
                }
            }, this);
            this.groupDialogs.add(this.radioOpenDialog);
        },

        _openCalculate() {
            this.radioCalculate.addListener("changeValue", function (e) {
                const selectedButton = e.getTarget();
                const isSelected = selectedButton.getValue();
                if(isSelected) {
                    this.addGroupBox(this.сalcGroup);
                    this.chkCenterFunc(this.getPropCalculate());
                    this.setDialog(this.getPropCalculate());
                }
            },  this);
            this.groupDialogs.add(this.radioCalculate);
        },

        _openQuestion() {
            this.radioQuestion.addListener("changeValue", function (e) {
                const selectedButton = e.getTarget();
                const isSelected = selectedButton.getValue();
                if(isSelected) {
                    this.addGroupBox(this.questGroup);
                    this.chkCenterFunc(this.getPropQuest());
                    this.setDialog(this.getPropQuest());
                }
            }, this);
            this.groupDialogs.add(this.radioQuestion);
        },

        _openDoubleQuestion() {
            this.radioDoubleQuestion.addListener("changeValue", function (e) {
                const selectedButton = e.getTarget();
                const isSelected = selectedButton.getValue();
                if(isSelected) {
                    this.addGroupBox(this.dblQuestGroup);
                    this.chkCenterFunc(this.getPropDblQuest());
                    this.setDialog(this.getPropDblQuest());
                }
            }, this);
            this.groupDialogs.add(this.radioDoubleQuestion);
        },

        _openTemperature() {
            this.radioTemperature.addListener("changeValue", function (e) {
                const selectedButton = e.getTarget();
                const isSelected = selectedButton.getValue();
                if(isSelected) {
                    this.addGroupBox(this.tempGroup);
                    this.chkCenterFunc(this.getPropTemp());
                    this.setDialog(this.getPropTemp());
                }
            }, this);
            this.groupDialogs.add(this.radioTemperature);
        }
    }
});