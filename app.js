var app = require('http').createServer(handler),
     io = require('socket.io').listen(app),
     fs = require('fs'),
     five = require("johnny-five");

// Start server
app.listen(8000, function () {
    console.log('Http server listening on port %d', 8000);
});

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

board = new five.Board();

board.on("ready", function() {
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
