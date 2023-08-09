qx.Class.define("scada.widget.period.PickerWithButton", {
    extend : qx.ui.container.Composite,

    construct(){
        super(new qx.ui.layout.HBox());
        this._createChildControl("picker");
        this._createChildControl("button");
    },

    properties: {
        period: {
            init: {},
            event: "changePeriod"
        }
    },

    members: {
        _createChildControlImpl(id, hash){
            let control;
            
            switch(id) {
                case "picker":
                    control = new scada.widget.period.Picker();
                    control.addListener("changePeriod", this._onPicker, this);
                    this._add(control);
                    break;
                case "button":
                    control = new scada.widget.period.Button();
                    control.addListener("changePeriod", this._onButton, this);
                    this._add(control);
                    break;
            }

            return control || super._createChildControlImpl(id);
        },

        _onPeriodChanged(period){
            this.setPeriod({from: period.getStart(), to: period.getEnd()});
        },

        _onPicker(){
            this.getChildControl("button").resetLabel();
            const period = this.getChildControl("picker").getValue();
            this._onPeriodChanged(period);
        },

        _onButton(e){
            const period = e.getData();
            this.getChildControl("picker").setValue(period);
            this._onPeriodChanged(period);
        }
    }
});
