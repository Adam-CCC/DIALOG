qx.Class.define("scada.util.parser.Json", {
    extend : qx.core.Object,
    implement : scada.util.parser.IParser,

    members: {
        parse : function(data){
            try
            {
                // не работает в некоторых браузерах
                return JSON.parse(data);
            }
            catch(except)
            {
                return data;
            }
        }
    }
});