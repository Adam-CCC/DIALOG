qx.Class.define("scada.widget.zoom.ScrollLayer", {
    extend: qx.ui.container.Scroll,
    
    construct: function(){
        this.base(arguments);
    },

    properties: {
        forceExpand: {
            init: false,
            check: "Boolean"
        }
    },

    members: {
        setContent: function(content){
            if (this.getForceExpand()){
                this.__setupExpandableLayer(content);
            } else {
                this.__setupLayer(content);
            }
        },

        __setupLayer: function(container){
            this.layerX = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({alignX : "center"}));
            this.layerX.add(container);

            this.layerY = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({alignY : "middle"}));
            this.layerY.add(this.layerX);

            this.add(this.layerY);
        },

        __setupExpandableLayer: function(container){
            this.layerX = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({alignX : "center"}));
            this.layerX.add(container, {width: "100%"});

            this.layerY = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({alignY : "middle"}));
            this.layerY.add(this.layerX, {height: "100%"});

            this.add(this.layerY);
        }
    }
});