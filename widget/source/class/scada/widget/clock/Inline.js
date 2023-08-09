qx.Class.define("scada.widget.clock.Inline", {
    extend : qx.core.Object,

    construct() {
        // noinspection JSAnnotator
        super();
        this.__view = this.__createView();
    },

    destruct() {
        this.__model.dispose();
        this.__view.dispose();
    },

    members: {
        getView(){
            return this.__view;
        },

        _onUnavailable(){
            this.__view.setUndefined();
        },

        setModel(model){
            qx.Interface.assertObject(model, scada.widget.clock.IModel);
            model.addListener("unavailable", this._onUnavailable, this);
            this.__createController(model, this.__view);
        },

        __createController(model, view){
            const controller = new qx.data.controller.Object(model);
            controller.addTarget(view, "date", "dateTime");
            controller.addTarget(view, "time", "dateTime");
        },

        __createView(){
            return new scada.widget.clock.View();
        }
    }
});