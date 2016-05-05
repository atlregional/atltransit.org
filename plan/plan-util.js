// ///////////// Geocoders
var bag42 = function (request, response) {
  $.ajax({
    url: 'http://bag42.nl/api/v0/geocode/json',
    dataType: 'json',
    data: {
      address: request.term
    },
    success: function (data) {
      response($.map(data.results, function (item) {
        return {
          label: item.formatted_address,
          value: item.formatted_address,
          latlng: item.geometry.location.lat + ',' + item.geometry.location.lng
        }
      }))
    }
  })
}
var bliksem_geocoder = function (request, response) {
  $.ajax({
    url: whitelabel_prefix + '/geocoder/' + request.term + '*',
    dataType: 'json',
    success: function (data) {
      response($.map(data.features, function (item) {
        return {
          label: item.properties.search,
          value: item.properties.search,
          latlng: item.geometry.coordinates[1] + ',' + item.geometry.coordinates[0]
        }
      }))
    }
  })
}
var google_geocoder = function (request, response) {
  var google_url = 'https://maps.googleapis.com/maps/api/geocode/json?address='
  var key = 'AIzaSyCSEnj3req-uXzLNeFuEgY-57M-AL1nq50'
  $.ajax({
    url: google_url + request.term + '&components=administrative_area:GA|country:US&sensor=false&key=' + key,
    dataType: 'json',
    success: function (data) {
      response($.map(data.results, function (item) {
        return {
          label: item.formatted_address,
          value: item.formatted_address,
          latlng: item.geometry.location.lat + ',' + item.geometry.location.lng
        }
      }))
    }
  })
}
var photon_geocoder = function (request, response) {
  this.url = 'http://photon.komoot.de/api/?'
  var params = {}
  var mapObj = {
    'ne': 'northeast',
    'sw': 'southwest',
    'nw': 'northwest',
    'se': 'southeast'
  }
  var newterm = request.term.replace(/(\s+)NE|(\s+)NW|(\s+)SE|(\s+)SW/gi, function (matched) {
    return ' ' + mapObj[matched.slice(1)]
  })
  params.q = newterm; // request.term.replace(/^NE$/i, 'northeast')//.replace(/^SE$/g, 'southeast').replace(/^NW$/g, 'northwest').replace(/^SW$/g, 'southwest')

  params.lat = '33.766'
  params.lon = '-84.405'
  params.limit = '10'
  var count = 0
  $.ajax(this.url, {
    data: params,
    // dataType: "jsonp",
    success: function (data) {
      console.log(data.features)
      response($.map(data.features, function (item) {
        if (item.properties.state === 'Georgia') {
          count++
          console.log(item.properties)
          console.log(count)
          var props = item.properties
          var desc = []
          var title = ''
          if (props.name) {
            // desc.push(props.name)
            title = props.name
          // desc[0] = '<strong>'+desc[0]+'<strong>'
          }

          if (props.housenumber && props.street) {
            if (!props.name) {
              title = props.housenumber + ' ' + props.street
            } else {
              desc.push(props.housenumber + ' ' + props.street)
            // desc.push(props.street)
            }
          }
          if (props.city) {
            desc.push(props.city)
          }
          if (props.osm_value && props.osm_key != 'building') {
            if (props.osm_key == 'highway') {
              desc.push('(road)')
            } else {
              desc.push('(' + props.osm_value + ')')
            }
          }

          return {
            label: props.name, // item.display_name.split(', Georgia, United States of America')[0],
            value: props.name, // item.display_name.split(', Georgia, United States of America')[0],
            latlng: item.geometry.coordinates[1] + ',' + item.geometry.coordinates[0],
            desc: desc.join(' ')
          }
        } // end if Georgia
      }))
      if (count === 0) {
        request.term = request.term + ' northeast'
        Geocoder.geocoder(request, response)
      }
    }
  })
}

// NOT IN USE
var esri_find = function (request, response) {
  // if (request.term.length === 0){
  //  console.log('hello geocoder')
  //  response([
  //   {
  //    label: '<i class="fa fa-location-arrow"></i> Your location',
  //    value: lat + ', ' + lon,
  //    // latlng: lat + ', ' + lon,
  //    desc: lat + ', ' + lon,
  //    key: '123'
  //  },

  // ])
  // }
  var data = {
    location: '-84.388847,33.750159',
    distance: 20000,
    f: 'pjson',
    searchExtents: '-85.386,34.618,-83.269,32.844',
    text: request.term
  }

  $.ajax({
    url: esri_url + 'find',
    dataType: 'json',
    data: data,
    success: function (data) {
      response($.map(data.locations, function (item) {
        var parts = item.name.split(', ')
        return {
          label: item.name,
          value: item.name,
          // latlng: '33,85',
          desc: parts[parts.length - 2] + ', ' + parts[parts.length - 1],
          key: item.magicKey
        }
      }))
    }
  })
}

// CURRENTLY IN USE
var esri_suggest = function (request, response) {
  // if (typeof request.term === 'undefined')
  console.log(request.term)
  if (request.term.length === 0) {
    console.log('hello geocoder')
    response([
      {
        label: '<i class="fa fa-location-arrow right-5"></i>Your location',
        value: lat + ', ' + lon,
        // latlng: lat + ', ' + lon,
        desc: lat + ', ' + lon,
        key: '123'
      },
      {
        label: '<i class="fa fa-plane right-5"></i>Hartsfield-Jackson International Airport',
        value: '33.64076290141101, -84.44622337818146',
        // latlng: lat + ', ' + lon,
        desc: '33.64076290141101, -84.44622337818146',
        key: '1234'
      },
    ])
  }
  // Unused code for intersections.  Not applicable.
  // if (/&/.test(request.term)){
  //  $.ajax({
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
  //        }
  //      }))
  //    }
  //  })
  // }
  else {
    var data = {
      location: '-84.388847,33.750159',
      distance: 20000,
      f: 'pjson',
      searchExtents: '-85.386,34.618,-83.269,32.844',
      text: request.term
    }
    $.ajax({
      url: esri_url + 'suggest',
      dataType: 'json',
      data: data,
      success: function (data) {
        response($.map(data.suggestions, function (item) {
          var parts = item.text.split(', ')
          return {
            label: item.text,
            value: item.text,
            // latlng: '33,85',
            desc: parts[1] + ', ' + parts[0],
            key: item.magicKey
          }
        }))
      }
    })
  }
}
var nominatim_geocoder = function (request, response) {
  this.url = 'http://open.mapquestapi.com/nominatim/v1/search.php?'
  var params = {}
  params.q = request.term
  params.viewbox = '-84.828,33.316,-83.864,34.297'
  params.countrycodes = 'US'
  params.format = 'json'
  // params.key = this.key
  // params.components = 'administrative_area:GA|country:US'
  // params.sensor = 'false'

  $.ajax(this.url, {
    data: params,
    success: function (data) {
      response($.map(data, function (item) {
        return {
          label: item.display_name.split(', Georgia, United States of America')[0],
          value: item.display_name.split(', Georgia, United States of America')[0],
          latlng: item.lat + ',' + item.lon
        }
      }))
    }
  })
}

var planningserver = whitelabel_prefix // + 'otp/routers/default/plan?'
  + 'ws/plan?'

String.prototype.lpad = function (padString, length) {
  var str = this
  while (str.length < length)
  str = padString + str
  return str
}
var currentTime = moment()
var Geocoder = Geocoder || {}
Geocoder.geocoder = esri_suggest

switchLocale()

var itineraries = null
var lines
var renderedRoute
var prevItin = {}
var itinDialog
var input

