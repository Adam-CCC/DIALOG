qx.Class.define("scada.widget.period.Period", {
    extend : Object,

    construct(start, end){
        super();
        this.__start = start;
        this.__end = end;
    },

    members: {
        getStart(){
            return this.__start;
        },

        getEnd(){
            return this.__end;
        },

        isValid(){
            return this.__start <= this.__end;
        }
    }
});