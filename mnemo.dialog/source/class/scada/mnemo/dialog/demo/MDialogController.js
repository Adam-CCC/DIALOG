qx.Mixin.define("scada.mnemo.dialog.demo.MDialogController", {
    construct() {
        this.generalGroup = new qx.ui.groupbox.GroupBox("Общие настройки");
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

        this.generalGroup.add(this.btnEnter)

        this.add(this.generalGroup);
    },
    
    members: {
        managerAddlistener() {
            this.manager.addListener("changeSelection", function (e) {
                const selectedButton = e.getData()[0];
                const value = selectedButton.getLabel();
                if(value == "Заблокировать") {
                    this.setProtections({"aaa":1});  
                } else if (value == "Разблокировать") {
                    this.setProtections({"aaa":0});  
                }
            }, this)
            this.groupControlDialogs.add(this.radioProtection);
            this.groupControlDialogs.add(this.radioRemoveProtection);
        },

        // setPos(prop){
        //     this.chkCenter.addListener("changeValue", function (e) {
        //         const value = e.getData();
        //         this.setDialogCenter(value, prop, this.leftInputQuest, this.topInputQuest);
        //     }, this)

        //     this.btnEnter.addListener("execute", function(){

        //         prop.leftCoord = parseInt(this.leftInput.getValue());
        //         prop.topCoord = parseInt(this.topInput.getValue());

        //         this.refreshDialog(prop);
        //     }, this)
        // }

        refreshDialog(settings) {
            this.setDialog(settings);
            this.openDialog({x: settings.leftCoord, y: settings.topCoord}, this.getProtections());
        },

        chkCenterFunc(settings){
            alert("Начало функции");
            this.chkCenter.setValue(false);
            this.leftInput.setValue("");
            this.topInput.setValue("");

            this.chkCenter.addListener("changeValue", function (e) {
                alert("Начало обработчика");
                const value = e.getData();
                if(value == true){
                    alert("Начало true");
                    this.topInput.setEnabled(false);
                    this.leftInput.setEnabled(false);
    
                    // Устанавливаем значение center в false
                    settings.center = true;

                    this.setDialog(settings);
                    this.openDialog({x: settings.leftCoord, y: settings.topCoord}, this.getProtections());
                    alert("Конец true");
                } else {
                    alert("Начало false");
                    this.topInput.setEnabled(true);
                    this.leftInput.setEnabled(true);
    
                    settings.center = false;

                    this.setDialog(settings);
                    this.openDialog({x: settings.leftCoord, y: settings.topCoord}, this.getProtections());
                    alert("Конец false");
                }
            }, this)

            this.chkCenter.removeEventListener("changeValue");

            this.btnEnter.addListener("execute", function(){
                if(this.leftInput.getValue() || this.topInput.getValue() == ""){
                    settings.leftCoord = parseInt(this.leftInput.getValue());
                    settings.topCoord = parseInt(this.topInput.getValue());

                    alert("3");
                    this.setDialog(settings);
                    this.openDialog({x: settings.leftCoord, y: settings.topCoord}, this.getProtections());
                }
            }, this)
            alert("Конец")
        }
    }
});