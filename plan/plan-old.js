L.mapbox.accessToken = 'pk.eyJ1IjoiYXRscmVnaW9uYWwiLCJhIjoiQmZ6d2tyMCJ9.oENm3NSf--qHrimdm9Vvdw';
var map;
var markers = {};
var esri_url = 'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/';
function mapClick(e){
  console.log(e);
  var point = e.latlng;
  var locationType;
  // handle draggable marker case
  if (typeof point === 'undefined'){
  	point = e.target.getLatLng();
  	locationType = e.target.feature.properties.type;
  	map.removeLayer(markers[locationType]);
  }
  console.log(point);
  if ($( "#planner-options-from-latlng" ).val() === '' || locationType === 'originMarker'){
    console.log("origin");
    
    $( "#planner-options-from-latlng" ).val(point.lat + ',' + point.lng);
    reverseGeocode(point, "#planner-options-from");
    


  }
  else if ($( "#planner-options-dest-latlng" ).val() === '' || locationType === 'destinationMarker'){
    console.log("dest");
    dest = point;
    $( "#planner-options-dest-latlng" ).val(point.lat + ',' + point.lng);
    reverseGeocode(point, "#planner-options-dest");
    
  }

}
function getDisplay(data){
	var display;
	if (typeof data.address !== 'undefined'){
		if ( data.address.Address){
			display = data.address.Address;
		}
		else if (data.address.house)
			display = data.address.house;
		else if (data.address.building)
			display = data.address.building;
		else if (data.address.house_number)
			display = data.address.house_number + " " + data.address.road;
		else if (data.address.road)
			display = data.address.road + ', ' + data.address.city;
		else if (data.address.neighborhood)
			display = data.address.neighborhood + ', ' + data.address.city + ', ' + data.address.state;
		else if (data.address.city)
			display = data.address.city + ', ' + data.address.state;
	}
	return display;
}

function reverseGeocode(point, id){
  this.url = 'http://nominatim.openstreetmap.org/reverse?';
  this.url = esri_url;
  var params = {};
  params.location = point.lng + ',' +point.lat;
  params.f = 'json';
  params.langCode='en';
  params.distance=200;
  // params.lat = point.lat;
  // params.lon = point.lng;
  // params.zoom = '18';
  // params.countrycodes = 'US';
  // params.format = 'json';
  // params.key = this.key;
  // params.components = 'administrative_area:GA|country:US';
  // params.sensor = 'false';

  $.ajax(this.url + 'reverseGeocode', {
    data : params,
    success: function( data ) {
    	var json = JSON.parse(data)
      console.log(json);
      var display = getDisplay(json);
      
      $(id).val(display);
      
      var locationType = "originMarker";
      if (id == "#planner-options-dest"){
        locationType = "destinationMarker";
        setTimeout(function(){submit();}, 100);
      }
      addMarker(point, display, locationType, 'click');
    }
  });
}
function getBoundingBox (data) {
    var bounds = {}, coords, point, latitude, longitude;

    // We want to use the “features” key of the FeatureCollection (see above)
    // data = data.geometry;
    // console.log(data);
    // Loop through each “feature”
    if (typeof data.geometry !== 'undefined'){
	    for (var i = 0; i < data.geometry.coordinates.length; i++) {

	        // Pull out the coordinates of this feature
	        // coords = data[i].geometry.coordinates[0];
	        coords = data.geometry.coordinates[i];
	        // console.log(coords);
	        // For each individual coordinate in this feature's coordinates…
	        for (var j = 0; j < coords.length; j++) {

	            longitude = coords[j][0];
	            latitude = coords[j][1];

	            // Update the bounds recursively by comparing the current
	            // xMin/xMax and yMin/yMax with the coordinate 
	            // we're currently checking
	            bounds.xMin = bounds.xMin < longitude ? bounds.xMin : longitude;
	            // console.log(bounds.xMin);
	            bounds.xMax = bounds.xMax > longitude ? bounds.xMax : longitude;
	            bounds.yMin = bounds.yMin < latitude ? bounds.yMin : latitude;
	            bounds.yMax = bounds.yMax > latitude ? bounds.yMax : latitude;
	        }

	    }

	    // Returns an object that contains the bounds of this GeoJSON
	    // data. The keys of this object describe a box formed by the
	    // northwest (xMin, yMin) and southeast (xMax, yMax) coordinates.
	    return bounds;
	}
}
function maxBounds(bounds1, bounds2){
  var bounds = {};
  bounds.xMin = Math.min(bounds1.xMin, bounds2.xMin);
  bounds.xMax = Math.max(bounds1.xMax, bounds2.xMax);
  bounds.yMin = Math.min(bounds1.yMin, bounds2.yMin);
  bounds.yMax = Math.max(bounds1.yMax, bounds2.yMax);
  return bounds;
}
function addMarker(point, title, locationType, source){
	title = truncate(title, 60);
	console.log(title);
	var zoom;
	var geoJSON = {
		"type": "FeatureCollection",
		"features": []
	};
	var symbol = locationType === 'destinationMarker' ? 'fa-dot-circle-o' : 'fa-play-circle-o';
	if (geoJSON.features.length > 0){
		// map.removeSource('markers', markers);
		map.removeLayer(markers);
		markers = {
			'originMarker': {},
			'destintationMarker' : {}
		};
		zoom = map.getZoom() - 1;
	}
	else{
		zoom = map.getZoom() + 2;
	}
	geoJSON.features.push({
		"type": "Feature",
		"geometry": {
			"type": "Point",
			"coordinates": [point.lng, point.lat]
		},
		"properties": {
			"title": title,
			"iconHtml": symbol,
			"type": locationType
		}
	});
	markers[locationType] = new L.geoJson(geoJSON, { 
		// style: L.mapbox.simplestyle.style 
		pointToLayer: function (feature, latlng) {
			return L.marker(latlng, {
				draggable: true,
				icon: L.divIcon({
			        // specify a class name that we can refer to in styles, as we
			        // do above.
			        className: 'icon-map',
			        // html here defines what goes in the div created for each marker
			        html: '<i class="fa fa-lg ' + feature.properties.iconHtml + '"></i>', //'<span class="glyphicon ' + feature.properties.iconHtml + '"></span>',
			        // and the marker width and height
			        iconSize: [30, 30],
			        iconAnchor: [7, 10],
		    	})
			});
		},
		onEachFeature: function (feature, layer) {
			// ADD A POPUP
			layer.bindPopup(
				// "<h1>" + 
				feature.properties.title + ''
				// "</h1>"
			);
			layer.on('mouseover', function (e) {
				this.openPopup();
			});
			layer.on('mouseout', function (e) {
				this.closePopup();
			});
			layer.on('dragend', function(event) {
				console.log(layer);
				console.log(event);
				// layer.setLatLng(event.target.getLatLng());
				mapClick(event);
				// var marker = event.target;  // you could also simply access the marker through the closure
				// var result = marker.getLatLng();  // but using the passed event is cleaner
				// console.log(result);
			});
		}
	}).addTo(map);

	// if (source !== 'click')
	// 	map.fitBounds(markers.getBounds());
}

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
		// else{
		// 	$(".popover-dismiss").popover("show");
		// }
	});
});





