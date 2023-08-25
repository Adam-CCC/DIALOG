qx.Class.define("scada.mnemo.dialog.demo.ListDialog", {
    extend : qx.ui.groupbox.GroupBox,
    include: [scada.mnemo.dialog.demo.MFabricDialog],

    construct() {
        super("Диалоги");
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

        _openControlVE() {
            const dialog = new scada.mnemo.dialog.signal.ControlVE();
            dialog.initSettingsFromJson(this.getPropControlVE());

            dialog.addListener("goto", function(){
                console.log("GOTO");
            }, this);

            dialog.addListener("changeOutData", function(e){
                console.log(e.getData());
            }, this);

            const openBtn = new qx.ui.form.Button("Открыть диалог");
            openBtn.addListener("execute", function () {
                this.setDialog(this.getPropControlVE());
                this.openDialog({x: 300, y: 300}, "")
            }, this);
            this.add(openBtn);
        },

        _openCalculate() {
            const calculateBtn = new qx.ui.form.Button("Калькулятор");
            calculateBtn.addListener("execute", function () {
                this.setDialog({name: "Calculate"});
                this.openDialog({x: 300, y: 300}, "")
            }, this);
            this.add(calculateBtn);
        },

        _openQuestion() {
            const questionBtn = new qx.ui.form.Button("Вопрос");
            questionBtn.addListener("execute", function () {
                this.setDialog({name: "Question", question : {label: "Вы уверены что хотите продолжить?"}});
                this.openDialog({x: 300, y: 300}, "")
            }, this);
            this.add(questionBtn);
        },

        _openDoubleQuestion() {
            const doubleQuestionBtn = new qx.ui.form.Button("Двойной вопрос");
            doubleQuestionBtn.addListener("execute", function () {
                this.setDialog({name: "DoubleQuestion", question : {label: "Вы уверены что хотите продолжить?"}});
                this.openDialog({x: 300, y: 300}, "")
            }, this);
            this.add(doubleQuestionBtn);
        },

        _openTemperature() {
            const temperatureBtn = new qx.ui.form.Button("Температура");
            temperatureBtn.addListener("execute", function () {
                this.setDialog({name: "Temperature", question : {label: "Вы уверены что хотите продолжить?"}});
                this.openDialog({x: 300, y: 300}, "")
            }, this);
            this.add(temperatureBtn);
        }
    }
});