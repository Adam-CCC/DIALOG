qx.Mixin.define("scada.mnemo.dialog.demo.MDialogController", {
    construct() {
        this.generalGroup = new qx.ui.groupbox.GroupBox(this.basename + "Settings");
        this.generalGroup.setLayout(new qx.ui.layout.VBox());

        this.groupControlDialogs = new qx.ui.groupbox.GroupBox("Управление доступом");
        this.groupControlDialogs.setLayout(new qx.ui.layout.VBox());

        this.radioProtection = new qx.ui.form.RadioButton("Заблокировать");
        this.radioRemoveProtection = new qx.ui.form.RadioButton("Разблокировать");

        this.radioProtection.setValue(false);
        this.radioRemoveProtection.setValue(true);
        
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
        this.leftSlider = new qx.ui.form.Slider();
        this.topSlider = new qx.ui.form.Slider();

        // Настройка параметров ползунков
        this.leftSlider.setMaximum(1000); // Максимальное значение для left
        this.leftSlider.setMinimum(0);   // Минимальное значение для left
        this.leftSlider.setValue(0);     // Начальное значение для left
        this.leftSlider.setWidth(200);   // Ширина ползунка (можете настроить по своему усмотрению)

        this.topSlider.setMaximum(1000);   // Максимальное значение для top
        this.topSlider.setMinimum(0);     // Минимальное значение для top
        this.topSlider.setValue(0);       // Начальное значение для top
        this.topSlider.setWidth(200);

        this.btnEnter = new qx.ui.form.Button("Применить");

        //Добавление в "Позиция"
        this.posBox.add(this.chkCenter, {row: 0, column: 0});
        this.posBox.add(this.leftLabel, {row: 1, column: 0});
        this.posBox.add(this.topLabel, {row: 2, column: 0});
        this.posBox.add(this.leftSlider, {row: 1, column: 1});
        this.posBox.add(this.topSlider, {row: 2, column: 1});

        this.generalGroup.add(this.posBox);

        this.groupControlDialogs.add(this.radioProtection);
        this.groupControlDialogs.add(this.radioRemoveProtection);

        this.generalGroup.add(this.btnEnter)

        this.add(this.generalGroup);

        this.__changePos();
    },
    
    members: {
        __prop: null,

        __changeController(e) {
            const selectedButton = e.getData()[0];
            const value = selectedButton.getLabel();
            if(value == "Заблокировать") {
                this.__prop.protections = {"aaa":1};
                this.setBufferData(this.__prop.protections);
                this.refreshDialog(this.__prop);
            } else if (value == "Разблокировать") {
                this.__prop.protections = {"aaa":0};
                this.setBufferData(this.__prop.protections);
                this.refreshDialog(this.__prop);
            }
        },


        __changePos(){
            this.leftSlider.addListener("changeValue", function (e) {
                this.__prop.leftCoord = e.getData(); // Обновляем значение leftCoord при изменении ползунка
                this.refreshDialog(this.__prop);
            }, this);
            
            this.topSlider.addListener("changeValue", function (e) {
                this.__prop.topCoord = e.getData(); // Обновляем значение topCoord при изменении ползунка
                this.refreshDialog(this.__prop);
            }, this);
        },

        __changeCenter(e){
            const value = e.getData();
            if(value == true){
                this.topSlider.setEnabled(false);
                this.leftSlider.setEnabled(false);

                // Устанавливаем значение center в false
                this.__prop.center = true;

                this.refreshDialog(this.__prop);
            } else {
                this.topSlider.setEnabled(true);
                this.leftSlider.setEnabled(true);

                this.__prop.center = false;

                this.refreshDialog(this.__prop);
            }
        },

        chkCenterFunc(settings){
            this.__prop = settings;

            this.chkCenter.setValue(false);

            this.chkCenter.removeListener("changeValue", this.__changeCenter, this);
            this.chkCenter.addListener("changeValue", this.__changeCenter, this);

            this.btnEnter.removeListener("execute", this.__changePos, this);
            this.btnEnter.addListener("execute", this.__changePos, this);

            this.manager.removeListener("changeSelection", this.__changeController, this);
            this.manager.addListener("changeSelection", this.__changeController, this);
        }
    }
});