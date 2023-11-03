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

      const container = new qx.ui.container.Composite(
        new qx.ui.layout.Canvas()
      ).set({
        decorator: border,
      });

      const listDialog = new scada.mnemo.dialog.demo.GeneralDialogs();
      listDialog.openAllDialog();

      container.add(listDialog, {left: 10, top: 10});
      this.getRoot().add(container, {left: 0, top: 0, right: 0, bottom: 0});
    }
  }
});

