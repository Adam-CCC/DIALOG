qx.Class.define("scada.util.Buffer", {
    extend: qx.core.Object,

    construct: function(keys) {
        if (keys && keys.length) {
            this.__keys = keys;
            this.__data = new qx.data.Array(keys.length);
        } else {
            this.__keys = [];
            this.__data = new qx.data.Array();
        }
    },

    properties: {
        "data": {
            init: {},
            apply: "_applyData",
            event: "changeData"
        }
    },

    members: {
        __keys: null,
        __data: null,

        _applyData: function(data, olddata) {
            for (var key in data) {
                this.__data.setItem(this.__keys.indexOf(key), data[key]);
            }
        },

        subscribe: function(keys, obj) {
            var res = [];
            for (var j = 0; j < keys.length; j++) {
                var i = this.__keys.indexOf(keys[j]);
                res.push(this.__data.bind("[" + i + "]", obj, "data"));
            }
            return res;
        },

        subscribeWithKeys: function(keys, obj) {
            const res = [];
            for (var j = 0; j < keys.length; j++) {
                const key = keys[j];
                const i = this.__keys.indexOf(key);
                res.push(this.__makeBinding(i, key, obj));
            }
            return res;
        },

        __makeBinding: function(i, key, obj){
            return this.__data.bind("[" + i + "]", obj, "data", {
                converter: function(data){
                    const keyValue = {};
                    keyValue[key] = data;
                    return keyValue;
                }
            });
        },

        getItemByKey: function(key) {
            var i = this.__keys.indexOf(key);
            return this.getItemByIndex(i);
        },

        getItemByIndex: function(i) {
            return this.__data.getItem(i);
        },

        getItemsByKeys: function(keys) {
            var res = {};

            for (var i in keys) {
                var key = keys[i];

                res[key] = this.getItemByKey(key);
            }

            return res;
        },

        addKey: function(key, value) {
            var i = this.__keys.indexOf(key);

            if (i == -1) {
                this.__keys.push(key);
                this.__data.append(value);
            } else {
                this.__data.setItem(i, value);
            }
        },

        clear: function() {
            this.__keys = [];
            this.__data = new qx.data.Array();
        }
    }
});
