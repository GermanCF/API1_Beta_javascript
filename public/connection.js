	var jsonObj = {"Pin":"Led off"};
	var headerItem;

            //Change for the IP of your Raspberry Pi
	var socket = io.connect('http://192.168.137.2:8000'); //Put the IP and port of your Raspberry Pi
	
	function envia(){
	socket.emit('clickon');
	};
	function apaga(){
	socket.emit('clickoff');
	};
	$(document).ready(function(){
    	
  	var header = $('#header');
	var button = $('#onoff');
	var button = $('#off');
	var container = $('#container');
	socket.on('dataled', function (status, data) {
		     var newItem = $('<div>Led active: ' + status + '.'+'<br></div>');
		     container.append(newItem); 
		     jsonObj.Pin = status;
		     jsonObj.Temperatura = data;
		     headerItem = $('<div>'+JSON.stringify(jsonObj)+ '<br></div>');
		     header.append(headerItem);
	document.getElementById('header').innerHTML = '<div>'+JSON.stringify(jsonObj)+ '<br></div>';
	});
	});