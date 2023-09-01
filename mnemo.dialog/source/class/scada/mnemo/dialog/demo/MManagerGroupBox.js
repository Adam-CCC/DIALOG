qx.Mixin.define("scada.mnemo.dialog.demo.MManagerGroupBox", {
    members: {
        __ControlVE: new scada.mnemo.dialog.demo.group.ControlVEGroup(),
        __Calculate: new scada.mnemo.dialog.demo.group.Calculate(),
        __currentGroup: null,

        addGroupBox(group){
            this.__currentGroup = null;
            this.__currentGroup = group; //ссылка на готовый GroupBox
            this.add(this.__currentGroup)
        }   
    }
});