qx.Class.define("scada.mnemo.dialog.demo.ListDialog", {
    extend : qx.ui.groupbox.GroupBox,

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

        __factoryDialog(dialogName) {
            switch (dialogName) {
                case "controlVE":
                    return new scada.mnemo.dialog.signal.ControlVE();
                    break;
                case "Calculate":
                    return new scada.mnemo.dialog.KeyboardDecimal();
                    break;
                case "Question": 
                    return new scada.mnemo.dialog.Question();
                    break;
                case "DoubleQuestion":
                    return new scada.mnemo.dialog.QuestionSwitch();
                    break;
                case "Temperature":
                    return new scada.mnemo.dialog.TempShow();
                    break;
                case "Zoom": 
                    // return new new scada.widget.zoom.ViewPort()
                    // break;
                default:
                    throw console.error("Not found dialog " + dialogName);                
            }
        },

        initManager(dialogName) {
            console.log(this.__factoryDialog("Temperature"));
            this.manager = new scada.mnemo.dialog.Manager();
            this.manager.setDialog({name: this.__factoryDialog(dialogName)});
            this.manager.addListener("goTo", function(event) {
                const position = { x: 200, y: 200 }; // Замените координаты на нужные
                this.manager.openDialog(position, event.getData());
            }, this);
        },

        openAllDialog() {
            this.initManager("controlVE");

            this._openControlVE();
            this._openCalculate();
            this._openQuestion();
            this._openDoubleQuestion();
            this._openTemperature();
            this._openZoom();
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

            const openBtn = new qx.ui.form.Button("Открыть дилог");
            openBtn.addListener("execute", function () {
                dialog.show();
            }, this);
            this.add(openBtn);
        },

        _openCalculate() {
            const calculateBtn = new qx.ui.form.Button("Калькулятор");
            const calculate = new scada.mnemo.dialog.KeyboardDecimal();
            calculateBtn.addListener("execute", function () {
                calculate.setCenter(true);
                calculate.show();
            }, this);
            this.add(calculateBtn);
        },

        _openQuestion() {
            const question = new scada.mnemo.dialog.Question();
            question.initSettingsFromJson({
              question: {
                  label: "Вы уверены, что хотите продолжить?"
              }
            });
            const questionBtn = new qx.ui.form.Button("Вопрос");
            questionBtn.addListener("execute", function () {
              question.setCenter(true);
              question.show();
            }, this);
            this.add(questionBtn);
        },

        _openDoubleQuestion() {
            const doubleQuestionBtn = new qx.ui.form.Button("Двойной вопрос");
            doubleQuestionBtn.addListener("execute", function () {
                const doubleQuestion = new scada.mnemo.dialog.QuestionSwitch();
                doubleQuestion.initSettingsFromJson({
                question: {
                    label: "Вы уверены, что хотите продолжить?"
                }
                });
                doubleQuestion.setCenter(true);
                doubleQuestion.open();
            }, this);
            this.add(doubleQuestionBtn);
        },

        _openTemperature() {
            const temperatureBtn = new qx.ui.form.Button("Температура");
            temperatureBtn.addListener("execute", function () {
                const temperature = new scada.mnemo.dialog.TempShow();
                temperature.setCenter(true);
                temperature.show();
            }, this);
            this.add(temperatureBtn);
        },

        _openZoom() {
            var border = new qx.ui.decoration.Decorator().set({
                width: 3,
                style: "solid",
                color: "black",
              });

            const styleConent = new qx.ui.core.Widget().set({
                backgroundColor: "red",
                decorator: border,
                width: 400,
            });

            const viewPort = new scada.widget.zoom.ViewPort(styleConent, true);
            const viewZoom = new qx.ui.form.Button("Масштабирование");
            viewZoom.addListener("execute", function () {
                this.container.add(viewPort, {left: "50%", top: "50%", width: "25%", height: "25%"});
            }, this);
            this.add(viewZoom);
        },
    }
});