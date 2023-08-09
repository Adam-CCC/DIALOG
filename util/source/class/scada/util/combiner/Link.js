qx.Class.define("scada.util.combiner.Link", {
    extend : qx.core.Object,

    construct(id, descOrPath) {
        this.base(arguments);
        this.__id = id;
        this.__replace_parts = {};
        this.__joinById = false;
        this.__initByDesc(descOrPath);
    },

    statics: {
        isLink(objOrStr){
            if (qx.lang.Type.isString(objOrStr)){
                return true;
            }
            else if (qx.lang.Type.isObject(objOrStr)) {
                if (objOrStr.hasOwnProperty("include")){
                    return true;
                }
            }
            return false;
        }
    },

    members: {
        __initByDesc(descOrPath){
            if (qx.lang.Type.isString(descOrPath)) {
                this.__initByString(descOrPath);
            } else if (qx.lang.Type.isObject(descOrPath)) {
                this.__initByObject(descOrPath);
            }
        },

        __initByString(path){
            this.__path = path;
        },

        __initByObject(obj){
            if (obj.hasOwnProperty("replace")){
                this.__replace_parts = obj.replace;
            }
            if (obj.hasOwnProperty("include_content_inside")){
                this.__joinById = obj.include_content_inside;
            }
            this.__path = obj.include;
        },

        hasReplaceParts(){
            return !!this.__replace_parts;
        },

        getReplaceParts(){
            return this.__replace_parts;
        },

        getId(){
            return this.__id;
        },

        getPath(){
            return this.__path;
        },

        useId(){
            return this.__joinById;
        }
    }
});