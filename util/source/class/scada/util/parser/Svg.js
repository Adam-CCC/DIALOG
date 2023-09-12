qx.Class.define("scada.util.parser.Svg", {
    extend : qx.core.Object,
    implement : scada.util.parser.IParser,

    construct(){
        this.__parser = new qx.util.ResponseParser();
    },

    members: {
        parse(data){
            let res = null;
            if (data.documentElement) {
                res = data.documentElement;
            }
            else {
                res = this.__parser.parse(data, "application/xml").documentElement;
            }
            return res;
        }
    }
});