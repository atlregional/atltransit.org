var whitelabel_prefix = 'http://opentrip.atlantaregion.com/otp-rest-servlet/';

var whitelabel_minDate = new Date(2014, 02, 08);
var whitelabel_maxDate = new Date(2020, 03, 30);

var Locale = {};

Locale.dateFormat = 'mm-dd-yy';
Locale.timeFormat = 'h:mma';
Locale.dateAriaLabel = 'Date, use Ctrl en arrow keys to navigate, enter to choose';
Locale.loading = "Loading...";
Locale.edit = "Change trip";
Locale.plan = "Plan trip";
Locale.geocoderInput = "Enter starting address, or click on the map...";
Locale.originInput = "Enter starting address, or click on the map...";
Locale.destinationInput = "Enter destination...";
Locale.startpointEmpty = "No starting point entered";
Locale.noStartpointSelected = "No starting point selected";
Locale.destinationEmpty = "No destination entered";
Locale.noDestinationSelected = "No destination selected";
Locale.noValidDate = "Enter a valid date";
Locale.noValidTime = "Enter a valid time";
Locale.dateTooEarly = function ( minDate8601 ) { return "This trip planner works for travel dates starting "+minDate8601.split('-').reverse().join('-'); };
Locale.dateTooLate = function ( maxDate8601 ) { return "This trip planner works for travel dates till "+maxDate8601.split('-').reverse().join('-'); };
Locale.from = "From";
Locale.via = "Via";
Locale.to = "To";
Locale.date = "Date";
Locale.time = "Time";
Locale.months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
Locale.days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
Locale.daysMin = ['Su','Mo','Tu','We','Th','Fr','Sa'];
Locale.earlier = 'Earlier';
Locale.later = 'Later';
Locale.noAdviceFound = 'No valid trips found';
Locale.walk = 'Walk';
Locale.platformrail = 'Platform';
Locale.platform = 'Platform';
Locale.amountTransfers = function ( transfers ) { if (transfers === 0) { return 'Direct'; } else { return transfers+ ' transfers';} };
Locale.autocompleteMessages = {
        noResults: "No results found.",
        results: function( amount ) {
            return amount + ( amount > 1 ? " results are " : " result is" ) + " available, use the up and down arrow keys to navigate them.";
        }
};
$('.nav-search').submit(function(e){
	e.preventDefault();
	console.log(this.value);
});

