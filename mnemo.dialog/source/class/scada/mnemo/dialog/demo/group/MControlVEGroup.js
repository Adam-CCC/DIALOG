qx.Mixin.define("scada.mnemo.dialog.demo.group.MControlVEGroup", {

    construct() {

        //GroupBox "Диалоги ВЕ"
        this.controlVEGroup = new qx.ui.groupbox.GroupBox("Диалоги ВЕ");
        const gridVEGroup = new qx.ui.layout.Grid();
        gridVEGroup.setSpacing(5);
        gridVEGroup.setColumnAlign(0, "left", "middle");
        this.controlVEGroup.setLayout(gridVEGroup);

        //GroupBox "Позиция"
        this.positionBox = new qx.ui.groupbox.GroupBox("Позиция");
        const gridPosition = new qx.ui.layout.Grid();
        gridPosition.setSpacing(5);
        gridPosition.setColumnAlign(0, "left", "middle");
        this.positionBox.setLayout(gridPosition);

        //Добавление "Позиция" в "Диалоги ВЕ"
        this.controlVEGroup.add(this.positionBox, {row: 0, column: 0});

        //Содержимое "Позиция"
        this.centerBtn = new qx.ui.form.CheckBox("Центр");
        this.leftCoordLabel = new qx.ui.basic.Label("Влево: ");
        this.topCoordLabel = new qx.ui.basic.Label("Вверх: ");
        this.leftCoordInput = new qx.ui.form.TextField();
        this.topCoordInput = new qx.ui.form.TextField();

        //Содержимое "Диалог ВЕ"
        this.buttonEnter = new qx.ui.form.Button("Применить");

        //Добавление в "Позиция"
        this.positionBox.add(this.centerBtn, {row: 0, column: 0});
        this.positionBox.add(this.leftCoordLabel, {row: 1, column: 0});
        this.positionBox.add(this.topCoordLabel, {row: 2, column: 0});
        this.positionBox.add(this.leftCoordInput, {row: 1, column: 1});
        this.positionBox.add(this.topCoordInput, {row: 2, column: 1});


        //Добавление в "Диалоги ВЕ"
        this.controlVEGroup.add(this.buttonEnter, {row: 1, column: 0});

        this.__setDialogCenter();
        this.__setCordPosition();
    },

    members: {
        __propControlVE: null,

        __callRefreshControlVE() {
            this.setDialog(this.getPropControlVE());
            this.openDialog({x: this.getPropControlVE().leftCoord, y: this.getPropControlVE().topCoord}, this.getProtections());
        },

        __setDialogCenter(){
            this.centerBtn.addListener("changeValue", function (e) {
                    const value = e.getData();
                    if(value == true){
                        this.topCoordLabel.setEnabled(false);
                        this.leftCoordLabel.setEnabled(false);

                        //Получаем текущее значение propControlVE
                        this.__propControlVE = this.getPropControlVE();
    
                        // Устанавливаем значение center в false
                        this.__propControlVE.center = true;
    
                        // Устанавливаем новое значение propControlVE
                        this.setPropControlVE(this.__propControlVE);
                        this.__callRefreshControlVE();
                    } else {
                        this.topCoordLabel.setEnabled(true);
                        this.leftCoordLabel.setEnabled(true);

                        this.__propControlVE.center = false;
                        this.__callRefreshControlVE();
                    }
                    
            }, this)
        },

        __setCordPosition() {
            this.buttonEnter.addListener("execute", function(){
                this.__propControlVE = this.getPropControlVE();

                // Устанавливаем значение center в false
                this.__propControlVE.leftCoord = parseInt(this.leftCoordInput.getValue());
                this.__propControlVE.topCoord = parseInt(this.topCoordInput.getValue());
                // Устанавливаем новое значение propControlVE
                this.setPropControlVE(this.__propControlVE);

                console.log(this.getPropControlVE());
                this.__callRefreshControlVE();
            }, this)
        }
    }
});