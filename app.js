var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    fs = require('fs'),
    five = require("johnny-five"),
    path = require('path'),
    stormpath = require('express-stormpath');

var spawn = require('child_process').spawn;
var proc;


app.use(stormpath.init(app, {
  client: {
    apiKey: {
      id: '6RCIP5CFZJ4SP432VE213RZQX',
      secret: 'AmeXnuxhpeId/29IW29IvJ41iEYMVt06bs81PUxwFQs',
    }
  },
  application: {
    href: 'https://api.stormpath.com/v1/applications/7VG2xNNuikM9hRxuxHXWfH'
  }
}));

app.on('stormpath.ready', function () {
  console.log('Stormpath Ready');
});


app.use('/', express.static(path.join(__dirname, 'stream')));

http.listen(3000, function() {
  console.log('Servidor escuchando en puerto 3000');
});


app.get('/', stormpath.loginRequired, function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

var sockets = {};

io.on('connection', function(socket) {

  sockets[socket.id] = socket;
  console.log("Clientes conectados ", Object.keys(sockets).length);


});

board = new five.Board();

board.on("ready", function() {

  that = this;


  // Right motor
  rMotorN1 = 4;
  rMotorN2 = 3;
  rMotorNA = 2;
  // Left motor
  lMotorN3 = 7;
  lMotorN4 = 6;
  lMotorNB = 8;
  luz = 52;


 this.pinMode(rMotorN1, five.Pin.OUTPUT);
 this.pinMode(rMotorN2, five.Pin.OUTPUT);
 this.pinMode(rMotorNA, five.Pin.PWM);
 this.pinMode(lMotorN3, five.Pin.OUTPUT);
 this.pinMode(lMotorN4, five.Pin.OUTPUT);
 this.pinMode(luz, five.Pin.OUTPUT);
 this.pinMode(lMotorNB, five.Pin.PWM);

 this.digitalWrite(luz, 1);

 //

  var servoBrazo = new five.Servo({
    pin: 9,
    startAt: 90
  });

  var servoPinza = new five.Servo({
     pin: 10,
     startAt: 180
  });

  var servoCam = new five.Servo({
     pin: 5,
     startAt: 90
   });

   var servoDisparador = new five.Servo({
     pin: 12,
     startAt: 70
   });




  io.sockets.on('connection', function (socket) {

    var speed = 100;

    socket.on('vel', function (data) {

      console.log("Nueva velocidad: " + data);

      speed = data;

    });

    socket.on('luzOn-Off', function (luzEstado) {
      if (luzEstado == true) {

        luzEstado = 0


      } else if (luzEstado == false) {

        luzEstado = 1;

      }
        that.digitalWrite(luz, luzEstado);

    });

    socket.on('DisparadorOn-Off', function (disparadorEstado) {

      if (disparadorEstado == true) {

        disparadorEstado = 170


      } else if (disparadorEstado == false) {

        disparadorEstado = 70;

      }
        servoDisparador.to(disparadorEstado);

    });

    socket.on('pinzaA', function () {
      servoPinza.to(180)
    });

    socket.on('pinzaD', function () {
      servoPinza.to(90)
    });

    socket.on('brazoW', function () {
      servoBrazo.to(0)
    });

    socket.on('brazoS', function () {
      servoBrazo.to(90)
    });
    socket.on('brazoX', function () {
      servoBrazo.to(180)
    });

    socket.on('servoCam', function (gradosCam) {
      servoCam.to(gradosCam)
    });





    socket.on('stop', function () {
        console.log("Server: Stop! ");
        // Turn off right motor
        that.digitalWrite(rMotorN1, 0);
        that.digitalWrite(rMotorN2, 0);
        that.analogWrite(rMotorNA, 0);
        // Turn off left motor
        that.digitalWrite(lMotorN3, 0);
        that.digitalWrite(lMotorN4, 0);
        that.analogWrite(lMotorNB, 0);

    });

    socket.on('goForward', function(){

        console.log("Server: Going forward! ");
        // Turn on right motor
        that.digitalWrite(rMotorN1, 1);
        that.digitalWrite(rMotorN2, 0);
        that.analogWrite(rMotorNA, speed);
        // Turn on left motor
        that.digitalWrite(lMotorN3, 0);
        that.digitalWrite(lMotorN4, 1);
        that.analogWrite(lMotorNB, speed);
    });

    socket.on('goBackward', function(){
        console.log("Server: Going backward! ");
        // Turn on right motor
        that.digitalWrite(rMotorN1, 0);
        that.digitalWrite(rMotorN2, 1);
        that.analogWrite(rMotorNA, speed);
        // Turn on left motor
        that.digitalWrite(lMotorN3, 1);
        that.digitalWrite(lMotorN4, 0);
        that.analogWrite(lMotorNB, speed);
    });

    socket.on('turnLeft', function(){
        console.log("Server: Turning left! ");
        // Turn on right motor
        that.digitalWrite(rMotorN1, 0);
        that.digitalWrite(rMotorN2, 1);
        that.analogWrite(rMotorNA, speed);
        // Turn on left motor
        that.digitalWrite(lMotorN3, 0);
        that.digitalWrite(lMotorN4, 1);
        that.analogWrite(lMotorNB, speed);
    });

    socket.on('turnRight', function(){
        console.log("Server: Turning right! ");
        // Turn on right motor
        that.digitalWrite(rMotorN1, 1);
        that.digitalWrite(rMotorN2, 0);
        that.analogWrite(rMotorNA, speed);
        // Turn on left motor
        that.digitalWrite(lMotorN3, 1);
        that.digitalWrite(lMotorN4, 0);
        that.analogWrite(lMotorNB, speed);
    });


  });
});
