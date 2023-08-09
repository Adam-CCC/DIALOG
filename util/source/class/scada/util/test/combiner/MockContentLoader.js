qx.Class.define("scada.util.test.combiner.MockContentLoader", {
    extend: qx.core.Object,
    implement: scada.util.combiner.IContentLoader,

    construct(){
        this.__contents = {};
    },

    members: {
        setContent(path, content){
              this.__contents[path] = content;
        },

        Load(path){
            return this.__contents[path];
        }
    }
});