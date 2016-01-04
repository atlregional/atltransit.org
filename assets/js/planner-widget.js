var geolocationBool = false;
var lat, lon;
var labelMap = {
	'RED': 'label label-danger',
	'BLUE': 'label label-primary',
	'GOLD': 'label label-warning',
	'GREEN': 'label label-success',
	'MARTA': 'label label-orange',
	'CCT': 'label label-magenta',
	'GCT': 'label label-maroon',
	'GRTA': 'label label-cyan',
};

// window.onload = function(){
	// Planner Widget Javascript
	$('#planner-timepicker').timepicker();
	$('#test-carousel, #next-carousel, #schedules-carousel').carousel({
			interval: false
	});
	$('#next-arrivals-agencies').val('');

	// var Locale = {};
	// Locale.autocompleteMessages = {
	//         noResults: "No results found.",
	//         results: function( amount ) {
	//             return amount + ( amount > 1 ? " results are " : " result is" ) + " available, use the up and down arrow keys to navigate them.";
	//         }
	// };
	
	var esriUrl = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/';
	function getEsriGeometry(option, id){
		$.ajax({
			url: esriUrl + 'find?',
			dataType: 'jsonp',
			// delay: 250,
			data: {
			    text: option.text, // search term
			    magicKey: option.id,
			    // outFields: 'City,Region',
			    f: 'pjson',
			    // distance: 20000,
			    // searchExtents: -'85.386,34.618,-83.269,32.844',
			    // location: '-84.383149,33.750855',
			},
			success: function(data){
				console.log(data);
				var geom = data.locations[0].feature.geometry;
				$('.planner-form input[name='+id+'Place]').val(geom.y + ',' + geom.x);
			}
		});
	}
	function formatRepo (repo) {
		if (repo.loading) return repo.text;

		var markup = '<div class="clearfix">' +
		'<div class="col-sm-1">' +
		// '<img src="' + repo.owner.avatar_url + '" style="max-width: 100%" />' +
		'</div>' +
		'<div clas="col-sm-10">' +
		'<div class="clearfix">' +
		'<div class="col-sm-6">' + repo.text + '</div>' +
		// '<div class="col-sm-3"><i class="fa fa-code-fork"></i> ' + repo.forks_count + '</div>' +
		// '<div class="col-sm-2"><i class="fa fa-star"></i> ' + repo.stargazers_count + '</div>' +
		'</div>';

		if (repo.description) {
		markup += '<div>' + repo.description + '</div>';
		}

		markup += '</div></div>';

		return markup;
	}

	function formatRepoSelection (repo) {
		return repo.text;
	}
	var urlParams;
	$(function(){
		$('.dropdown-toggle').dropdown();

		// // load stop ids
		// var url = 'http://atlanta.onebusaway.org/api/api/where/stop-ids-for-agency/MARTA.json?';
		// var params = {};
		// // params.query = stopCode;
		// params.key = 'TEST';
		// url += serialize(params);
		// $.ajax({
		// 	url: url,
		// 	dataType: 'jsonp',
		// 	success: function(json){
		// 		console.log(json.data);
		// 		if (json.data.list.length > 0){
		// 			stopId = json.data.list[0].id;

		// 		}
		// 	}
		// });
	if (typeof setupAutoComplete === 'function'){
		setupAutoComplete();
	}

		urlParams = jQuery.unparam(window.location.hash);
		// console.log(params);{}
		if (typeof urlParams.tab !== 'undefined'){
			$('#' + urlParams.tab + '-link').trigger('click');
			if (typeof urlParams.stopId !== 'undefined'){
				window.setTimeout(function(){
				$('#' + urlParams.tab + '-arrivals-btn')
					.removeClass('disabled')
					.val(urlParams.stopId)
					.trigger('click');
				}, 200);
				
				// $(' .stop-code').trigger('click');
			}
		}
		$(".js-data-example-ajax").change(function(){
			console.log(this.value);
			console.log($(this).select2('data'));
			var data = $(this).select2('data') // $(this).select2('data')[0];
			getEsriGeometry(data, this.id);
		});
		$(".js-data-example-ajax").select2({
			// placeholder: "From",
			allowClear: true,
			ajax: {
				url: esriUrl + 'suggest?',
				dataType: 'jsonp',
				delay: 250,
				data: function (term, page) {
					return {
						text: term, // search term
						// page: params.page,
						// outFields: 'City,Region',
						f: 'json',
						distance: 20000,
						searchExtents: '-85.386,34.618,-83.269,32.844',
						location: '-84.383149,33.750855',
					};
				},
				results: function (data, page) {
					console.log(data);
					// parse the results into the format expected by Select2.
					// since we are using custom formatting functions we do not need to
					// alter the remote JSON data
					var res = data.suggestions;
					var array = []
					$.each(res, function(i, item){
					var arrItem = {
					id: item.magicKey,
					text: item.text
					};
					array.push(arrItem);
					});
					return {
						results: array
					};
				},
				cache: true
			},
			// escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
			minimumInputLength: 3,
			templateResult: function (option) {
				return '<div class="clearfix">' + option.text + '</div>';
			},
			templateSelection: function (option) {
				return option.text;
			}
		});
		var routeTypeMap = {
			'0': 'Tram',
			'1': 'Subway',
			'2': 'Rail',
			'3': 'Bus',
			'4': 'Ferry',
			'5': 'Cable',
			'6': 'Gondola',
			'7': 'Funicular'
		};
		// Geolocation
		if ("geolocation" in navigator) {
			/* geolocation is available */
			console.log('geolocation');
			console.log(navigator);
			
			// Check if geolocation is enabled
			navigator.geolocation.getCurrentPosition(function(position) {
				geolocationBool = true;
				lat = position.coords.latitude;
				lon = position.coords.longitude;
				console.log([position.coords.latitude, position.coords.longitude]);
			}, function (error) {
			  if (error.code == error.PERMISSION_DENIED)
			      console.log("you denied me :-(");
			});
		} else {
			/* geolocation IS NOT available */
		}
		// Check if agency data exists
		var url = 'http://atlanta.onebusaway.org/api/api/where/agencies-with-coverage.json?';
		var params = {};
		// params.id = agencyId;
		params.key = 'TEST';
		url += serialize(params);
		$.ajax({
			url: url,
			dataType: 'jsonp',
			success: function(json){
				console.log(json.data.list);
				var agencies = json.data.list;
				$.each(agencies, function(i, agency) {  
					$('.arrivals-agencies option[value='+agency.agencyId+']').removeAttr('disabled');
				});
			}
		}); // end ajax

		// Go back to previous view on planner widget carousels
		$('.planner-tab-li').click(function(e){
			var widgetClass;
			if ($(this).hasClass('stop-code')){
				widgetClass = 'stop-code';
			}
			else{
				widgetClass = 'next';
			}
			if($(this).hasClass('active') && $('#' + widgetClass + '-carousel-inner > .active').index() === 1){
				// console.log('this is active');
				$('#' + widgetClass + '-back-btn').trigger('click');
			}
		});
		
		// Real-time agency select change
		$('input[type=radio][name=agency-arrivals-option], #next-arrivals-agencies').change(function(){
			$('#next-arrivals-routes').html('<option value="">[Select Route]</option>');
			$('#next-arrivals-trips')
				.html('<option value="">[Select Direction]</option>')
				.prop('disabled', true);
			$('#next-arrivals-stops')
				.html('<option value="">[Select Stop]</option>')
				.trigger('change')
				.prop('disabled', true);
			console.log(this.value);
			if (this.value === 'Nearby'){
				$('#get-location').trigger('click');
				return true;
			}
			var agencyId = this.value;
			location.hash = 'agency=' + agencyId;
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
							var routeFullText = routeTypeMap[type] === 'Subway' ? route.shortName : route.shortName + ' - ' + route.longName;
							var routeText = route.longName === '' ? route.shortName : routeFullText;
							option.val(route.id);
							option.text(routeText);
							optgroup.append(option);
						});
						$('#next-arrivals-routes').append(optgroup);
					});
					$('#next-arrivals-routes').prop('disabled', false);
				}
			}); // end ajax
		});
		// Use location 
		$('#get-location').click(function(){
			$('#next-arrivals-agencies').val('Nearby');
			$('#next-arrivals-routes').html('<option value="">[Select Route]</option>');
			$('#next-arrivals-stops')
				.html('<option value="">[Select Stop]</option>')
				.trigger('change')
				.prop('disabled', true);
			$('#next-arrivals-trips')
				.html('<option value="">[Select Direction]</option>')
				.prop('disabled', true);;
			$(this).val(moment().unix());
			if (geolocationBool && typeof lat !== 'undefined'){
				var url = 'http://atlanta.onebusaway.org/api/api/where/routes-for-location.json?';
				var params = {};
				params.lat = lat;
				params.lon = lon;
				params.radius = 4000;
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
								var routeFullText = routeTypeMap[route.type] === 'Subway' ? route.shortName : route.shortName + ' - ' + route.longName;
								var routeText = route.longName === '' ? route.shortName : routeFullText;
								option.val(route.id);
								option.text(routeText);
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
		$('#next-arrivals-routes').change(function(){
			var widgetClass;
			if ($(this).hasClass('nearby')){
				widgetClass = 'nearby';
			}
			else{
				widgetClass = 'next';
			}
			$('#next-arrivals-stops')
				.html('<option value="">[Select Stop]</option>')
				.trigger('change')
				.prop('disabled', true);
			$('#next-arrivals-trips').html('<option value="">[Select Direction]</option>');
			console.log(this.value);
			var routeId = this.value;
			location.hash += '&route=' + routeId;
			var url = 'http://atlanta.onebusaway.org/api/api/where/stops-for-route/' + routeId + '.json?';
			var params = {};
			params.key = 'TEST';
			params.includePolylines = false;
			url += serialize(params);
			$.ajax({
				url: url,
				dataType: 'jsonp',
				success: function(json){
					var closestDistance = 10000000000;
					var closestStop = '';
					var selectedTrip;
					var stopGroups = json.data.entry.stopGroupings[0].stopGroups;
					console.log(json.data.entry.stopGroupings[0].stopGroups);
					console.log(json.data);
					var stopMap = d3.nest()
						.key(function(d) { return d.id; })
						.map(json.data.references.stops);
					var tripMap = d3.nest()
						// .key(function(d) { return d.name.name; })
						// .key(function(d) { return d.tripHeadsign; })
						.key(function(d) { return d.id; })
						.map(stopGroups);
					console.log(stopMap);
					console.log(tripMap);
					console.log(routeId);
					// console.log(tripMap[routeId]);
					var headsigns = [];
					var tripCounter = 0;
					$.each(stopGroups, function(i, trip){
						// var tripId = trip.tripId;
						// console.log(trip.schedule.stopTimes);
						
						// if (typeof tripMap[routeId][tripId] !== 'undefined' && tripMap[routeId][tripId][0].routeId === routeId && headsigns.indexOf(tripMap[routeId][tripId][0].tripHeadsign) === -1){
							// var headsign = tripMap[routeId][tripId][0].tripHeadsign;
							// headsigns.push(headsign);
							var tripLabel = trip.name.name === '' ? trip.id : trimHeadsign(trip.name.name);
							tripLabel = +tripLabel === 1 ? 'Inbound' : tripLabel;
							tripLabel = +tripLabel === 0 ? 'Outbound' : tripLabel;
							console.log(tripLabel)
							var tripOption = $("<option></option>");
							tripOption.val(trip.id);
							tripOption.text(tripLabel);
							$('#next-arrivals-trips').append(tripOption);
							var optgroup = $('<optgroup>');
							optgroup.attr('id', trip.id);
							optgroup.attr('label',tripLabel);
							if (tripCounter === 0){
								selectedTrip = trip.id;
							}
							else{
								optgroup.addClass('hidden-optgroup');
							}
							
							$.each(trip.stopIds, function(j, stopId){
								var stop = stopMap[stopId][0];
								// console.log(stop)
								var distance = "";
								if (typeof lat !== "undefined" && geolocationBool){
									distance = getDistanceFromLatLonInKm(stop.lat, stop.lon, lat, lon);
								
									if (tripCounter === 0){
										if (distance < closestDistance){
											closestDistance = distance;
											closestStop = stop.id;
										}
									}
								}
								var option = $("<option></option>");
								option.val(stop.id);
								if (geolocationBool && typeof lat != 'undefined'){
									option.attr('distance', distance);
								}
								var stopName = cleanStopName(stop.name);
								var stopDir = stop.direction !== '' ? '(' + stop.direction + ') ' : '';
								option.text(stopDir + stopName);
								optgroup.append(option);
								// $('#' + widgetClass + '-arrivals-stops').append(option);
							});
							
							$('#' + widgetClass + '-arrivals-stops').append(optgroup);
							tripCounter++;
						// } // end if valid trip for route

					}); // end each trip
					var $stops = $('#next-arrivals-stops');
					$('#next-arrivals-trips').prop('disabled', false);
					$('#next-arrivals-trips').val(selectedTrip);
					$stops.prop('disabled', false);
					if (geolocationBool && typeof lat !== 'undefined'){
						$stops.val(closestStop);
					}
					if ($stops.val() !== ''){
						$stops.trigger('change');
					}
					if ($('#next-arrivals-stops').val() !== ''){
						$('#next-arrivals-btn').prop('disabled', false);
					}
					else{
						$('#next-arrivals-btn').prop('disabled', true);
					}
				} // end success
			}); // end ajax
		});
		// $('.arrivals-routes').change(function(){
		// });
		var previousTrip;
		$('#next-arrivals-trips')
			.on('focus', function () {
				// Store the current value on focus and on change
				previousTrip = this.value;
		    }).change(function(){
		    	var closestDistance = 10000000000;
				var closestStop = '';
				console.log(this.value);
				$('#' + previousTrip).addClass('hidden-optgroup');
				$('#' + this.value).removeClass('hidden-optgroup');
				if (geolocationBool){
					$('#' + this.value + ' > option').each(function(){
						var distance = $(this).attr('distance');
						console.log(distance);
						if (distance < closestDistance){
							closestDistance = distance;
							closestStop = this.value;
						}
					});
				}
				console.log(closestStop);
				var $stops = $('#next-arrivals-stops');
				if (closestStop !== ''){
					$stops.val(closestStop);
					if ($stops.val() !== ''){
						$stops.trigger('change');
					}
				}
				
			});
		$('#next-arrivals-stops').change(function(){
			var stopId = this.value;
			console.log(stopId);
			if (stopId !== ''){
				$('#next-arrivals-btn')
					.removeClass('disabled')
					.removeAttr('disabled')
					.val(stopId);
				
				location.hash += '&stop=' + stopId;

				$('.get-schedules').removeClass('disabled');
			}
			else {
				$('#next-arrivals-btn')
					.addClass('disabled')
					.attr('disabled', 'disabled')
					.val('');
				$('.get-schedules').addClass('disabled');
			}
		});
		$('#stop-code').on('keyup', function(e){
			var tableId = '#stop-code-arrivals-table';
			var table = $(tableId);
			
			var stopCode = $('#stop-code').val() === '' ? '103134' : $('#stop-code').val();
			if (this.value.length < 6){
				console.log(this.value);
				$('#stop-code-error-msg').html('Please enter a valid <strong>six-digit</strong> stop ID.');
				$('#stop-code-arrivals-btn')
					.addClass('disabled')
					.val('');
			}
			else if (this.value.length === 6){
				console.log(e);
				console.log(this.value);
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
						if (json.data.list.length > 0){
							stopId = json.data.list[0].id;
							stopName = cleanStopName(json.data.list[0].name);
							// $('.get-next-stop-code').removeClass('btn-danger').addClass('btn-primary');
							$('#stop-code-arrivals-btn')
								.removeClass('disabled')
								.val(stopId);
							$('#stop-code-error-msg').html('Stop: <strong>' + stopName + '</strong>');
						}
						else{
							table.hide();
							$('#nearby-arrival-msg').text('No arrivals.');
							$('#nearby-arrival-msg').show();
							$('#stop-code-error-msg').html('Unknown stop ID.');
							$('#stop-code-arrivals-btn')
								.addClass('disabled')
								.val('');;
							// $('.get-next-stop-code').removeClass('btn-primary').addClass('btn-danger');
						}
					}
				});
			} // end if stop code length === 6
			else {
				$('#stop-code-arrivals-btn')
					.addClass('disabled')
					.val('');
				$('#stop-code-error-msg').html('Please enter a valid <strong>six-digit</strong> stop ID.');
			}
		});
		$('.get-arrivals').click(function(){
			var widgetClass, stopId;
			
			if ($(this).hasClass('stop-code')){
				widgetClass = 'stop-code';
			}
			else{
				widgetClass = 'next';
			}
			var tableId = '#' + widgetClass + '-arrivals-table';
			var table = $(tableId);
			stopId = $('#' + widgetClass + '-arrivals-btn').val();

			console.log(stopId);
			console.log(widgetClass);
			if (stopId !== ''){
				// console.log('stop coding it up');
				var url = 'http://atlanta.onebusaway.org/api/api/where/arrivals-and-departures-for-stop/' + stopId + '.json?';
				var params = {};
				params.key = 'TEST';
				params.minutesBefore = 1;
				url += serialize(params);
				$.ajax({
					url: url,
					dataType: 'jsonp',
					success: function(json){
						var arrivals = json.data.entry.arrivalsAndDepartures;
						console.log(json.data);
						var stopMap = d3.nest()
							.key(function(d) { return d.id; })
							.map(json.data.references.stops);

						console.log(json.data.entry.arrivalsAndDepartures);
						if (arrivals.length > 0){
							stopName = stopMap[json.data.entry.stopId][0].name;
							$('#' + widgetClass + '-stop-id').html(cleanStopName('Stop ID: ' + stopId.split('_')[1]));
							$('#' + widgetClass + '-stop-name').html(cleanStopName(stopName));
							$('#' + widgetClass + '-last-updated .time').html(moment(arrivals[0].lastUpdateTime).format('h:mm a'));
							$('#nearby-arrival-msg').hide();
							table.show();
							table.empty();

							// var header = $('<thead>');
							// header.append('<tr><')
							table.append('<thead><tr><th>Route</th><th>Minutes</th><th>Direction</th></tr></thead>');
							var tbody = $('<tbody>');
							var data = [];
							for (var i = 0; i < arrivals.length; i++) {
								// if (i < 8) {
									var predicted = arrivals[i].predictedArrivalTime ? true : false;
									var seconds = arrivals[i].predictedArrivalTime || arrivals[i].scheduledArrivalTime;
									var diff = seconds - moment().valueOf();
									var routeName = arrivals[i].routeShortName;
									// console.log(diff);
									// var minutes = String(Math.floor(divisor_for_minutes / 60));
									var fromNow = Math.floor(diff/60/1000);//moment(seconds).toNow(true)//.replace('minutes', '').replace('a few seconds', '<strong>NOW</strong>').replace('a minute', '<strong>NOW</strong>');
									var fromNowText = fromNow <= 1 ? '<strong>NOW</strong>' : fromNow;
									var headsign = trimHeadsign(arrivals[i].tripHeadsign);
									var patt = new RegExp("Airport");
									if (patt.test(headsign)){
										headsign += ' <i class="fa fa-plane"></i>';
									}
									// data.push([
									// 	arrivals[i].routeShortName, 
									// 	fromNow, 
									// 	headsign, 
									// 	+seconds
									// ]);
									var row = $('<tr class="info">');
									if (predicted){
										fromNowText += ' <i style="font-size:0.7em;" alt="Predicted arrival time" title="Predicted arrival time" class="fa fa-bolt"></i>';
									}
									row.append('<td><span class="'+labelMap[routeName]+'">' + routeName + '</span></td>');
									row.append('<td data-order="'+fromNow+'">' + fromNowText + '</td>');
									row.append('<td>' + headsign + '</td>');
									tbody.append(row);
								// }
							}
							table.append(tbody);
							console.log(data);
							if ( $.fn.dataTable.isDataTable(tableId) ) {
								arrivalsDatatable = table.DataTable();
								// arrivalsDatatable.clear();
								// arrivalsDatatable.rows.add(data);
								// arrivalsDatatable.draw();
								arrivalsDatatable.destroy();
							}
							// else {
								arrivalsDatatable = table.DataTable( {
									"order": [[ 1, "asc" ]],
									// "columns": [
									// 	{"title": "Route"},
									// 	{"title": "Minutes"},
									// 	{"title": "Direction"},
									// 	{"title": "diff", "type": "num"}
									// ],
									// "columnDefs": [
									// 	// "targets": [ 2 ],
									// 	// "visible": false
									// 	// { "type": "num", "targets": 0 }
									// 	{ "visible": false, "targets": 3 },
									// 	// { "orderData": 1,    "targets": 3 },
									// ],
									// "data": data,
									"paging": false,
									// "pageLength": 6,
									// "ordering": false,
									"info": false,
									"bFilter": false
								});
							// }
						} // end if there are arrivals in the list
						else{
							table.hide();
							$('#' + widgetClass + '-stop-name').html('');
							$('#' + widgetClass + '-last-updated').html('');
							$('#' + widgetClass + '-arrival-msg').text('No arrivals in the next 30 minutes.');
							$('#' + widgetClass + '-arrival-msg').show();
						}
					}
				});
			}
			if (widgetClass === 'next'){
				$('#next-carousel').carousel('next');
			}
		});
		$('.plan-control').change(function(){

		});
		$(".planner-go-btn").click(function(){
			var params = {};
			// var plannerChoice = $('.planner-choice-btn').val();
			var plannerChoice = $(this).text();
			var origin = $('#planner-options-from-latlng').val();
			var destination = $('#planner-options-dest-latlng').val();
			var time = $('#planner-timepicker').val();
			if (origin && destination && time){
				// Continue with trip plan
			}
			else {
				$('#planner-message')
					.fadeIn()
					.html('Please add a valid origin, destination, and time.')
					.delay(2000)
					.fadeOut('slow');
				return;
			}
			if (/Google/.test(plannerChoice)){
				params.saddr = origin;
			    params.daddr = destination;
			    params.dirflg = 'r';
				var googUrl = 'http://maps.google.com/?';
				// window.location.href = googUrl + serialize(params); 
				window.open(googUrl + serialize(params),'_blank');
			}
			else{
				params.fromPlace = origin;
			    params.toPlace = destination;
			    params.arriveBy = $(".planner-time-btn:first-child").val() === 'Arrive by' ? true : false;
			    params.date = moment().format('YYYY-MM-DD');
			    params.time = $(".planner-time-btn:first-child").val() === 'Leave now' ? moment().valueOf() : getTime();
			    params.fromName = $('#planner-options-from').val() // $('#from').select2('data')[0].text;
				// params.toPlace = $('#planner-options-dest-latlng').val();
				params.toName = $('#planner-options-dest').val() // $('#to').select2('data')[0].text;
				params.mode = 'TRANSIT,WALK'; // $('input[name=mode-select]:checked').val()
				var atltransitUrl = '/plan#';
				// console.log(atltransitUrl + serialize(params));
				window.location.href = atltransitUrl + serialize(params);
			}
			// window.location.href='{{ site.baseurl }}/plan' + params;
		});
	    $(".planner-time-menu li a").click(function(){

	      $(".planner-time-btn:first-child").html('<i class="fa fa-clock-o right-5"></i>' + $(this).text() + '<i class="fa fa-caret-down left-5"></i>');
	      $(".planner-time-btn:first-child").val($(this).text());
	      var val = $(".planner-time-btn:first-child").val();
	      if (val === 'Depart at' || val === 'Arrive by'){
	      	$('#planner-options-inputgroup-time').show();
	      }
	      else{
	      	$('#planner-options-inputgroup-time').hide();
	      }
	   });

	   $(".planner-choice-menu li a").click(function(){
	      $(".planner-choice-btn:first-child").html($(this).text());
	      $(".planner-choice-btn:first-child").val($(this).text());
	   });
	 //   $('.box').click(function() {

		//     $(this).animate({
		//         left: '-50%'
		//     }, 500, function() {
		//         $(this).css('left', '150%');
		//         $(this).appendTo('#box-container');
		//     });

		//     $(this).next().animate({
		//         left: '50%'
		//     }, 500);
		// });
		$('#trig').on('click', function () {
		    $('#col1').toggleClass('col-md-12 col-md-3');
		    $('#col2').toggleClass('col-md-0 col-md-9');
		});
	});
// }