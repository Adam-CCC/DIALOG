qx.Class.define("scada.widget.window.VButtonPanel",
{
  extend : scada.widget.window.Place,
  
  events : {
    "outData": "qx.event.type.Data"
  },

  construct : function()
  {
    this.base(arguments);
    this._excludeChildControl("captionbar");
    this.set({
        showClose     : false,
        showMaximize  : false,
        showMinimize  : false,
        allowMaximize : false,
        allowMinimize : false,
        contentPadding: 10,
        resizableBottom: false,
        resizableTop: false,
        resizableLeft: false,
        resizableRight: false
    }); 

    var layout = new qx.ui.layout.VBox;
    this.setLayout(layout);
    this.__customFontSize = 32;
  },

  members :
  {
    addButtons: function(buttons){
      var group = this._btnGroup = new qx.ui.form.RadioGroup();
      for (var k in buttons){
        var btn = this.__createButton(buttons[k]);
        group.add(btn);
        this.add(btn);
      }
    },

    removeButtons: function(){
      this.removeAll();
    },

    setValue: function(value){
      var buttons = this._btnGroup.getChildren();
      for (var k in buttons){
        var btn = buttons[k];
        var label = btn.getLabel();
        if (label == value){
          this._btnGroup.setSelection([btn])
        }
      }
    },

    __createButton: function(name){
        var fontFamily = ["Arial"];
        var btn = new qx.ui.form.RadioButton(name);
        btn.setFont(new qx.bom.Font(32, fontFamily));
        btn.setAppearance("button");
        btn.setAllowGrowX(true);
        btn.setMaxHeight(100);
        btn.setHeight(75);
        btn.setWidth(75);
        btn.addListener("click", function(e){
            var label = btn.getChildControl('label').getValue();
            this.close();
            this.fireDataEvent("outData", label);
        }, this);
        var label = btn.getChildControl('label');
        label.setTextAlign('center');
        label.setRich(true);
        return btn;
    }
  }
});
