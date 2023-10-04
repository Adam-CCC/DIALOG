qx.Class.define("scada.mnemo.dialog.Page", {
    extend: scada.mnemo.dialog.Dialog,

    members: {
        /*
            формат опций
            "id": строка,
            "width": число,
            "height": число,
            "caption": строка,
            "prefix": строка,
            "path": строка,
            "class": строка
        */
        _onLoadSettings(settings){
            super._onLoadSettings(settings);
            this._desc = settings;
        },

        _createWidgetContent(){
            this._mainWindow = new qx.ui.container.Composite();
            this._mainWindow.addListener("appear", this._onAppear, this);
        },

        _onAppear(){
            const handlerOptions = this._desc;
            if (handlerOptions.width){
                this._window.setWidth(handlerOptions.width);
            }
            else {
                this._window.resetWidth();
            }

            if (handlerOptions.height){
                this._window.setHeight(handlerOptions.height);
            }
            else {
                this._window.resetHeight();
            }
        }
    }
});