qx.Class.define("scada.util.fileloader.Cache", {
    extend : qx.core.Object,
    type: "singleton",

    construct: function(){
        this.__files = {};
    },

    members: {
        __files: null

        ,save: function(url, content){
            this.__files[url] = content;
        }

        ,isSaved: function(url){
            return this.__files.hasOwnProperty(url);
        }

        ,load: function(url){
            return this.__files[url];
        }
    }
});