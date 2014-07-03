/**
* Autor: German Carro Fernandez
* DIEEC, UNED
*/

var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
    fs = require('fs'),
  sys = require('util');

var serialPort = require("serialport").SerialPort
var serialPort = new serialPort('/dev/ttyACM0',
	{ baudrate: 9600,
	dataBits: 8,
	parity: 'none',
	stopBits: 1,
	flowControl: false,
});
 
//Escuchamos en el puerto 8020
app.listen(8020);
//Si todo va bien al abrir el navegador, cargaremos el archivo index_gpio.html
function handler(req, res) {
    fs.readFile(__dirname+'/../index.html', function(err, data) {
        if (err) {
      //Si hay error, mandaremos un mensaje de error 500
            console.log(err);
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
    });
}

serialPort.on("open", function () {
console.log('port open');
});

var date = "Service waiting...";
var value = "0";
//Cuando abramos el navegador estableceremos una conexión con socket.io.
//Cada 10 segundos mandaremos a la web un nuevo valor. 
io.sockets.on('connection', function(socket) {
	
 	setInterval(function(){
	socket.setMaxListeners(0);
	socket.on('clickon', function (value){
	setTimeout(led ,100);
	function led() {serialPort.write(“^”+value+”$”)};
	date = "Service position";
	console.log('Status service: ', value);
	});
});

socket.emit('dataled', date);
console.log('Status: ', date);
  }, 10000);	 
});