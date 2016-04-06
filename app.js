var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    fs = require('fs'),
    five = require("johnny-five"),
    path = require('path');

var spawn = require('child_process').spawn;
var proc;


app.use('/', express.static(path.join(__dirname, 'stream')));

http.listen(3000, function() {
  console.log('Servidor escuchando en puerto 3000');
});


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/keypress.js', function(req, res) {
  res.sendFile(__dirname + '/keypress.js');
});

var sockets = {};

io.on('connection', function(socket) {

  sockets[socket.id] = socket;
  console.log("Clientes conectados ", Object.keys(sockets).length);


});

board = new five.Board({ port: "/dev/ttyACM0" });

board.on("ready", function() {
  that = this;
  led = new five.Led(13);

  STBY = 5;
  // Right motor
  rMotorN1 = 4;
  rMotorN2 = 3;
  rMotorNA = 2;
  // Left motor
  lMotorN3 = 7;
  lMotorN4 = 6;
  lMotorNB = 8;

  // Set H bridge pins
 this.pinMode(STBY, five.Pin.OUTPUT);
 this.pinMode(rMotorN1, five.Pin.OUTPUT);
 this.pinMode(rMotorN2, five.Pin.OUTPUT);
 this.pinMode(rMotorNA, five.Pin.PWM);
 this.pinMode(lMotorN3, five.Pin.OUTPUT);
 this.pinMode(lMotorN4, five.Pin.OUTPUT);
 this.pinMode(lMotorNB, five.Pin.PWM);



 // SERVO

 var servo = new five.Servo(9);

 // Servo alternate constructor with options
 /*
 var servo = new five.Servo({
   id: "MyServo",     // User defined id
   pin: 10,           // Which pin is it attached to?
   type: "standard",  // Default: "standard". Use "continuous" for continuous rotation servos
   range: [0,180],    // Default: 0-180
   fps: 100,          // Used to calculate rate of movement between positions
   invert: false,     // Invert all specified positions
   startAt: 90,       // Immediately move to a degree
   center: true,      // overrides startAt if true and moves the servo to the center of the range
   specs: {           // Is it running at 5V or 3.3V?
     speed: five.Servo.Continuous.speeds["@5.0V"]
   }
 });
 */

 // Add servo to REPL (optional)
 this.repl.inject({
   servo: servo
 });


 // Servo API

 // min()
 //
 // set the servo to the minimum degrees
 // defaults to 0
 //
 // eg. servo.min();

 // max()
 //
 // set the servo to the maximum degrees
 // defaults to 180
 //
 // eg. servo.max();

 // center()
 //
 // centers the servo to 90°
 //
 // servo.center();

 // to( deg )
 //
 // Moves the servo to position by degrees
 //
 // servo.to( 90 );

 // step( deg )
 //
 // step all servos by deg
 //
 // eg. array.step( -20 );

 servo.sweep();


  io.sockets.on('connection', function (socket) {

    var speed = 100;

    socket.on('vel', function (data) {

      console.log("Nueva velocidad: " + data);

      speed = data;

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
	that.digitalWrite(STBY, 1);
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
        that.digitalWrite(rMotorN1, 1);
        that.digitalWrite(rMotorN2, 0);
        that.analogWrite(rMotorNA, speed);
        // Turn on left motor
        that.digitalWrite(lMotorN3, 1);
        that.digitalWrite(lMotorN4, 0);
        that.analogWrite(lMotorNB, speed);
    });

    socket.on('turnRight', function(){
        console.log("Server: Turning right! ");
        // Turn on right motor
        that.digitalWrite(rMotorN1, 0);
        that.digitalWrite(rMotorN2, 1);
        that.analogWrite(rMotorNA, speed);
        // Turn on left motor
        that.digitalWrite(lMotorN3, 0);
        that.digitalWrite(lMotorN4, 1);
        that.analogWrite(lMotorNB, speed);
    });


  });
});
