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

      const closeBtn = new qx.ui.form.Button("Close dialog");
      closeBtn.addListener("execute", function () {
        dialog.hide();
      }, this);
      windowsGroupBox.add(closeBtn);

      const openBtn = new qx.ui.form.Button("Open dialog");
      openBtn.addListener("execute", function () {
        dialog.show();
      }, this);
      windowsGroupBox.add(openBtn);

      const openBtn2 = new qx.ui.form.Button("Open dialog2");
      openBtn2.addListener("execute", function () {
        heatResist.setCenter(true);
        heatResist.setConfirmation(true)
        console.log(heatResist.getOutputKey());
      }, this);
      windowsGroupBox.add(openBtn2);

      dialogControlContainer.add(windowsGroupBox);

      //Second GroupBox
      const configGroupBox = new qx.ui.groupbox.GroupBox("Конфигурация");
      configGroupBox.setLayout(new qx.ui.layout.VBox());

      const setValueButtonZero = new qx.ui.form.Button("Set Zero");
      setValueButtonZero.addListener("execute", function () {
        dialog.setData({ "question": 0 });
      }, this);
      configGroupBox.add(setValueButtonZero);

      const setValueButtonOne = new qx.ui.form.Button("Set One");
      setValueButtonOne.addListener("execute", function (){
        dialog.setData({ "question": 1 });
      }, this);
      configGroupBox.add(setValueButtonOne);

      const setVEState = new qx.ui.form.Button("Set VE State");
      setVEState.addListener("execute", function () {
        dialog.setData({ "bbb": 1 });
      }, this);
      configGroupBox.add(setVEState);

      dialogControlContainer.add(configGroupBox);

      //Third GroupBox
      const manageWindowsGroupBox = new qx.ui.groupbox.GroupBox("Управление окнами");
      manageWindowsGroupBox.setLayout(new qx.ui.layout.VBox());

      const setProtectionBtn = new qx.ui.form.Button("Protection");
      setProtectionBtn.addListener("execute", function () {
        dialog.setData({ "aaa": 1 });
      }, this);
      manageWindowsGroupBox.add(setProtectionBtn);

      const removeProtectionBtn = new qx.ui.form.Button("Remove Protection");
      removeProtectionBtn.addListener("execute", function () {
        dialog.setData({ "aaa": 0 });
      }, this);
      manageWindowsGroupBox.add(removeProtectionBtn);

      dialogControlContainer.add(manageWindowsGroupBox);
      this.getRoot().add(dialogControlContainer, { top: 0, left: 0 });
    }
  }
});
