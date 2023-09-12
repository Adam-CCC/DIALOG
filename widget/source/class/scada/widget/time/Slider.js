qx.Class.define("scada.widget.time.Slider", {
    extend: qx.ui.form.Slider,
    
    construct(){
        super("horizontal");
        this.getChildControl("knob").addListener("touchend", function(){
            this.fireEvent("scrollStop");
        }, this);
        this.addListener("changeValue", this._onChangeSliderValue, this);
        this.setWidth(240);
        this.setMinimum(0);
    },

    events: {
        "scrollStop": "qx.event.type.Event"
    },

    members: {
        _onChangeSliderValue(e){
            const input = e.getTarget().getUserData("input");
            input.setValue(String(e.getData()));
        }
    }
});