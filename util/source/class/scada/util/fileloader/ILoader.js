qx.Interface.define("scada.util.fileloader.ILoader",{
    members: {
        Load(url){
            qx.core.Assert.assertString(url);
        }
    }
});