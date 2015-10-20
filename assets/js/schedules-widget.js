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