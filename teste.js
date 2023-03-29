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

let temperatura = 20;
let umidade = 60;
let vento = 10;
let sensacaoTermica = 20;


function calcTemp(tempAtual){
	const maismenos = Math.random() < 0.5 ? -1 : 1
	if(tempAtual === 18) return (tempAtual + (0.5))
	if(tempAtual === 30) return (tempAtual + (-0.5))
	return (tempAtual + (maismenos * 0.5))
}

function calcHum(humAtual){
	const maismenos = Math.random() < 0.5 ? -1 : 1
	if(humAtual === 40) return (humAtual + 0.5)
	if(humAtual === 80) return (humAtual + (-0.5))
	return (humAtual + (maismenos * 0.5))
}

function calcVent(ventoAtual){
	const maismenos = Math.random() < 0.5 ? -1 : 1
	if(ventoAtual === 0) return (ventoAtual + 1)
	if(ventoAtual === 30) return (ventoAtual + (-1))
	return (ventoAtual + maismenos)
}

function calcSensT(tempAtual){
	const maismenos = Math.random() < 0.5 ? -1 : 1
	const variavel = (Math.random() * 3).toFixed(2)
	return (tempAtual + (variavel * maismenos))
}



function gerarDadosRioDeJaneiro() {	
	// const sensacaoTermica = Math.floor(Math.random() * 7 + 30); // sensação térmica entre 30 e 34 graus Celsius
	temperatura = calcTemp(temperatura);
	umidade = calcHum(umidade);
	vento = calcVent(vento)
	sensacaoTermica = calcSensT(temperatura);
	return [temperatura, umidade, vento, sensacaoTermica];
}

client.on('connect', () => {
	setInterval(() => {
		
		let [temperatura1, umidade1, vento1, sensacaoTermica] = gerarDadosRioDeJaneiro(); 

		client.publish('v1/devices/me/telemetry', JSON.stringify({temperature: temperatura1, humidity: umidade1, wind: vento1, termic: sensacaoTermica}),(err) => {
			console.log(err)
		})
		console.log('publish', {temperature: temperatura1, humidity: umidade1, wind: vento1, termic: sensacaoTermica})
	}, 1500);

	// setInterval(() => {
	// 	const [temperatura1, umidade1, vento1, sensacaoTermica1] = gerarDadosRioDeJaneiro(); 
	// 	temperatura = temperatura1;
	// 	umidade = umidade1;
	// 	vento = vento1;
	// 	sensacaoTermica = sensacaoTermica1
	// }, 1000)
})

// "v1/devices/me/telemetry",json.dumps(sensor_data),1