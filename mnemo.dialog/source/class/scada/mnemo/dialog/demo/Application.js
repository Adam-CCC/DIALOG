/* ************************************************************************

   Copyright: 2023 ugpa

   License: Private

   Authors: Dmitrii Zolotov (goldim) zolotovdy@ugpa.ru

************************************************************************ */

/**
 * This is the main application class of "scada.mnemo.dialog"
 */
qx.Class.define("scada.mnemo.dialog.demo.Application",
{
  extend : qx.application.Standalone,

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called
     * during startup of the application
     *
     * @lint ignoreDeprecated(alert)
     */
    main()
    {
      // Call super class
      super.main();

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      qx.theme.iconfont.LoadMaterialIcons;

      const dialog = new scada.mnemo.dialog.signal.ControlVE();
      dialog.initSettingsFromJson({
        reset_keys: [
          {
            "label": "",
            "key": "<<prefix>>.Квитировать"
          }
          // {
          //   "label": "СБРОС 2",
          //   "key": "<<prefix>>.Квитировать"
          // }
        ],
        signals: {
          "ТЕКУЩИЕ ИЗМЕРЕНИЯ": [
              {
                  "label": "Ток фидера",
                  "key": "<<prefix>>.Интер.I фид",
                  "subscribe": true
              },
              {
                  "label": "Напряжение фидера",
                  "key": "<<prefix>>.Интер.U фид",
                  "subscribe": true
              },
              {
                  "label": "Напряжение на линии",
                  "key": "<<prefix>>.Интер.U лин",
                  "subscribe": true
              },
              {
                  "label": "Температура контактного провода",
                  "key": "<<prefix>>.Интер.t кп",
                  "subscribe": true
              }
          ],
          "СТАТУС": [
              {
                  "label": "БВ включен/выключен",
                  "key": "<<prefix>>.Интер.БВ",
                  "subscribe": true
              },

              {
                  "label": "Цепи сигнализации ВБ не исправны/исправны",
                  "key": "<<prefix>>.Интер.ЦСИГБВ",
                  "subscribe": true
              },

              {
                  "label": "ОР включен/отключен",
                  "key": "<<prefix>>.Интер.ОР",
                  "subscribe": true
              }
          ]
        },
        control_ve: {
          key: "aaa",
          state_key: "bbb"
        },
        confirmation: true,
        avr: {
          key: "hello"
        },
        center: true,
        question: {
          label: "ЛВ2?",
          key: "question",
          answers: {
            "Включить": 1,
            "Отключить": 0
          }
        },
        key: "bbb",
        protection: {
          key: "aaa",
          show_message: true
        },
        update: {
          key: "sss"
        }
      });
      

      dialog.addListener("goto", function(){
        console.log("GOTO");
      }, this);

      dialog.addListener("changeOutData", function(e){
        console.log(e.getData());
      }, this);

      //HeatResist
      const heatResist = new scada.mnemo.dialog.HeatResist();
      heatResist.initSettingsFromJson({
        temp_classes: ["High", "Medium", "Low"],
        update_values: [100, 50, 10]
      });
      
      //VButton
      const vbutton = new scada.widget.window.VButtonPanel();

      const dlg = new scada.mnemo.dialog.Dialog();
      dlg.moveTo(300, 500);
      dlg.show();
      
      const dialogControlContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox());

      //First GroupBox
      const windowsGroupBox = new qx.ui.groupbox.GroupBox("Окна");
      windowsGroupBox.setLayout(new qx.ui.layout.VBox());

      const openBtn = new qx.ui.form.Button("Open dialog");
      openBtn.addListener("execute", function () {
        dialog.show();
      }, this);
      windowsGroupBox.add(openBtn);

      const calcDecimal = new qx.ui.form.Button("Calculate");
      calcDecimal.addListener("execute", function () {
        const keyDecimal = new scada.mnemo.dialog.KeyboardDecimal();
        keyDecimal.setCenter(true);
        keyDecimal.show();
      }, this);
      windowsGroupBox.add(calcDecimal);

      const question = new qx.ui.form.Button("Question");
      question.addListener("execute", function () {
        const keyDecimal = new scada.mnemo.dialog.Question();
        keyDecimal.setCenter(true);
        keyDecimal.show();
      }, this);
      windowsGroupBox.add(question);

      const questionSwitch = new qx.ui.form.Button("Question switch");
      questionSwitch.addListener("execute", function () {
        const keyDecimal = new scada.mnemo.dialog.QuestionSwitch();
        keyDecimal.setCenter(true);
        keyDecimal.show();
      }, this);
      windowsGroupBox.add(questionSwitch);

      const tempShow = new qx.ui.form.Button("Temperature");
      tempShow.addListener("execute", function () {
        const keyDecimal = new scada.mnemo.dialog.TempShow();
        keyDecimal.setCenter(true);
        keyDecimal.show();
      }, this);
      windowsGroupBox.add(tempShow);

      dialogControlContainer.add(windowsGroupBox);

      //Second GroupBox
      const configGroupBox = new qx.ui.groupbox.GroupBox("Конфигурация");
      configGroupBox.setLayout(new qx.ui.layout.VBox());

      const setValueButtonZero = new qx.ui.form.RadioButton("Set Zero");
      configGroupBox.add(setValueButtonZero);

      const setValueButtonOne = new qx.ui.form.RadioButton("Set One");
      configGroupBox.add(setValueButtonOne);

      const setVEState = new qx.ui.form.RadioButton("Set VE State");
      configGroupBox.add(setVEState);

      var managerConf = new qx.ui.form.RadioGroup(setValueButtonZero, setValueButtonOne, setVEState);
      managerConf.addListener("changeSelection", function () {
        const selectedButton = e.getData()[0];
        const value = selectedButton.getLabel();
        if (value == "Set Zero") {
          dialog.setData({ "question": 0 });
        } else if (value == "Set one") {
          dialog.setData({ "question": 1 });
        } else if (value == "Set VE State") {
          dialog.setData({ "bbb": 1 });
        }
      }, this);

      dialogControlContainer.add(configGroupBox);

      //Third GroupBox
      const manageWindowsGroupBox = new qx.ui.groupbox.GroupBox("Управление окнами");
      manageWindowsGroupBox.setLayout(new qx.ui.layout.VBox());

      const setProtectionBtn = new qx.ui.form.RadioButton("Protection");
      manageWindowsGroupBox.add(setProtectionBtn);

      const removeProtectionBtn = new qx.ui.form.RadioButton("Remove protection");
      manageWindowsGroupBox.add(removeProtectionBtn);

      const manager = new qx.ui.form.RadioGroup(setProtectionBtn, removeProtectionBtn);
      manager.setSelection([removeProtectionBtn]);

      manager.addListener("changeSelection", function(e){
        const selectedButton = e.getData()[0];
        const value = selectedButton.getLabel()
        if (value == "Protection") {
          dialog.setData({ "aaa": 1 });
        } else {
          dialog.setData({ "aaa": 0 });
        }
      }, this)

      dialogControlContainer.add(manageWindowsGroupBox);
      this.getRoot().add(dialogControlContainer, { top: 0, left: 0 });
    }
  }
});
