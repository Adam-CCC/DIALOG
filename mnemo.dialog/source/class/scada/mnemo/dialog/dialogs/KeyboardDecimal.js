qx.Class.define("scada.mnemo.dialog.dialogs.KeyboardDecimal", {
    extend: scada.mnemo.dialog.dialogs.Keyboard,

    members: {
        _createWidgetContent(){
            super._createWidgetContent();
            this._mainWindow.setSeparatorOn(true);
        },

        _onLoadSettings(settings){
            super._onLoadSettings(settings);

            if (this.settingsHasParam(settings, "precision")){
                this._mainWindow.setPrecision(settings.precision);
            }
            if (this.settingsHasParam(settings, "digit_count")){
                this._mainWindow.setMaxLength(settings.digit_count);
            }
        },

        _onOutputData(e){
            const data = {};
            data[this.getOutputKey()] = parseFloat(e.getData().replace(',', '.'));
            this.setOutData(data);
        }
    }
});