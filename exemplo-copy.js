var mqtt = require('mqtt');

const thingsboardHost = "demo.thingsboard.io";
const ACCESS_TOKEN = "josuefoipragrecia";

// Initialization of mqtt client using Thingsboard host and device access token
console.log('Connecting to: %s using access token: %s', thingsboardHost, ACCESS_TOKEN);
var client  = mqtt.connect('mqtt://'+ thingsboardHost, { username: ACCESS_TOKEN });

client.subscribe("encyclopedia/#", qos=1)

client.on('addListener', function() {
	console.log('MQTT Conectado com Sucesso');
	
		client.subscribe("encyclopedia/#", qos=1)
		for(var i = 1; i < 5; i++){
		//  Publica(i);
		}
});

