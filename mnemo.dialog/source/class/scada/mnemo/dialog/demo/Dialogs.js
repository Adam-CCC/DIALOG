qx.Class.define("scada.mnemo.dialog.demo.Dialogs", {
    extend: qx.core.Object,

    members: {
        getDialog(config){
            switch (config) {
                case "controlVE":
                    return new scada.mnemo.dialog.signal.ControlVE();
                    break;
                case "Calculate":
                    return new scada.mnemo.dialog.dialogs.KeyboardDecimal();
                    break;
                case "Question": 
                    return new scada.mnemo.dialog.dialogs.Question();
                    break;
                case "DoubleQuestion":
                    return new scada.mnemo.dialog.dialogs.QuestionSwitch();
                    break;
                case "Temperature":
                    return new scada.mnemo.dialog.dialogs.TempShow();
                    break;
                default:
                    throw console.error("Not found dialog " + config);                
            }
        }
    }
});