var client;
var reconnectTimeout = 5000;

var config;

function MQTTconnect() {
	client = new Paho.MQTT.Client(host, port, "clientId");

	var options = {
		timeout : 10,
		useSSL : useTLS,
		cleanSession : cleansession,
		onSuccess : onConnect,
		onFailure : function(message) {
			faildMssge(message.errorMessage, "Retrying", fialdMessageCallback)
			setTimeout(MQTTconnect, reconnectTimeout);
		}
	};

	client.onConnectionLost = onConnectionLost;
	client.onMessageArrived = onMessageArrived;

	if (userName != null) {
		options.userName = userName;
		options.password = password;
	}

	console.log("Host=" + host + ", port=" + port + " TLS = " + useTLS
			+ " username=" + userName + " password=" + password);
	client.connect(options);
}
function onConnect() {
	client.subscribe(topic, {
		qos : 0
	});
}

function onConnectionLost(response) {
	setTimeout(MQTTconnect, reconnectTimeout);
	faildMssge("connection lost: " + responseObject.errorMessage, ". Reconnecting", fialdMessageCallback)
};

function onMessageArrived(message) {
	var topic = message.destinationName;
	var payload = message.payloadString;
	callback(topic, payload, messageCallback);
};

function callback(topic, payload, messageCallback) {
	messageCallback(topic, payload);
}

function faildMssge(errorMessage, type, fialdMessageCallback) {
	fialdMessageCallback(errorMessage, type);
}

function sendMessage(topic, message){
	var message = new Paho.MQTT.Message(message);
	message.destinationName = topic;
	message.qos=0;
	client.send(message);
	
}

$(document).ready(function() {
	MQTTconnect();
});
