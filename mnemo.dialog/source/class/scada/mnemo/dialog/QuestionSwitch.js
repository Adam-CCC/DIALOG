qx.Class.define("scada.mnemo.dialog.QuestionSwitch", {
    extend: scada.mnemo.dialog.Question,

    destruct() {
        this.__actionLabels = null;
    },

    members: {
        _createWidgetContent(){
            super._createWidgetContent();
            this.addListener("changeData", function(e){
                const data = e.getData();
                this.__updateQuestionLabel(data);
            }, this);
        },

        __updateQuestionLabel(data){
            const value = data[this.__key];
            console.log(value);
            if (this._isUnknownValue(value)){
                return "Операция недоступна";
            }
            const actionLabelPart = this.__makeLabelByValue(value);
            this._mainWindow.setQuestion(`${actionLabelPart} ${this.__startLabel}`);
        },

        __makeLabelByValue(value){
            let actionLabelPart;
            if (this.__actionLabels){
                actionLabelPart = this.__actionLabels[value];
            } else {
                actionLabelPart = this.__applyDefaultChoices(value);
            }
            return actionLabelPart;
        },

        _onLoadSettings(settings){
            super._onLoadSettings(settings);
            this.__startLabel = this._mainWindow.getQuestion();
            const questionBlock = settings.question;
            this.__key = this.extractOptionFromSettings("key", questionBlock);
            this.__actionLabels = this.__parseAnswers(questionBlock.answers);
            console.log(questionBlock);
            console.log(this.__key);
            console.log(this.__actionLabels);
        },

        __applyDefaultChoices(value){
            return (value) ? "Включить": "Отключить";
        },

        __parseAnswers(answers){
            const rawActionLabels = answers;
            if (rawActionLabels){
                const result = {};
                Object.entries(rawActionLabels).forEach(([label, valueOrValues]) => {
                    if (qx.lang.Type.isArray(valueOrValues)){
                        valueOrValues.forEach(value => {
                            result[value] = label;
                            console.log(result[value]);
                        });
                    }
                    else {
                        result[valueOrValues] = label;
                        console.log(result[valueOrValues]);
                    }
                });
                console.log(result);
                return result;
            }
            console.log("null")
            return null;
        }
    }
});