opt = {
    autoOpen: false,
    position: { my: "center", at: "left top+130", of: window },
    dialogClass: "no-close noTitleStuff transparent-bg",
    width: 320,
    maxHeight: 600,
    // minHeight: 233,
    resizable: false,
    title: "Plan a trip"

  };

itinOpt = {
    autoOpen: false,
    position: { my: "center", at: "left center-80", of: window },
    dialogClass: "no-close",
    width: 400,
    maxHeight: 400,
    // minHeight: 233,
    buttons: [
      {
        text: "Close",
        click: function() { 
           $(this).dialog("close");
        }
      }
    ],

    title: "Trip Itinerary"
};
//////////////////////////////////////////
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





/////////////// Geocoders
var bag42 = function( request, response ) {
  $.ajax({
    url: "http://bag42.nl/api/v0/geocode/json",
    dataType: "json",
    data: {
      address : request.term
    },
    success: function( data ) {
      response( $.map( data.results, function( item ) {
      return {
        label: item.formatted_address,
        value: item.formatted_address,
        latlng: item.geometry.location.lat+','+item.geometry.location.lng
        };
      }));
    }
  });
};
var bliksem_geocoder = function( request, response ) {
  $.ajax({
    url: whitelabel_prefix+"/geocoder/" + request.term + '*',
    dataType: "json",
    success: function( data ) {
      response( $.map( data.features, function( item ) {
      return {
        label: item.properties.search,
        value: item.properties.search,
        latlng: item.geometry.coordinates[1]+','+item.geometry.coordinates[0]
        };
      }));
    }
  });
};
var google_geocoder = function( request, response ) {
  var google_url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  var key = 'AIzaSyCSEnj3req-uXzLNeFuEgY-57M-AL1nq50';
  $.ajax({
    url: google_url + request.term + '&components=administrative_area:GA|country:US&sensor=false&key=' + key,
    dataType: "json",
    success: function( data ) {
      response( $.map( data.results, function( item ) {
      return {
        label: item.formatted_address,
        value: item.formatted_address,
        latlng: item.geometry.location.lat+','+item.geometry.location.lng
        };
      }));
    }
  });
};
var photon_geocoder = function(request, response) {
  this.url = 'http://photon.komoot.de/api/?';
  var params = {};
  var mapObj = {
    'ne': 'northeast',
    'sw': 'southwest',
    'nw': 'northwest',
    'se': 'southeast'
  };
  var newterm = request.term.replace(/(\s+)NE|(\s+)NW|(\s+)SE|(\s+)SW/gi, function(matched){
    return ' ' + mapObj[matched.slice(1)];
  });
  params.q =newterm;  // request.term.replace(/^NE$/i, 'northeast')//.replace(/^SE$/g, 'southeast').replace(/^NW$/g, 'northwest').replace(/^SW$/g, 'southwest');

  params.lat = '33.766';
  params.lon = '-84.405';
  params.limit = '10';
  var count = 0;
  $.ajax(this.url, {
    data : params,
    // dataType: "jsonp",
    success: function( data ) {
      console.log(data.features);
      response( $.map( data.features, function( item ) {

        if (item.properties.state === "Georgia"){
          count++;
          console.log(item.properties);
          console.log(count);
          var props = item.properties;
          var desc = [];
          var title = '';
          if (props.name){
            // desc.push(props.name);
            title = props.name;
            // desc[0] = '<strong>'+desc[0]+'<strong>'
          }

          if (props.housenumber && props.street){
            if (!props.name){
              title = props.housenumber + ' ' + props.street;
            }
            else{
              desc.push(props.housenumber + ' ' + props.street);
              // desc.push(props.street);
            }
          }
          if (props.city){
            desc.push(props.city);
          }
          if (props.osm_value && props.osm_key != 'building'){
            if (props.osm_key == 'highway'){
              desc.push('(road)');  
            }
            else{
              desc.push('('+props.osm_value+')');
            }
          }
        
          return {
            label: props.name, //item.display_name.split(', Georgia, United States of America')[0],
            value: props.name, //item.display_name.split(', Georgia, United States of America')[0],
            latlng: item.geometry.coordinates[1]+','+item.geometry.coordinates[0],
            desc: desc.join(' ')
          };
        } // end if Georgia
      }));
      if (count === 0){
        request.term = request.term + ' northeast';
        Geocoder.geocoder(request, response);
      }
    }
  });
};
var esri_find = function(request, response) {
  if (request.term.length === 0){
  	console.log('hello geocoder');
  	response([{
		label: '<i class="fa fa-location-arrow"></i> Your location',
		value: lat + ', ' + lon,
		// latlng: lat + ', ' + lon,
		desc: lat + ', ' + lon,
		key: '123'
	}]);
  }
  var data = {
    location: '-84.388847,33.750159',
    distance: 20000,
    f: 'pjson',
    searchExtents: '-85.386,34.618,-83.269,32.844',
    text: request.term
  };

  $.ajax({
    url: esri_url + 'find',
    dataType: "json",
    data: data,
    success: function( data ) {
      response( $.map( data.locations, function( item ) {
        var parts = item.name.split(', ')
        return {
          label: item.name,
          value: item.name,
          // latlng: '33,85',
          desc: parts[parts.length - 2] + ', ' + parts[parts.length - 1],
          key: item.magicKey
        };
      }));
    }
  });
};
var esri_suggest = function(request, response) {
  console.log('hello geocoder');
  if (request.term.length === 0){
  	console.log('hello geocoder');
  	response([{
		label: '<i class="fa fa-location-arrow"></i> Your location',
		value: lat + ', ' + lon,
		// latlng: lat + ', ' + lon,
		desc: lat + ', ' + lon,
		key: '123'
	}]);
  }
  var data = {
    location: '-84.388847,33.750159',
    distance: 20000,
    f: 'pjson',
    searchExtents: '-85.386,34.618,-83.269,32.844',
    text: request.term
  };
  // if (/&/.test(request.term)){
  // 	$.ajax({
	 //    url: esri_url + 'find',
	 //    dataType: "json",
	 //    data: data,
	 //    success: function( data ) {
	 //      response( $.map( data.locations, function( item ) {
	 //        var parts = item.name.split(', ')
	 //        return {
	 //          label: item.name,
	 //          value: item.name,
	 //          // latlng: '33,85',
	 //          desc: parts[parts.length - 2] + ', ' + parts[parts.length - 1],
	 //          // key: item.magicKey
	 //        };
	 //      }));
	 //    }
	 //  });
  // }
  // else{
  	$.ajax({
	    url: esri_url + 'suggest',
	    dataType: "json",
	    data: data,
	    success: function( data ) {
	      response( $.map( data.suggestions, function( item ) {
	        var parts = item.text.split(', ')
	        return {
	          label: item.text,
	          value: item.text,
	          // latlng: '33,85',
	          desc: parts[parts.length - 2] + ', ' + parts[parts.length - 1],
	          key: item.magicKey
	        };
	      }));
	    }
	  });
  // }
};
var nominatim_geocoder = function(request, response) {
  this.url = 'http://open.mapquestapi.com/nominatim/v1/search.php?';
  var params = {};
  params.q = request.term;
  params.viewbox = '-84.828,33.316,-83.864,34.297';
  params.countrycodes = 'US';
  params.format = 'json';
  // params.key = this.key;
  // params.components = 'administrative_area:GA|country:US';
  // params.sensor = 'false';

  $.ajax(this.url, {
    data : params,
    success: function( data ) {

      response( $.map( data, function( item ) {
      return {
        label: item.display_name.split(', Georgia, United States of America')[0],
        value: item.display_name.split(', Georgia, United States of America')[0],
        latlng: item.lat+','+item.lon
        }
      }));
    }
  })
}

