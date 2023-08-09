qx.Class.define("scada.widget.window.Calculator",
{
  extend : scada.widget.window.Place,

  construct(){
    this.base(arguments);

    this._excludeChildControl("captionbar");
    this.set({
        showClose     : false,
        showMaximize  : false,
        showMinimize  : false,
        allowMaximize : false,
        allowMinimize : false,
        contentPadding: 10,
        resizable: [false, false, false, false]
    });
    this.setLayout(new qx.ui.layout.Grow());

    this.__container = new scada.widget.Calculator();
    this.__container.addListener("outData", function(e){
      this.close();
      this.fireDataEvent("outData", e.getData());
    }, this);
    this.bind("data", this.__container, "data");
    this.bind("separatorOn", this.__container, "separatorOn");
    this.bind("maxLength", this.__container, "maxLength");
    this.bind("precision", this.__container, "precision");
    this.add(this.__container);
  },

  events : {
    "outData": "qx.event.type.Data"
  },

  properties : {
    data : {
      init : null,
      event: "changeData"
    },

    separatorOn: {
      init: false,
      check: "Boolean",
      event: "changeSeparatorOn"
    },

    maxLength: {
      init: 6,
      check: "Number",
      event: "changeMaxLength"
    },

    precision: {
      init: 0,
      check: "Number",
      event: "changePrecision"
    }
  },

  members :
  {
    setDefaultInput(){
      this.__container.setDefaultInput();
    },

    setInputFocus(){
      this.__container.setInputFocus();
    },

    setInputFieldValue(value){
      this.__container.setInputFieldValue(value);
    }
  }
});
