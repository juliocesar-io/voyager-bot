var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  // Create a new `ping` hardware instance.
  var ping = new five.Ping(7);


  ping.on("change", function(err, value) {
    console.log("Distancia: " + this.cm + "cm");
  });
});
