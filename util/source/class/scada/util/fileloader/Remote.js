qx.Class.define("scada.util.fileloader.Remote", {
    extend : qx.core.Object,
    implement : scada.util.fileloader.ILoader,

    construct: function(parser){
        if (parser == null)
            this.__parser = new scada.util.parser.Json;
        else
            this.__parser = parser;

        this.__cache = scada.util.fileloader.Cache.getInstance();
    },

    members: {
        __parser: null,
        __cache: null,

        async Load(url){
            if (this.__cache.isSaved(url)){
                return this.__cache.load(url);
            }
            const req = new qx.io.request.Xhr(url).set({async:true,cache:false});
             
            try {
                const res = await req.sendWithPromise(this);
                const data = this.__parser.parse(res.getResponse());
                this.__cache.save(url, data);
                return data;
            }
            catch (e) {
                this.error("Нельзя загрузить файл: ", url);
                throw new Error();
            }
        }
    }
});