L.mapbox.accessToken = 'pk.eyJ1IjoiYXRscmVnaW9uYWwiLCJhIjoiQmZ6d2tyMCJ9.oENm3NSf--qHrimdm9Vvdw'
var map
var markers = {}
var esri_url = 'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/'

opt = {
  autoOpen: false,
  position: { my: 'center', at: 'left top+130', of: window },
  dialogClass: 'no-close noTitleStuff transparent-bg',
  width: 320,
  maxHeight: 600,
  // minHeight: 233,
  resizable: false,
  title: 'Plan a trip'
}

itinOpt = {
  autoOpen: false,
  position: { my: 'center', at: 'left center-80', of: window },
  dialogClass: 'no-close',
  width: 400,
  maxHeight: 400,
  // minHeight: 233,
  buttons: [
    {
      text: 'Close',
      click: function () {
        $(this).dialog('close')
      }
    }
  ],

  title: 'Trip Itinerary'
}

function mapClick (e) {
  console.log(e)
  var point = e.latlng
  var locationType
  // handle draggable marker case
  if (typeof point === 'undefined') {
    point = e.target.getLatLng()
    locationType = e.target.feature.properties.type
    map.removeLayer(markers[locationType])
  }
  console.log(point)
  if ($('#planner-options-from-latlng').val() === '' || locationType === 'originMarker') {
    console.log('origin')

    $('#planner-options-from-latlng').val(point.lat + ',' + point.lng)
    reverseGeocode(point, '#planner-options-from')

  }
  else if ($('#planner-options-dest-latlng').val() === '' || locationType === 'destinationMarker') {
    console.log('dest')
    dest = point
    $('#planner-options-dest-latlng').val(point.lat + ',' + point.lng)
    reverseGeocode(point, '#planner-options-dest')

  }
}
function getDisplay (data) {
  var display
  if (typeof data.address !== 'undefined') {
    if (data.address.Address) {
      display = data.address.Address
    }
    else if (data.address.house)
      display = data.address.house
    else if (data.address.building)
      display = data.address.building
    else if (data.address.house_number)
      display = data.address.house_number + ' ' + data.address.road
    else if (data.address.road)
      display = data.address.road + ', ' + data.address.city
    else if (data.address.neighborhood)
      display = data.address.neighborhood + ', ' + data.address.city + ', ' + data.address.state
    else if (data.address.city)
      display = data.address.city + ', ' + data.address.state
  }
  return display
}
function reverseGeocode (point, id) {
  this.url = 'http://nominatim.openstreetmap.org/reverse?'
  this.url = esri_url
  var params = {}
  params.location = point.lng + ',' + point.lat
  params.f = 'json'
  params.langCode = 'en'
  params.distance = 200
  // params.lat = point.lat
  // params.lon = point.lng
  // params.zoom = '18'
  // params.countrycodes = 'US'
  // params.format = 'json'
  // params.key = this.key
  // params.components = 'administrative_area:GA|country:US'
  // params.sensor = 'false'

  $.ajax(this.url + 'reverseGeocode', {
    data: params,
    success: function (data) {
      var json = JSON.parse(data)
      console.log(json)
      var display = getDisplay(json)

      $(id).val(display)

      var locationType = 'originMarker'
      if (id == '#planner-options-dest') {
        locationType = 'destinationMarker'
        setTimeout(function () {submit();}, 100)
      }
      addMarker(point, display, locationType, 'click')
    }
  })
}
function getBoundingBox (data) {
  var bounds = {}, coords, point, latitude, longitude

  // We want to use the “features” key of the FeatureCollection (see above)
  // data = data.geometry
  // console.log(data)
  // Loop through each “feature”
  if (typeof data.geometry !== 'undefined') {
    for (var i = 0; i < data.geometry.coordinates.length; i++) {
      // Pull out the coordinates of this feature
      // coords = data[i].geometry.coordinates[0]
      coords = data.geometry.coordinates[i]
      // console.log(coords)
      // For each individual coordinate in this feature's coordinates…
      for (var j = 0; j < coords.length; j++) {
        longitude = coords[j][0]
        latitude = coords[j][1]

        // Update the bounds recursively by comparing the current
        // xMin/xMax and yMin/yMax with the coordinate
        // we're currently checking
        bounds.xMin = bounds.xMin < longitude ? bounds.xMin : longitude
        // console.log(bounds.xMin)
        bounds.xMax = bounds.xMax > longitude ? bounds.xMax : longitude
        bounds.yMin = bounds.yMin < latitude ? bounds.yMin : latitude
        bounds.yMax = bounds.yMax > latitude ? bounds.yMax : latitude
      }

    }

    // Returns an object that contains the bounds of this GeoJSON
    // data. The keys of this object describe a box formed by the
    // northwest (xMin, yMin) and southeast (xMax, yMax) coordinates.
    return bounds
  }
}
function maxBounds (bounds1, bounds2) {
  var bounds = {}
  bounds.xMin = Math.min(bounds1.xMin, bounds2.xMin)
  bounds.xMax = Math.max(bounds1.xMax, bounds2.xMax)
  bounds.yMin = Math.min(bounds1.yMin, bounds2.yMin)
  bounds.yMax = Math.max(bounds1.yMax, bounds2.yMax)
  return bounds
}
function addMarker (point, title, locationType, source) {
  title = truncate(title, 60)
  console.log(title)
  var zoom
  var geoJSON = {
    'type': 'FeatureCollection',
    'features': []
  }
  var symbol = locationType === 'destinationMarker' ? 'fa-dot-circle-o' : 'fa-play-circle-o'
  if (geoJSON.features.length > 0) {
    // map.removeSource('markers', markers)
    map.removeLayer(markers)
    markers = {
      'originMarker': {},
      'destintationMarker': {}
    }
    zoom = map.getZoom() - 1
  } else {
    zoom = map.getZoom() + 2
  }
  geoJSON.features.push({
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [point.lng, point.lat]
    },
    'properties': {
      'title': title,
      'iconHtml': symbol,
      'type': locationType
    }
  })
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
          html: '<i class="fa fa-lg ' + feature.properties.iconHtml + '"></i>', // '<span class="glyphicon ' + feature.properties.iconHtml + '"></span>',
          // and the marker width and height
          iconSize: [30, 30],
          iconAnchor: [7, 10],
        })
      })
    },
    onEachFeature: function (feature, layer) {
      // ADD A POPUP
      layer.bindPopup(
        // "<h1>" +
        feature.properties.title + ''
      // "</h1>"
      )
      layer.on('mouseover', function (e) {
        this.openPopup()
      })
      layer.on('mouseout', function (e) {
        this.closePopup()
      })
      layer.on('dragend', function (event) {
        console.log(layer)
        console.log(event)
        // layer.setLatLng(event.target.getLatLng())
        mapClick(event)
      // var marker = event.target  // you could also simply access the marker through the closure
      // var result = marker.getLatLng()  // but using the passed event is cleaner
      // console.log(result)
      })
    }
  }).addTo(map)

