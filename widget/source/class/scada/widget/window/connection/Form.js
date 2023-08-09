qx.Class.define("scada.widget.window.connection.Form", {
    extend: qx.ui.form.Form,
    include: [qx.locale.MTranslation],

    construct(){
        this.base(arguments);

        this.__createFields();
        this.__createConnectButton();
    },

    events: {
        "submit": "qx.event.type.Event"
    },

    members: {
        __validateHost(value, item){
            const domainRegEx = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
            const ipv4RegEx = /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}/;
            const valid = value === "localhost" || ipv4RegEx.test(value) || domainRegEx.test(value);
            if (!valid){
                item.setInvalidMessage("Невалидный хост");
            }
            return valid;
        },

        __getPortValidator(){
            const MIN_PORT = 0;
            const MAX_PORT = 65535;
            const validator = (value) => {
                if (value === ""){
                    throw new qx.core.ValidationError("Validation Error", "Пустое поле");
                }
                qx.util.Validate.range(MIN_PORT, MAX_PORT)(value);
            }
            return validator;
        },

        __createFieldWithCommonProps(){
            const field = new qx.ui.form.TextField();
            field.setRequired(true);
            field.setTextAlign("center");
            field.setLiveUpdate(true);
            return field;
        },

        __createHostField(){
            const host = this.__createFieldWithCommonProps();
            this.add(host, this.tr("Host"), this.__validateHost, "Host");
        },

        __createPortField(){
            const port = this.__createFieldWithCommonProps();
            const PORT_MAX_LENGTH = 5;
            port.setMaxLength(PORT_MAX_LENGTH);
            port.setFilter(/[0-9]/);
            this.add(port, this.tr("Port"), this.__getPortValidator(), "Port");
        },

        __createFields(){
            this.__createHostField();
            this.__createPortField();
        },

        __createConnectButton(){
            const button = new qx.ui.form.Button(this.tr("Connect"));
            button.addListener("execute", this._onSubmit, this);
            this.addButton(button);
        },

        submit(){
            this._onSubmit();
        },

        _onSubmit(){
            if (this.validate()){
                this.fireEvent("submit");
            }
        }
    }
});



