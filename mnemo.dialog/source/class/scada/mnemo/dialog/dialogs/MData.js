qx.Mixin.define("scada.mnemo.dialog.dialogs.MData", {
    properties: {
        data: {
            init: "?",
            nullable: true,
            event: "changeData"
        },

        outData: {
            init: {},
            event: "changeOutData"
        },

        outputKey: {
            init: null,
            nullable: true,
            check: "String"
        }
    }
});