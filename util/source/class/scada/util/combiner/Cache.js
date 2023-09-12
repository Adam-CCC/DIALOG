qx.Class.define("scada.util.combiner.Cache", {
    extend : qx.core.Object,

    construct() {
        this.__map = new Map();
    },

    members: {
        save(path, content){
            this.__map.set(path, content);
        },

        load(path){
            return this.__map.get(path);
        },

        hasContentForPath(path){
            return this.__map.has(path);
        },

        clear(){
            this.__map.clear();
        }
    }
});