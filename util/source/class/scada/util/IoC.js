qx.Class.define("scada.util.IoC", {
    type: "static",

    statics: {
        register: function(name, implementation){
        },

        resolve: function(name){
            switch(name){
                case "ILoader":
                    return new scada.util.fileloader.Remote(arguments[1]);
                default:
                    return null;
            }
        }
    }
});