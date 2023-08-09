qx.Mixin.define("scada.mnemo.dialog.MPosition", {
    properties: {
        center: {
            init: false,
            check: "Boolean",
            apply: "_applyCenter"
        },

        leftCoord: {
            init: 0,
            check: "Integer"
        },

        topCoord: {
            init: 0,
            check: "Integer"
        }
    },

    members: {
        _applyCenter(value){
            if (!value){
               this.__placeToPoint();
            }
        },

        __placeToPoint(){
            const coord = { left: this.getLeftCoord(), top: this.getTopCoord() + 10 };
            this.placeToPoint(coord);
        },

        setupPosition(){
            if (!this.getCenter()){
                this.__placeToPoint();
            } else {
                this.center();
            }
        }
    }
});