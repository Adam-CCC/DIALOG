qx.Class.define("scada.util.combiner.Json", {
    extend : qx.core.Object,
    implement : scada.util.combiner.ICombiner,

    construct(loader){
        this.__cache = new scada.util.combiner.Cache();
        this.__loader = loader;
    },

    statics: {
        merge(object1, object2, key){
            qx.core.Assert.assertString(key);
            qx.core.Assert.assertObject(object1);
            qx.core.Assert.assertObject(object2);

            if (object1.hasOwnProperty(key)){
                for (const key2 in object2){
                    object1[key][key2] = object2[key2];
                }
            }
            else {
                object1[key] = object2;
            }
        },

        replaceParts(template, replaces){
            let str = JSON.stringify(template);
            const parts = replaces;
            for (const [what, by] of Object.entries(parts)){
                str = str.replaceAll(`<<${what}>>`, by);
            }
            return JSON.parse(str);
        }
    },

    members: {
        async process(path, replaces){
            return await this.__processContent(await this.__processFile(path), replaces);
        },

        async __processFile(path){
            let content;

            if (this.__cache.hasContentForPath(path)){
                content = this.__cache.load(path);
            }
            else {
                content = await this.__loader.Load(path);
            }

            return content;
        },

        async __processContent(content, replaces){
            if (replaces){
                content = this.constructor.replaceParts(content, replaces);
            }
            return await this.replaceLinksByContent(content);
        },

        reset(){
            this.__cache.clear();
        },

        async replaceLinksByContent(content){
            const result = {};

            for (const [id, desc] of Object.entries(content)){
                if (scada.util.combiner.Link.isLink(desc)){
                    const link = new scada.util.combiner.Link(id, desc);
                    await this.join(result, link);
                } else {
                    this.constructor.merge(result, desc, id);
                }
            }

            return result;
        },

        __mergeTwoObjects(result, file){
            for (const key in file){
                this.constructor.merge(result, file[key], key);
            }
        },

        async join(mainFileJson, link){
            let subFileJson;

            if (link.useId()){
                subFileJson = await this.__processFile(link.getPath());
                mainFileJson[link.getId()] = this.__replacePartsInTemplate(subFileJson, link);
            }
            else {
                subFileJson = await this.__loadContentByLink(link);
                this.__mergeTwoObjects(mainFileJson, this.__replacePartsInTemplate(subFileJson, link));
            }
        },

        __replacePartsInTemplate(template, link){
            if (link.hasReplaceParts()){
                const parts = link.getReplaceParts();
                return this.constructor.replaceParts(template, parts);
            }
            return template;
        },

        async __loadContentByLink(link){
            const path = link.getPath();
            const file = await this.process(path);
            this.__cache.save(path, file);
            return file;
        }
    }
});