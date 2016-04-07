var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  var servo = new five.Servo({
    pin: 10,
    startAt: 70
  });

  // Angle change takes 500ms to complete
  servo.to(70, 50);

  setTimeout(function() {
    servo.to(170, 50);
  }, 3000);


});