// Planner Widget Javascript
$('#planner-timepicker').timepicker();
$('#test-carousel, #next-carousel, #schedules-carousel').carousel({
		interval: false
});
$('#next-arrivals-agencies').val('');
var geolocationBool = false;
var lat, lon;
// var Locale = {};
// Locale.autocompleteMessages = {
//         noResults: "No results found.",
//         results: function( amount ) {
//             return amount + ( amount > 1 ? " results are " : " result is" ) + " available, use the up and down arrow keys to navigate them.";
//         }
// };
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
		geolocationBool = true;
		navigator.geolocation.getCurrentPosition(function(position) {
			lat = position.coords.latitude;
			lon = position.coords.longitude;
			console.log([position.coords.latitude, position.coords.longitude]);
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
				console.log(tripMap[routeId]);
				var headsigns = [];
				var tripCounter = 0;
				$.each(stopGroups, function(i, trip){
					// var tripId = trip.tripId;
					// console.log(trip.schedule.stopTimes);
					
					// if (typeof tripMap[routeId][tripId] !== 'undefined' && tripMap[routeId][tripId][0].routeId === routeId && headsigns.indexOf(tripMap[routeId][tripId][0].tripHeadsign) === -1){
						// var headsign = tripMap[routeId][tripId][0].tripHeadsign;
						// headsigns.push(headsign);
						var tripLabel = trip.name.name === '' ? trip.id : trimHeadsign(trip.name.name);
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
							var distance = getDistanceFromLatLonInKm(stop.lat, stop.lon, lat, lon);
							if (tripCounter === 0){
								if (distance < closestDistance){
									closestDistance = distance;
									closestStop = stop.id;
								}
							}
							var option = $("<option></option>");
							option.val(stop.id);
							option.attr('distance', distance);
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
				$stops.val(closestStop);
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
			$('#' + this.value + ' > option').each(function(){
				var distance = $(this).attr('distance');
				console.log(distance);
				if (distance < closestDistance){
					closestDistance = distance;
					closestStop = this.value;
				}
			});
			console.log(closestStop);
			var $stops = $('#next-arrivals-stops');
			$stops.val(closestStop);
			if ($stops.val() !== ''){
				$stops.trigger('change');
			}
		});
	$('#next-arrivals-stops').change(function(){
		if (this.value !== ''){
			$('#next-arrivals-btn')
				.removeClass('disabled')
				.val(this.value);
			$('.get-schedules').removeClass('disabled');
		}
		else {
			$('#next-arrivals-btn')
				.addClass('disabled')
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
						$('#' + widgetClass + '-stop-code').html(cleanStopName('Stop ID: ' + stopId.split('_')[1]));
						$('#' + widgetClass + '-stop-name').html(cleanStopName(stopName));
						$('#' + widgetClass + '-last-updated').html('<a class="get-arrivals next btn"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span> ' + moment(arrivals[0].lastUpdateTime).format('h:mm a') + '</a>');
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
	});
	$("#planner-go-btn").click(function(){
		var params = {};
		var plannerChoice = $('.planner-choice-btn').val();
		var origin = $('#planner-options-from-latlng').val();
		var destination = $('#planner-options-dest-latlng').val();
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
			params.fromPlace = origin;
		    params.toPlace = destination;
		    params.arriveBy = $(".planner-time-btn:first-child").val() === 'Arrive by' ? true : false;
		    params.date = moment().format('YYYY-MM-DD');
		    params.time = moment().valueOf();
		    params.fromName = $('#planner-options-from').val() // $('#from').select2('data')[0].text;
			// params.toPlace = $('#planner-options-dest-latlng').val();
			params.toName = $('#planner-options-dest').val() // $('#to').select2('data')[0].text;
			params.mode = 'TRANSIT,WALK'; // $('input[name=mode-select]:checked').val()
			var atltransitUrl = 'plan#';
			// console.log(atltransitUrl + serialize(params));
			window.location.href = atltransitUrl + serialize(params);
		}
		// window.location.href='{{ site.baseurl }}/plan' + params;
	});
    $(".planner-time-menu li a").click(function(){

      $(".planner-time-btn:first-child").html('<i class="fa fa-clock-o"></i> ' + $(this).text());
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
var currentTime = moment();
setupDatetime();

// Schedules agency select change
	$('input[type=radio][name=agency-arrivals-option], #schedules-agencies').change(function(){
		$('#schedules-routes').html('<option value="">[Select Route]</option>');
		$('#schedules-trips')
			.html('<option value="">[Select Direction]</option>')
			.prop('disabled', true);
		$('#schedules-stops')
			.html('<option value="">[Select Stop]</option>')
			.trigger('change')
			.prop('disabled', true);
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
					$('#schedules-routes').append(optgroup);
				});
				$('#schedules-routes').prop('disabled', false);
			}
		}); // end ajax
	});
	// Use location 
	$('#get-location').click(function(){
		$('#schedules-agencies').val('Nearby');
		$('#schedules-routes').html('<option value="">[Select Route]</option>');
		$('#schedules-stops')
			.html('<option value="">[Select Stop]</option>')
			.trigger('change')
			.prop('disabled', true);
		$('#schedules-trips')
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
					    $('#schedules-routes').append(optgroup);
					    agencyCount++;
					});
					// $('#schedules-routes').val(firstValue);
					$('#schedules-routes').prop('disabled', false);
				}
			});
		}
		else{
			console.log('no geolocation available');
		}
	});
	// Select route change
	$('#schedules-routes').change(function(){
		var widgetClass;
		if ($(this).hasClass('nearby')){
			widgetClass = 'nearby';
		}
		else{
			widgetClass = 'next';
		}
		widgetClass = 'schedules';
		$('#schedules-stops')
			.html('<option value="">[Select Stop]</option>')
			.trigger('change')
			.prop('disabled', true);
		$('#schedules-trips').html('<option value="">[Select Direction]</option>');
		console.log(this.value);
		var routeId = this.value;
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
				console.log(tripMap[routeId]);
				var headsigns = [];
				var tripCounter = 0;
				$.each(stopGroups, function(i, trip){
					// var tripId = trip.tripId;
					// console.log(trip);
					
					// if (typeof tripMap[routeId][tripId] !== 'undefined' && tripMap[routeId][tripId][0].routeId === routeId && headsigns.indexOf(tripMap[routeId][tripId][0].tripHeadsign) === -1){
						// var headsign = tripMap[routeId][tripId][0].tripHeadsign;
						// headsigns.push(headsign);
						var tripLabel = trip.name.name === '' ? trip.id : trimHeadsign(trip.name.name);
						var tripOption = $("<option></option>");
						tripOption.val(trip.id);
						tripOption.text(tripLabel);
						$('#schedules-trips').append(tripOption);
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
							console.log(stop)
							var distance = getDistanceFromLatLonInKm(stop.lat, stop.lon, lat, lon);
							if (tripCounter === 0){
								if (distance < closestDistance){
									closestDistance = distance;
									closestStop = stop.id;
								}
							}
							var option = $("<option></option>");
							option.val(stop.id);
							option.attr('distance', distance);
							var stopName = cleanStopName(stop.name);
							var stopDir = stop.direction !== '' ? '(' + stop.direction + ') ' : '';
							option.text(stopDir + stopName);
							optgroup.append(option);
							// $('#' + widgetClass + '-arrivals-stops').append(option);
						});
						
						$('#schedules-stops').append(optgroup);
						tripCounter++;
					// } // end if valid trip for route

				}); // end each trip
				var $stops = $('#schedules-stops');
				$('#schedules-trips').prop('disabled', false);
				$('#schedules-trips').val(selectedTrip);
				$stops.prop('disabled', false);
				$stops.val(closestStop);
				if ($stops.val() !== ''){
					$stops.trigger('change');
				}
				if ($('#schedules-stops').val() !== ''){
					$('#schedules-btn').prop('disabled', false);
				}
				else{
					$('#schedules-btn').prop('disabled', true);
				}
			} // end success
		}); // end ajax
	});
	var previousTrip;
	$('#schedules-trips')
		.on('focus', function () {
			// Store the current value on focus and on change
			previousTrip = this.value;
	    }).change(function(){
	    	var closestDistance = 10000000000;
			var closestStop = '';
			console.log(this.value);
			$('#' + previousTrip).addClass('hidden-optgroup');
			$('#' + this.value).removeClass('hidden-optgroup');
			$('#' + this.value + ' > option').each(function(){
				var distance = $(this).attr('distance');
				console.log(distance);
				if (distance < closestDistance){
					closestDistance = distance;
					closestStop = this.value;
				}
			});
			console.log(closestStop);
			var $stops = $('#schedules-stops');
			$stops.val(closestStop);
			if ($stops.val() !== ''){
				$stops.trigger('change');
			}
		});
	$('#schedules-stops').change(function(){
		if (this.value !== ''){
			$('#schedules-btn')
				.removeClass('disabled')
				.val(this.value);
			$('.get-realtime').removeClass('disabled');
		}
		else {
			$('#schedules-btn')
				.addClass('disabled')
				.val('');
			$('.get-realtime').addClass('disabled');
		}
	});
	$('.get-schedules').click(function(){
		var widgetClass, stopId;
		
		if ($(this).hasClass('stop-code')){
			widgetClass = 'stop-code';
		}
		else{
			widgetClass = 'next';
		}
		widgetClass = 'schedules';
		stopId = $('#' + widgetClass + '-btn').val();
		var routeId = $('#' + widgetClass + '-routes').val();
		console.log(stopId);
		console.log(routeId);
		console.log(widgetClass);
		if (stopId !== ''){
			// console.log('stop coding it up');
			var url = 'http://atlanta.onebusaway.org/api/api/where/schedule-for-stop/' + stopId + '.json?';
			var params = {};
			params.key = 'TEST';
			params.minutesBefore = 1;
			url += serialize(params);
			$.ajax({
				url: url,
				dataType: 'jsonp',
				success: function(json){
					var routes = json.data.entry.stopRouteSchedules;
					console.log(json.data);
					var stopMap = d3.nest()
						.key(function(d) { return d.id; })
						.map(json.data.references.stops);
					var routeMap = d3.nest()
						.key(function(d) { return d.id; })
						.map(json.data.references.routes);
					console.log(routeMap);
					console.log(json.data.entry.stopRouteSchedules);
					if (routes.length > 0){
						stopName = stopMap[json.data.entry.stopId][0].name;
						$('#' + widgetClass + '-stop-code').html(cleanStopName('Stop ID: ' + stopId.split('_')[1]));
						$('#' + widgetClass + '-stop-name').html(cleanStopName(stopName));
						// $('#' + widgetClass + '-last-updated').html('<a class="get-arrivals next btn"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span> ' + moment(arrivals[0].lastUpdateTime).format('h:mm a') + '</a>');
						$('#nearby-arrival-msg').hide();
						var data = [];
						var schedulesDiv = $('.schedules-tables');
						schedulesDiv.empty();
						for (var i = 0; i < routes.length; i++) {
							console.log(routes[i]);
							var routeName = routeMap[routes[i].routeId][0].shortName;
							var directions = routes[i].stopRouteDirectionSchedules;
							for (var j = 0; j < directions.length; j++) {
								// var tableId = '#' + widgetClass + '-table';
								var columnDiv = $('<div class="schedule-table table-responsive col-xs-12 col-md-3"></div>')
								var table = $('<table class="table table-striped table-condensed table-hover col-md-3" id="schedule-'+routeId+j+'"></table>');

								table.append('<thead><tr><th class="text-right">Hour</th><th>Minute</th></tr></thead>');
								var tbody = $('<tbody>');
								var headsign = trimHeadsign(directions[j].tripHeadsign);
								if (directions[j].scheduleFrequencies.length > 0){
									console.log('freq based');
								}
								else{
									console.log('sched based');
									console.log(directions[j].scheduleStopTimes);
									var stopTimes = directions[j].scheduleStopTimes;
									var firstTime = moment(stopTimes[0].arrivalTime);
									var currentHour = 0;
									var row;
									var minuteCell;
									var morning = true;
									for (var k = 0; k < stopTimes.length; k++) {
										var seconds = stopTimes[k].arrivalTime;
										// console.log(seconds);
										var arrivalTime = moment(seconds);
										var nextArrivalTime;
										if (k !== stopTimes.length - 1){
											nextArrivalTime = moment(stopTimes[k + 1].arrivalTime);
										}
										// console.log(arrivalTime.format('h:mm a'));
										if (arrivalTime.hour() !== currentHour){
											// console.log(arrivalTime.hour())
											// console.log(currentHour)
											// if (arrivalTime.hour() > firstTime.hour()){
											// 	tbody.append($('.' +i+j+arrivalTime.hour()));
											// }
											if (arrivalTime.hour() >= 13 && morning){
												morning = false;
												tbody.append('<tr><td></td><td></td></tr>')
											}
											row = $('<tr id="'+i+j+arrivalTime.hour()+'">');
											row.append('<td class="text-right"><strong>' + arrivalTime.format('h') + ':</strong></td>');
											minuteCell = $('<td class="text-left">' + arrivalTime.minutes() + '</td>');
											row.append();
											currentHour = arrivalTime.hour();
										}
										else {
											minuteCell.append(' ' + arrivalTime.minutes());
											// console.log($('.'+i+j+'-hour-'+arrivalTime.hour()).html());
										}

										if (nextArrivalTime.hour() !== arrivalTime.hour()){
											row.append(minuteCell);
											tbody.append(row);
										}

										if (k == stopTimes.length - 1){
											console.log('done')
											table.append(tbody);
											// console.log(table);
											columnDiv
												.append('<h4>'+ routeName + ' - ' + headsign +'</h4')
												.append(table);
											schedulesDiv
												.append(columnDiv);
										}
									};
								}
								
							}
							// var predicted = routes[i].predictedArrivalTime ? true : false;
							// var seconds = routes[i].predictedArrivalTime || routes[i].scheduledArrivalTime;
							// var diff = seconds - moment().valueOf();
							// var routeName = routes[i].routeShortName;
							// var fromNow = Math.floor(diff/60/1000);//moment(seconds).toNow(true)//.replace('minutes', '').replace('a few seconds', '<strong>NOW</strong>').replace('a minute', '<strong>NOW</strong>');
							// var fromNowText = fromNow <= 1 ? '<strong>NOW</strong>' : fromNow;
							// var headsign = trimHeadsign(routes[i].tripHeadsign);
							// var patt = new RegExp("Airport");
							// if (patt.test(headsign)){
							// 	headsign += ' <i class="fa fa-plane"></i>';
							// }
							// var row = $('<tr class="info">');
							// if (predicted){
							// 	fromNowText += ' <i style="font-size:0.7em;" alt="Predicted arrival time" title="Predicted arrival time" class="fa fa-bolt"></i>';
							// }
							// row.append('<td><span class="'+labelMap[routeName]+'">' + routeName + '</span></td>');
							// row.append('<td data-order="'+fromNow+'">' + fromNowText + '</td>');
							// row.append('<td>' + headsign + '</td>');
							// tbody.append(row);
						}
						
						console.log(data);
						// if ( $.fn.dataTable.isDataTable(tableId) ) {
						// 	arrivalsDatatable = table.DataTable();
						// 	// arrivalsDatatable.clear();
						// 	// arrivalsDatatable.rows.add(data);
						// 	// arrivalsDatatable.draw();
						// 	arrivalsDatatable.destroy();
						// }
						// else {
							// arrivalsDatatable = table.DataTable( {
							// 	"order": [[ 1, "asc" ]],
							// 	// "columns": [
							// 	// 	{"title": "Route"},
							// 	// 	{"title": "Minutes"},
							// 	// 	{"title": "Direction"},
							// 	// 	{"title": "diff", "type": "num"}
							// 	// ],
							// 	// "columnDefs": [
							// 	// 	// "targets": [ 2 ],
							// 	// 	// "visible": false
							// 	// 	// { "type": "num", "targets": 0 }
							// 	// 	{ "visible": false, "targets": 3 },
							// 	// 	// { "orderData": 1,    "targets": 3 },
							// 	// ],
							// 	// "data": data,
							// 	"paging": false,
							// 	// "pageLength": 6,
							// 	// "ordering": false,
							// 	"info": false,
							// 	"bFilter": false
							// });
						// }
					} // end if there are arrivals in the list
					// else{
					// 	table.hide();
					// 	$('#' + widgetClass + '-stop-name').html('');
					// 	$('#' + widgetClass + '-last-updated').html('');
					// 	$('#' + widgetClass + '-arrival-msg').text('No arrivals in the next 30 minutes.');
					// 	$('#' + widgetClass + '-arrival-msg').show();
					// }
				}
			});
		}
	});
