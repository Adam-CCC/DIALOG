qx.Class.define("scada.widget.zoom.ViewPort", {
    extend: qx.ui.container.Composite,
    
    construct: function(content, expandable = false){
        this.base(arguments);
        this.setLayout(new qx.ui.layout.Grow());

        this.__setupLayers();
        
        this.setForceExpand(expandable);
        this.initContent(content);
    },

    properties: {
        forceExpand: {
            init: false,
            check: "Boolean",
            apply: "_applyForceExpand"
        },

        content: {
            deferredInit: true,
            nullable: true,
            apply: "_applyContent"
        }
    },

    members: {
        _applyForceExpand: function(value, prevValue){
            this.__scrollLayer.setForceExpand(value);
        },

        __setupLayers: function(){
            const scrollLayer = new scada.widget.zoom.ScrollLayer();
            this.__setupScrollingGrab(scrollLayer);
            this.__makeZoomable(scrollLayer);

            this.__scrollLayer = scrollLayer;
        },

        _applyContent: function(content, oldcontent){
            this.__scrollLayer.setContent(content);
        },

        setContextMenu: function(menu){
            this.getContent().setContextMenu(menu);
        },

        __makeZoomable: function(container){
            const zoomLayer = new scada.widget.zoom.Layer(container);
            zoomLayer.addListener("ZoomIn", this.__zoomIn, this);
            zoomLayer.addListener("ZoomOut", this.__zoomOut, this);
            this.add(zoomLayer);
        },

        __setupScrollingGrab: function(scroller){
            scroller.set({ scrollbar: [ "auto", "auto" ] });
        },

        __adjustScroll(zoomHandler){
            const [widthBefore, heightBefore] = this.__calcSizes();
            this.getContent()[zoomHandler]();
            const [widthAfter, heightAfter] = this.__calcSizes();
            this.__scrollToX(widthBefore, widthAfter);
            this.__scrollToY(heightBefore, heightAfter);
        },

        __calcSizes(){
            const width = this.getContent().getWidth();
            const height = this.getContent().getHeight();
            return [width, height];
        },

        __zoomIn(){
            this.__adjustScroll("zoomIn");
        },

        __zoomOut(){
            this.__adjustScroll("zoomOut");
        },

        __scrollToX(before, after){
            const diff = this.__calcDifference(before, after);
            this.__scrollLayer.scrollByX(diff);
        },

        __scrollToY(before, after){
            const diff = this.__calcDifference(before, after);
            this.__scrollLayer.scrollByY(diff);
        },

        __calcDifference(before, after){
            return (after - before) / 2;
        }
    }
});