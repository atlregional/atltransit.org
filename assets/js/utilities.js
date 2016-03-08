function compareRouteNames (a, b) { return a.shortName - b.shortName; }
function findBootstrapEnvironment () {
  var envs = ['xs', 'sm', 'md', 'lg']

  $el = $('<div>')
  $el.appendTo($('body'))

  for (var i = envs.length - 1; i >= 0; i--) {
    var env = envs[i]

    $el.addClass('hidden-' + env)
    if ($el.is(':hidden')) {
      $el.remove()
      return env
    }
  }
}
// function setupAutoComplete(inputId){
//   console.log('setting up autocomplete for ' + inputId)
//   if (typeof inputId !== 'undefined'){
//     $( "#" + inputId ).autocomplete({
//           autoFocus: true,
//           minLength: 0,
//           //appendTo: "#planner-options-from-autocompletecontainer",
//           messages : Locale.autocompleteMessages,
//           source: Geocoder.geocoder,
//           search: function( event, ui ) {
//               $( "#" + inputId + "-latlng" ).val( "" )
//           },
//           focus: function( event, ui ) {
//               // $( "#planner-options-from" ).val( ui.item.label )
//               //$( "#planner-options-from-latlng" ).val( ui.item.latlng )
//               console.log('focus up toPlace')
//               return false
//           },
//       select: function( event, ui ) {
//         $( "#project-description" ).html( ui.item.desc )
//         console.log(ui.item)
//         var point
//         if (typeof markers['originMarker'] !== 'undefined'){
//           map.removeLayer(markers['originMarker'])
//         }
//         if (/Your location/g.test(ui.item.label)){
//           console.log('your location selected')
//           $( "#" + inputId ).val( ui.item.desc )
//           point = ui.item.desc.split(",")
//           if (typeof map !== 'undefined'){
//             addMarker({lat:Number(point[0]),lng:Number(point[1])}, ui.item.label, "originMarker", 'form')
//           }
//           $( "#planner-options-from-latlng" ).val( ui.item.desc )
//           return false
//         }
//         else{
//           $( "#" + inputId ).val( ui.item.label )
//           var params = {
//             text: ui.item.label,
//             magicKey: ui.item.key,
//             f: 'pjson'
//           }
//           $.ajax(esri_url + 'find', {
//             data : params,
//             success: function( data ) {
//             var json = JSON.parse(data)
//             console.log(json)
//             var geometry = json.locations[0].feature.geometry
//             if (typeof map !== 'undefined'){
//               addMarker({lat:Number(geometry.y),lng:Number(geometry.x)}, ui.item.label, "originMarker", 'form')
//             }
//             $( "#" + inputId + "-latlng" ).val( geometry.y + ',' + geometry.x )
//             return false
//                   }
//                 })
//               } 
//           }

//       })
//     .focus(function(){
//       console.log('focus')
//       if (typeof lat !== 'undefined'){
//         $(this).autocomplete('search')
//       }
//       console.log(this.id)
//     })
//     .data("ui-autocomplete")._renderItem = function (ul, item) {
//       return $("<li></li>")
//         .data("item.autocomplete", item)
//         .append("<b>" + item.label + "</b><br>" + item.desc) //+ "</a>")
//         .appendTo(ul)
//     }
//   }
// }
function setupDatetime () {
  // if(Modernizr.inputtypes.time){
  $('#planner-options-timeformat').hide()
  $('#planner-options-timeformat').attr('aria-hidden', true)
  // }
  setTime(currentTime)
  function pad (n) { return n < 10 ? '0' + n : n }
  var date = currentTime.year() + '-' + pad(currentTime.month() + 1) + '-' + pad(currentTime.date())
  setDate(date)
  if (typeof $().datepicker === 'function') {
    $('#planner-options-date').datepicker({
      dateFormat: Locale.dateFormat,
      dayNames: Locale.days,
      dayNamesMin: Locale.daysMin,
      monthNames: Locale.months,
      defaultDate: 0,
      hideIfNoPrevNext: true,
      minDate: whitelabel_minDate,
      maxDate: whitelabel_maxDate
    })
  } else {
    console.log('error no datetimepicker')
  }
  /* Read aloud the selected dates */
  $(document).on('mouseenter', '.ui-state-default', function () {
    var text = $(this).text() + ' ' + $('.ui-datepicker-month', $(this).parents()).text() + ' ' + $('.ui-datepicker-year', $(this).parents()).text()
    $('#planner-options-date-messages').text(text)
  })

  // if(Modernizr.inputtypes.date){
  $('#planner-options-dateformat').hide()
  $('#planner-options-dateformat').attr('aria-hidden', true)
// }
}
function setDate (iso8601) {
  parts = iso8601.split('-')
  var d = moment(iso8601)
  $('#planner-options-date').val(d.format('MM-DD-YYYY'))
}
function setTime (iso8601) {
  // if(Modernizr.inputtypes.time){
  //     $('#planner-options-time').val(iso8601.slice(0,5))
  // }else{
  console.log(iso8601)
  input = moment(iso8601, 'hh:mm a')
  // var secs = parseInt(val[0])*60*60+parseInt(val[1])*60
  // var hours = String(Math.floor(secs / (60 * 60)) % 24)
  // var divisor_for_minutes = secs % (60 * 60)
  // var minutes = String(Math.floor(divisor_for_minutes / 60))
  console.log(input.format('HH:mm'))

  $('#planner-options-time').val(input.format('HH:mm'))
// }
}