var planningserver = whitelabel_prefix+'ws/plan?';

String.prototype.lpad = function(padString, length) {
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
};
var currentTime = moment();
var Geocoder = Geocoder || {};
Geocoder.geocoder = esri_suggest;

switchLocale();

var itineraries = null;
var lines;
var renderedRoute;
var prevItin = {};
var itinDialog;
var input;

$(document).on('ready', function(){
      var win = $(this); //this = window
      if (win.width() >= 750) { $('.planner-options-form').removeClass('form-inline'); }
      else { $('.planner-options-form').addClass('form-inline'); }
});
$(window).on('resize', function(){
      var win = $(this); //this = window
      if (win.width() >= 750) { $('.planner-options-form').removeClass('form-inline'); }
      else { $('.planner-options-form').addClass('form-inline'); }
});

function initializeForms(){
    setupAutoComplete();
    setupDatetime();
    setupSubmit();
    if ($( "#planner-options-from" ).val() == ''){
        $( "#planner-options-from-latlng" ).val('');
    }
    if ($( "#planner-options-dest" ).val() == ''){
        $( "#planner-options-dest-latlng" ).val('');
    }
    $('.mode-option').removeClass('active');
    $('#train').parent().addClass('active');
    $('.popover-dismiss').popover({
        container: 'body',
        html: true,
        // viewport: '#containz',
        content: '<p>ARC\'s <a target="_blank" href="http://oneclick-arc.camsys-apps.com/">One-Click</a> combines data from this trip planner with services like <strong>MARTA Mobility</strong>, transport for veterans and disabled persons, and other on-demand services.</p><a target="_blank" href="http://oneclick-arc.camsys-apps.com/" type="button" class="center-block btn btn-primary">Visit the One-Click!</a>',
        trigger: 'click',
        title: 'Looking for specialized services?' + '<button type="button" onclick="$(\'.popover-dismiss\').popover(\'hide\');" class="close">&times;</button>'
    });
    $('.close').trigger('click', function(e){
        $(".popover-dismiss").popover("hide");
    });
}
function validate(){
    var valid = true;

    if ($( "#planner-options-from" ).val() == ''){
        $( "#planner-options-from-latlng" ).val('');
    }
    if ($( "#planner-options-dest" ).val() == ''){
        $( "#planner-options-dest-latlng" ).val('');
    }
    $( "#planner-options-from-error" ).remove();
    if ($( "#planner-options-from" ).val() == ''){
        $( "<div class=\"alert alert-danger\" role=\"alert\" id=\"planner-options-from-error\" for=\"planner-options-from\">"+Locale.startpointEmpty+"</div>").insertAfter("#planner-options-inputgroup-from");
        $( "#planner-options-from" ).attr('aria-invalid',true);
        valid = false;
    }else if ($( "#planner-options-from-latlng" ).val() == ''){
        $( "<div class=\"alert alert-danger\" role=\"alert\" id=\"planner-options-from-error\" for=\"planner-options-from\">"+Locale.noStartpointSelected+"</div>").insertAfter("#planner-options-inputgroup-from");
        $( "#planner-options-from" ).attr('aria-invalid',true);
        valid = false;
    }
    $( "#planner-options-dest-error" ).remove();
    if ($( "#planner-options-dest" ).val() == ''){
        $( "<div class=\"alert alert-danger\" role=\"alert\" id=\"planner-options-dest-error\" for=\"planner-options-dest\">"+Locale.destinationEmpty+"</div>").insertAfter("#planner-options-inputgroup-dest");
        $( "#planner-options-dest" ).attr('aria-invalid',true);
        valid = false;
    }else if ($( "#planner-options-dest-latlng" ).val() == ''){
        $( "<div class=\"alert alert-danger\" role=\"alert\" id=\"planner-options-dest-error\" for=\"planner-options-dest\">"+Locale.noDestinationSelected+"</div>").insertAfter("#planner-options-inputgroup-dest");
        $( "#planner-options-dest" ).attr('aria-invalid',true);
        valid = false;
    }
    if (!valid){return valid;};
    $( "#planner-options-from" ).attr('aria-invalid',false);
    $( "#planner-options-dest" ).attr('aria-invalid',false);
    $( "#planner-options-time-error" ).remove();
    if (!getTime()){
        $( "<div class=\"alert alert-danger\" role=\"alert\" id=\"planner-options-time-error\" for=\"planner-options-time\">"+Locale.noValidTime+"</div>").insertAfter("#planner-options-inputgroup-time");
        valid = false;
        $( "#planner-options-time" ).attr('aria-invalid',true);
    }
    $( "#planner-options-date-error" ).remove();
    if (!getDate()){
        $( "<div class=\"alert alert-danger\" role=\"alert\" id=\"planner-options-date-error\" for=\"planner-options-date\">"+Locale.noValidDate+"</div>").insertAfter("#planner-options-inputgroup-date");
        $( "#planner-options-date" ).attr('aria-invalid',true);
        return false;
    }
    var minDate = $( "#planner-options-date" ).attr('min');
    var maxDate = $( "#planner-options-date" ).attr('max');
    if (getDate() < minDate){
        $( "<div class=\"alert alert-danger\" role=\"alert\" id=\"planner-options-date-error\" for=\"planner-options-date\">"+Locale.dateTooEarly(minDate)+"</div>").insertAfter("#planner-options-inputgroup-date");
        valid = false;
        $( "#planner-options-date" ).attr('aria-invalid',true);
    }else if (getDate() > maxDate){
        $( "<div class=\"alert alert-danger\" role=\"alert\" id=\"planner-options-date-error\" for=\"planner-options-date\">"+Locale.dateTooLate(maxDate)+"</div>").insertAfter("#planner-options-inputgroup-date");
        $( "#planner-options-date" ).attr('aria-invalid',true);
        valid = false;
    }
    if (valid){
        $( "#planner-options-time" ).attr('aria-invalid',false);
        $( "#planner-options-date" ).attr('aria-invalid',false);
    }
    return valid;
}
function hideForm(){
	$('#planner-advice-div')
		.show();
	$('#planner-advice-msg').html('<i alt="loading" style="line-height:2;" title="loading" class="fa-2x fa fa-circle-o-notch fa-spin"></i>');
	$('#planner-advice-div').attr('aria-hidden',false);
	$('#planner-advice-div').removeClass('hidden');
	$('#hide-results').show();


	$('#hide-results').removeClass('hidden');
}
function showForm(){
  $('.plannerpanel.planner-options').removeClass('planner-summary').addClass('planner-form');
  $('#planner-options-form').attr('aria-hidden',false);
  $('#planner-options-form').show();
  $('#planner-options-desc-row').hide();
  if ($( ".planner-advice-modal" ).dialog()){
    $('.planner-advice-modal').dialog('close');
  }
  hideResults();
  $('#planner-advice-msg').html('');
    $('#planner-advice-div').find('.alert').remove();
  $('#planner-advice-div').hide();
  $('#planner-advice-div').attr('aria-hidden',true);
  $('#planner-advice-div').addClass('hidden');
  $('#planner-options-desc-row').attr('aria-hidden',true);
  $('#planner-options-desc-row').addClass('hidden');
  $('#hide-results').hide();
  $('#planner-options-submit').button('reset');
}
function hideResults(){
  $('#planner-advice-container').find('.alert').remove();
  $('#planner-advice-container').hide();
  $('#planner-advice-container').attr('aria-hidden',true);
  $('#planner-advice-container').addClass('hidden');
}
function showResults(){
  $('#planner-advice-container').show();
  $('#planner-advice-container').attr('aria-hidden',false);
  $('#planner-advice-container').removeClass('hidden');
}
function toggleResults(){
  if (!$('#planner-options-desc-row').hasClass('hidden')){
    if ($('#planner-advice-container').hasClass('hidden')){
      showResults();

    }
    else{
      hideResults();
    }
  }
}
function getPrettyDate(){
   var date = getDate().split('-');
   console.log(date)
   date = new Date(date[0],date[1]-1,date[2]);
   console.log(Locale.days[date.getDay()])
   return Locale.days[date.getDay()] + ' ' + Locale.months[date.getMonth()] + ' ' + date.getDate();
}
function makeBliksemReq(plannerreq){
  req = {}
  bliksemReq = {}
  if (plannerreq['arriveBy']){
    bliksemReq['arrive'] = true
  }else{
    bliksemReq['depart'] = true
  }

  bliksemReq['from-latlng'] = plannerreq['fromLatLng'];
  bliksemReq['to-latlng'] = plannerreq['toLatLng'];
  bliksemReq['date'] = plannerreq['date'] + 'T' + plannerreq['time'];
  bliksemReq['showIntermediateStops'] = true;
  return bliksemReq;
}
function epochtoIS08601date(epoch){
  var d = new Date(epoch);
  var date = String(d.getFullYear())+'-'+String((d.getMonth()+1)).lpad('0',2)+'-'+String(d.getDate()).lpad('0',2);
  return date;
}
function epochtoIS08601time(epoch){
  var d = new Date(epoch);
  var time = d.getHours().toString().lpad('0',2)+':'+d.getMinutes().toString().lpad('0',2)+':'+d.getSeconds().toString().lpad('0',2);
  return time;
}
function earlierAdvice(){
  if (!itineraries){
     return false;
  }
  $('#planner-advice-earlier').button('loading');
  var minEpoch = 9999999999999
  $.each( itineraries , function( index, itin ){
      if (itin.endTime < minEpoch){
          minEpoch = itin.endTime;
      }
  });
  var plannerreq = makePlanRequest();
  plannerreq.arriveBy = true;
  minEpoch -= 60*1000;
  console.log(minEpoch);
  plannerreq.date = epochtoIS08601date(minEpoch);
  plannerreq.time = epochtoIS08601time(minEpoch);
  var url = planningserver + jQuery.param(plannerreq);
  $.ajax({
      url: url,
      type: "GET",
      dataType: "jsonp", 
      success: function( data ) {
        if (!('itineraries' in data.plan) || data.plan.itineraries.length == 0){
          return;
        }
        // var startDate = $('#planner-advice-list').find('.planner-advice-dateheader').first().html();
        $.each( data.plan.itineraries , function( index, itin ){
            // var prettyStartDate = prettyDateEpoch(itin.startTime);
            // if (startDate != prettyStartDate){
            //     $('<div class="planner-advice-dateheader">'+prettyStartDate+'</div>').insertAfter('#planner-advice-earlier');
            //     startDate = prettyStartDate;
            // }
            // itinButton(itin).insertAfter($('#planner-advice-list').find('.planner-advice-dateheader').first());
        });
        $('#planner-advice-earlier').button('reset');
      }
  });
  return false;
}
function laterAdvice(){
  if (!itineraries){
     return false;
  }
  $('#planner-advice-later').button('loading');
  var maxEpoch = 0
  $.each( itineraries , function( index, itin ){
      if (itin.startTime > maxEpoch){
          maxEpoch = itin.startTime;
      }
  });
  maxEpoch += 120*1000;
  var plannerreq = makePlanRequest();
  plannerreq.arriveBy = false;
  plannerreq.date = epochtoIS08601date(maxEpoch);
  plannerreq.time = epochtoIS08601time(maxEpoch);
  var url = planningserver + jQuery.param(plannerreq);
  console.log(decodeURIComponent(url));
  $.ajax({
      url: url,
      type: "GET",
      dataType: "jsonp", 
      success: function( data ) {
        if (!('itineraries' in data.plan) || data.plan.itineraries.length == 0){
            return;
        }
        // var startDate = $('#planner-advice-list').find('.planner-advice-dateheader').last().html();
        $.each( data.plan.itineraries , function( index, itin ){
            var prettyStartDate = prettyDateEpoch(itin.startTime);
            if (startDate != prettyStartDate){
                // $(('<div class="planner-advice-dateheader">'+prettyStartDate+'</div>')).insertAfter($('#planner-advice-list').find('.planner-advice-itinbutton').last());
                // itinButton(itin).insertAfter($('#planner-advice-list').find('.planner-advice-dateheader').last());
                // startDate = prettyStartDate;
            }else{
                itinButton(itin).insertAfter($('#planner-advice-list').find('.planner-advice-itinbutton').last());
            }
        });
        $('#planner-advice-later').button('reset');
      }
  });
  return false;
}
function prettyDateEpoch(epoch){
  var date = new Date(epoch);
  return Locale.days[date.getDay()] + ' ' + date.getDate() + ' ' + Locale.months[date.getMonth()];
}
function timeFromEpoch(epoch){
  var date = moment(epoch);
  return date.format('h:mm a');
}
function highlightLeg(el){
	// console.log();
	var legName = el.id;
	lines[legName].layer.setStyle({
		color:'#aaa',
		weight: 10
	});
}
function resetLeg(el){
	var legName = el.id;
	lines[legName].layer.resetStyle(lines[legName].layer);
}
function legItem(leg, legName){
    var legItem = $('<li class="list-group-item advice-leg" id="'+legName+'" onmouseover="highlightLeg(this)" onmouseout="resetLeg(this)"><div></div></li>');
    
    var icon = getIcon(leg)
    // console.log(leg)
    if (leg.mode == 'WALK' || leg.mode == 'CAR' || leg.mode == 'BICYCLE'){
        if (leg.from.name == leg.to.name){
            return;
        }
        if (leg.mode == 'CAR'){
          leg.mode = 'Drive';
        }
        else if (leg.mode == 'BICYCLE'){
          leg.mode = 'Bike';
        }
        legItem.append('<div class="list-group-item-heading"><h4 class="leg-header"><b>' + icon + ' ' + toTitleCase(leg.mode)+'</b></h4></div>');
    } else {
      var headsign = leg.routeLongName;
      if (leg.headsign !== null)
        headsign = trimHeadsign(leg.headsign);
      else{
        headsign = "";
      }
      // headsign = trimHeadsign(headsign);
      // var headsignParts = headsign ? headsign.split(" ") : ""
      // if (headsignParts[0] === leg.route || headsignParts[0] === "MARTA"){
      //   headsign = headsign.slice(headsignParts[0].length, headsign.length)
      // }
      legItem.append('<div class="list-group-item-heading"><h4 class="leg-header"><b>' + icon + ' ' + '</b> '+headsign+'<span class="leg-header-agency-name pull-right"><small>'+leg.agencyId+'</small></span></h4>');
    }
    var startTime = moment(leg.startTime-(leg.departureDelay ? leg.departureDelay : 0)).format("hh:mm a");
    var delayMin = (leg.departureDelay/60)|0;
    if ((leg.departureDelay%60)>=30){
        delayMin += 1;
    }
    if (delayMin > 0){
        startTime += '<span class="delay"> +'+ delayMin+'</span>';
    }else if (delayMin > 0){
        startTime += '<span class="early"> '+ delayMin+'</span>';
    }else if (leg.departureDelay != null){
        // startTime += '<span class="ontime"> ✓</span>';
    }

    var endTime = moment(leg.endTime-(leg.arrivalDelay ? leg.arrivalDelay : 0)).format("hh:mm a");
    var delayMin = (leg.arrivalDelay/60)|0;
    if ((leg.arrivalDelay%60)>=30){
        delayMin += 1;
    }
    if (delayMin > 0){
        endTime += '<span class="delay"> +'+ delayMin+'</span>';
    }else if (delayMin > 0){
        endTime += '<span class="early"> '+ delayMin+'</span>';
    }else if (leg.arrivalDelay != null){
        // endTime += '<span class="ontime"> ✓</span>';
    }

    if (leg.from.platformCode && leg.mode == 'RAIL'){
        legItem.append('<div><b>'+startTime+'</b> '+toTitleCase(leg.from.name)+' <small class="grey">'+Locale.platformrail+'</small> '+leg.from.platformCode+'</div>');
    }else if (leg.from.platformCode && leg.mode != 'WALK'){
        legItem.append('<div><b>'+startTime+'</b> '+toTitleCase(leg.from.name)+' <small class="grey">'+Locale.platform+'</small> '+leg.from.platformCode+'</div>');
    }else{
        legItem.append('<div><b>'+startTime+'</b> '+toTitleCase(leg.from.name)+'</div>');
    }
    if (leg.to.platformCode && leg.mode == 'RAIL'){
        legItem.append('<div><b>'+endTime+'</b> '+toTitleCase(leg.to.name)+' <small class="grey">'+Locale.platformrail+'</small> '+leg.to.platformCode+'</div>');
    }else if (leg.to.platformCode && leg.mode != 'WALK'){
        legItem.append('<div><b>'+endTime+'</b> '+toTitleCase(leg.to.name)+' <small class="grey">'+Locale.platform+'</small> '+leg.to.platformCode+'</div>');
    }else{
        legItem.append('<div><b>'+endTime+'</b> '+toTitleCase(leg.to.name)+'</div>');
    }
    if (leg.mode === 'SUBWAY' || leg.mode === 'BUS'){
    	legItem.append('<a class="btn btn-xs btn-default" href="/#tab=stop-code&stopId='+leg.from.stopId.agencyId +'_'+leg.from.stopId.id+'">Get realtime</a>')
    }
    return legItem;
}
function getName(leg){
	var name;
	if(leg.route === "BLUE" || leg.route === "GREEN" || leg.route === "RED" || leg.route === "GOLD") {
		name = leg.route;
	}
	else if (leg.agencyId == 'MARTA' || leg.agencyId == 'GRTA' || leg.agencyId == 'GCT' || leg.agencyId == 'CCT'){
		name = leg.agencyId;
	}
	else if (leg.mode == 'WALK' || leg.mode == 'BICYCLE'){
		name = leg.mode;
	}
	else{
		name = 'route';
	}
	return name;
}
function renderItinerary(index, focus, el, click){
	var itin = itineraries[index];
	console.log(el);
	$el = $(el);
	if (!focus){
		renderItinerary(prevItin.index, true, prevItin.el, false);
		return;
	}
	if (typeof lines !== 'undefined'){
		$.each(lines, function(key, line){
			map.removeLayer(line.layer);
		});
	}
	if (click){
		var fare;
		if ( itin.fare !== null){
			fare = itin.fare.fare.regular.cents / 100;
		}
		$('#planner-advice-msg').html('');
		$('#planner-leg-list').html('');
		$('#planner-summary').html(
			'<h3>Trip Summary</h3><button class="btn btn-xs btn-default pull-right"><i class="fa fa-link"></i></button>' +
			'<p>Fare: $' + fare + '</p>' +
			'<p>Time: ' + getDiff(itin.startTime, itin.endTime) + '</p>' +
			'<p>Walk distance: ' + itin.walkDistance / 1609.34 + '</p>' +
			'<p>Transfers: ' + itin.transfers + '</p>'
		);
		prevItin.index = index;
		prevItin.el = el;
		// console.log(el);
		
	}
	lines = {};
	
	var generic = {
		"type": "Feature",
		"properties": {},
		"geometry": {
			"type": "MultiLineString",
			"coordinates": []
		}
	};
	$.each( itin.legs , function( index, leg ){
		var line = {
			"type": "Feature",
			"properties": {},
			"geometry": {
			"type": "MultiLineString",
			"coordinates": []
			}
		};
		var points = polyline.decode(leg.legGeometry.points);
		line.geometry.coordinates.push(points);
        var name = 'route';
        name = getName(leg);
		lines[name + index] = {};
		lines[name + index].data = line;
		lines[name + index].leg = leg;
		lines[name + index].name = name;
		if (click){
			$('#planner-leg-list').append(legItem(leg, name + index));
		}
		var bounds;
		var max;
		if (index === itin.legs.length - 1){
			// console.log("HERE!")
			$.each(lines, function(i, line){

				if (typeof bounds === 'undefined'){
					// console.log(line.data)
					bounds = getBoundingBox(line.data);
				}
				else{
					// console.log(line.data);
					bounds = maxBounds(bounds, getBoundingBox(line.data));
					// console.log(bounds);
				}
				// console.log(i)
				// console.log(leg)
				// TODO: change route to normal mapbox
				var dash = /WALK/.test(i) ? "3,10" : null;
				line.layer = L.geoJson(line.data, { 
					style: {
						color: getColor(line.leg),
						opacity: 0.8,
						weight: 5,
						// fill: true,
						// fillColor: 'blue',
						dashArray: dash,
					} ,
					onEachFeature: function(feature, layer){
						// // ADD A POPUP
						layer.bindPopup(
							// "<h1>" + 
							getIcon(line.leg) + ''
							// "</h1>"
						);
						layer.on('mouseover', function (e) {
							this.openPopup();
						});
						layer.on('mouseout', function (e) {
							map.closePopup();

						});
					}
				}).addTo(map);
			});
			if (typeof bounds !== 'undefined' && click){
				map.fitBounds([[bounds.yMin, bounds.xMin],[bounds.yMax, bounds.xMax]]);
			}
		}
	});

	// $('#planner-advice-list').find('.btn').removeClass('active');
	// $(this).addClass('active');
	
	if ($el.hasClass('active')){
		if (click){
			// console.log('click!')
			toggleResults();
		}
	}
	if (click){
		if ($('#planner-advice-container').hasClass('hidden')){
			$el.blur();
		}
		else{
			$el.focus();
		}
	}
}
function itinButton(index, itin){
  var hidden = ''
    // if (index){ // check if first button, if not add 'hidden' class
    //   hidden = 'hidden '
    // }
    // var itinButton = $('<button type="button" class="btn btn-sm btn-default planner-advice-itinbutton" onclick="renderItinerary('+itineraries.length+',true)"></button>');
	var itinButton = $(
		'<label class="btn btn-sm btn-default planner-advice-itinbutton" onmouseout="renderItinerary('+itineraries.length+',false, this, false)" onmouseover="renderItinerary('+itineraries.length+',true, this, false)" onclick="renderItinerary('+itineraries.length+',true, this, true)">' +
			'<input type="radio" name="options" id="option1" autocomplete="off" checked>' +
		'</label>'
	);
    itineraries.push(itin);
    var diffDisplay = getDiff(itin.startTime, itin.endTime);
    
    var itinSummary = '';
    $.each(itin.legs, function(i, leg){
      var text = getIcon(leg);
      // remove walk icon if distance is less than threshold
      if (leg.mode === 'WALK' && (leg.distance < .5 * 1609.34 || (itin.legs.length - i === 1 && i === 0))){
      	text = '';
      }
      itinSummary += (i == 0 || text == '' || itinSummary == '') ? text : '<span class="glyphicon glyphicon-chevron-right"></span>' + text;
    });
    // itinButton.append('<div class="text-left">'+itinSummary+'<span class="'+hidden+'"><b>'+timeFromEpoch(itin.startTime)+'</b>  <span class="glyphicon glyphicon-chevron-right"></span> <b>'+timeFromEpoch(itin.endTime)+'</b> | '+Locale.amountTransfers(itin.transfers)+ ' | ' + diffDisplay + '</span></div>');
    itinButton.append('<div class="text-left">'+itinSummary+'<span class="pull-right'+hidden+'">'+ diffDisplay + '</span></div>');
    // itinButton.append('<div class="text-left">'+Locale.amountTransfers(itin.transfers)+ ' | ' + diffDisplay + '</div>');
    return itinButton;
}
function getDiff(startTime, endTime){
	var start = moment(startTime)
    var end = moment(endTime)
    var diff = end.diff(start, 'minutes')
    var minutes = diff%60;
    var hours = Math.floor(diff/60)
    var diffDisplay = hours ? hours + ' h ' + minutes + ' min' : minutes + ' min'
    return diffDisplay;
}
function getIcon(leg){

  return leg.mode === 'WALK' ? ' <img src="/assets/images/pedestrian.svg" alt="Walk" height="20"> ' :
          leg.mode === 'SUBWAY' ?  ' <span class="' + labelMap[leg.routeShortName] + '"><i class="fa fa-lg fa-train" alt="' + leg.agencyId + '"></i> ' + leg.routeShortName + '</span> ':
          leg.mode === 'CAR' ?  ' <i class="fa fa-lg fa-car" alt="Drive" height="20"></i> ' :
          leg.mode === 'BICYCLE' ?  ' <i class="fa fa-lg fa-bicycle" alt="Bike" height="20"></i> ' :
          leg.mode === 'BUS' ?  ' <span class="' + labelMap[leg.agencyId] + '"><i class="fa fa-lg fa-bus" alt="' + leg.agencyId + '"></i> ' + leg.routeShortName + ' </span>' :
          '';
}
function planItinerary(plannerreq){
  var url = planningserver + jQuery.param(plannerreq);
  console.log(url)
  // $('#planner-advice-container').prepend('<div class="progress progress-striped active">'+
  // '<div class="progress-bar"  role="progressbar" aria-valuenow="100" aria-valuemin="100" aria-valuemax="100" style="width: 100%">'+
  // '<span class="sr-only">'+Locale.loading+'</span></div></div>');
  $('#planner-advice-list').html('');
  $('#planner-leg-list').html('');

  $.ajax({
      url: url,
      type: "GET",
      dataType: "jsonp", 
      success: function( data ) {
        console.log(data)
        $('#planner-leg-list').html('');
        itineraries = []
        $('#planner-advice-list').html('');
        $('.progress.progress-striped.active').remove();
        if (!('itineraries' in data.plan) || data.plan.itineraries.length == 0){
            $('#planner-advice-container').prepend('<div class="row alert alert-danger" role="alert">'+Locale.noAdviceFound+'</div>');
            return;
        }
        $('#planner-advice-container').find('.alert').remove();
        var startDate = null;
        // $('#planner-advice-list').append('<button type="button" class="btn btn-primary" id="planner-advice-earlier" data-loading-text="'+Locale.loading+'" onclick="earlierAdvice()">'+Locale.earlier+'</button>');
        $.each( data.plan.itineraries , function( index, itin ){
            // var prettyStartDate = prettyDateEpoch(itin.startTime);
            // if (startDate != prettyStartDate){
            //     $('#planner-advice-list').append('<div class="planner-advice-dateheader">'+prettyStartDate+'</div>');
            //     startDate = prettyStartDate;
            // }
            $('#planner-advice-list').append(itinButton(index, itin));
        });
        // $('#planner-advice-list').append('<button type="button" class="btn btn-primary" id="planner-advice-later" data-loading-text="'+Locale.loading+'" onclick="laterAdvice()">'+Locale.later+'</button>');
        $('#planner-advice-list').find('.planner-advice-itinbutton').first().click();
        $('#planner-options-submit').button('reset');
        // earlierAdvice();
        // laterAdvice();
      }
  });
}
function getColor(leg){
        if(leg.mode === "WALK") return '#555';
        else if(leg.route === "BLUE") return 'rgb(0, 0, 255)';
        else if(leg.route === "GREEN") return 'rgb(0, 153, 51)';
        else if(leg.route === "RED") return 'rgb(255, 0, 0)';
        // else if(leg.route === "GOLD") return 'rgb(255, 215, 0)';
        else if(leg.route === "GOLD") return 'rgb(255, 215, 0)';
        else if(/MARTA/g.test(leg.agencyId)) return 'rgb(247, 144, 68)';
        else if(/CCT/g.test(leg.agencyId)) return 'rgb(165, 56, 149)';
        else if(/GCT/g.test(leg.agencyId)) return 'rgb(154, 14, 52)';
        else if(leg.agencyId === "0") return 'rgb(154, 14, 52)';
        else if(/GRTA/g.test(leg.agencyId)) return 'rgb(71, 168, 213)';
        else if(leg.mode === "BICYCLE") return 'rgb(68, 15, 0)';
        else if(leg.mode === "SUBWAY") return 'rgb(255, 0, 0)';
        else if(leg.mode === "RAIL") return 'rgb(176, 0, 0)';
        else if(leg.mode === "BUS") return 'rgb(0, 255, 0)';
        else if(leg.mode === "TRAM") return 'rgb(255, 0, 0)';
        return '#aaa';
}
function makePlanRequest(){
  plannerreq = {}
  plannerreq.fromPlace = $('#planner-options-from-latlng').val();
  plannerreq.fromName = $('#planner-options-from').val();
  plannerreq.toPlace = $('#planner-options-dest-latlng').val();
  plannerreq.toName = $('#planner-options-dest').val();
  plannerreq.mode = $('input[name=mode-select]:checked').val()
  plannerreq.time = getTime();
  plannerreq.date = getDate();
  plannerreq.arriveBy = false;
  return plannerreq;
}
function truncate(word, num){
  if (word.length > num){
    return word.substring(0, num) + '...';
  }
  else{
    return word
  }
}
function submit(){
	// Remove lines when redrawing 
	// console.log('submitting')
	if ($("input[type='radio'][name='mode-select']:checked").val() === 'specialized'){
		// alert('Please use the One-Click!')
		$(".popover-dismiss").popover("show");
		return;
	}

	// TODO: determine if this is needed
	// $.each(map.sources, function(key, val){
	// 	if (key !== "mapbox" && key !=="markers"){map.removeSource(key);}
	// });
	$('#planner-options-submit').button('loading');
	console.log('hiding form')
	hideForm();
	$('#planner-options-desc').html('');
	var plannerreq = makePlanRequest();
	console.log(plannerreq);
	var summary = $('<p></p>');
	summary.append('<b>'+Locale.from+'</b> '+truncate(plannerreq.fromName, 42)+'</br>');
	summary.append('<b>'+Locale.to+'</b> '+truncate(plannerreq.toName, 42));
	$('#planner-options-desc').append(summary);
	$('#planner-options-desc').append('<p>'+getPrettyDate() +', '+getTime()+'</p>');
	if (parent){ // && Modernizr.history){
		parent.location.hash = jQuery.param(plannerreq);
		history.pushState(plannerreq, document.title, window.location.href);
		planItinerary(plannerreq);
	}
	// $('#planner-options-desc').children()[0].click(function(){
	//   showForm();
	// });
}
function clearHash(){
	history.pushState({id: "base"}, document.title, '/plan/');
	initializeForms();
	showForm();
	geoJSON = {
		"type": "FeatureCollection",
		"features": []
	};

	$( "#planner-options-from-latlng" ).val('');
	$( "#planner-options-from" ).val('');
	$( "#planner-options-dest-latlng" ).val('');
	$( "#planner-options-dest" ).val('');
	$('#planner-advice-list').html('');
	map.eachLayer(function (layer) {
		console.log(layer);
		if (typeof layer.feature !== 'undefined')
			map.removeLayer(layer);
	});
}
function restoreFromHash(){
    var plannerreq = jQuery.unparam(window.location.hash);
    if ('time' in plannerreq){
      setTime(plannerreq['time']);
    }
    if ('date' in plannerreq){
      setDate(plannerreq['date']);
    }
    if ('fromName' in plannerreq){
        $('#planner-options-from').val(plannerreq['fromName']);
    }
    if ('fromPlace' in plannerreq){
        $('#planner-options-from-latlng').val(plannerreq['fromPlace']);
        var latlng = plannerreq['fromPlace'].split(',')
        console.log(Number(latlng[0]))
        addMarker({lat:Number(latlng[0]),lng:Number(latlng[1])}, plannerreq['fromName'], "originMarker", 'form')
    }
    if ('toName' in plannerreq){
        $('#planner-options-dest').val(plannerreq['toName']);
    }
    if ('mode' in plannerreq){
        $('#train').parent().removeClass('active')
        $('input[type=radio][value="' + plannerreq.mode + '"]').prop('checked', true).parent().addClass('active');
    }
    if ('toPlace' in plannerreq){
        $('#planner-options-dest-latlng').val(plannerreq['toPlace']);
        var latlng = plannerreq['toPlace'].split(',')
        console.log(Number(latlng[0]))
        addMarker({lat:Number(latlng[0]),lng:Number(latlng[1])}, plannerreq['toName'], "destinationMarker", 'form')
    }
    if ('arriveBy' in plannerreq && plannerreq['arriveBy'] == "true"){
        $('#planner-options-arrivebefore').click();
    }else{
        $('#planner-options-departureafter').click();
    }
    if (validate()){submit();}
}
function setupSubmit(){
    $(document).on('submit','.validateDontSubmit',function (e) {
        //prevent the form from doing a submit
        e.preventDefault();
        return false;
    });
    $('#planner-options-submit').click(function(e){
       var $theForm = $(this).closest('form');
       if (( typeof($theForm[0].checkValidity) == "function" ) && !$theForm[0].checkValidity()) {
           return;
       }
       if (validate()){submit();}
    });
};
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
function setupDatetime(){
    // if(Modernizr.inputtypes.time){
        $('#planner-options-timeformat').hide();
        $('#planner-options-timeformat').attr('aria-hidden',true);
    // }
    setTime(currentTime);
    function pad(n) { return n < 10 ? '0' + n : n }
    var date = currentTime.year() + '-' + pad(currentTime.month() + 1) + '-' + pad(currentTime.date());
    setDate(date);
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
function setupAutoComplete(){
    $( "#planner-options-from" ).autocomplete({
        autoFocus: true,
        minLength: 0,
        //appendTo: "#planner-options-from-autocompletecontainer",
        messages : Locale.autocompleteMessages,
        source: Geocoder.geocoder,
        search: function( event, ui ) {
            $( "#planner-options-from-latlng" ).val( "" );
        },
        focus: function( event, ui ) {
            // $( "#planner-options-from" ).val( ui.item.label );
            //$( "#planner-options-from-latlng" ).val( ui.item.latlng );
            return false;
        },
		select: function( event, ui ) {
			$( "#project-description" ).html( ui.item.desc );
			console.log(ui.item)
			var point;
      console.log(markers['originMarker']);
      if (typeof markers['originMarker'] !== 'undefined')
			   map.removeLayer(markers['originMarker']);
			if (/Your location/g.test(ui.item.label)){
				$( "#planner-options-from" ).val( ui.item.desc );
				point = ui.item.desc.split(",");
				addMarker({lat:Number(point[0]),lng:Number(point[1])}, ui.item.label, "originMarker", 'form')
				$( "#planner-options-from-latlng" ).val( ui.item.desc );
				return false;
			}
            else{
            	$( "#planner-options-from" ).val( ui.item.label );
              var params = {
                text: ui.item.label,
                magicKey: ui.item.key,
                f: 'pjson'
              };
              $.ajax(esri_url + 'find', {
                data : params,
                success: function( data ) {
                  var json = JSON.parse(data)
                  console.log(json)
                  var geometry = json.locations[0].feature.geometry;
                  addMarker({lat:Number(geometry.y),lng:Number(geometry.x)}, ui.item.label, "originMarker", 'form')
                  $( "#planner-options-from-latlng" ).val( geometry.y + ',' + geometry.x );
                  return false;
                }
              });
            } 
        }

    })
	.focus(function(){
		if (typeof lat !== 'undefined'){
			$(this).autocomplete('search');
		}
		console.log(this.id)
	})
	.data("ui-autocomplete")._renderItem = function (ul, item) {
		return $("<li></li>")
			.data("item.autocomplete", item)
			.append("<b>" + item.label + "</b><br>" + item.desc) //+ "</a>")
			.appendTo(ul);
	};
    $( "#planner-options-dest" ).autocomplete({
        autoFocus: true,
        minLength: 3,
        //appendTo: "#planner-options-dest-autocompletecontainer",
        messages : Locale.autocompleteMessages,
        source: Geocoder.geocoder,
        search: function( event, ui ) {
            $( "#planner-options-dest-latlng" ).val( "" );
        },
        focus: function( event, ui ) {
            //$( "#planner-options-dest" ).val( ui.item.label );
            //$( "#planner-options-dest-latlng" ).val( ui.item.latlng );
            return false;
        },
        select: function( event, ui ) {
            $( "#planner-options-dest" ).val( ui.item.label );
            
            $( "#project-description" ).html( ui.item.desc );
            console.log(ui.item)
            var point;
            map.removeLayer(markers['destinationMarker']);
            if (typeof ui.item.latlng !== 'undefined'){
              point = ui.item.latlng.split(",");
              addMarker({lat:Number(point[0]),lng:Number(point[1])}, ui.item.label, "destinationMarker", 'form')
              $( "#planner-options-dest-latlng" ).val( ui.item.latlng );
              return false;
            }
            else{
              var params = {
                text: ui.item.label,
                magicKey: ui.item.key,
                f: 'pjson'
              };
              $.ajax(esri_url + 'find', {
                data : params,
                success: function( data ) {
                  // console.log(data);
                  var json = JSON.parse(data)
                  var geometry = json.locations[0].feature.geometry;
                  addMarker({lat:Number(geometry.y),lng:Number(geometry.x)}, ui.item.label, "destinationMarker", 'form')
                  $( "#planner-options-dest-latlng" ).val( geometry.y + ',' + geometry.x );
                  return false;
                }
              });
            } 
        }
    })
    .data("ui-autocomplete")._renderItem = function (ul, item) {
               return $("<li></li>")
                   .data("item.autocomplete", item)
                   .append("<b>" + item.label + "</b><br>" + item.desc) //+ "</a>")
                   .appendTo(ul);
    };
}
function switchLocale() {
  $(".label-from").text(Locale.from);
  $(".label-via").text(Locale.via);
  $(".label-dest").text(Locale.to);
  $(".label-time").text(Locale.time);
  $(".label-date").text(Locale.date);
  $(".label-edit").text(Locale.edit);
  $(".label-plan").text(Locale.plan);

  $(".planner-options-timeformat").text(Locale.timeFormat);

  // $("#planner-options-date").datepicker('option', {
  //     dateFormat: Locale.dateFormat, 
  //     dayNames: Locale.days,
  //     dayNamesMin : Locale.daysMin,
  //     monthNames: Locale.months
  // });

  $("#planner-options-date").attr('aria-label', Locale.dateAriaLabel);
  $("#planner-options-from").attr('placeholder', Locale.originInput).attr('title', Locale.from);
  $("#planner-options-via").attr('placeholder', Locale.geocoderInput).attr('title', Locale.via);
  $("#planner-options-dest").attr('placeholder', Locale.destinationInput).attr('title', Locale.to);
  $("#planner-options-submit").attr('data-loading-text', Locale.loading);
}
