qx.Class.define("scada.widget.window.confirm.Double", {
    extend : scada.widget.window.confirm.Window,

    construct(){
        this.base(arguments);

        this.__questionDialog = new scada.widget.window.confirm.Dialog();
        this.__sureDialog = new scada.widget.window.confirm.Dialog(qx.locale.Manager.tr("Are you sure") + "?");

        const dialogs = [this.__questionDialog, this.__sureDialog];
        this.__stack = this.__createStack(dialogs);
        this.add(this.__stack);

        this.__setupEventChain();
    },

    members: {
        setQuestion(question){
            this.__questionDialog.setQuestion(question);
        },

        _applyZIndex(value, oldvalue){
            this.base(arguments, value, oldvalue);
            if (oldvalue > value){
                this.__backToFirst();
            }
        },

        __backToFirst(){
            this.__stack.setSelection([this.__questionDialog]);
        },

        __createStack(dialogs){
            qx.core.Assert.assertArray(dialogs);

            const stack = new qx.ui.container.Stack();
            stack.setDynamic(true);
            dialogs.forEach((dialog) => {
                stack.add(dialog);
            });
            return stack;
        },

        __setupEventChain(){
            this.__questionDialog.addListener("confirmed", this._onQuestionConfirmed, this);
            this.__questionDialog.addListener("denied", this._onQuestionDenied, this);
            this.__addListenerToDialogAndBackStack("confirmed", "confirmed");
            this.__addListenerToDialogAndBackStack("denied", "pressed");
        },

        _onQuestionConfirmed(){
            this.__stack.next();
        },

        _onQuestionDenied(){
            this.close();
        },

        __addListenerToDialogAndBackStack(eventName, eventNameOut){
            this.__sureDialog.addListener(eventName, function(){
                this.__backToFirst();
                this.fireEvent(eventNameOut);
                this.close();
            }, this);
        }
    }
});