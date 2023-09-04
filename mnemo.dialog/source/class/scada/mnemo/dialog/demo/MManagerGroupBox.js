qx.Mixin.define("scada.mnemo.dialog.demo.MManagerGroupBox", {
    construct() {
        this.controlVeGoup = new scada.mnemo.dialog.demo.group.ControlVEGroup();
        this.calculateGroup = new scada.mnemo.dialog.demo.group.CalculateGroup();
        this.questionGroup = new scada.mnemo.dialog.demo.group.QuestionGroup();
        this.doubleQuestionGroup = new scada.mnemo.dialog.demo.group.DoubleQuestionGroup();
        this.temperatureGroup = new scada.mnemo.dialog.demo.group.TemperatureGroup();
    },

    members: {
        __currentBox: null,

        addGroupBox(groupName){
            if(this.__currentBox != null){
                this.remove(this.__currentBox);
            }
            this.__currentBox = groupName; 
            this.add(this.__currentBox);
        }
    }
});