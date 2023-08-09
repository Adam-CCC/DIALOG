qx.Interface.define("scada.util.combiner.IContentLoader",{
    members: {
        Load(path){
            qx.core.Assert.assertString(path);
        }
    }
});