qx.Class.define("scada.mnemo.dialog.demo.ListDialog", {
    extend : qx.ui.groupbox.GroupBox,
    include: [scada.mnemo.dialog.demo.MFabricDialog],

    construct(name) {
        super(name);
        this.setLayout(new qx.ui.layout.VBox(5));
    },

    properties: {
        propControlVE : {
            init: { 
                reset_keys: [
                {
                    "label": "",
                    "key": "<<prefix>>.Квитировать"
                }
                // {
                //   "label": "СБРОС 2",
                //   "key": "<<prefix>>.Квитировать"
                // }
                ],
                signals: {
                "ТЕКУЩИЕ ИЗМЕРЕНИЯ": [
                    {
                        "label": "Ток фидера",
                        "key": "<<prefix>>.Интер.I фид",
                        "subscribe": true
                    },
                    {
                        "label": "Напряжение фидера",
                        "key": "<<prefix>>.Интер.U фид",
                        "subscribe": true
                    },
                    {
                        "label": "Напряжение на линии",
                        "key": "<<prefix>>.Интер.U лин",
                        "subscribe": true
                    },
                    {
                        "label": "Температура контактного провода",
                        "key": "<<prefix>>.Интер.t кп",
                        "subscribe": true
                    }
                ],
                "СТАТУС": [
                    {
                        "label": "БВ включен/выключен",
                        "key": "<<prefix>>.Интер.БВ",
                        "subscribe": true
                    },
        
                    {
                        "label": "Цепи сигнализации ВБ не исправны/исправны",
                        "key": "<<prefix>>.Интер.ЦСИГБВ",
                        "subscribe": true
                    },
        
                    {
                        "label": "ОР включен/отключен",
                        "key": "<<prefix>>.Интер.ОР",
                        "subscribe": true
                    }
                ]
                },
                name: "controlVE",
                control_ve: {
                key: "aaa",
                state_key: "bbb"
                },
                confirmation: true,
                avr: {
                key: "hello"
                },
                center: true,
                question: {
                label: "ЛВ2?",
                key: "question",
                answers: {
                    "Включить": 1,
                    "Отключить": 0
                }
                },
                key: "bbb",
                protection: {
                key: "aaa",
                show_message: true
                },
                update: {
                key: "sss"
                }
            }
        },

        protections : {
            init: {"aaa":1}
        }
    },

    members: {

        openAllDialog() {
            this._openControlVE();
            this._openCalculate();
            this._openQuestion();
            this._openDoubleQuestion();
            this._openTemperature();
        },

        protect(){

        },

        _openControlVE() {
            const dialog = new scada.mnemo.dialog.signal.ControlVE();
            dialog.initSettingsFromJson(this.getPropControlVE());

            dialog.addListener("goto", function(){
                console.log("GOTO");
            }, this);

            dialog.addListener("changeOutData", function(e){
                console.log(e.getData());
            }, this);

            this.managerRadioBtn.addListener("changeSelection", function (e) {
                const selectedButton = e.getData()[0];
                const value = selectedButton.getLabel();
                if(value == "Открыть диалог") {
                    this.protect();
                    this.setDialog(this.getPropControlVE());
                    console.log("Имею: " + this.getProtections())
                    this.openDialog({x: 300, y: 300}, this.getProtections());
                }
            }, this);
            this.add(this.radioOpenDialog);
        },

        _openCalculate() {
            this.managerRadioBtn.addListener("changeSelection", function (e) {
                const selectedButton = e.getData()[0];
                const value = selectedButton.getLabel();
                if(value == "Калькулятор") {
                    this.setDialog({name: "Calculate"});
                    this.openDialog({x: 300, y: 300}, "")
                }
            },  this);
            this.add(this.radioCalculate);
        },

        _openQuestion() {
            this.managerRadioBtn.addListener("changeSelection", function (e) {
                const selectedButton = e.getData()[0];
                const value = selectedButton.getLabel();
                if(value == "Вопрос") {
                    this.setDialog({name: "Question", question : {label: "Вы уверены что хотите продолжить?"}});
                    this.openDialog({x: 300, y: 300}, "")
                }
            }, this);
            this.add(this.radioQuestion);
        },

        _openDoubleQuestion() {
            this.managerRadioBtn.addListener("changeSelection", function (e) {
                const selectedButton = e.getData()[0];
                const value = selectedButton.getLabel();
                if(value == "Двойной вопрос") {
                    this.setDialog({name: "DoubleQuestion", question : {label: "Вы уверены что хотите продолжить?", key : ""}});
                    this.openDialog({x: 300, y: 300}, "");
                }
            }, this);
            this.add(this.radioDoubleQuestion);
        },

        _openTemperature() {
            this.managerRadioBtn.addListener("changeSelection", function (e) {
                const selectedButton = e.getData()[0];
                const value = selectedButton.getLabel();
                if(value == "Температура") {
                    this.setDialog({name: "Temperature", key : ""});
                    this.openDialog({x: 300, y: 300}, "");
                }
            }, this);
            this.add(this.radioTemperature);
        }
    }
});