qx.Mixin.define("scada.mnemo.dialog.demo.MDialogController", {
    construct() {
        this.generalGroup = new qx.ui.groupbox.GroupBox(this.basename + "Settings");
        this.generalGroup.setLayout(new qx.ui.layout.VBox());

        this.groupControlDialogs = new qx.ui.groupbox.GroupBox("Управление доступом");
        this.groupControlDialogs.setLayout(new qx.ui.layout.VBox());

        this.radioProtection = new qx.ui.form.RadioButton("Заблокировать");
        this.radioRemoveProtection = new qx.ui.form.RadioButton("Разблокировать");
        
        this.manager = new qx.ui.form.RadioGroup(this.radioProtection, this.radioRemoveProtection);
        this.generalGroup.add(this.groupControlDialogs);

        //GroupBox "Позиция"
        this.posBox = new qx.ui.groupbox.GroupBox("Позиция");
        const gridPos = new qx.ui.layout.Grid();
        gridPos.setSpacing(5);
        gridPos.setColumnAlign(0, "left", "middle");
        this.posBox.setLayout(gridPos);

        //Содержимое "Позиция"
        this.chkCenter = new qx.ui.form.CheckBox("Центр");
        this.leftLabel = new qx.ui.basic.Label("Влево: ");
        this.topLabel = new qx.ui.basic.Label("Вверх: ");
        this.leftInput = new qx.ui.form.TextField();
        this.topInput = new qx.ui.form.TextField();

        this.btnEnter = new qx.ui.form.Button("Применить");

        //Добавление в "Позиция"
        this.posBox.add(this.chkCenter, {row: 0, column: 0});
        this.posBox.add(this.leftLabel, {row: 1, column: 0});
        this.posBox.add(this.topLabel, {row: 2, column: 0});
        this.posBox.add(this.leftInput, {row: 1, column: 1});
        this.posBox.add(this.topInput, {row: 2, column: 1});

        this.generalGroup.add(this.posBox);

        this.groupControlDialogs.add(this.radioProtection);
        this.groupControlDialogs.add(this.radioRemoveProtection);

        this.generalGroup.add(this.btnEnter)

        this.add(this.generalGroup);
    },
    
    members: {
        __prop: null,

        __changeController(e) {
            let data = this.__data;
            const selectedButton = e.getData()[0];
            const value = selectedButton.getLabel();
            if(value == "Заблокировать") {
                this.__prop.protections = {"aaa":1};
                console.log(data);
            } else if (value == "Разблокировать") {
                this.__prop.protections = {"aaa":0};  
            }
        },


        __changePos(){
            if(this.leftInput.getValue() || this.topInput.getValue() == ""){
                this.__prop.leftCoord = parseInt(this.leftInput.getValue());
                this.__prop.topCoord = parseInt(this.topInput.getValue());

                this.refreshDialog(this.__prop);
            }
        },

        __changeCenter(e){
            const value = e.getData();
            if(value == true){
                this.topInput.setEnabled(false);
                this.leftInput.setEnabled(false);

                // Устанавливаем значение center в false
                this.__prop.center = true;

                this.refreshDialog(this.__prop);
            } else {
                this.topInput.setEnabled(true);
                this.leftInput.setEnabled(true);

                this.__prop.center = false;

                this.refreshDialog(this.__prop);
            }
        },

        chkCenterFunc(settings){
            this.__prop = settings;

            this.chkCenter.setValue(false);
            this.leftInput.setValue("");
            this.topInput.setValue("");

            this.chkCenter.removeListener("changeValue", this.__changeCenter, this);
            this.chkCenter.addListener("changeValue", this.__changeCenter, this);

            this.btnEnter.removeListener("execute", this.__changePos, this);
            this.btnEnter.addListener("execute", this.__changePos, this);

            this.manager.removeListener("changeSelection", this.__changeController, this);
            this.manager.addListener("changeSelection", this.__changeController, this);
        }
    }
});