function getDate () {
  return moment($('#planner-options-date').val(), 'MM-DD-YYYY').format('YYYY-MM-DD')
}
function getTime () {
  var time = moment($('#planner-options-time').val(), 'HH:mm')
  return time.format('hh:mm a')
}
// Scrolls to anchor tag from subnav link
function scrollToAnchor (aid) {
  if (typeof aid !== 'undefined') {
    console.log(aid)
    var aTag = $("[id='" + aid + "']")
    console.log(aTag)
    scrollToOffset(aTag.offset().top)
  } else {
    scrollToOffset(0)
  }
}

function scrollToOffset (offset) {
  $('html,body').animate({
    scrollTop: offset // - 60
  }, 'slow')
}

$('.toc a').click(function (e) {
  e.preventDefault()

  var hash = $(this).attr('href').split('#')[1]
  history.pushState(null, null, '#' + hash)
  scrollToAnchor($(this).attr('href').split('#')[1])
})

// Set all thumbnails to same height
function equalHeight (group) {
  var tallest = 0

  group.each(function () {
    $(this).css({'height': ''})
    var thisHeight = $(this).height()
    console.log(thisHeight)
    if (thisHeight > tallest) {
      tallest = thisHeight
    }
  })
  console.log('resizing...' + tallest)
  group.each(function () { $(this).height(tallest); })
}
// Bind the function to global jQuery object.
$.fn.reveal = function () {
  // Arguments is a variable which is available within all functions
  // and returns an object which holds the arguments passed.
  // It is not really an array, so by calling Array.prototype
  // he is actually casting it into an array.
  var args = Array.prototype.slice.call(arguments)

  // For each elements that matches the selector:
  return this.each(function () {
    // this is the dom element, so encapsulate the element with jQuery.
    var img = $(this),
      src = img.data('src')

    // If there is a data-src attribute, set the attribute
    // src to make load the image and bind an onload event.
    src && img.attr('src', src).load(function () {
      // Call the first argument passed (like fadeIn, slideIn, default is 'show').
      // This piece is like doing img.fadeIn(1000) but in a more dynamic way.
      img[args[0] || 'show'].apply(img, args.splice(1))
    })
  })
}
$(document).ready(function () {
  // Initialize lazy loading
  // var layzr = new Layzr({
  //       callback: function() {
  //         // equalHeight($(".equal-height"))
  //       }
  // })
  // $("img").reveal("fadeIn", 1000)
  // equalHeight($(".equal-height")); 
})

// Check equal-height height on resize

var waitForFinalEvent = (function () {
  var timers = {}
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId"
    }
    if (timers[uniqueId]) {
      clearTimeout(timers[uniqueId])
    }
    timers[uniqueId] = setTimeout(callback, ms)
  }
})()

$(window).resize(function () {
  waitForFinalEvent(function () {
    // equalHeight($(".equal-height"))
    // ...
  }, 500, 'some unique string')
})

jQuery.unparam = function (value) {
  if (value.length > 1 && value.charAt(0) == '#') {
    value = value.substring(1)
  }
  var
    // Object that holds names => values.
    params = {},
    // Get query string pieces (separated by &)
    pieces = value.split('&'),
    // Temporary variables used in loop.
    pair, i, l

  // Loop through query string pieces and assign params.
  for (i = 0, l = pieces.length; i < l; i++) {
    pair = pieces[i].split('=', 2)
    // Repeated parameters with the same name are overwritten. Parameters
    // with no value get set to boolean true.
    params[decodeURIComponent(pair[0])] = (pair.length == 2 ?
      decodeURIComponent(pair[1].replace(/\+/g, ' ')) : true)
  }
  console.log(params)
  return params
}
// Extended disable function
jQuery.fn.extend({
  disable: function (state) {
    return this.each(function () {
      var $this = $(this)
      if ($this.is('input, button, a'))
        this.disabled = state
      else
        $this.toggleClass('disabled', state)
    })
  }
})
function trimHeadsign (headsign) {
  headsign = headsign.split('-').length > 1 ? headsign.split('-')[1] : headsign
  headsign = headsign.split('TO').length > 1 ? headsign.split('TO')[1] : headsign
  headsign = headsign.replace(/STATION/i, '')
  headsign = toTitleCase(headsign)

  return headsign
}
function cleanStopName (name) {
  name = name
    .replace(/(@)(?!\s)/g, ' @ ')
    .replace(/(\/)(?!\s)/g, ' / ')
    .replace(/STATION/g, '')
  name = toTitleCase(name)
  return name

}
function getDistanceFromLatLonInKm (lat1, lon1, lat2, lon2) {
  var R = 6371 // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1) // deg2rad below
  var dLon = deg2rad(lon2 - lon1)
  var a =
  Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c // Distance in km
  return d
}
function deg2rad (deg) {
  return deg * (Math.PI / 180)
}
function toTitleCase (str) {
  return str.replace(/\w\S*/g, function (txt) {
    if (/LCI|CTP|TDM|CSX|^NW$|^NE$|^SE$|^SW$|MARTA|GWCC|CNN|^FY$|^ARC$|^SR$|^II$|^STP$|^III$|^US$|CMAQ/g.test(txt))
      return txt
    else if (/^IN$|^OF$|^AND$|^FOR$/g.test(txt)) {
      return txt.toLowerCase()
    }
    else
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}
serialize = function (obj, prefix) {
  var str = []
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + '[' + p + ']' : p, v = obj[p]
      str.push(typeof v == 'object' ?
        serialize(v, k) :
        encodeURIComponent(k) + '=' + encodeURIComponent(v))
    }
  }
  return str.join('&')
}
var bs = findBootstrapEnvironment()
console.log(bs)
if (bs === 'md' || bs === 'sm') {
  $('.agency-arrivals-radio').addClass('btn-xs')
}
