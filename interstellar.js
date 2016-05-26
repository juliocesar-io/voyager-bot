var socket = io.connect();
$("#volume").slider({
    min: 0,
    max: 255,
    value: 127,
		range: "min",
		animate: true,
    slide: function(event, ui) {
      speed = ui.value;
      console.log((speed));
      $("#speed").text(speed)
      if (speed = 255) {

      } else {
        socket.emit('vel', speed);
      }

    }
  });
