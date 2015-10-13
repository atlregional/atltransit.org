$(document).ready(function(){
	map = L.mapbox.map('map', 'mapbox.streets', {zoomControl: false} )
		.setView([33.750855, -84.383149], 9);
	new L.Control.Zoom({ position: 'bottomright' }).addTo(map);
	map.on('click', mapClick);
	initializeForms();
	if(window.location.hash) {
		restoreFromHash(window.location.hash);
	}
	$("input[type='radio'][name='mode-select']").change(function(){
		console.log(this.value);
		if (this.value !== 'specialized'){
			$(".popover-dismiss").popover("hide");
		}
	});

  var win = $(this); //this = window
  if (win.width() >= 750) { $('.planner-options-form').removeClass('form-inline'); }
  else { $('.planner-options-form').addClass('form-inline'); }
});
$(window).on('resize', function(){
      var win = $(this); //this = window
      if (win.width() >= 750) { $('.planner-options-form').removeClass('form-inline'); }
      else { $('.planner-options-form').addClass('form-inline'); }
});




