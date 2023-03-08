
var mqtt = require('mqtt');
   
var USER = 'samuelcm'; 
var PASS = 'faduk123';                     

var url  = 'mqtts://'+USER+':'+PASS+'@55af84b5016d459fa2d3c7ab09bf607d.s2.eu.hivemq.cloud';
var opts = { keepalive: 299 };             

var client = mqtt.connect(url, opts);     
client.on('connect', function() {
	 console.log('MQTT Conectado com Sucesso');
		 client.subscribe("encyclopedia/#", qos=1)
		 for(var i = 1; i < 5; i++){
			Publica(i);
		 }
});

function APublicar(client, msg) {
	console.log('Publicando: ', msg);

	client.publish('encyclopedia/temperature', JSON.stringify(msg));  
}

function Publica(atual) {
	console.log('Publicação ', atual);
	APublicar(client,{ data: 'hot', at: Date.now() });
	APublicar(client, { data: 'cold', at: Date.now() * - 1});  
}
