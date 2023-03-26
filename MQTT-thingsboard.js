var mqtt = require('mqtt');

// Don't forget to update accessToken constant with your device access token
const thingsboardHost = "demo.thingsboard.io";
const ACCESS_TOKEN = "josuefoipragrecia";
const minDirection = 0, maxDirection = 360;


// Initialization of mqtt client using Thingsboard host and device access token
console.log('Connecting to: %s using access token: %s', thingsboardHost, ACCESS_TOKEN);
// var client  = mqtt.connect('mqtt://'+ thingsboardHost, { username: ACCESS_TOKEN, keepalive: 60, port: 1883 });
var client  = mqtt.connect('mqtt://'+ thingsboardHost, { username: ACCESS_TOKEN, port: 1883, keepalive: 600})

var value = 350;
var spinFlag = {method: "spinRight", params: 0};


//RPC message handling sent to the client
client.on('message', function (topic, message) {
    console.log('request.topic: ' + topic);
    console.log('request.body: ' + message.toString());
    var tmp = JSON.parse(message.toString());
    if (tmp.method == "spinRight") {
        spinFlag = tmp;
        // Uploads telemetry data using 'v1/devices/me/telemetry' MQTT topic
        client.publish('v1/devices/me/telemetry', JSON.stringify({spinFlag: "rotating right"}));
    }
    if (tmp.method == "spinLeft") {
        spinFlag = tmp;
		}
	}
	)