qx.Class.define("scada.config.settings.Manager", {
    extend : qx.core.Object,
    type: "singleton",

    properties : {
        optValue: {
            init: {
            "host": "localhost",
            "port": 7681,
            "login": "username",
            "password": "secret"}
        }
    }
});