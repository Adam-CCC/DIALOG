qx.Class.define("scada.config.settings.Manager", {
    type: "singleton",
    extend : qx.core.Object,

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