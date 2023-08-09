qx.Class.define("scada.util.Path", {
    type: "static",

    statics: {
        DELIMITER: "/",

        getPathLibrary(){
            return require("path");
        },

        combine(...parts){
            return parts.join(scada.util.Path.DELIMITER);
        },

        getDirName(path){
            qx.core.Assert.assertString(path);
            return path.substring(0, path.lastIndexOf(scada.util.Path.DELIMITER));
        },

        hasExtension(path, ext){
            qx.core.Assert.assertString(path);
            qx.core.Assert.assertString(ext);
            const library = scada.util.Path.getPathLibrary();
            return library.extname(path) === `.${ext}`;
        },

        addExtension(path, ext){
            qx.core.Assert.assertString(path);
            qx.core.Assert.assertString(ext);
            return path + "." + ext;
        }
    }
});