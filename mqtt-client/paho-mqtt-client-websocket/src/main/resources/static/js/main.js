var websocket = function(config) {

	this.host = config.host;
	this.port = config.port;
	this.useTLS = config.useTLS;
	this.topic = config.topic;
	this.userName = config.userName;
	this.password = config.password;
	this.cleansession = config.cleansession;
	this.reconnectTimeout = 5000;
	var mqttClient;

	this.connect = function MQTTconnect() {
		mqttClient = new Paho.MQTT.Client(this.host, this.port, "clientId");

		var options = {
			timeout : 10,
			useSSL : this.useTLS,
			cleanSession : this.cleansession,
			onSuccess : onConnect,
			onFailure : function(message) {
				faildMssge(message.errorMessage, "Retrying",
						fialdMessageCallback)
				setTimeout(MQTTconnect, this.reconnectTimeout);
			}
		};

		mqttClient.onConnectionLost = onConnectionLost;
		mqttClient.onMessageArrived = onMessageArrived;

		if (this.userName != null) {
			options.userName = this.userName;
			options.password = this.password;
		}

		console.log("Host=" + host + ", port=" + port + " TLS = " + useTLS
				+ " username=" + userName + " password=" + password);
		mqttClient.connect(options);
	}
	function onConnect() {
		mqttClient.subscribe(topic, {
			qos : 0
		});
	}

	function onConnectionLost(response) {
		setTimeout(MQTTconnect, this.reconnectTimeout);
		faildMssge("connection lost: " + responseObject.errorMessage,
				". Reconnecting", fialdMessageCallback)
	}
	;

	function onMessageArrived(message) {
		var topic = message.destinationName;
		var payload = message.payloadString;
		callback(topic, payload, messageCallback);
	}
	;

	function callback(topic, payload, messageCallback) {
		messageCallback(topic, payload);
	}

	function faildMssge(errorMessage, type, fialdMessageCallback) {
		fialdMessageCallback(errorMessage, type);
	}

	this.sendMessage = function sendMessage(topic, message) {
		var message = new Paho.MQTT.Message(message);
		message.destinationName = topic;
		message.qos = 0;
		mqttClient.send(message);
	}
}

// new MQTTconnect();

