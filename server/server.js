/**
* Author: German Carro Fernandez
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

 
//Hearing port 8000
app.listen(8000);
//If everything is Ok when client open the browser que load the website
function handler(req, res) {
    fs.readFile(__dirname+'/../index.html', function(err, data) {
        if (err) {
      //Manage the errors
            console.log(err);
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
    });
}
//We open the Arduino USB port
serialPort.on("open", function () {
console.log('port open');
});

 var date = "Led off";
//When client open the browser we stablishes a new websocket channel conexion using socket.io
//Every 10 seconds we send the new value for the websocket channel 
io.sockets.on('connection', function(socket) {

	setInterval(function(){
	socket.setMaxListeners(0); 
	socket.on('clickon', function (){
	setTimeout(led ,2000);
	function led() {serialPort.write("H")};
	date = "Led on";	
	});
	    
	socket.on('clickoff', function (){
	setTimeout(led ,2000);
	function led() {serialPort.write("L")};
	date = "Led off";
	});

socket.emit('dataled', date);
console.log('Status: ', date);	
 
  }, 10000);
 	 
});