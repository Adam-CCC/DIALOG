qx.Interface.define("scada.widget.clock.IModel", {
    events: {
        "unavailable": "qx.event.type.Event"
    },

    properties: {
        dateTime: {
            nullable: true,
            event: "changeDateTime"
        }
    }
});