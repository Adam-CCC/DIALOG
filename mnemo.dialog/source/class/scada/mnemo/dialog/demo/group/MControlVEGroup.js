qx.Mixin.define("scada.mnemo.dialog.demo.group.MControlVEGroup", {

    construct() {

        //GroupBox "Диалоги ВЕ"
        this.controlVEGroup = new qx.ui.groupbox.GroupBox("Диалоги ВЕ");
        const gridVEGroup = new qx.ui.layout.Grid();
        gridVEGroup.setSpacing(5);
        gridVEGroup.setColumnAlign(0, "left", "middle");
        this.controlVEGroup.setLayout(gridVEGroup);

        this.add(this.controlVEGroup);

        this.chkCenterFunc(this.getPropControlVE());
    },

    members: {
        __propControlVE: null,
    }
});