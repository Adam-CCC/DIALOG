qx.Class.define("scada.widget.Calculator",
{
  extend : qx.ui.container.Composite,
  include: [qx.locale.MTranslation],
  
  events : {
    "outData": "qx.event.type.Data"
  },

  construct(){
    this.base(arguments);

    var grid = new qx.ui.layout.Grid;
    this.setLayout(grid);
    var columnWidth = 60;
    grid.setColumnWidth(1, columnWidth);
    grid.setColumnWidth(2, columnWidth);
    grid.setColumnWidth(0, columnWidth);

    this.__customFontSize = 22;
    this.__separatorBtnPressed = false;
    var input = this.__inputField =  new qx.ui.form.TextField("").set({font: new qx.bom.Font(this.__customFontSize)});
    input.setMaxLength(this.getMaxLength());
    input.setKeepFocus(false);
    this.add(input, {row: 0, column: 0, colSpan: 3});
    
    var num = 1;
    
    for (var i = 1; i < 4; i++)
    {
        for (var j = 0; j < 3; j++)
        {
            var btn = this.__createNumberBtn(num.toString());
            this.add(btn, {row: i, column: j});
            num++;
        }
    }
    
    this.add(this.__createNumberBtn("0"), {row: 4, column: 0});
    this.add(this.__createSeparatorBtn(), {row: 4, column: 1});
    this.add(this.__createBackspace(), {row: 4, column: 2});
    this.add(this.__createAcceptBtn(), {row: 5, column: 0, colSpan: 3});
  },

  properties : {
    data : {
      init : null,
      event: "changeData"
    },

    separatorOn: {
      init: false,
      check: "Boolean",
      apply: "_applySeparatorOn",
      event: "changeSeparatorOn"
    },

    maxLength: {
      init: 6,
      check: "Number",
      apply: "_applyMaxLength",
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
    __separatorBtn: null
    ,__separatorBtnPressed: null
    ,__createZeroBtn: null
    ,__inputField: null

    ,setDefaultInput(){
      this.__inputField.setValue("0");
    }

    ,setInputFocus(){
      this.__inputField.focus();
      this.__inputField.selectAllText();
    }

    ,_applyMaxLength(value, oldvalue){
      this.__inputField.setMaxLength(value);
    },

    setInputFieldValue(value){
      var number = parseFloat(value);
      var prec = this.getPrecision(number);
      if (prec){
        var coef = 1;
        for (var i = 0; i < prec; i++){
          coef *= 10;
        }
        value = Math.trunc(value * coef) / coef;
      }
      this.__inputField.setValue(value.toString());
    }

    ,__setInputFieldValue(value, start, end){
      this.__inputField.setValue(value);
      this.__inputField.setTextSelection(start, end);
    }

    ,__createNumberBtn(label){
      var btn = new qx.ui.form.Button(label).set({font: new qx.bom.Font(this.__customFontSize)});
      btn.addListener("execute", function(e){
        var field = this.__inputField;
        var fieldVal = field.getValue();
        var selectionL = field.getTextSelectionLength();
        var position = field.getTextSelectionStart();
        if (fieldVal.length >= this.getMaxLength() && selectionL === 0){
          return;
        }
        var val = btn.getLabel();
        if (fieldVal === "0" || selectionL == fieldVal.length)
        {
          this.__setInputFieldValue(val, 1, 1);
          this.__separatorBtnPressed = false;
        }
        else
        {
          var str;
          if (selectionL > 0){
            str = scada.util.String.remove(fieldVal,position, field.getTextSelectionEnd());
          }
          else{
            str = fieldVal;
          }
          var insertedValStr = scada.util.String.insert(str, val, position)
          this.__setInputFieldValue(insertedValStr, position + 1, position + 1);
        }
      }, this);
      return btn;
    }
    ,__createSeparatorBtn(){
      var btn = this.__separatorBtn = new qx.ui.form.Button(",").set({font: new qx.bom.Font(this.__customFontSize)});
      btn.addListener("execute", function(e){
        if (this.__separatorBtnPressed)
          return;
        var fieldVal = this.__inputField.getValue();
        if (fieldVal.length >= this.getMaxLength() && this.__inputField.getTextSelectionLength() === 0){
          return;
        }
        var val = btn.getLabel();
        if (this.__inputField.getTextSelectionLength() === fieldVal.length){
          this.__setInputFieldValue(val, 1, 1);
        }
        else{
          var position = this.__inputField.getTextSelectionStart();
          this.__setInputFieldValue(scada.util.String.insert(fieldVal, val, position), position + 1, position + 1);
        }
        this.__separatorBtnPressed = true;
        //@TODO пришлось закоментировать не работает на планшете: окно закрывается при нажатии на сепаратор
        // btn.setEnabled(false);
      }, this);
      btn.setEnabled(false);
      return btn;
    }

    ,__createAcceptBtn(){
      var btn = new qx.ui.form.Button(this.tr("Apply")).set({font: new qx.bom.Font(this.__customFontSize)});
      btn.addListener("execute", function(){
        this.fireDataEvent("outData", this.__inputField.getValue());
      }, this);
      return btn;
    }

    ,__createBackspace(){
      var btn = new qx.ui.form.Button("⌫").set({font: new qx.bom.Font(this.__customFontSize)});
      btn.addListener("execute", function(){
        var field = this.__inputField;
        var val = field.getValue();
        var selectionL = field.getTextSelectionLength();
        var position = field.getTextSelectionStart();
        if (val.length === 1 || selectionL === val.length)
        {
          this.__setInputFieldValue("0",1,1);
          this.__separatorBtnPressed = false;
        }
        else if (val !== "0")
        {
          var start, end, str;
          if (selectionL > 0){
            if (this.__inputField.getTextSelection().indexOf(",") !== -1){
              this.__separatorBtnPressed = false;
            }
            str = scada.util.String.remove(val,position,this.__inputField.getTextSelectionEnd());
            start = position;
            end = position;
          }
          else{
            if (val.charAt(position - 1) === ","){
              this.__separatorBtnPressed = false;
            }
            str = scada.util.String.remove(
              val,
              position - 1,
              position
            );
            start = position - 1;
            end = position - 1;
          }
          this.__setInputFieldValue(str, start, end);
        }
      }, this);
      return btn;
    }
    
    ,_applySeparatorOn(value){
      this.__separatorBtn.setEnabled(value);
    }
  }
});
