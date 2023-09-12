qx.Class.define("scada.widget.window.confirm.Dialog", {
    extend : qx.ui.container.Composite,

    construct(question = ""){
        this.base(arguments, new qx.ui.layout.VBox());
        this.setFont(this.__getFont());
        this.__questionLabel = this.__createAndAddQuestionLabel();
        this.__createAndAddOptionBar();
        this.initQuestion(question);
    },

    destruct() {
        this._disposeObjects("__questionLabel");
    },

    events :  {
        "confirmed": "qx.event.type.Event",
        "denied": "qx.event.type.Event"
    },

    properties: {
        question: {
            deferredInit: true,
            apply: "_applyQuestion"
        }
    },

    members: {
        _applyQuestion(value){
            this.__questionLabel.setValue(value);
        },

        __getFont(){
            const fontFamily = ["Lucida Grande","Tahoma","Verdana", "Bitstream Vera Sans","Liberation Sans"];
            return new qx.bom.Font(20, fontFamily);
        },

        __createAndAddQuestionLabel(){
            const label = new qx.ui.basic.Label("");
            this.add(label);
            return label;
        },

        __createAndAddOptionBar(){
            const bar = new qx.ui.container.Composite(this.__createOptionBarLayout());

            const yesButton = this.__createOptionButton(this.tr("Yes"), "confirmed");
            bar.add(yesButton);

            const noButton = this.__createOptionButton(this.tr("No"), "denied")
            bar.add(noButton);

            this.add(bar);
        },

        __createOptionBarLayout(){
            const layout = new qx.ui.layout.HBox();
            layout.setSpacing(10);
            layout.setAlignX("center");
            return layout;
        },
    
        __createOptionButton(label, eventName){
            const button = new qx.ui.form.Button(label);
            button.setWidth(60);
            button.addListener("execute", function(){
                this.fireEvent(eventName);
            }, this);
            return button;
        }
    }
});