function compareRouteNames(a,b){ return a.shortName - b.shortName; }
function findBootstrapEnvironment() {
    var envs = ['xs', 'sm', 'md', 'lg'];

    $el = $('<div>');
    $el.appendTo($('body'));

    for (var i = envs.length - 1; i >= 0; i--) {
        var env = envs[i];

        $el.addClass('hidden-'+env);
        if ($el.is(':hidden')) {
            $el.remove();
            return env;
        }
    }
}
function setupDatetime(){
    // if(Modernizr.inputtypes.time){
        $('#planner-options-timeformat').hide();
        $('#planner-options-timeformat').attr('aria-hidden',true);
    // }
    setTime(currentTime);
    function pad(n) { return n < 10 ? '0' + n : n }
    var date = currentTime.year() + '-' + pad(currentTime.month() + 1) + '-' + pad(currentTime.date());
    setDate(date);
    if (typeof $().datepicker === 'function'){
      $("#planner-options-date").datepicker( {
         dateFormat: Locale.dateFormat,
         dayNames: Locale.days,
         dayNamesMin : Locale.daysMin,
         monthNames: Locale.months,
         defaultDate: 0,
         hideIfNoPrevNext: true,
         minDate: whitelabel_minDate,
         maxDate: whitelabel_maxDate
      });
    }
    else{
      console.log('error no datetimepicker');
    }
    /* Read aloud the selected dates */
    $(document).on("mouseenter", ".ui-state-default", function() {
        var text = $(this).text()+" "+$(".ui-datepicker-month",$(this).parents()).text()+" "+$(".ui-datepicker-year",$(this).parents()).text();
        $("#planner-options-date-messages").text(text);
    });

    // if(Modernizr.inputtypes.date){
        $('#planner-options-dateformat').hide();
        $('#planner-options-dateformat').attr('aria-hidden',true);
    // }
};
function setDate(iso8601){
  parts = iso8601.split('-');
  var d = moment(iso8601);
  $('#planner-options-date').val(d.format('MM-DD-YYYY'));
}
function setTime(iso8601){
    // if(Modernizr.inputtypes.time){
    //     $('#planner-options-time').val(iso8601.slice(0,5));
    // }else{
      console.log(iso8601)
         input = moment(iso8601, "hh:mm a");
        // var secs = parseInt(val[0])*60*60+parseInt(val[1])*60;
        // var hours = String(Math.floor(secs / (60 * 60)) % 24);
        // var divisor_for_minutes = secs % (60 * 60);
        // var minutes = String(Math.floor(divisor_for_minutes / 60));
        console.log(input.format("HH:mm"))

        $('#planner-options-time').val(input.format("HH:mm"));
    // }
}

