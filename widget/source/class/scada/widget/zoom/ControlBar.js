 qx.Class.define("scada.widget.zoom.ControlBar", {
    extend: qx.ui.container.Composite,

    construct: function(){
        this.base(arguments);
        this.setLayout(new qx.ui.layout.VBox);

        this.__createBar();
    },

    events: {
        "ZoomIn": "qx.event.type.Event",
        "ZoomOut": "qx.event.type.Event"
    },

    statics: {
        ZOOM_IN_ICON_PATH: "@MaterialIcons/zoom_in/32",
        ZOOM_OUT_ICON_PATH: "@MaterialIcons/zoom_out/32"
    },

    members: {
        __createBar: function(){
            this.__createAndAddBtn(this.constructor.ZOOM_IN_ICON_PATH, "ZoomIn");
            this.__createAndAddBtn(this.constructor.ZOOM_OUT_ICON_PATH, "ZoomOut");
        },

        __createAndAddBtn: function(iconPath, eventType){
            const btn = this.__createZoomBtn(iconPath);
            btn.addListener("execute", () => this.fireEvent(eventType), this);
            this.add(btn);
        },

        __createZoomBtn: function(iconPath){
            const btn = new qx.ui.form.Button(null, iconPath);
            const icon = btn.getChildControl('icon');
            icon.setScale(true);
            return btn;
        }
    }
 });