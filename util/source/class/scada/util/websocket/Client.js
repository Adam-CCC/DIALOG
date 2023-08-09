qx.Class.define("scada.util.websocket.Client", {
    extend : qx.core.Object,

    construct: function(){
        window.WebSocket = window.WebSocket || window.MozWebSocket;
    },

    events: {
        "connected": "qx.event.type.Event"
        ,"received": "qx.event.type.Data"
        ,"disconnected": "qx.event.type.Event"
        ,"error": "qx.event.type.Event"
        ,"invalidUrl": "qx.event.type.Event"
        ,"abropted": "qx.event.type.Event"
    },

    members: {
        connect: function(host, port){
            if (!this.__createSocket(host, port)){
                return;
            }
        }

        ,__configureSocket: function(socket){
            var client = this;
            this.__socket.onopen = function(){ client._onOpen(); };
            this.__socket.onerror = function(e){ client._onError(e); };
            this.__socket.onmessage = function(msg){ client._onMessage(msg); };
            this.__socket.onclose = function(e){ client._onClose(e); };
        }

        ,_onMessage: function(msg){
            var data = {};
            try
            {
                data = JSON.parse(msg.data);
            }
            catch (e){
                this.error("Ошибка парса: " + msg.data);
                return;
            }

            // client.info("Входящие: " +  msg.data);                
            this.fireDataEvent("received", data);
        }

        ,_onError: function(e){
            this.error(e.type);
            this.fireEvent("error");
        }

        ,_onOpen: function(){
            this.fireEvent("connected");
        }

        ,_onClose: function(event){
            if (event.wasClean) {
                this.warn('Соединение закрыто чисто');
                this.fireEvent("disconnected");
            } else {
                this.error('Обрыв соединения');
                this.fireEvent("abropted");
            }
            this.info('Код: ' + event.code + ' причина: ' + event.reason);
        }

        ,request: function(query){
            this.__socket.send(JSON.stringify(query));
        }

        ,disconnect: function(){            
            if (this.__socket){
                this.__socket.close();
                // debug разъединено
            }
        }

        ,__makeUrl: function(host, port){
            var url = "ws://" + host + ":" + port;
            try
            {
                // qx.util.Validate.checkUrl(url);                
            }
            catch(e)
            {
                return null;
            }

            return url;
        }

        ,__createSocket: function(host, port){
            var url = this.__makeUrl(host, port);

            if (url === null)
            {
                this.fireEvent("invalidUrl");
                return false;
            }

            var socket;
            
            try
            {
                socket = new WebSocket(url);
            }
            catch(e){
                this.fireEvent("invalidUrl");
                this.warn("invalid url: " + url);
                return false;
            }

            if (this.__socket && this.__socket.readyState === 1)
            {
                var client = this;
                socket.onopen = function(){ 
                    console.info("new onopen");                   
                    client.setSocket(socket);                    
                    client.fireEvent("connected");
                };               

                return true;
            }

            this.__socket = socket;
            this.__configureSocket(this.__socket);
            return true;
        }

        ,setSocket: function(socket){
            this.__socket.close();
            this.__socket = socket;
            this.__configureSocket(this.__socket);
        }

        ,__socket: null
    }
});