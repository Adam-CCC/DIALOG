qx.Class.define("scada.widget.zoom.Layer", {
    extend: qx.ui.container.Composite,
    
    construct(container){
        this.base(arguments);
        this.setLayout(new qx.ui.layout.Canvas());
        this.__setupLayer(container);
    },

    statics: {
        ZOOM_FACTOR: 10
    },

    events: {
        "ZoomIn": "qx.event.type.Event",
        "ZoomOut": "qx.event.type.Event"
    },

    members: {
        __calcOffset(dimensionSize, viewportCoord){
            const center = dimensionSize / 2;
            return viewportCoord - center;
        },

        __onDoubleClick(qxEvent){
            const bounds = this.getBounds();
            const container = this.getChildren()[0];

            const offsetX = this.__calcOffset(bounds.width, qxEvent.getViewportLeft());
            container.scrollByX(offsetX);

            const offsetY = this.__calcOffset(bounds.height, qxEvent.getViewportTop());
            container.scrollByY(offsetY);

            this.__fireZoomInByFactorTimes();
        },

        __fireZoomInByFactorTimes(){
            for (let i = 0; i < this.constructor.ZOOM_FACTOR; i++){
                this.fireEvent("ZoomIn");
            }
        },

        __setupLayer(container){
            this.add(container, { width: "100%", height : "100%"});
            
            const PADDING_TOP = "45%";
            const PADDING_RIGHT = 10;
            this.add(this.__createZoomBar(), { right: PADDING_RIGHT, top: PADDING_TOP });
        },

        __createZoomBar(){
            const bar = new scada.widget.zoom.ControlBar();
            bar.addListener("ZoomIn", () => { this.fireEvent("ZoomIn"); }, this);
            bar.addListener("ZoomOut", () => { this.fireEvent("ZoomOut"); }, this);
            return bar;
        }
    }
});