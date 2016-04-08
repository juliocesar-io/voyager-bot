$("#volume").slider({
    min: 0,
    max: 255,
    value: 100,
		range: "min",
		animate: true,
    slide: function(event, ui) {
      console.log((ui.value));
    }
  });
