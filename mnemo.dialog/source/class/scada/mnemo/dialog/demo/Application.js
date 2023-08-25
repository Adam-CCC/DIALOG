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

      var container = new qx.ui.container.Composite(
        new qx.ui.layout.Canvas()
      )
      
      const dialogControlContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox());

      const listDialog = new scada.mnemo.dialog.demo.ListDialog();
      listDialog.openAllDialog(container);

      dialogControlContainer.add(listDialog);

      const manager = new scada.mnemo.dialog.Manager();

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

      container.add(dialogControlContainer, {left: 10, top: 10});

      this.getRoot().add(container, { edge: 0 });
    }
  }
});

