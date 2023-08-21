qx.Class.define("scada.mnemo.dialog.demo.ListDialog", {
    extend : qx.core.Object,

    construct() {
        super();
        // this._createDialogGroupBox();
    },

    properties: {

    },

    events: {

    },

    members: {
        // main() { 
        //     //First GroupBox
        //     const windowsGroupBox = new qx.ui.groupbox.GroupBox("Список диалогов");
        //     windowsGroupBox.setLayout(new qx.ui.layout.VBox(5));

        //     const openBtn = new qx.ui.form.Button("Открыть дилог");
        //     openBtn.addListener("execute", function () {
        //     dialog.show();
        //     }, this);
        //     windowsGroupBox.add(openBtn);

        //     const calcDecimal = new qx.ui.form.Button("Калькулятор");
        //     const keyDecimal = new scada.mnemo.dialog.KeyboardDecimal();
        //     calcDecimal.addListener("execute", function () {
        //     keyDecimal.setCenter(true);
        //     keyDecimal.show();
        //     }, this);
        //     windowsGroupBox.add(calcDecimal);

        //     const questionDlg = new scada.mnemo.dialog.Question();
        //     questionDlg.initSettingsFromJson({
        //     question: {
        //         label: "Вы уверены, что хотите продолжить?"
        //     }
        //     });
        //     const question = new qx.ui.form.Button("Вопрос");
        //     question.addListener("execute", function () {
        //     questionDlg.setCenter(true);
        //     questionDlg.show();
        //     }, this);
        //     windowsGroupBox.add(question);

        //     const questionSwitch = new qx.ui.form.Button("Двойной вопрос");
        //     questionSwitch.addListener("execute", function () {
        //     const doubleQuest = new scada.mnemo.dialog.QuestionSwitch();
        //     doubleQuest.initSettingsFromJson({
        //         question: {
        //             label: "Вы уверены, что хотите продолжить?"
        //         }
        //     });
        //     doubleQuest.setCenter(true);
        //     doubleQuest.open();
        //     }, this);
        //     windowsGroupBox.add(questionSwitch);

        //     const tempShow = new qx.ui.form.Button("Температура");
        //     tempShow.addListener("execute", function () {
        //     const keyDecimal = new scada.mnemo.dialog.TempShow();
        //     keyDecimal.setCenter(true);
        //     keyDecimal.show();
        //     }, this);
        //     windowsGroupBox.add(tempShow);

        //     const dlgDouble = new scada.widget.window.confirm.Double();
        //     const double = new qx.ui.form.Button("Двойной вопрос");
        //     double.addListener("execute", function () {
        //     dlgDouble.setCenterOnAppear(true);
        //     dlgDouble.open();
        //     }, this);
        //     windowsGroupBox.add(double);

        //     // const dlgDoubles = new scada.widget.window.connection.Window();
        //     // const doubles = new qx.ui.form.Button("Двойной вопрос");
        //     // doubles.addListener("execute", function () {
        //     //   dlgDoubles.setCenterOnAppear(true);
        //     //   dlgDoubles.open();
        //     // }, this);
        //     // windowsGroupBox.add(doubles);

        //     const w1 = new qx.ui.core.Widget().set({
        //     backgroundColor: "red",
        //     decorator: border,
        //     width: 400,
        //     });
        //     const viewPor = new scada.widget.zoom.ViewPort(w1, true);
        //     const viewZoom = new qx.ui.form.Button("Масштабирование");
        //     viewZoom.addListener("execute", function () {
        //     container.add(viewPor, {left: "50%", top: "50%", width: "25%", height: "25%"});
        //     }, this);
        //     windowsGroupBox.add(viewZoom);
        // },

        // _createDialogGroupBox() {
        //     const windowsGroupBox = new qx.ui.groupbox.GroupBox("Список диалогов");
        //     windowsGroupBox.setLayout(new qx.ui.layout.VBox(5));
        // },

        openControlVE() {
            const url = "scada.mnemo.dialog.demo.propControlVE.json";
            const store = new qx.data.store.Json(url);
            console.log(store.getModel());

            // const dialog = new scada.mnemo.dialog.signal.ControlVE();
            // dialog.initSettingsFromJson(getPropControlVE());

            // dialog.addListener("goto", function(){
            //     console.log("GOTO");
            // }, this);

            // dialog.addListener("changeOutData", function(e){
            //     console.log(e.getData());
            // }, this);
        }
    }
});