// if (source !== 'click')
//  map.fitBounds(markers.getBounds())
}
function initializeForms () {
  setupAutoComplete()
  setupDatetime()
  setupSubmit()
  if ($('#planner-options-from').val() == '') {
    $('#planner-options-from-latlng').val('')
  }
  if ($('#planner-options-dest').val() == '') {
    $('#planner-options-dest-latlng').val('')
  }
  $('.mode-option').removeClass('active')
  $('#train').parent().addClass('active')
  $('.popover-dismiss').popover({
    container: 'body',
    html: true,
    // viewport: '#containz',
    content: '<p><a target="_blank" href="http://www.simplygetthere.org/">Simply Get There</a> combines data from this trip planner with services like <strong>MARTA Mobility</strong>, transport for veterans and disabled persons, and other on-demand services.</p><a target="_blank" href="http://www.simplygetthere.org/" type="button" class="center-block btn btn-primary">Visit Simply Get There!</a>',
    trigger: 'click',
    title: 'Looking for specialized services?' + '<button type="button" onclick="$(\'.popover-dismiss\').popover(\'hide\');" class="close">&times;</button>'
  })
  $('.close').trigger('click', function (e) {
    $('.popover-dismiss').popover('hide')
  })
}
function validate () {
  var valid = true

  if ($('#planner-options-from').val() == '') {
    $('#planner-options-from-latlng').val('')
  }
  if ($('#planner-options-dest').val() == '') {
    $('#planner-options-dest-latlng').val('')
  }
  $('#planner-options-from-error').remove()
  if ($('#planner-options-from').val() == '') {
    $('<div class="alert alert-danger" role="alert" id="planner-options-from-error" for="planner-options-from">' + Locale.startpointEmpty + '</div>').insertAfter('#planner-options-inputgroup-from')
    $('#planner-options-from').attr('aria-invalid', true)
    valid = false
  }else if ($('#planner-options-from-latlng').val() == '') {
    $('<div class="alert alert-danger" role="alert" id="planner-options-from-error" for="planner-options-from">' + Locale.noStartpointSelected + '</div>').insertAfter('#planner-options-inputgroup-from')
    $('#planner-options-from').attr('aria-invalid', true)
    valid = false
  }
  $('#planner-options-dest-error').remove()
  if ($('#planner-options-dest').val() == '') {
    $('<div class="alert alert-danger" role="alert" id="planner-options-dest-error" for="planner-options-dest">' + Locale.destinationEmpty + '</div>').insertAfter('#planner-options-inputgroup-dest')
    $('#planner-options-dest').attr('aria-invalid', true)
    valid = false
  }else if ($('#planner-options-dest-latlng').val() == '') {
    $('<div class="alert alert-danger" role="alert" id="planner-options-dest-error" for="planner-options-dest">' + Locale.noDestinationSelected + '</div>').insertAfter('#planner-options-inputgroup-dest')
    $('#planner-options-dest').attr('aria-invalid', true)
    valid = false
  }
  if (!valid) {return valid;}
  $('#planner-options-from').attr('aria-invalid', false)
  $('#planner-options-dest').attr('aria-invalid', false)
  $('#planner-options-time-error').remove()
  if (!getTime()) {
    $('<div class="alert alert-danger" role="alert" id="planner-options-time-error" for="planner-options-time">' + Locale.noValidTime + '</div>').insertAfter('#planner-options-inputgroup-time')
    valid = false
    $('#planner-options-time').attr('aria-invalid', true)
  }
  $('#planner-options-date-error').remove()
  if (!getDate()) {
    $('<div class="alert alert-danger" role="alert" id="planner-options-date-error" for="planner-options-date">' + Locale.noValidDate + '</div>').insertAfter('#planner-options-inputgroup-date')
    $('#planner-options-date').attr('aria-invalid', true)
    return false
  }
  var minDate = $('#planner-options-date').attr('min')
  var maxDate = $('#planner-options-date').attr('max')
  if (getDate() < minDate) {
    $('<div class="alert alert-danger" role="alert" id="planner-options-date-error" for="planner-options-date">' + Locale.dateTooEarly(minDate) + '</div>').insertAfter('#planner-options-inputgroup-date')
    valid = false
    $('#planner-options-date').attr('aria-invalid', true)
  }else if (getDate() > maxDate) {
    $('<div class="alert alert-danger" role="alert" id="planner-options-date-error" for="planner-options-date">' + Locale.dateTooLate(maxDate) + '</div>').insertAfter('#planner-options-inputgroup-date')
    $('#planner-options-date').attr('aria-invalid', true)
    valid = false
  }
  if (valid) {
    $('#planner-options-time').attr('aria-invalid', false)
    $('#planner-options-date').attr('aria-invalid', false)
  }
  return valid
}
function hideForm () {
  $('#planner-advice-div')
    .show()
  $('#planner-advice-msg').html('<i alt="loading" style="line-height:2;" title="loading" class="fa-2x fa fa-circle-o-notch fa-spin"></i>')
  $('#planner-advice-div').attr('aria-hidden', false)
  $('#planner-advice-div').removeClass('hidden')
  $('#hide-results').show()

  $('#hide-results').removeClass('hidden')
}
function showForm () {
  $('.plannerpanel.planner-options').removeClass('planner-summary').addClass('planner-form')
  $('#planner-options-form').attr('aria-hidden', false)
  $('#planner-options-form').show()
  $('#planner-options-desc-row').hide()
  if ($('.planner-advice-modal').dialog()) {
    $('.planner-advice-modal').dialog('close')
  }
  hideResults()
  $('#planner-advice-msg').html('')
  $('#planner-advice-div').find('.alert').remove()
  $('#planner-advice-div').hide()
  $('#planner-advice-div').attr('aria-hidden', true)
  $('#planner-advice-div').addClass('hidden')
  $('#planner-options-desc-row').attr('aria-hidden', true)
  $('#planner-options-desc-row').addClass('hidden')
  $('#hide-results').hide()
  $('#planner-options-submit').button('reset')
}
function hideResults () {
  $('#planner-advice-container').find('.alert').remove()
  $('#planner-advice-container').hide()
  $('#planner-advice-container').attr('aria-hidden', true)
  $('#planner-advice-container').addClass('hidden')
}
function showResults () {
  $('#planner-advice-container').show()
  $('#planner-advice-container').attr('aria-hidden', false)
  $('#planner-advice-container').removeClass('hidden')
}
function toggleResults () {
  if (!$('#planner-options-desc-row').hasClass('hidden')) {
    if ($('#planner-advice-container').hasClass('hidden')) {
      showResults()

    } else {
      hideResults()
    }
  }
}
function getPrettyDate () {
  var date = getDate().split('-')
  console.log(date)
  date = new Date(date[0], date[1] - 1, date[2])
  console.log(Locale.days[date.getDay()])
  return Locale.days[date.getDay()] + ' ' + Locale.months[date.getMonth()] + ' ' + date.getDate()
}
function makeBliksemReq (plannerreq) {
  req = {}
  bliksemReq = {}
  if (plannerreq['arriveBy']) {
    bliksemReq['arrive'] = true
  } else {
    bliksemReq['depart'] = true
  }

  bliksemReq['from-latlng'] = plannerreq['fromLatLng']
  bliksemReq['to-latlng'] = plannerreq['toLatLng']
  bliksemReq['date'] = plannerreq['date'] + 'T' + plannerreq['time']
  bliksemReq['showIntermediateStops'] = true
  return bliksemReq
}
function epochtoIS08601date (epoch) {
  var d = new Date(epoch)
  var date = String(d.getFullYear()) + '-' + String((d.getMonth() + 1)).lpad('0', 2) + '-' + String(d.getDate()).lpad('0', 2)
  return date
}
function epochtoIS08601time (epoch) {
  var d = new Date(epoch)
  var time = d.getHours().toString().lpad('0', 2) + ':' + d.getMinutes().toString().lpad('0', 2) + ':' + d.getSeconds().toString().lpad('0', 2)
  return time
}
function earlierAdvice () {
  if (!itineraries) {
    return false
  }
  $('#planner-advice-earlier').button('loading')
  var minEpoch = 9999999999999
  $.each(itineraries , function (index, itin) {
    if (itin.endTime < minEpoch) {
      minEpoch = itin.endTime
    }
  })
  var plannerreq = makePlanRequest()
  plannerreq.arriveBy = true
  minEpoch -= 60 * 1000
  console.log(minEpoch)
  plannerreq.date = epochtoIS08601date(minEpoch)
  plannerreq.time = epochtoIS08601time(minEpoch)
  var url = planningserver + jQuery.param(plannerreq)
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'jsonp',
    success: function (data) {
      if (
        typeof data.plan == 'undefined' // ||
      // typeof data.plan.itineraries == "undefined" || // !('itineraries' in data.plan) ||
      // data.plan.itineraries.length == 0
      ) {
        return
      }
      // var startDate = $('#planner-advice-list').find('.planner-advice-dateheader').first().html()
      $.each(data.plan.itineraries , function (index, itin) {
        // var prettyStartDate = prettyDateEpoch(itin.startTime)
        // if (startDate != prettyStartDate){
        //     $('<div class="planner-advice-dateheader">'+prettyStartDate+'</div>').insertAfter('#planner-advice-earlier')
        //     startDate = prettyStartDate
        // }
        // itinButton(itin).insertAfter($('#planner-advice-list').find('.planner-advice-dateheader').first())
      })
      $('#planner-advice-earlier').button('reset')
    }
  })
  return false
}
function laterAdvice () {
  if (!itineraries) {
    return false
  }
  $('#planner-advice-later').button('loading')
  var maxEpoch = 0
  $.each(itineraries , function (index, itin) {
    if (itin.startTime > maxEpoch) {
      maxEpoch = itin.startTime
    }
  })
  maxEpoch += 120 * 1000
  var plannerreq = makePlanRequest()
  plannerreq.arriveBy = false
  plannerreq.date = epochtoIS08601date(maxEpoch)
  plannerreq.time = epochtoIS08601time(maxEpoch)
  var url = planningserver + jQuery.param(plannerreq)
  console.log(decodeURIComponent(url))
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'jsonp',
    success: function (data) {
      if (
        typeof data.plan == 'undefined' // ||
      // typeof data.plan.itineraries == "undefined" || // !('itineraries' in data.plan) ||
      // data.plan.itineraries.length == 0
      ) {
        return
      }
      // var startDate = $('#planner-advice-list').find('.planner-advice-dateheader').last().html()
      $.each(data.plan.itineraries , function (index, itin) {
        var prettyStartDate = prettyDateEpoch(itin.startTime)
        if (startDate != prettyStartDate) {
          // $(('<div class="planner-advice-dateheader">'+prettyStartDate+'</div>')).insertAfter($('#planner-advice-list').find('.planner-advice-itinbutton').last())
          // itinButton(itin).insertAfter($('#planner-advice-list').find('.planner-advice-dateheader').last())
          // startDate = prettyStartDate
        } else {
          itinButton(itin).insertAfter($('#planner-advice-list').find('.planner-advice-itinbutton').last())
        }
      })
      $('#planner-advice-later').button('reset')
    }
  })
  return false
}
function prettyDateEpoch (epoch) {
  var date = new Date(epoch)
  return Locale.days[date.getDay()] + ' ' + date.getDate() + ' ' + Locale.months[date.getMonth()]
}
function timeFromEpoch (epoch) {
  var date = moment(epoch)
  return date.format('h:mm a')
}
function highlightLeg (el) {
  // console.log()
  var legName = el.id
  lines[legName].layer.setStyle({
    color: '#aaa',
    weight: 10
  })
}
function resetLeg (el) {
  var legName = el.id
  lines[legName].layer.resetStyle(lines[legName].layer)
}
function legItem (leg, legName) {
  var legItem = $('<li class="list-group-item advice-leg" id="' + legName + '" onmouseover="highlightLeg(this)" onmouseout="resetLeg(this)"><div></div></li>')

  var icon = getIcon(leg)
  // console.log(leg)
  if (leg.mode == 'WALK' || leg.mode == 'CAR' || leg.mode == 'BICYCLE') {
    if (leg.from.name == leg.to.name) {
      return
    }
    if (leg.mode == 'CAR') {
      leg.mode = 'Drive'
    }
    else if (leg.mode == 'BICYCLE') {
      leg.mode = 'Bike'
    }
    legItem.append('<div class="list-group-item-heading"><h4 class="leg-header"><b>' + icon + ' ' + toTitleCase(leg.mode) + '</b></h4></div>')
  } else {
    var headsign = leg.routeLongName

    if (leg.headsign == null || typeof leg.headsign === 'undefined') {
      headsign = ''
    } else {
      console.log(leg.headsign)
      headsign = trimHeadsign(leg.headsign)
    }

    console.log(headsign)
    console.log(leg.headsign)
    // headsign = trimHeadsign(headsign)
    // var headsignParts = headsign ? headsign.split(" ") : ""
    // if (headsignParts[0] === leg.route || headsignParts[0] === "MARTA"){
    //   headsign = headsign.slice(headsignParts[0].length, headsign.length)
    // }
    legItem.append('<div class="list-group-item-heading"><h4 class="leg-header"><b>' + icon + ' ' + '</b> ' + headsign + '<span class="leg-header-agency-name pull-right"><small>' + leg.agencyId + '</small></span></h4>')
  }
  var startTime = moment(leg.startTime - (leg.departureDelay ? leg.departureDelay : 0)).format('hh:mm a')
  var delayMin = (leg.departureDelay / 60) | 0
  if ((leg.departureDelay % 60) >= 30) {
    delayMin += 1
  }
  if (delayMin > 0) {
    startTime += '<span class="delay"> +' + delayMin + '</span>'
  }else if (delayMin > 0) {
    startTime += '<span class="early"> ' + delayMin + '</span>'
  }else if (leg.departureDelay != null) {
    // startTime += '<span class="ontime"> ✓</span>'
  }

  var endTime = moment(leg.endTime - (leg.arrivalDelay ? leg.arrivalDelay : 0)).format('hh:mm a')
  var delayMin = (leg.arrivalDelay / 60) | 0
  if ((leg.arrivalDelay % 60) >= 30) {
    delayMin += 1
  }
  if (delayMin > 0) {
    endTime += '<span class="delay"> +' + delayMin + '</span>'
  }else if (delayMin > 0) {
    endTime += '<span class="early"> ' + delayMin + '</span>'
  }else if (leg.arrivalDelay != null) {
    // endTime += '<span class="ontime"> ✓</span>'
  }

  if (leg.from.platformCode && leg.mode == 'RAIL') {
    legItem.append('<div><b>' + startTime + '</b> ' + toTitleCase(leg.from.name) + ' <small class="grey">' + Locale.platformrail + '</small> ' + leg.from.platformCode + '</div>')
  }else if (leg.from.platformCode && leg.mode != 'WALK') {
    legItem.append('<div><b>' + startTime + '</b> ' + toTitleCase(leg.from.name) + ' <small class="grey">' + Locale.platform + '</small> ' + leg.from.platformCode + '</div>')
  } else {
    legItem.append('<div><b>' + startTime + '</b> ' + toTitleCase(leg.from.name) + '</div>')
  }
  if (leg.to.platformCode && leg.mode == 'RAIL') {
    legItem.append('<div><b>' + endTime + '</b> ' + toTitleCase(leg.to.name) + ' <small class="grey">' + Locale.platformrail + '</small> ' + leg.to.platformCode + '</div>')
  }else if (leg.to.platformCode && leg.mode != 'WALK') {
    legItem.append('<div><b>' + endTime + '</b> ' + toTitleCase(leg.to.name) + ' <small class="grey">' + Locale.platform + '</small> ' + leg.to.platformCode + '</div>')
  } else {
    legItem.append('<div><b>' + endTime + '</b> ' + toTitleCase(leg.to.name) + '</div>')
  }
  if (leg.mode === 'SUBWAY' || leg.mode === 'BUS') {
    legItem.append('<a class="btn btn-xs btn-secondary" href="/#tab=stop-code&stopId=' + leg.from.stopId.agencyId + '_' + leg.from.stopId.id + '">Get realtime</a>')
  }
  return legItem
}
function getName (leg) {
  var name
  if (leg.route === 'BLUE' || leg.route === 'GREEN' || leg.route === 'RED' || leg.route === 'GOLD' || leg.agencyId == 'ASC') {
    name = leg.route
  }
  else if (leg.agencyId == 'MARTA' || leg.agencyId == 'GRTA' || leg.agencyId == 'GCT' || leg.agencyId == 'CCT' ) {
    name = leg.agencyId
  }
  else if (leg.mode == 'WALK' || leg.mode == 'BICYCLE') {
    name = leg.mode
  } else {
    name = 'route'
  }
  return name
}
function renderItinerary (index, focus, el, click) {
  var itin = itineraries[index]
  console.log(el)
  $el = $(el)
  if (!focus) {
    renderItinerary(prevItin.index, true, prevItin.el, false)
    return
  }
  if (typeof lines !== 'undefined') {
    $.each(lines, function (key, line) {
      map.removeLayer(line.layer)
    })
  }
  if (click) {
    dollarFormatter = d3.format('$,.2f')
    distanceFormatter = d3.format('.2f')
    var fare
    var agencyNest = d3.nest()
      .key(function (d) { return d.agencyId; })
      .map(itin.legs)
    delete agencyNest['null']
    delete agencyNest['undefined']
    console.log(agencyNest)
    if (itin.fare !== null) {
      if (Object.keys(agencyNest).length > 1) {
        fare = 'See <a href="/fares/calculator">fare calculator</a>.'
      }
      else if (typeof itin.fare !== 'undefined') {
        fare = dollarFormatter(itin.fare.fare.regular.cents / 100)
      }

    } else {
      fare = 'N/A'
    }
    $('#planner-advice-msg').html('')
    $('#planner-leg-list').html('')
    $('#planner-summary').html(
      '<h4 class="card-title">Trip Summary<button class="btn btn-secondary btn-xs pull-right" style="padding:0 4px 0 4px "><i style="font-size:0.7em" class="fa fa-link"></i></button></h4>' +
      '<p class="card-text">Fare: ' + fare + '</p>' +
      '<p class="card-text">Time: ' + getDiff(itin.startTime, itin.endTime) + '</p>' +
      '<p class="card-text">Walk distance: ' + distanceFormatter(itin.walkDistance / 1609.34) + '</p>' +
      '<p class="card-text">Transfers: ' + itin.transfers + '</p>'
    )
    prevItin.index = index
    prevItin.el = el
    // console.log(el)

  }
  lines = {}

  var generic = {
    'type': 'Feature',
    'properties': {},
    'geometry': {
      'type': 'MultiLineString',
      'coordinates': []
    }
  }
  $.each(itin.legs , function (index, leg) {
    var line = {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'MultiLineString',
        'coordinates': []
      }
    }
    var points = polyline.decode(leg.legGeometry.points)
    line.geometry.coordinates.push(points)
    var name = 'route'
    name = getName(leg)
    lines[name + index] = {}
    lines[name + index].data = line
    lines[name + index].leg = leg
    lines[name + index].name = name
    if (click) {
      $('#planner-leg-list').append(legItem(leg, name + index))
    }
    var bounds
    var max
    if (index === itin.legs.length - 1) {
      // console.log("HERE!")
      $.each(lines, function (i, line) {
        if (typeof bounds === 'undefined') {
          // console.log(line.data)
          bounds = getBoundingBox(line.data)
        } else {
          // console.log(line.data)
          bounds = maxBounds(bounds, getBoundingBox(line.data))
        // console.log(bounds)
        }
        // console.log(i)
        // console.log(leg)
        // TODO: change route to normal mapbox
        var dash = /WALK/.test(i) ? '3,10' : null
        line.layer = L.geoJson(line.data, {
          style: {
            color: getColor(line.leg),
            opacity: 0.8,
            weight: 5,
            // fill: true,
            // fillColor: 'blue',
            dashArray: dash,
          },
          onEachFeature: function (feature, layer) {
            // // ADD A POPUP
            layer.bindPopup(
              // "<h1>" +
              getIcon(line.leg) + ''
            // "</h1>"
            )
            layer.on('mouseover', function (e) {
              this.openPopup()
            })
            layer.on('mouseout', function (e) {
              map.closePopup()

            })
          }
        }).addTo(map)
      })
      if (typeof bounds !== 'undefined' && click) {
        map.fitBounds([[bounds.yMin, bounds.xMin], [bounds.yMax, bounds.xMax]])
      }
    }
  })

  // $('#planner-advice-list').find('.btn').removeClass('active')
  // $(this).addClass('active')

  if ($el.hasClass('active')) {
    if (click) {
      // console.log('click!')
      toggleResults()
    }
  }
  if (click) {
    if ($('#planner-advice-container').hasClass('hidden')) {
      $el.blur()
    } else {
      $el.focus()
    }
  }
}
function itinButton (index, itin) {
  var hidden = ''
  // if (index){ // check if first button, if not add 'hidden' class
  //   hidden = 'hidden '
  // }
  // var itinButton = $('<button type="button" class="btn btn-sm btn-secondary planner-advice-itinbutton" onclick="renderItinerary('+itineraries.length+',true)"></button>')
  var itinButton = $(
    '<label class="btn btn-default planner-advice-itinbutton" style="margin-bottom:0" onmouseout="renderItinerary(' + itineraries.length + ',false, this, false)" onmouseover="renderItinerary(' + itineraries.length + ',true, this, false)" onclick="renderItinerary(' + itineraries.length + ',true, this, true)">' +
    '<input type="radio" name="options" id="option1" autocomplete="off" checked>' +
    '</label>'
  )
  itineraries.push(itin)
  var diffDisplay = getDiff(itin.startTime, itin.endTime)

  var itinSummary = ''
  $.each(itin.legs, function (i, leg) {
    var text = getIcon(leg)
    // remove walk icon if distance is less than threshold
    if (leg.mode === 'WALK' && itin.legs.length === 1) {
      text = text
    }
    else if (
      leg.mode === 'WALK' &&
      (
      leg.distance < .5 * 1609.34 ||
      (itin.legs.length - 1 === i && i === 0) // there is only one leg and
      )
    ) {
      text = ''
    }
    itinSummary += (i == 0 || text == '' || itinSummary == '') ? text : ' <i class="fa fa-chevron-right"></i> ' + text
  })
  // itinButton.append('<div class="text-left">'+itinSummary+'<span class="'+hidden+'"><b>'+timeFromEpoch(itin.startTime)+'</b>  <span class="glyphicon glyphicon-chevron-right"></span> <b>'+timeFromEpoch(itin.endTime)+'</b> | '+Locale.amountTransfers(itin.transfers)+ ' | ' + diffDisplay + '</span></div>')
  itinButton.append('<div class="text-left">' + itinSummary + '<span class="pull-right' + hidden + '">' + diffDisplay + '</span></div>')
  // itinButton.append('<div class="text-left">'+Locale.amountTransfers(itin.transfers)+ ' | ' + diffDisplay + '</div>')
  return itinButton
}
function getDiff (startTime, endTime) {
  var start = moment(startTime)
  var end = moment(endTime)
  var diff = end.diff(start, 'minutes')
  var minutes = diff % 60
  var hours = Math.floor(diff / 60)
  var diffDisplay = hours ? hours + ' h ' + minutes + ' min' : minutes + ' min'
  return diffDisplay
}
function getIcon (leg) {
  return leg.mode === 'WALK' ? ' <img src="/assets/images/pedestrian.svg" alt="Walk" height="20" alt="Walking"> ' :
    leg.mode === 'SUBWAY' ? ' <span class="' + labelMap[leg.routeShortName] + '"><i class="fa fa-lg fa-train" alt="' + leg.agencyId + '"></i> ' + leg.routeShortName + '</span> ' :
      leg.mode === 'TRAM' ? ' <span class="' + labelMap[leg.agencyId] + '"><i class="fa fa-lg fa-train" alt="' + leg.agencyId + '"></i> ' + leg.routeShortName + '</span> ' :
        leg.mode === 'CAR' ? ' <i class="fa fa-lg fa-car" alt="Drive" height="20"></i> ' :
          leg.mode === 'BICYCLE' ? ' <i class="fa fa-lg fa-bicycle" alt="Bike" height="20"></i> ' :
            leg.mode === 'BUS' ? ' <span class="' + labelMap[leg.agencyId] + '"><i class="fa fa-lg fa-bus" alt="' + leg.agencyId + '"></i> ' + leg.routeShortName + ' </span>' :
              ''
}
function planItinerary (plannerreq) {
  var url = planningserver + jQuery.param(plannerreq)
  console.log(url)
  // $('#planner-advice-container').prepend('<div class="progress progress-striped active">'+
  // '<div class="progress-bar"  role="progressbar" aria-valuenow="100" aria-valuemin="100" aria-valuemax="100" style="width: 100%">'+
  // '<span class="sr-only">'+Locale.loading+'</span></div></div>')
  $('#planner-advice-list').html('')
  $('#planner-leg-list').html('')

  $.ajax({
    url: url + "&src=atltransit.org",
    type: 'GET',
    dataType: 'jsonp',
    success: function (data) {
      console.log(data)
      $('#planner-leg-list').html('')
      itineraries = []
      $('#planner-advice-list').html('')
      $('.progress.progress-striped.active').remove()
      if (
        typeof data.plan == 'undefined' // ||
      // typeof data.plan.itineraries == "undefined" || // !('itineraries' in data.plan) ||
      // data.plan.itineraries.length == 0
      ) {
        $('#planner-advice-container').prepend('<div class="row alert alert-danger" role="alert">' + Locale.noAdviceFound + '</div>')
        return
      }
      $('#planner-advice-container').find('.alert').remove()
      var startDate = null
      if (data.plan !== null) {
        // $('#planner-advice-list').append('<button type="button" class="btn btn-primary" id="planner-advice-earlier" data-loading-text="'+Locale.loading+'" onclick="earlierAdvice()">'+Locale.earlier+'</button>')
        $.each(data.plan.itineraries , function (index, itin) {
          // var prettyStartDate = prettyDateEpoch(itin.startTime)
          // if (startDate != prettyStartDate){
          //     $('#planner-advice-list').append('<div class="planner-advice-dateheader">'+prettyStartDate+'</div>')
          //     startDate = prettyStartDate
          // }
          $('#planner-advice-list').append(itinButton(index, itin))
        })
        // $('#planner-advice-list').append('<button type="button" class="btn btn-primary" id="planner-advice-later" data-loading-text="'+Locale.loading+'" onclick="laterAdvice()">'+Locale.later+'</button>')
        $('#planner-advice-list').find('.planner-advice-itinbutton').first().trigger('click')
        $('#planner-advice-list').find('.planner-advice-itinbutton').first().trigger('click')
        $('#planner-options-submit').button('reset')
      // earlierAdvice()
      // laterAdvice()
      } else {
        console.log('invalid trip plan')
        $('#planner-advice-msg').html('You trip plan was unsuccessful.  Please modify your trip details and try again.')
      }
    }
  })
}
function getColor (leg) {
  if (leg.mode === 'WALK') return '#555'
  else if (leg.route === 'BLUE') return 'rgb(0, 0, 255)'
  else if (leg.route === 'GREEN') return 'rgb(0, 153, 51)'
  else if (leg.route === 'RED') return 'rgb(255, 0, 0)'
  // else if(leg.route === "GOLD") return 'rgb(255, 215, 0)'
  else if (leg.route === 'GOLD') return 'rgb(255, 215, 0)'
  else if (/MARTA/g.test(leg.agencyId)) return 'rgb(247, 144, 68)'
  else if (/ASC/g.test(leg.agencyId)) return 'rgb(98, 98, 154)'
  else if (/CCT/g.test(leg.agencyId)) return 'rgb(165, 56, 149)'
  else if (/GCT/g.test(leg.agencyId)) return 'rgb(154, 14, 52)'
  else if (leg.agencyId === '0') return 'rgb(154, 14, 52)'
  else if (/GRTA/g.test(leg.agencyId)) return 'rgb(71, 168, 213)'
  else if (leg.mode === 'BICYCLE') return 'rgb(68, 15, 0)'
  else if (leg.mode === 'SUBWAY') return 'rgb(255, 0, 0)'
  else if (leg.mode === 'RAIL') return 'rgb(176, 0, 0)'
  else if (leg.mode === 'BUS') return 'rgb(0, 255, 0)'
  else if (leg.mode === 'TRAM') return 'rgb(255, 0, 0)'
  return '#aaa'
}
function makePlanRequest () {
  plannerreq = {}
  plannerreq.fromPlace = $('#planner-options-from-latlng').val()
  plannerreq.fromName = $('#planner-options-from').val()
  plannerreq.toPlace = $('#planner-options-dest-latlng').val()
  plannerreq.toName = $('#planner-options-dest').val()
  plannerreq.mode = $('input[name=mode-select]:checked').val() || $('.mode-option').val()
  plannerreq.time = $('.planner-time-btn:first-child').val() === 'Leave now' ? moment().valueOf() : getTime()
  plannerreq.date = getDate()
  console.log()
  var bikeTriangle = $('.bike-triangle.active')
  if (bikeTriangle.length && plannerreq.mode.split(',')[0] === 'BICYCLE') {
    plannerreq.triangleSafetyFactor = 0
    plannerreq.triangleSlopeFactor = 0
    plannerreq.triangleTimeFactor = 0
    plannerreq.optimize = 'TRIANGLE'
    for (var i = 0; i < bikeTriangle.length; i++) {
      console.log(bikeTriangle[i].id)
      if (bikeTriangle[i].id === 'quick') {
        plannerreq.triangleTimeFactor = 1 / bikeTriangle.length
      }
      if (bikeTriangle[i].id === 'flat') {
        plannerreq.triangleSlopeFactor = 1 / bikeTriangle.length
      }
      if (bikeTriangle[i].id === 'bike-friendly') {
        plannerreq.triangleSafetyFactor = 1 / bikeTriangle.length
      }
    }
  }
  plannerreq.arriveBy = $('.planner-time-btn:first-child').val() === 'Arrive by' ? true : false
  // plannerreq.transferPenalty = 3000
  // plannerreq.walkReluctance = 3
  plannerreq.maxWalkDistance = 5000
  // plannerreq.preferredRoutes = 'MARTA_RED,MARTA_BLUE,MARTA_GREEN,MARTA_GOLD'
  return plannerreq
}
function truncate (word, num) {
  if (word.length > num) {
    return word.substring(0, num) + '...'
  } else {
    return word
  }
}
function submit () {
  // Remove lines when redrawing
  // console.log('submitting')
  if ($("input[type='radio'][name='mode-select']:checked").val() === 'specialized') {
    // alert('Please use the One-Click!')
    $('.popover-dismiss').popover('show')
    return
  }

  // TODO: determine if this is needed
  // $.each(map.sources, function(key, val){
  //  if (key !== "mapbox" && key !=="markers"){map.removeSource(key);}
  // })
  $('#planner-options-submit').button('loading')
  console.log('hiding form')
  hideForm()
  $('#planner-options-desc').html('')
  var plannerreq = makePlanRequest()
  console.log(plannerreq)
  var summary = $('<p></p>')
  summary.append('<b>' + Locale.from + '</b> ' + truncate(plannerreq.fromName, 42) + '</br>')
  summary.append('<b>' + Locale.to + '</b> ' + truncate(plannerreq.toName, 42))
  $('#planner-options-desc').append(summary)
  $('#planner-options-desc').append('<p>' + getPrettyDate() + ', ' + getTime() + '</p>')
  if (parent) { // && Modernizr.history){
    parent.location.hash = jQuery.param(plannerreq)
    history.pushState(plannerreq, document.title, window.location.href)
    planItinerary(plannerreq)
  }
// $('#planner-options-desc').children()[0].click(function(){
//   showForm()
// })
}
function clearHash () {
  $('.alert').hide()
  history.pushState({id: 'base'}, document.title, '/plan/')
  initializeForms()
  showForm()
  geoJSON = {
    'type': 'FeatureCollection',
    'features': []
  }

  $('#planner-options-from-latlng').val('')
  $('#planner-options-from').val('')
  $('#planner-options-dest-latlng').val('')
  $('#planner-options-dest').val('')
  $('#planner-advice-list').html('')
  map.eachLayer(function (layer) {
    console.log(layer)
    if (typeof layer.feature !== 'undefined')
      map.removeLayer(layer)
  })
}
function restoreFromHash () {
  var plannerreq = jQuery.unparam(window.location.hash)
  if ('time' in plannerreq) {
    setTime(plannerreq['time'])
  }
  if ('date' in plannerreq) {
    setDate(plannerreq['date'])
  }
  if ('fromName' in plannerreq) {
    $('#planner-options-from').val(plannerreq['fromName'])
  }
  if ('fromPlace' in plannerreq) {
    $('#planner-options-from-latlng').val(plannerreq['fromPlace'])
    var latlng = plannerreq['fromPlace'].split(',')
    console.log(Number(latlng[0]))
    addMarker({lat: Number(latlng[0]),lng: Number(latlng[1])}, plannerreq['fromName'], 'originMarker', 'form')
  }
  if ('toName' in plannerreq) {
    $('#planner-options-dest').val(plannerreq['toName'])
  }
  if ('mode' in plannerreq) {
    $('#train').parent().removeClass('active')
    $('input[type=radio][value="' + plannerreq.mode + '"]').prop('checked', true).parent().addClass('active')
    if (plannerreq.mode.split(',')[0] === 'BICYCLE') {
      $('#bike-triangle-container').show()
    }
    $('.mode-option').val(plannerreq.mode)
  }
  if ('toPlace' in plannerreq) {
    $('#planner-options-dest-latlng').val(plannerreq['toPlace'])
    var latlng = plannerreq['toPlace'].split(',')
    console.log(Number(latlng[0]))
    addMarker({lat: Number(latlng[0]),lng: Number(latlng[1])}, plannerreq['toName'], 'destinationMarker', 'form')
  }
  if ('arriveBy' in plannerreq && plannerreq['arriveBy'] == 'true') {
    // $('#planner-options-arrivebefore').click()
    $('.planner-time-menu li a:eq(1)').trigger('click')
  } else {
    // $('#planner-options-departureafter').click()
    $('.planner-time-menu li a:eq(2)').trigger('click')
  }
  if (validate()) {submit();}
}
function setupSubmit () {
  var mainMessage = 'This trip planner is in beta.  If trip itineraries are not what you expect, try <a href="https://maps.google.com">Google Transit</a> as results may vary.'
  var carMessage = 'Looking for Park & Ride directions?  First, <a href="/maps/parknride">choose a Park & Ride location</a>.'
  $(document).on('submit', '.validateDontSubmit', function (e) {
    // prevent the form from doing a submit
    e.preventDefault()
    return false
  })
  var $modeSelect = $('input:radio[name="mode-select"]')
  $modeSelect.change(
    function () {
      var checked = $(this).is(':checked')
      var val = $(this).val()
      if (checked && val === 'CAR') {
        $('.main-message').html(carMessage)
        $('#bike-triangle-container').hide()
      } else if (checked && val.split(',')[0] === 'BICYCLE') {
        $('.main-message').html('')
        $('#bike-triangle-container').show()
      } else {
        $('#bike-triangle-container').hide()
        $('.main-message').html(mainMessage)
      }
    })
  $('.bike-triangle').click(function(){
    $(this).toggleClass('active')
  })
  $('.main-message').html(mainMessage)
  $('#planner-options-submit').click(function (e) {
    var $theForm = $(this).closest('form')
    if ((typeof ($theForm[0].checkValidity) == 'function') && !$theForm[0].checkValidity()) {
      return
    }
    if (validate()) {submit();}
  })
  // Reverse locations button
  $('.reverse-locations').click(function (e) {
    var originLatlng = $('#planner-options-from-latlng').val()
    var origin = $('#planner-options-from').val()
    var destLatlng = $('#planner-options-dest-latlng').val()
    var dest = $('#planner-options-dest').val()
    $('#planner-options-from-latlng').val(destLatlng)
    $('#planner-options-from').val(dest)
    $('#planner-options-dest-latlng').val(originLatlng)
    $('#planner-options-dest').val(origin)
    // TODO: change markers up
    var originArr = originLatlng.split(',')
    var destArr = destLatlng.split(',')
    if (originLatlng !== '') {
      markers.destinationMarker.getLayers()[0].setLatLng(new L.LatLng(+originArr[0], +originArr[1]))
    }
    if (destLatlng !== '') {
      markers.originMarker.getLayers()[0].setLatLng(new L.LatLng(+destArr[0], +destArr[1]))
    }
  })
  // Setup auto resubmittal of trip plan
  $('.planner-control').change(resubmit)
  $('.planner-control.bike-triangle').click(resubmit)
  $('.reverse-locations').click(resubmit)
}

