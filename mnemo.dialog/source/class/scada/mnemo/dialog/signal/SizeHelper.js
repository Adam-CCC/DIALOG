qx.Class.define("scada.mnemo.dialog.signal.SizeHelper", {
    type: "static",

    statics: {
        SCALE_RATIO: 0.8,

        DIMENSION_TABLE: [
            [1, 1], [1, 1], [2, 1],
            [2, 2], [2, 2], [3, 2],
            [3, 2], [3, 3], [3, 3],
            [3, 3], [4, 3]
        ],

        getContainerWidth(){
            return this.applyRatio(qx.bom.Document.getWidth());
        },

        getContainerHeight(){
            return this.applyRatio(qx.bom.Document.getHeight());
        },

        applyRatio(size){
            return Math.ceil(size  * this.SCALE_RATIO);
        },

        getElementWidth(elementCount){
            return Math.trunc(this.getContainerWidth() / this.getColumnCount(elementCount)) - 15;
        },

        getElementHeight(elementCount){
            return Math.trunc(this.getContainerHeight() / this.getRowCount(elementCount));
        },

        getColumnCount(tableCount){
            return this.getDimensions(tableCount)[0];
        },

        getRowCount(elementCount){
            return this.getDimensions(elementCount)[1];
        },

        getDimensions(elementCount){
            return this.DIMENSION_TABLE[elementCount];
        }
    }
});