qx.Class.define("scada.util.fileloader.Local", {
    extend : qx.core.Object,

    construct: function(processor){
        if (processor == null)
            this.__processor = new scada.util.fileloader.JsonProcessor;
        else
            this.__processor = processor;
    },

    members: {
        Load : function(url){
            //not implemented
            return null;
        }
    }
});