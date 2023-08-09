qx.Class.define("scada.util.String", {
    type: "static",

    statics: {
        insert: function(str, what, i){
            return str.substring(0, i) + what + str.substring(i);
        },

        remove: function(str, start, end){
            return str.substring(0, start) + str.substring(end);
        }
    }
});