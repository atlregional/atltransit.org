
// Planner Widget Javascript
$('#planner-timepicker').timepicker();
$(function(){
	var geolocationBool = false;
	var lat, lon;
	// Geolocation
	if ("geolocation" in navigator) {
		/* geolocation is available */
		console.log('geolocation');
		geolocationBool = true;
		navigator.geolocation.getCurrentPosition(function(position) {
			lat = position.coords.latitude;
			lon = position.coords.longitude;
			console.log([position.coords.latitude, position.coords.longitude]);
		});
	} else {
		/* geolocation IS NOT available */
	}
	// Agency select change
	$('input[type=radio][name=agency-arrivals-option], #next-arrivals-agencies').change(function(){
		$('#stop-code').val('');
		$('#next-arrivals-routes').html('<option value="">[Select Route]</option>');
		$('#next-arrivals-stops').html('<option value="">[Select Stop]</option>');
		console.log(this.value);
		if (this.value === 'Nearby'){
			$('#get-location').trigger('click');
			return true;
		}
		var agencyId = this.value;
		var url = 'http://atlanta.onebusaway.org/api/api/where/routes-for-agency/' + agencyId + '.json?';
		var params = {};
		// params.id = agencyId;
		params.key = 'TEST';
		url += serialize(params);
		$.ajax({
			url: url,
			dataType: 'jsonp',
			success: function(json){
				console.log(json.data);
				var routeTypeMap = {
					'0': 'Tram',
					'1': 'Subway',
					'2': 'Rail',
					'3': 'Bus',
					'4': 'Ferry',
					'5': 'Cable',
					'6': 'Gondola',
					'7': 'Funicular'
				}
				var routeNest = d3.nest()
						.key(function(d) { return d.type; })
						.sortValues(compareRouteNames)
						.map(json.data.list);
				console.log(routeNest);
				var routes = json.data.list;
				$.each(routeNest, function(type, routes) {  
					var optgroup = $('<optgroup>');
					optgroup.attr('label',routeTypeMap[type]);
					$.each(routes, function(i, route){
						var option = $("<option></option>");
						option.val(route.id);
						option.text(route.shortName + ' - ' + route.longName);
						optgroup.append(option);
					});
					$('#next-arrivals-routes').append(optgroup);
				});
				$('#next-arrivals-routes').prop('disabled', false);
			}
		});
	});
	// Use location 
	$('#get-location').click(function(){
		$('#next-arrivals-agencies').val('Nearby');
		$('#next-arrivals-routes').html('<option value="">[Select Route]</option>');
		$('#next-arrivals-stops').html('<option value="">[Select Stop]</option>');
		$(this).val(moment().unix());
		if (geolocationBool && typeof lat !== 'undefined'){
			var url = 'http://atlanta.onebusaway.org/api/api/where/routes-for-location.json?';
			var params = {};
			params.lat = lat;
			params.lon = lon;
			params.radius = 2000;
			params.key = 'TEST';
			url += serialize(params);
			$.ajax({
				url: url,
				dataType: 'jsonp',
				success: function(json){
					console.log(json.data);
					var routeNest = d3.nest()
						.key(function(d) { return d.agencyId; })
						.map(json.data.list);
					console.log(routeNest);
					var agencyCount = 0;
					var firstValue;
					$.each(routeNest, function(agency, routes) {  
						var optgroup = $('<optgroup>');
						optgroup.attr('label',agency);
						$.each(routes, function(i, route){
							var option = $("<option></option>");
							if (agencyCount === 0 || i === 0){
								firstValue = route.id;
							}
							option.val(route.id);
							option.text(route.shortName + ' - ' + route.longName);
							optgroup.append(option);
						});
					    $('#next-arrivals-routes').append(optgroup);
					    agencyCount++;
					});
					// $('#next-arrivals-routes').val(firstValue);
					$('#next-arrivals-routes').prop('disabled', false);
				}
			});
		}
		else{
			console.log('no geolocation available');
		}
	});
	// Select route change
	$('.arrivals-routes').change(function(){
		var widgetClass;
		// $('#stop-code').val('');
		if ($(this).hasClass('nearby')){
			widgetClass = 'nearby';
		}
		else{
			widgetClass = 'next';
		}
		$('#' + widgetClass + '-arrivals-stops').html('<option value="">[Select Stop]</option>');
		console.log(this.value);
		var routeId = this.value;
		var url = 'http://atlanta.onebusaway.org/api/api/where/stops-for-route/' + routeId + '.json?';
		var params = {};
		params.key = 'TEST';
		url += serialize(params);
		$.ajax({
			url: url,
			dataType: 'jsonp',
			success: function(json){
				var closestDistance = 10000000000;
				var closestStop = '';
				console.log(json.data.references.stops);
				$.each(json.data.references.stops, function(i, stop){
					var distance = getDistanceFromLatLonInKm(stop.lat, stop.lon, lat, lon);
					if (distance < closestDistance){
						closestDistance = distance;
						closestStop = stop.id;
					}
					var option = $("<option></option>");
					option.val(stop.id);
					var name = stop.name.replace(/(@)(?!\s)/g, ' @ ')
					var name = name.replace(/(\/)(?!\s)/g, ' / ')
					option.text(toTitleCase(name));
					$('#' + widgetClass + '-arrivals-stops').append(option);
				});
				$('#' + widgetClass + '-arrivals-stops').prop('disabled', false);
				$('#' + widgetClass + '-arrivals-stops').val(closestStop);

			}
		});
	});
	$('.arrivals-routes').change(function(){
		$('#stop-code').val('');
	});
	$('.get-next-stop-code').click(function(){
		var widgetClass, stopId;
		// $('#stop-code').val('');
		if ($(this).hasClass('nearby')){
			widgetClass = 'nearby';
		}
		else{
			widgetClass = 'next';
		}
		var stopCode = $('#stop-code').val();
		console.log(stopCode);
		console.log(widgetClass);
		if (widgetClass === 'nearby' && stopCode !== ''){
			// $('#next-arrivals-agencies')
			// 	.val('');
			// $('#next-arrivals-routes')
			// 	.attr('disabled', true)
			// 	.html('<option value="">[Select Route]</option>');
			// $('#next-arrivals-stops')
			// 	.attr('disabled', true)
			// 	.html('<option value="">[Select Stop]</option>');
			var url = 'http://atlanta.onebusaway.org/api/api/where/stops-for-location.json?';
			var params = {};
			params.query = stopCode;
			params.key = 'TEST';
			url += serialize(params);
			$.ajax({
				url: url,
				dataType: 'jsonp',
				success: function(json){
					console.log(json.data);
					var refs = json.data.references;
					if (json.data.list.length > 0){
						stopId = json.data.list[0].id;
						// $.each(refs.routes, function(i, route){

						// });
						// $('#next-arrivals-agencies').val(refs.agencies[0].id);
						// $('#next-arrivals-routes').append('<option></option>').val(refs.routes[0].id);
						// $('#next-arrivals-routes').val(refs.routes[0].id);
						console.log('stop coding it up');
						var url = 'http://atlanta.onebusaway.org/api/api/where/arrivals-and-departures-for-stop/' + stopId + '.json?';
						var params = {};
						params.key = 'TEST';
						url += serialize(params);
						$.ajax({
							url: url,
							dataType: 'jsonp',
							success: function(json){
								var arrivals = json.data.entry.arrivalsAndDepartures;
								// console.log(json.data.entry.arrivalsAndDepartures[0].predictedArrivalTime);
								if (arrivals.length > 0){
									var seconds = arrivals[0].predictedArrivalTime || arrivals[0].scheduledArrivalTime;
									var diff = seconds - moment().unix();
									var fromNow = moment(seconds).fromNow(true).replace('minutes', 'min');
									$('#nearby-arrival-msg').text(fromNow);
									$('#nearby-arrival-msg').show();
								}
								else{
									$('#nearby-arrival-msg').text('No arrivals.');
									$('#nearby-arrival-msg').show();
								}
								
							}
						});
					}
					else{
						// console.log('Invalid stop ID.')
						$('#nearby-arrival-msg').text('Invalid stop ID.');
						$('#nearby-arrival-msg').show();
					}
					return true;
				}
			});
			
		}
	});
	// Find next arrival (next and nearby)
	$(".get-next-arrival").click(function(){
		console.log($(this));
		var stopId, routeId;
		$("#next-arrival-msg").show();
		var widgetClass;
		if ($(this).hasClass('nearby')){
			widgetClass = 'nearby';
		}
		else{
			widgetClass = 'next';
		}
		stopId = $('#' + widgetClass + '-arrivals-stops').val();
		routeId = $('#' + widgetClass + '-arrivals-routes').val();
		agencyId = $('#next-arrivals-agencies').val();
		console.log(stopId);
		if (stopId === ''){
			$('#' + widgetClass + '-arrival-msg').text('Select route / stop.');
			$('#' + widgetClass + '-arrival-msg')
				.show()
				// .delay(1000)
				// .fadeOut();
			return true;
		}
		if (agencyId === '' && widgetClass === 'next' && stopId === ''){
			$('#' + widgetClass + '-arrival-msg').text('Select agency.');
			$('#' + widgetClass + '-arrival-msg')
				.show()
				// .delay(1000)
				// .fadeOut();
			return true;
		}
		var url = 'http://atlanta.onebusaway.org/api/api/where/arrivals-and-departures-for-stop/' + stopId + '.json?';
		var params = {};
		params.key = 'TEST';
		url += serialize(params);
		$.ajax({
			url: url,
			dataType: 'jsonp',
			success: function(json){
				var arrivals = json.data.entry.arrivalsAndDepartures;
				console.log(json.data.entry.arrivalsAndDepartures[0]);
				if (arrivals.length > 0){
					var seconds = arrivals[0].predictedArrivalTime || arrivals[0].scheduledArrivalTime;
					var diff = seconds - moment().unix();
					var fromNow = moment(seconds).fromNow(true).replace('minutes', 'min');
					$('#' + widgetClass + '-arrival-msg').text(fromNow);
					$('#' + widgetClass + '-arrival-msg').show();
				}
				else{
					$('#' + widgetClass + '-arrival-msg').text('No arrivals.');
					$('#' + widgetClass + '-arrival-msg').show();
				}
			}
		});
	});
	$("#planner-go-btn").click(function(){
		var params = {};
		var plannerChoice = $('.planner-choice-btn').val();
		var origin = $('.planner-form input[name=fromPlace]').val();
		var destination = $('.planner-form input[name=toPlace]').val();
		var time = $('#planner-timepicker').val();
		console.log(origin);
		if (plannerChoice === 'Google Transit'){
			params.saddr = origin;
		    params.daddr = destination;
		    params.dirflg = 'r';
			var googUrl = 'http://maps.google.com/?';
			window.location.href = googUrl + serialize(params);
		}
		else{

		}
		// window.location.href='{{ site.baseurl }}/plan' + params;
	});
    $(".planner-time-menu li a").click(function(){

      $(".planner-time-btn:first-child").html('<span class="glyphicon glyphicon-time" aria-hidden="true"></span> ' + $(this).text() + ' <i class="fa fa-caret-down"></i>');
      $(".planner-time-btn:first-child").val($(this).text());
      var val = $(".planner-time-btn:first-child").val();
      if (val === 'Depart at' || val === 'Arrive by'){
      	$('#planner-time-input').show();
      }
      else{
      	$('#planner-time-input').hide();
      }
   });

   $(".planner-choice-menu li a").click(function(){
      $(".planner-choice-btn:first-child").html($(this).text() + ' <i class="fa fa-caret-down"></i>');
      $(".planner-choice-btn:first-child").val($(this).text());
   });

});