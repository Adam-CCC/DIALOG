qx.Class.define("scada.widget.clock.LocalModel",{
    extend : qx.core.Object,
    implement: scada.widget.clock.IModel,

    construct(){
        // noinspection JSAnnotator
        super();
        this.initDateTime(this.__getCurrent());
        this.__timer = this.__createTimer();
        this.__timer.start();
    },

    destruct(){
        this.__timer.stop();
        this.__timer.dispose();
        this.__timeFormat.dispose();
    },

    properties : {
        dateTime : {
            deferredInit : true,
            event: "changeDateTime"
        }
    },

    statics: {
        FREQUENCY_UPDATE_TIME: 60000
    },

    members : {
        __createTimer(){
            const timer = new qx.event.AcceleratingTimer();
            timer.setFirstInterval(this.__calcFirstInterval());
            timer.setInterval(this.constructor.FREQUENCY_UPDATE_TIME);
            timer.addListener("interval", this.__updateTime, this);
            return timer;
        },

        __calcFirstInterval(){
            const current = this.__getCurrent();
            return (60 - current.getSeconds()) * 1000;
        },

        __getCurrent(){
            return new Date();
        },

        __updateTime(){
            this.setDateTime(this.__getCurrent());
        }
    }
});
