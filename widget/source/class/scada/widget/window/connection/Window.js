qx.Class.define("scada.widget.window.connection.Window", {
    extend : qx.ui.popup.Popup,

    construct(){
        this.base(arguments);
        this.setPadding(this.constructor.DEFAULT_PADDING);
        this.setLayout(new qx.ui.layout.Basic());

        const form = this.__createForm();
        this.add(new qx.ui.form.renderer.Single(form));
    },

    events : {
        "connect" : "qx.event.type.Data"
    },

    statics: {
        DEFAULT_PADDING: 10
    },

    members: {
        __createForm(){
            const form = new scada.widget.window.connection.Form();
            const controller = new qx.data.controller.Form(null, form);
            this.__createModel(controller);
            this.__addEnterCommand(form);
            return form;
        },

        __createModel(controller){
            const model = controller.createModel();
            this.__setupModel(model);
            this.__attachSubmitHandler(controller.getTarget(), model);
            return model;
        },

        __setupModel(model){
            this.__initHost(model);
            this.__initPort(model);
        },

        __initHost(model){
            let host = this.__getValueFromSettings("host");
            if (host === ""){
                host = "localhost";
            }
            model.setHost(host);
        },

        __initPort(model){
            let port = this.__getValueFromSettings("port");
            if (!port){
                port = 7681;
            }
            model.setPort(String(port));
        },

        __addEnterCommand(form){
            const command = new qx.ui.command.Command("Enter");
            command.setActive(false);
            command.addListener("execute", () => form.submit());

            this.addListener("appear", () => command.setActive(true));
            this.addListener("disappear", () => command.setActive(false));
        },

        __attachSubmitHandler(form, model){
            form.addListener("submit", function(){
                this.fireDataEvent("connect", this.__getDataFromModel(model));
                this.hide();
            }, this);
        },
        
        __getDataFromModel(model){
            const host = model.getHost();
            const port = model.getPort();
            const login = this.__getValueFromSettings("login");
            const password = this.__getValueFromSettings("password");
            return { host, port, login, password };
        },

        __getValueFromSettings(option){
            return scada.config.settings.Manager.getInstance().getOptValue(option);
        }
    }
});
