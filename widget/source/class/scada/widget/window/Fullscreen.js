qx.Class.define("scada.widget.window.Fullscreen",
{
    extend : scada.widget.window.Place,

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
          contentPadding: 0
        });

        this.maximize();
    },

    members :
    {

    }
});