function resubmit () {
  // console.log('trip details changed')
  if ($('#planner-options-dest-latlng').val() && $('#planner-options-from-latlng').val()) {
    if (validate()) {submit();}
  }
}

function setupAutoComplete () {
  console.log('setting up')
  // if (typeof inputId !== 'undefined'){
  //   $( "#" + inputId ).autocomplete({
  //         autoFocus: true,
  //         minLength: 0,
  //         //appendTo: "#planner-options-from-autocompletecontainer",
  //         messages : Locale.autocompleteMessages,
  //         source: Geocoder.geocoder,
  //         search: function( event, ui ) {
  //             $( "#" + inputId + "-latlng" ).val( "" )
  //         },
  //         focus: function( event, ui ) {
  //             // $( "#planner-options-from" ).val( ui.item.label )
  //             //$( "#planner-options-from-latlng" ).val( ui.item.latlng )
  //             console.log('focus up toPlace')
  //             return false
  //         },
  //     select: function( event, ui ) {
  //       $( "#project-description" ).html( ui.item.desc )
  //       console.log(ui.item)
  //       var point
  //       if (typeof markers['originMarker'] !== 'undefined'){
  //         map.removeLayer(markers['originMarker'])
  //       }
  //       if (/Your location/g.test(ui.item.label)){
  //         console.log('your location selected')
  //         $( "#" + inputId ).val( ui.item.desc )
  //         point = ui.item.desc.split(",")
  //         if (typeof map !== 'undefined'){
  //           addMarker({lat:Number(point[0]),lng:Number(point[1])}, ui.item.label, "originMarker", 'form')
  //         }
  //         $( "#planner-options-from-latlng" ).val( ui.item.desc )
  //         return false
  //       }
  //       else{
  //         $( "#" + inputId ).val( ui.item.label )
  //         var params = {
  //           text: ui.item.label,
  //           magicKey: ui.item.key,
  //           f: 'pjson'
  //         }
  //         $.ajax(esri_url + 'find', {
  //           data : params,
  //           success: function( data ) {
  //           var json = JSON.parse(data)
  //           console.log(json)
  //           var geometry = json.locations[0].feature.geometry
  //           if (typeof map !== 'undefined'){
  //             addMarker({lat:Number(geometry.y),lng:Number(geometry.x)}, ui.item.label, "originMarker", 'form')
  //           }
  //           $( "#" + inputId + "-latlng" ).val( geometry.y + ',' + geometry.x )
  //           return false
  //                 }
  //               })
  //             }
  //         }

  //     })
  //   .focus(function(){
  //     console.log('focus')
  //     if (typeof lat !== 'undefined'){
  //       $(this).autocomplete('search')
  //     }
  //     console.log(this.id)
  //   })
  //   .data("ui-autocomplete")._renderItem = function (ul, item) {
  //     return $("<li></li>")
  //       .data("item.autocomplete", item)
  //       .append("<b>" + item.label + "</b><br>" + item.desc) //+ "</a>")
  //       .appendTo(ul)
  //   }
  // }
  // else{
  $('#planner-options-from').autocomplete({
    autoFocus: true,
    minLength: 0,
    // appendTo: "#planner-options-from-autocompletecontainer",
    // messages : Locale.autocompleteMessages,
    source: Geocoder.geocoder,
    search: function (event, ui) {
      $('#planner-options-from-latlng').val('')
    },
    focus: function (event, ui) {
      // $( "#planner-options-from" ).val( ui.item.label )
      // $( "#planner-options-from-latlng" ).val( ui.item.latlng )
      console.log('focus up toPlace')
      return false
    },
    select: function (event, ui) {
      $('#project-description').html(ui.item.desc)
      console.log(ui.item)
      var point
      if (typeof markers['originMarker'] !== 'undefined') {
        map.removeLayer(markers['originMarker'])
      }
      // If geolocation is used
      if (/<i class="fa/g.test(ui.item.label)) {
        console.log('your location selected')
        $('#planner-options-from').val(ui.item.label.split('</i>')[1])
        point = ui.item.desc.split(',')
        if (typeof map !== 'undefined') {
          addMarker({lat: Number(point[0]),lng: Number(point[1])}, ui.item.label, 'originMarker', 'form')
        }
        $('#planner-options-from-latlng').val(ui.item.desc).trigger('change')
        return false
      }
      // If user types in address
      else {
        $('#planner-options-from').val(ui.item.label)
        var params = {
          text: ui.item.label,
          magicKey: ui.item.key,
          f: 'pjson'
        }
        $.ajax(esri_url + 'find', {
          data: params,
          success: function (data) {
            var json = JSON.parse(data)
            console.log(json)
            var geometry = json.locations[0].feature.geometry
            if (typeof map !== 'undefined') {
              addMarker({lat: Number(geometry.y),lng: Number(geometry.x)}, ui.item.label, 'originMarker', 'form')
            }
            $('#planner-options-from-latlng').val(geometry.y + ',' + geometry.x).trigger('change')
            return false
          }
        })
      }
    }

  })
    .focus(function () {
      console.log('focus')
      if (typeof lat !== 'undefined') {
        $(this).autocomplete('search')
      }
      console.log(this.id)
    })
    .data('ui-autocomplete')._renderItem = function (ul, item) {
    return $('<li></li>')
      .data('item.autocomplete', item)
      .append('<b>' + item.label + '</b><br>' + item.desc) // + "</a>")
      .appendTo(ul)
  }
  $('#planner-options-dest').autocomplete({
    autoFocus: true,
    minLength: 0,
    // appendTo: "#planner-options-dest-autocompletecontainer",
    // messages : Locale.autocompleteMessages,
    source: Geocoder.geocoder,
    search: function (event, ui) {
      $('#planner-options-dest-latlng').val('')
    },
    focus: function (event, ui) {
      // $( "#planner-options-dest" ).val( ui.item.label )
      // $( "#planner-options-dest-latlng" ).val( ui.item.latlng )
      return false
    },
    select: function (event, ui) {
      // If geolocation is used
      if (/<i class="fa/g.test(ui.item.label)) {
        console.log('your location selected')
        $('#planner-options-dest').val(ui.item.label.split('</i>')[1])
        point = ui.item.desc.split(',')
        if (typeof map !== 'undefined') {
          addMarker({lat: Number(point[0]),lng: Number(point[1])}, ui.item.label, 'originMarker', 'form')
        }
        $('#planner-options-dest-latlng').val(ui.item.desc).trigger('change')
        return false
      } else {
        $('#planner-options-dest').val(ui.item.label)

        $('#project-description').html(ui.item.desc)
        console.log(ui.item)
        var point
        if (typeof markers['destinationMarker'] !== 'undefined') {
          map.removeLayer(markers['destinationMarker'])
        }
        if (typeof ui.item.latlng !== 'undefined') {
          point = ui.item.latlng.split(',')
          if (typeof map !== 'undefined') {
            addMarker({lat: Number(point[0]),lng: Number(point[1])}, ui.item.label, 'destinationMarker', 'form')
          }
          $('#planner-options-dest-latlng').val(ui.item.latlng).trigger('change')
          return false
        } else {
          var params = {
            text: ui.item.label,
            magicKey: ui.item.key,
            f: 'pjson'
          }
          $.ajax(esri_url + 'find', {
            data: params,
            success: function (data) {
              // console.log(data)
              var json = JSON.parse(data)
              var geometry = json.locations[0].feature.geometry
              if (typeof map !== 'undefined') {
                addMarker({lat: Number(geometry.y),lng: Number(geometry.x)}, ui.item.label, 'destinationMarker', 'form')
              }
              $('#planner-options-dest-latlng').val(geometry.y + ',' + geometry.x).trigger('change')
              return false
            }
          })
        }
      }
    }
  })
    .focus(function () {
      console.log('focus')
      if (typeof lat !== 'undefined') {
        $(this).autocomplete('search')
      }
      console.log(this.id)
    })
    .data('ui-autocomplete')._renderItem = function (ul, item) {
    return $('<li></li>')
      .data('item.autocomplete', item)
      .append('<b>' + item.label + '</b><br>' + item.desc) // + "</a>")
      .appendTo(ul)
  }
// } // end else
}
function switchLocale () {
  $('.label-from').text(Locale.from)
  $('.label-via').text(Locale.via)
  $('.label-dest').text(Locale.to)
  $('.label-time').text(Locale.time)
  $('.label-date').text(Locale.date)
  $('.label-edit').text(Locale.edit)
  $('.label-plan').text(Locale.plan)

  $('.planner-options-timeformat').text(Locale.timeFormat)

  // $("#planner-options-date").datepicker('option', {
  //     dateFormat: Locale.dateFormat,
  //     dayNames: Locale.days,
  //     dayNamesMin : Locale.daysMin,
  //     monthNames: Locale.months
  // })

  $('#planner-options-date').attr('aria-label', Locale.dateAriaLabel)
  $('#planner-options-from').attr('placeholder', Locale.originInput).attr('title', Locale.from)
  $('#planner-options-via').attr('placeholder', Locale.geocoderInput).attr('title', Locale.via)
  $('#planner-options-dest').attr('placeholder', Locale.destinationInput).attr('title', Locale.to)
  $('#planner-options-submit').attr('data-loading-text', Locale.loading)
}
