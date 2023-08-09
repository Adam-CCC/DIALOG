qx.Class.define("scada.widget.window.confirm.Window", {
    extend : scada.widget.window.Place,

    construct(){
        this.base(arguments);
        this.set({
            allowMaximize   : false,
            allowMinimize   : false,
            contentPadding  : 10,
            resizable: [false, false, false, false],
        });

        this._excludeChildControl("captionbar");
        this.setLayout(new qx.ui.layout.Basic());
    },

    events :  {
        "confirmed": "qx.event.type.Event",
        "pressed": "qx.event.type.Event"
    }
});