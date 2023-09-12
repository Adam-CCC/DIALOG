qx.Class.define("scada.util.TimerBuffer", {
    extend: qx.core.Object,

    construct: function(interval) {
        this.setInterval(interval);
        var timer = this.__timer = new qx.event.Timer(interval);
        this.__currentData = [];
        timer.addListener("interval", function(e) {
            // console.info(this.__currentData);
            this.fireDataEvent("tick", this.__currentData);
            this.__currentData = {};
        }, this);
        timer.start();
    },

    events: {
        "tick": "qx.event.type.Data"
    },

    properties: {
        currentData: {
            init: [],
            event: "changeHistoryData"
        },

        interval: {
            init: 0,
            event: "changeHistoryData"
        }
    },

    members: {
        __timer: null,
        __currentData: null,

        addData: function(key, value) {
            this.__currentData[key] = value;
        }
    }
});
