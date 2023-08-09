qx.Class.define("scada.widget.time.Field", {
    extend: qx.ui.container.Composite,
    include: qx.ui.form.MForm,

    construct(date){
      super();
      this.__setupLayout();

      this._createChildControl("popup");

      this._createChildControl("hours");
      this.__addTimeSeparator();
      this._createChildControl("minutes");
      this.__addTimeSeparator();
      this._createChildControl("seconds");
  
      if (date){
        this.setValue(date);
      }
    },
  
    events: {
      "stopScrolling": "qx.event.type.Event"
    },

    properties: {
      appearance: {
        refine: true,
        init: "textfield"
      }
    },

    members: {
      _createChildControlImpl(id, hash){
        let control;
        
        switch(id) {
          case "popup":
            control = new scada.widget.time.SliderPopup();
            control.addListener("stopScrolling", function(){
              this.fireEvent("stopScrolling");
            }, this);
            break;
          case "hours":
            control = this.__addInput(23);
            this._add(control);
            break;
          case "minutes":
          case "seconds":
            control = this.__addInput(59);
            this._add(control);
            break;
        }

        return control || super._createChildControlImpl(id);
      },

      __setupLayout(){
        const layout = new qx.ui.layout.HBox();
        layout.set({alignY: "middle"});
        this.setLayout(layout);
      },

      setValue(value){
        const hours = Math.floor(value / 3600);
        this.getChildControl("hours").setValue(scada.widget.time.Input.toValidString(hours));
  
        const minutes = Math.floor(value / 60) % 60;
        this.getChildControl("minutes").setValue(scada.widget.time.Input.toValidString(minutes));
  
        const seconds = Math.floor(value % 60);
        this.getChildControl("seconds").setValue(scada.widget.time.Input.toValidString(seconds));
      },

      getValue(){
        return this.__getTimeInSecondsFromFields();
      },

      __getTimeInSecondsFromFields(){
        const hours = this.getChildControl("hours").getValue();
        const minutes = this.getChildControl("minutes").getValue();
        const seconds = this.getChildControl("seconds").getValue();
        return this.__calcTimeInSeconds(hours, minutes, seconds);
      },

      __calcTimeInSeconds(hours, minutes, seconds){
          return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
      },

      __addInput(maxValue){
        const input = new scada.widget.time.Input(maxValue);
        input.addListener("input", function(){
          this.getChildControl("popup").hide();
        }, this);
        input.addListener("mouseup", this._onMouseUp, this);
        return input;
      },

      __addTimeSeparator(){
        this._add(new qx.ui.basic.Label(":"));
      },

      _onMouseUp(e){
        const popup = this.getChildControl("popup");
        const input = e.getTarget();
        popup.setCurrentInput(input);
        popup.show();
      }
    }
  });
  