var mqtt = require('mqtt');

const thingsboardHost = "demo.thingsboard.io";
const ACCESS_TOKEN = "PQPpqnaovai";

// Initialization of mqtt client using Thingsboard host and device access token
console.log('Connecting to: %s using access token: %s', thingsboardHost, ACCESS_TOKEN);

const client = mqtt.connect('mqtt://demo.thingsboard.io', {
    username: ACCESS_TOKEN
})

client.on('connect', () => {
	console.log('Conectado ao broker MQTT')
})

client.on('error', (error) => {
	console.log('Erro de conexão MQTT:', error)
})

client.on('message', (topic, message) => {
	console.log('Recebido mensagem:', message.toString())
})

client.subscribe('v1/devices/me/rpc/request/+', qos=1, (err, granted) => {
	console.log('Recebido mensagem:',granted)
})

function getTwoRandomNumbers() {
  const num1 = Math.floor(Math.random() * 20 - 10);
  const num2 = Math.floor(Math.random() * 20 - 10);
  return [num1, num2];
}

let [randomNum1, randomNum2] = getTwoRandomNumbers(); 

client.on('connect', () => {
	setInterval(() => {
		
		client.publish('v1/devices/me/telemetry', JSON.stringify({temperature: randomNum1 + 20, humidity: randomNum2 + 50}),(err) => {
			console.log(err)
		})
		console.log('publish', {temperature: randomNum1 + 20, humidity: randomNum2 + 50})
	}, 1000);

	setInterval(() => {
		const [ varRandomNum1, varRandomNum2] = getTwoRandomNumbers();
		randomNum1 = varRandomNum1;
		randomNum2 = varRandomNum2
	}, 2000)
})



// "v1/devices/me/telemetry",json.dumps(sensor_data),1