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

function gerarDadosRioDeJaneiro() {
	const temperatura = Math.floor(Math.random() * 10 + 20); // temperatura entre 20 e 29 graus Celsius
	const umidade = Math.floor(Math.random() * 30 + 70); // umidade entre 70% e 99%
	const vento = Math.floor(Math.random() * 20 + 5); // velocidade do vento entre 5 e 24 km/h
	const sensacaoTermica = Math.floor(Math.random() * 5 + 30); // sensação térmica entre 30 e 34 graus Celsius
	
	return [temperatura, umidade, vento, sensacaoTermica];
  }
  

let [temperatura, umidade, vento, sensacaoTermica] = gerarDadosRioDeJaneiro(); 

client.on('connect', () => {
	setInterval(() => {
		
		client.publish('v1/devices/me/telemetry', JSON.stringify({temperature: temperatura, humidity: umidade, wind: vento, termic: sensacaoTermica}),(err) => {
			console.log(err)
		})
		console.log('publish', {temperature: temperatura, humidity: umidade, wind: vento, termic: sensacaoTermica})
	}, 1000);

	setInterval(() => {
		const [temperatura1, umidade1, vento1, sensacaoTermica1] = gerarDadosRioDeJaneiro(); 
		temperatura = temperatura1;
		umidade = umidade1;
		vento = vento1;
		sensacaoTermica = sensacaoTermica1
	}, 2000)
})
j \


// "v1/devices/me/telemetry",json.dumps(sensor_data),1