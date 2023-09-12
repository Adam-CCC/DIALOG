qx.Mixin.define("scada.mnemo.dialog.dialogs.MProtection", {
    construct() {
        this.initProtectionMessage(this.tr("The control is blocked"));
        this.__protectionOnValue = [scada.mnemo.dialog.dialogs.MProtection.PROTECTION_DEFAULT_VALUE];
    },

    destruct() {
        this._disposeObjects("__protectionDialog");
        this.__protectionOnValue = null;
    },

    properties: {
        protectionKey: {
            init: null,
            nullable: true,
            check: "String"
        },

        protectionMessage: {
            deferredInit: true,
            check: "String"
        },

        showProtectionDialog: {
            init: false,
            check: "Boolean"
        }
    },

    statics: {
        PROTECTION_DEFAULT_VALUE: 1
    },

    members: {
        __protectionDialog: null,

        initProtection(settings){
            if (settings === undefined)
                return;

            if (typeof settings !== 'object'){
                this.setProtectionKey(settings);
                return;
            }

            const protectionKey = this.extractOptionFromSettings("key", settings, "Не задан ключ для блокировки окна");
            this.setProtectionKey(protectionKey);

            if (this.settingsHasParam(settings, "onValue")){
                this.__parseValuesOn(settings.onValue);
            }

            if (this.settingsHasParam(settings, "show_message")){
                this.setShowProtectionDialog(settings.show_message);
            }

            if (this.settingsHasParam(settings, "message")){
                this.setShowProtectionDialog(true);
                this.setProtectionMessage(settings.message);
            }
        },

        __parseValuesOn(valueOrValues){
            let protectionValueOn;
            if (Array.isArray(valueOrValues)){
                protectionValueOn = valueOrValues.slice();
            } else {
                protectionValueOn = [valueOrValues];
            }
            this.__protectionOnValue = protectionValueOn;
        },

        checkProtected(){
            const value = this.getData();
            if (this.isProtected(value[this.getProtectionKey()])){
                if (this.getShowProtectionDialog()){
                    this.__showProtectionDialog();
                }
            } else {
                if (this.__protectionDialog && this._dialogStack){
                    this._dialogStack.remove(this.__protectionDialog);
                    this._dialogStack.setSelection([]);
                    this.__protectionDialog = null;
                }
            }
        },

        isProtected(value){
            return this.__protectionOnValue.includes(value);
        },

        __showProtectionDialog(){
            if (!this.__protectionDialog){
                this.__protectionDialog = this._createMsgWindow();
            }
            this._dialogStack.addAt(this.__protectionDialog, 0);
        },

        _createMsgWindow(){
            const win = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
            this.__setupLayout(win);
            win.add(this.__createAtom());
            return win;
        },

        __setupLayout(win){
            const layout = new qx.ui.layout.HBox();
            layout.setSpacing(10);
            layout.setAlignX("center");
            win.setLayout(layout);
        },

        __createAtom(){
            const atom = new qx.ui.basic.Atom(this.getProtectionMessage(), "@MaterialIcons/warning/32");
            atom.getChildControl("icon").setTextColor("yellow");
            return atom;
        }
    }
});