function getDate(){
  return moment($('#planner-options-date').val()).format("YYYY-MM-DD");
  console.log(elements)
  var month = currentTime.day();
  var day = currentTime.month();
  var year = String(currentTime.year());
  setDate(year+'-'+month+'-'+day);
  return year+'-'+month+'-'+day;
}
function getTime(){
  var time = moment($('#planner-options-time').val(), "HH:mm");
  return time.format("hh:mm a")
}
// Scrolls to anchor tag from subnav link
function scrollToAnchor(aid){
    console.log(aid)
    var aTag = $("[name='"+ aid +"']");
    console.log(aTag)
    $('html,body').animate({scrollTop: aTag.offset().top - 60},'slow');
}

$(".nav-sidebar-sub > li > a").click(function() {
  console.log($(this).attr('href').split('#')[1])
   scrollToAnchor($(this).attr('href').split('#')[1]);
});

jQuery.unparam = function (value) {
  if (value.length > 1 && value.charAt(0) == '#'){
    value = value.substring(1);
  }
  var
  // Object that holds names => values.
  params = {},
  // Get query string pieces (separated by &)
  pieces = value.split('&'),
  // Temporary variables used in loop.
  pair, i, l;

  // Loop through query string pieces and assign params.
  for (i = 0, l = pieces.length; i < l; i++) {
    pair = pieces[i].split('=', 2);
    // Repeated parameters with the same name are overwritten. Parameters
    // with no value get set to boolean true.
    params[decodeURIComponent(pair[0])] = (pair.length == 2 ?
    decodeURIComponent(pair[1].replace(/\+/g, ' ')) : true);
  }
  console.log(params);
  return params;
};
// Extended disable function
jQuery.fn.extend({
    disable: function(state) {
        return this.each(function() {
            var $this = $(this);
            if($this.is('input, button, a'))
              this.disabled = state;
            else
              $this.toggleClass('disabled', state);
        });
    }
});
function trimHeadsign(headsign){
	headsign = headsign.split('-').length > 1 ? headsign.split('-')[1] : headsign;
  headsign = headsign.split('TO').length > 1 ? headsign.split('TO')[1] : headsign;
	headsign = headsign.replace(/STATION/i, '');
	headsign = toTitleCase(headsign);
	return headsign;
}
function cleanStopName(name){
  name = name
          .replace(/(@)(?!\s)/g, ' @ ')
          .replace(/(\/)(?!\s)/g, ' / ')
          .replace(/STATION/g, '');
  name = toTitleCase(name);
  return name;

}
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2-lat1);  // deg2rad below
	var dLon = deg2rad(lon2-lon1); 
	var a = 
	Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
		Math.sin(dLon/2) * Math.sin(dLon/2)
		; 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; // Distance in km
	return d;
}
function deg2rad(deg) {
	return deg * (Math.PI/180);
}
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
      if (/LCI|CTP|TDM|CSX|^NW$|^NE$|^SE$|^SW$|MARTA|GWCC|CNN|^FY$|^ARC$|^SR$|^II$|^STP$|^III$|^US$|CMAQ/g.test(txt))
        return txt
      else if (/^IN$|^OF$|^AND$|^FOR$/g.test(txt)){
        return txt.toLowerCase()
      }
      else
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
serialize = function(obj, prefix) {
	var str = [];
	for(var p in obj) {
	  if (obj.hasOwnProperty(p)) {
	    var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
	    str.push(typeof v == "object" ?
	      serialize(v, k) :
	      encodeURIComponent(k) + "=" + encodeURIComponent(v));
	  }
	}
	return str.join("&");
}
var bs = findBootstrapEnvironment();
console.log(bs);
if (bs === 'md' || bs === 'sm'){
	$('.agency-arrivals-radio').addClass('btn-xs');
}
//# sourceMappingURL=atltransit.js.map