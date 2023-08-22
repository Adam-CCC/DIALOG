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

      var border = new qx.ui.decoration.Decorator().set({
        width: 3,
        style: "solid",
        color: "black",
      });

      var container = new qx.ui.container.Composite(
        new qx.ui.layout.Canvas()
      )

      // const set = {
      //   reset_keys: [
      //     {
      //       "label": "",
      //       "key": "<<prefix>>.Квитировать"
      //     }
      //     // {
      //     //   "label": "СБРОС 2",
      //     //   "key": "<<prefix>>.Квитировать"
      //     // }
      //   ],
      //   signals: {
      //     "ТЕКУЩИЕ ИЗМЕРЕНИЯ": [
      //         {
      //             "label": "Ток фидера",
      //             "key": "<<prefix>>.Интер.I фид",
      //             "subscribe": true
      //         },
      //         {
      //             "label": "Напряжение фидера",
      //             "key": "<<prefix>>.Интер.U фид",
      //             "subscribe": true
      //         },
      //         {
      //             "label": "Напряжение на линии",
      //             "key": "<<prefix>>.Интер.U лин",
      //             "subscribe": true
      //         },
      //         {
      //             "label": "Температура контактного провода",
      //             "key": "<<prefix>>.Интер.t кп",
      //             "subscribe": true
      //         }
      //     ],
      //     "СТАТУС": [
      //         {
      //             "label": "БВ включен/выключен",
      //             "key": "<<prefix>>.Интер.БВ",
      //             "subscribe": true
      //         },

      //         {
      //             "label": "Цепи сигнализации ВБ не исправны/исправны",
      //             "key": "<<prefix>>.Интер.ЦСИГБВ",
      //             "subscribe": true
      //         },

      //         {
      //             "label": "ОР включен/отключен",
      //             "key": "<<prefix>>.Интер.ОР",
      //             "subscribe": true
      //         }
      //     ]
      //   },
      //   control_ve: {
      //     key: "aaa",
      //     state_key: "bbb"
      //   },
      //   confirmation: true,
      //   avr: {
      //     key: "hello"
      //   },
      //   center: true,
      //   question: {
      //     label: "ЛВ2?",
      //     key: "question",
      //     answers: {
      //       "Включить": 1,
      //       "Отключить": 0
      //     }
      //   },
      //   key: "bbb",
      //   protection: {
      //     key: "aaa",
      //     show_message: true
      //   },
      //   update: {
      //     key: "sss"
      //   }
      // }

      // const dialog = new scada.mnemo.dialog.signal.ControlVE();
      // dialog.initSettingsFromJson(set);
      

      // dialog.addListener("goto", function(){
      //   console.log("GOTO");
      // }, this);

      // dialog.addListener("changeOutData", function(e){
      //   console.log(e.getData());
      // }, this);

      // //HeatResist
      // const heatResist = new scada.mnemo.dialog.HeatResist();
      // heatResist.initSettingsFromJson({
      //   temp_classes: ["High", "Medium", "Low"],
      //   update_values: [100, 50, 10]
      // });

      // const dlg = new scada.mnemo.dialog.Dialog();
      // dlg.moveTo(300, 500);
      // dlg.show();
      
      const dialogControlContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox());

      // //First GroupBox
      // const windowsGroupBox = new qx.ui.groupbox.GroupBox("Список диалогов");
      // windowsGroupBox.setLayout(new qx.ui.layout.VBox(5));

      // const openBtn = new qx.ui.form.Button("Открыть дилог");
      // openBtn.addListener("execute", function () {
      //   dialog.show();
      // }, this);
      // windowsGroupBox.add(openBtn);

      // const calcDecimal = new qx.ui.form.Button("Калькулятор");
      // const keyDecimal = new scada.mnemo.dialog.KeyboardDecimal();
      // calcDecimal.addListener("execute", function () {
      //   keyDecimal.setCenter(true);
      //   keyDecimal.show();
      // }, this);
      // windowsGroupBox.add(calcDecimal);

      // const questionDlg = new scada.mnemo.dialog.Question();
      // questionDlg.initSettingsFromJson({
      //   question: {
      //       label: "Вы уверены, что хотите продолжить?"
      //   }
      // });
      // const question = new qx.ui.form.Button("Вопрос");
      // question.addListener("execute", function () {
      //   questionDlg.setCenter(true);
      //   questionDlg.show();
      // }, this);
      // windowsGroupBox.add(question);

      // const questionSwitch = new qx.ui.form.Button("Двойной вопрос");
      // questionSwitch.addListener("execute", function () {
      //   const doubleQuest = new scada.mnemo.dialog.QuestionSwitch();
      //   doubleQuest.initSettingsFromJson({
      //     question: {
      //         label: "Вы уверены, что хотите продолжить?"
      //     }
      //   });
      //   doubleQuest.setCenter(true);
      //   doubleQuest.open();
      // }, this);
      // windowsGroupBox.add(questionSwitch);

      // const tempShow = new qx.ui.form.Button("Температура");
      // tempShow.addListener("execute", function () {
      //   const keyDecimal = new scada.mnemo.dialog.TempShow();
      //   keyDecimal.setCenter(true);
      //   keyDecimal.show();
      // }, this);
      // windowsGroupBox.add(tempShow);

      // const dlgDouble = new scada.widget.window.confirm.Double();
      // const double = new qx.ui.form.Button("Двойной вопрос");
      // double.addListener("execute", function () {
      //   dlgDouble.setCenterOnAppear(true);
      //   dlgDouble.open();
      // }, this);
      // windowsGroupBox.add(double);

      // // const dlgDoubles = new scada.widget.window.connection.Window();
      // // const doubles = new qx.ui.form.Button("Двойной вопрос");
      // // doubles.addListener("execute", function () {
      // //   dlgDoubles.setCenterOnAppear(true);
      // //   dlgDoubles.open();
      // // }, this);
      // // windowsGroupBox.add(doubles);

      // const w1 = new qx.ui.core.Widget().set({
      //   backgroundColor: "red",
      //   decorator: border,
      //   width: 400,
      // });
      // const viewPor = new scada.widget.zoom.ViewPort(w1, true);
      // const viewZoom = new qx.ui.form.Button("Масштабирование");
      // viewZoom.addListener("execute", function () {
      //   container.add(viewPor, {left: "50%", top: "50%", width: "25%", height: "25%"});
      // }, this);
      // windowsGroupBox.add(viewZoom);
      const listDialog = new scada.mnemo.dialog.demo.ListDialog();
      listDialog.openAllDialog();


      dialogControlContainer.add(listDialog);

      // const timeGroupBox = new qx.ui.groupbox.GroupBox("Время");
      // timeGroupBox.setLayout(new qx.ui.layout.VBox());


      // const pickerWithButton = new scada.widget.period.PickerWithButton();
      // const winPickerWithButton = new qx.ui.window.Window();
      // winPickerWithButton.setLayout(new qx.ui.layout.VBox(0));
      // winPickerWithButton.setShowMaximize(false);
      // winPickerWithButton.setShowMinimize(false);
      // winPickerWithButton.add(pickerWithButton);

      // const views = new scada.widget.clock.Inline();
      // timeGroupBox.add(views.getView());

      // const but = new qx.ui.form.Button("Настройки");
      // but.addListener("click", function(){
      //   winPickerWithButton.moveTo(200, 300);
      //   winPickerWithButton.open();
      // })
      // timeGroupBox.add(but);

      // dialogControlContainer.add(timeGroupBox);

      // //Second GroupBox
      // const configGroupBox = new qx.ui.groupbox.GroupBox("Конфигурация");
      // configGroupBox.setLayout(new qx.ui.layout.VBox());

      // const setValueButtonZero = new qx.ui.form.RadioButton(`Установить "0"`);
      // configGroupBox.add(setValueButtonZero);

      // const setValueButtonOne = new qx.ui.form.RadioButton(`Установить "1"`);
      // configGroupBox.add(setValueButtonOne);

      // const setVEState = new qx.ui.form.RadioButton(`Установить состояние "ВЭ"`);
      // configGroupBox.add(setVEState);

      // var managerConf = new qx.ui.form.RadioGroup(setValueButtonZero, setValueButtonOne, setVEState);
      // managerConf.addListener("changeSelection", function (e) {
      //   const selectedButton = e.getData()[0];
      //   const value = selectedButton.getLabel();
      //   if (value == "Set Zero") {
      //     dialog.setData({ "question": 0 });
      //   } else if (value == "Set one") {
      //     dialog.setData({ "question": 1 });
      //   } else if (value == "Set VE State") {
      //     dialog.setData({ "bbb": 1 });
      //   }
      // }, this);

      // dialogControlContainer.add(configGroupBox);

      // //Third GroupBox
      // const manageWindowsGroupBox = new qx.ui.groupbox.GroupBox("Управление окнами");
      // manageWindowsGroupBox.setLayout(new qx.ui.layout.VBox());

      // const setProtectionBtn = new qx.ui.form.RadioButton("Заблокировать");
      // manageWindowsGroupBox.add(setProtectionBtn);

      // const removeProtectionBtn = new qx.ui.form.RadioButton("Разблокировать");
      // manageWindowsGroupBox.add(removeProtectionBtn);

      // const manager = new qx.ui.form.RadioGroup(setProtectionBtn, removeProtectionBtn);
      // manager.setSelection([removeProtectionBtn]);

      // manager.addListener("changeSelection", function(e){
      //   const selectedButton = e.getData()[0];
      //   const value = selectedButton.getLabel()
      //   if (value == "Protection") {
      //     dialog.setData({ "aaa": 1 });
      //   } else {
      //     dialog.setData({ "aaa": 0 });
      //   }
      // }, this)

      // dialogControlContainer.add(manageWindowsGroupBox);
      // container.add(dialogControlContainer, {left: 10, top: 10});

      this.getRoot().add(container, { edge: 0 });

      const test = new scada.mnemo.dialog.demo.ListDialog();
      console.log(test.getPropControlVE());
    }
  }
});

