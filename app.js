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

app.get('/status.css', function(req, res) {
  res.sendFile(__dirname + '/status.css');
});

var sockets = {};

io.on('connection', function(socket) {

  sockets[socket.id] = socket;
  console.log("Clientes conectados ", Object.keys(sockets).length);

  socket.on('disconnect', function() {
    delete sockets[socket.id];

    // no more sockets, kill the stream
    if (Object.keys(sockets).length === 0) {
      app.set('watchingFile', false);
      if (proc) proc.kill();
      fs.unwatchFile('./stream/image_stream.jpg');
    }
  });

  socket.on('start-stream', function() {
    startStreaming(io);
  });

});

function stopStreaming() {
  if (Object.keys(sockets).length === 0) {
    app.set('watchingFile', false);
    if (proc) proc.kill();
    fs.unwatchFile('./stream/image_stream.jpg');
  }
}

function startStreaming(io) {

  if (app.get('watchingFile')) {
    io.sockets.emit('liveStream', 'image_stream.jpg?_t=' + (Math.random() * 100000));
    return;
  }

  var args = ["-w", "640", "-h", "480", "-o", "./stream/image_stream.jpg", "-t", "999999999", "-tl", "100"];
  proc = spawn('raspistill', args);

  console.log('Watching for changes...');

  app.set('watchingFile', true);

  fs.watchFile('./stream/image_stream.jpg', function(current, previous) {
    io.sockets.emit('liveStream', 'image_stream.jpg?_t=' + (Math.random() * 100000));
});

}


board = new five.Board({ port: "/dev/ttyACM0" });

board.on("ready", function() {


    var temperature = new five.Temperature({
        controller: "LM35",
        pin: "A0"
      });



      temperature.on("data", function() {
        //console.log(this.celsius + "°C", this.fahrenheit + "°F");
        io.sockets.emit('celsius', this.celsius);
        });


    var stepper = new five.Stepper({
      type: five.Stepper.TYPE.FOUR_WIRE,
      stepsPerRev: 200,
      pins: [1, 2, 3, 4]
    });

    stepper.rpm(180).ccw().step(2000, function() {
      console.log("done");
    });


  that = this;
  led = new five.Led(13);


  // Right motor
  rMotorN1 = 42;
  rMotorN2 = 44;
  rMotorNA = 6;
  // Left motor
  lMotorN3 = 46;
  lMotorN4 = 48;
  lMotorNB = 7;

  // Set H bridge pins
 this.pinMode(rMotorN1, five.Pin.OUTPUT);
 this.pinMode(rMotorN2, five.Pin.OUTPUT);
 this.pinMode(rMotorNA, five.Pin.PWM);
 this.pinMode(lMotorN3, five.Pin.OUTPUT);
 this.pinMode(lMotorN4, five.Pin.OUTPUT);
 this.pinMode(lMotorNB, five.Pin.PWM);




  io.sockets.on('connection', function (socket) {


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
        that.analogWrite(rMotorNA, 255);
        // Turn on left motor
        that.digitalWrite(lMotorN3, 0);
        that.digitalWrite(lMotorN4, 1);
        that.analogWrite(lMotorNB, 255);
    });

    socket.on('goBackward', function(){
        console.log("Server: Going backward! ");
        // Turn on right motor
        that.digitalWrite(rMotorN1, 0);
        that.digitalWrite(rMotorN2, 1);
        that.analogWrite(rMotorNA, 255);
        // Turn on left motor
        that.digitalWrite(lMotorN3, 1);
        that.digitalWrite(lMotorN4, 0);
        that.analogWrite(lMotorNB, 255);
    });

    socket.on('turnLeft', function(){
        console.log("Server: Turning left! ");
        // Turn on right motor
        that.digitalWrite(rMotorN1, 1);
        that.digitalWrite(rMotorN2, 0);
        that.analogWrite(rMotorNA, 255);
        // Turn on left motor
        that.digitalWrite(lMotorN3, 1);
        that.digitalWrite(lMotorN4, 0);
        that.analogWrite(lMotorNB, 255);
    });

    socket.on('turnRight', function(){
        console.log("Server: Turning right! ");
        // Turn on right motor
        that.digitalWrite(rMotorN1, 0);
        that.digitalWrite(rMotorN2, 1);
        that.analogWrite(rMotorNA, 255);
        // Turn on left motor
        that.digitalWrite(lMotorN3, 0);
        that.digitalWrite(lMotorN4, 1);
        that.analogWrite(lMotorNB, 255);
    });


  });
});
