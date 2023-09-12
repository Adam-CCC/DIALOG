qx.Class.define("scada.widget.clock.View",{
    extend : qx.ui.container.Composite,
    include: qx.locale.MTranslation,

    construct(){
        this.base(arguments);

        this.setPadding(2);
        this._setLayout(new qx.ui.layout.HBox());
        
        this.__dateFormat = new qx.util.format.DateFormat("dd.MM.yyyy");
        this.__timeFormat = new qx.util.format.DateFormat("HH:mm");
        this.initStatus(this.constructor.STATUS.UNDEFINED);
        this._createChildControl("date");
        this._createChildControl("time");
    },

    destruct() {
        this.__dateFormat.dispose();
        this.__timeFormat.dispose();
    },

    statics : {
        STATUS : {
            FAILURE : 0,
            SUCCESS : 1,
            UNDEFINED : 2
        },

        FONT_FAMILY: ["Lucida Grande","Tahoma","Verdana", "Bitstream Vera Sans","Liberation Sans"],

        UNDEFINED_DATE: "--.--.----",
        UNDEFINED_TIME: "--:--",
    },

    properties : {
        status: {
            deferredInit : true,
            apply : "_applyStatus",
            event: "changeStatus"
        },

        date: {
            init: null,
            nullable: true,
            apply : "_applyDate",
            event: "changeDate"
        },

        time: {
            init: null,
            nullable: true,
            apply : "_applyTime",
            event: "changeTime"
        }
    },

    members : {
        setUndefined(){
            this.getChildControl("date").setValue(this.constructor.UNDEFINED_DATE);
            this.getChildControl("time").setValue(this.constructor.UNDEFINED_TIME);
            this.setStatus(this.constructor.STATUS.UNDEFINED);
        },

        _applyDate(date){
            if (date){
                this.setStatus(this.constructor.STATUS.SUCCESS);
                const control = this.getChildControl("date");
                control.setValue(this.__dateFormat.format(date));
            }
        },

        _applyTime(time){
            if (time){
                const control = this.getChildControl("time");
                control.setValue(this.__timeFormat.format(time));
            }
        },

        _applyStatus(status){
            let message = "";
            const statusCodes = this.constructor.STATUS;

            switch (status){
                case statusCodes.FAILURE:
                    message = this.tr("Ошибка синхронизации времени");
                    break;
                case statusCodes.SUCCESS:
                    message = this.tr("Время синхронизировано с сервером");
                    break;
                case statusCodes.UNDEFINED:
                    message = this.tr("Время синхронизируется...");
                    break;
            }
            this.setToolTipText(message);
        },

        _createChildControlImpl(id){
            let control;
            switch(id){
                case "date":
                case "time":
                    control = this.__createControl(this.constructor.UNDEFINED_TIME);
                break;
            }
            return control || super._createChildControlImpl(id);
        },

        __createControl(value){
            qx.core.Assert.assertString(value);

            const label = new qx.ui.basic.Label(value);
            label.set({
                rich: true,
                alignY: "middle",
                font: new qx.bom.Font(20, this.constructor.FONT_FAMILY)
            });
            this._add(new qx.ui.core.Spacer(10));
            this._add(label);
            return label;
        }
    }
});
