var serialPort = require("serialport").SerialPort
var serialPort = new serialPort('/dev/ttyACM0',
	{ baudrate: 9600,
	dataBits: 8,
	parity: 'none',
	stopBits: 1,
	flowControl: false,
});
//We open the Arduino USB port
serialPort.on("open", function () {
console.log('port open');
});