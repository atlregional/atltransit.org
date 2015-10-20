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