qx.Mixin.define("scada.mnemo.dialog.demo.group.MControlVEGroup", {

    construct() {
        //GroupBox "Диалоги ВЕ"
        this.controlVEGroup = new qx.ui.groupbox.GroupBox(this.getPropControlVE().name);
        const gridVEGroup = new qx.ui.layout.Grid();
        gridVEGroup.setSpacing(5);
        gridVEGroup.setColumnAlign(0, "left", "middle");
        this.controlVEGroup.setLayout(gridVEGroup);
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
                leftCoord: 300,
                topCoord: 300,
                question: {
                label: "ЛВ2?",
                key: "question",
                answers: {
                    "Включить": 1,
                    "Отключить": 0
                }
                },
                key: "bbb",
                protections: "",
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
        __propControlVE: null,
    }
});