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

      // const dialogController = new scada.mnemo.dialog.demo.DialogController("Управление окнами");
      // dialogController.initValue();

      const listDialog = new scada.mnemo.dialog.demo.ListDialog("Диалоги");
      listDialog.openAllDialog();

      // dialogControlContainer.add(listDialog.setMaket());

      this.getRoot().add(listDialog, { edge: 15 });
    }
  }
});

