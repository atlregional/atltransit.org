function getEsriGeometry(e,a){$.ajax({url:esriUrl+"find?",dataType:"jsonp",data:{text:e.text,magicKey:e.id,f:"pjson"},success:function(e){console.log(e);var t=e.locations[0].feature.geometry;$(".planner-form input[name="+a+"Place]").val(t.y+","+t.x)}})}function formatRepo(e){if(e.loading)return e.text;var a='<div class="clearfix"><div class="col-sm-1"></div><div clas="col-sm-10"><div class="clearfix"><div class="col-sm-6">'+e.text+"</div></div>";return e.description&&(a+="<div>"+e.description+"</div>"),a+="</div></div>"}function formatRepoSelection(e){return e.text}function compareRouteNames(e,a){return e.shortName-a.shortName}function findBootstrapEnvironment(){var e=["xs","sm","md","lg"];$el=$("<div>"),$el.appendTo($("body"));for(var a=e.length-1;a>=0;a--){var t=e[a];if($el.addClass("hidden-"+t),$el.is(":hidden"))return $el.remove(),t}}function setupDatetime(){function e(e){return 10>e?"0"+e:e}$("#planner-options-timeformat").hide(),$("#planner-options-timeformat").attr("aria-hidden",!0),setTime(currentTime);var a=currentTime.year()+"-"+e(currentTime.month()+1)+"-"+e(currentTime.date());setDate(a),"function"==typeof $().datepicker?$("#planner-options-date").datepicker({dateFormat:Locale.dateFormat,dayNames:Locale.days,dayNamesMin:Locale.daysMin,monthNames:Locale.months,defaultDate:0,hideIfNoPrevNext:!0,minDate:whitelabel_minDate,maxDate:whitelabel_maxDate}):console.log("error no datetimepicker"),$(document).on("mouseenter",".ui-state-default",function(){var e=$(this).text()+" "+$(".ui-datepicker-month",$(this).parents()).text()+" "+$(".ui-datepicker-year",$(this).parents()).text();$("#planner-options-date-messages").text(e)}),$("#planner-options-dateformat").hide(),$("#planner-options-dateformat").attr("aria-hidden",!0)}function setDate(e){parts=e.split("-");var a=moment(e);$("#planner-options-date").val(a.format("MM-DD-YYYY"))}function setTime(e){console.log(e),input=moment(e,"hh:mm a"),console.log(input.format("HH:mm")),$("#planner-options-time").val(input.format("HH:mm"))}function getDate(){return moment($("#planner-options-date").val()).format("YYYY-MM-DD")}function getTime(){var e=moment($("#planner-options-time").val(),"HH:mm");return e.format("hh:mm a")}function scrollToAnchor(e){if("undefined"!=typeof e){console.log(e);var a=$("[id='"+e+"']");console.log(a),scrollToOffset(a.offset().top)}else scrollToOffset(0)}function scrollToOffset(e){$("html,body").animate({scrollTop:e},"slow")}function equalHeight(e){var a=0;e.each(function(){$(this).css({height:""});var e=$(this).height();console.log(e),e>a&&(a=e)}),console.log("resizing..."+a),e.each(function(){$(this).height(a)})}function trimHeadsign(e){return e=e.split("-").length>1?e.split("-")[1]:e,e=e.split("TO").length>1?e.split("TO")[1]:e,e=e.replace(/STATION/i,""),e=toTitleCase(e)}function cleanStopName(e){return e=e.replace(/(@)(?!\s)/g," @ ").replace(/(\/)(?!\s)/g," / ").replace(/STATION/g,""),e=toTitleCase(e)}function getDistanceFromLatLonInKm(e,a,t,o){var n=6371,l=deg2rad(t-e),s=deg2rad(o-a),r=Math.sin(l/2)*Math.sin(l/2)+Math.cos(deg2rad(e))*Math.cos(deg2rad(t))*Math.sin(s/2)*Math.sin(s/2),i=2*Math.atan2(Math.sqrt(r),Math.sqrt(1-r)),c=n*i;return c}function deg2rad(e){return e*(Math.PI/180)}function toTitleCase(e){return e.replace(/\w\S*/g,function(e){return/LCI|CTP|TDM|CSX|^NW$|^NE$|^SE$|^SW$|MARTA|GWCC|CNN|^FY$|^ARC$|^SR$|^II$|^STP$|^III$|^US$|CMAQ/g.test(e)?e:/^IN$|^OF$|^AND$|^FOR$/g.test(e)?e.toLowerCase():e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()})}var whitelabel_prefix="http://opentrip.atlantaregion.com/otp-rest-servlet/",whitelabel_minDate=new Date(2014,2,8),whitelabel_maxDate=new Date(2020,3,30),Locale={};Locale.dateFormat="mm-dd-yy",Locale.timeFormat="h:mma",Locale.dateAriaLabel="Date, use Ctrl en arrow keys to navigate, enter to choose",Locale.loading="Loading...",Locale.edit="Change trip",Locale.plan="Plan trip",Locale.geocoderInput="Enter starting address...",Locale.originInput="Enter starting address...",Locale.destinationInput="Enter destination...",Locale.startpointEmpty="No starting point entered",Locale.noStartpointSelected="No starting point selected",Locale.destinationEmpty="No destination entered",Locale.noDestinationSelected="No destination selected",Locale.noValidDate="Enter a valid date",Locale.noValidTime="Enter a valid time",Locale.dateTooEarly=function(e){return"This trip planner works for travel dates starting "+e.split("-").reverse().join("-")},Locale.dateTooLate=function(e){return"This trip planner works for travel dates till "+e.split("-").reverse().join("-")},Locale.from="From",Locale.via="Via",Locale.to="To",Locale.date="Date",Locale.time="Time",Locale.months=["January","February","March","April","May","June","July","August","September","October","November","December"],Locale.days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],Locale.daysMin=["Su","Mo","Tu","We","Th","Fr","Sa"],Locale.earlier="Earlier",Locale.later="Later",Locale.noAdviceFound="No valid trips found",Locale.walk="Walk",Locale.platformrail="Platform",Locale.platform="Platform",Locale.amountTransfers=function(e){return 0===e?"Direct":e+" transfers"},Locale.autocompleteMessages={noResults:"No results found.",results:function(e){return e+(e>1?" results are ":" result is")+" available, use the up and down arrow keys to navigate them."}},$(".nav-search").submit(function(e){e.preventDefault(),console.log(this.value)}),$('[data-toggle="tooltip"]').tooltip(),$("[data-collapse-group='navbarCollapse']").click(function(e){e.preventDefault();var a=$(this);console.log(this),$("[data-collapse-group='navbarCollapse']:not([data-target='"+a.data("target")+"'])").each(function(){$(this).addClass("collapsed"),console.log(this),$($(this).data("target")).removeClass("in").addClass("collapse")})}),shiftContent=function(e){$(".content").animate({marginTop:"+="+e+"px"},600,"easeOutQuint")};var geolocationBool=!1,lat,lon,labelMap={RED:"label label-danger",BLUE:"label label-primary",GOLD:"label label-warning",GREEN:"label label-success",MARTA:"label label-orange",CCT:"label label-magenta",GCT:"label label-maroon",GRTA:"label label-cyan"};$("#planner-timepicker").timepicker(),$("#test-carousel, #next-carousel, #schedules-carousel").carousel({interval:!1}),$("#next-arrivals-agencies").val("");var esriUrl="https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/",urlParams;$(function(){$(".dropdown-toggle").dropdown(),"function"==typeof setupAutoComplete&&setupAutoComplete(),urlParams=jQuery.unparam(window.location.hash),"undefined"!=typeof urlParams.tab&&($("#"+urlParams.tab+"-link").trigger("click"),"undefined"!=typeof urlParams.stopId&&window.setTimeout(function(){$("#"+urlParams.tab+"-arrivals-btn").removeClass("disabled").val(urlParams.stopId).trigger("click")},200)),$(".js-data-example-ajax").change(function(){console.log(this.value),console.log($(this).select2("data"));var e=$(this).select2("data");getEsriGeometry(e,this.id)}),$(".js-data-example-ajax").select2({allowClear:!0,ajax:{url:esriUrl+"suggest?",dataType:"jsonp",delay:250,data:function(e,a){return{text:e,f:"json",distance:2e4,searchExtents:"-85.386,34.618,-83.269,32.844",location:"-84.383149,33.750855"}},results:function(e,a){console.log(e);var t=e.suggestions,o=[];return $.each(t,function(e,a){var t={id:a.magicKey,text:a.text};o.push(t)}),{results:o}},cache:!0},minimumInputLength:3,templateResult:function(e){return'<div class="clearfix">'+e.text+"</div>"},templateSelection:function(e){return e.text}});var e={0:"Tram",1:"Subway",2:"Rail",3:"Bus",4:"Ferry",5:"Cable",6:"Gondola",7:"Funicular"};"geolocation"in navigator&&(console.log("geolocation"),console.log(navigator),navigator.geolocation.getCurrentPosition(function(e){geolocationBool=!0,lat=e.coords.latitude,lon=e.coords.longitude,console.log([e.coords.latitude,e.coords.longitude])},function(e){e.code==e.PERMISSION_DENIED&&console.log("you denied me :-(")}));var a="http://atlanta.onebusaway.org/api/api/where/agencies-with-coverage.json?",t={};t.key="TEST",a+=serialize(t),$.ajax({url:a,dataType:"jsonp",success:function(e){console.log(e.data.list);var a=e.data.list;$.each(a,function(e,a){$(".arrivals-agencies option[value="+a.agencyId+"]").removeAttr("disabled")})}}),$(".planner-tab-li").click(function(e){var a;a=$(this).hasClass("stop-code")?"stop-code":"next",$(this).hasClass("active")&&1===$("#"+a+"-carousel-inner > .active").index()&&$("#"+a+"-back-btn").trigger("click")}),$("input[type=radio][name=agency-arrivals-option], #next-arrivals-agencies").change(function(){if($("#next-arrivals-routes").html('<option value="">[Select Route]</option>'),$("#next-arrivals-trips").html('<option value="">[Select Direction]</option>').prop("disabled",!0),$("#next-arrivals-stops").html('<option value="">[Select Stop]</option>').trigger("change").prop("disabled",!0),console.log(this.value),"Nearby"===this.value)return $("#get-location").trigger("click"),!0;var a=this.value;location.hash="agency="+a;var t="http://atlanta.onebusaway.org/api/api/where/routes-for-agency/"+a+".json?",o={};o.key="TEST",t+=serialize(o),$.ajax({url:t,dataType:"jsonp",success:function(a){console.log(a.data);var t=d3.nest().key(function(e){return e.type}).sortValues(compareRouteNames).map(a.data.list);console.log(t);a.data.list;$.each(t,function(a,t){var o=$("<optgroup>");o.attr("label",e[a]),$.each(t,function(t,n){var l=$("<option></option>"),s="Subway"===e[a]?n.shortName:n.shortName+" - "+n.longName,r=""===n.longName?n.shortName:s;l.val(n.id),l.text(r),o.append(l)}),$("#next-arrivals-routes").append(o)}),$("#next-arrivals-routes").prop("disabled",!1)}})}),$("#get-location").click(function(){if($("#next-arrivals-agencies").val("Nearby"),$("#next-arrivals-routes").html('<option value="">[Select Route]</option>'),$("#next-arrivals-stops").html('<option value="">[Select Stop]</option>').trigger("change").prop("disabled",!0),$("#next-arrivals-trips").html('<option value="">[Select Direction]</option>').prop("disabled",!0),$(this).val(moment().unix()),geolocationBool&&"undefined"!=typeof lat){var a="http://atlanta.onebusaway.org/api/api/where/routes-for-location.json?",t={};t.lat=lat,t.lon=lon,t.radius=4e3,t.key="TEST",a+=serialize(t),$.ajax({url:a,dataType:"jsonp",success:function(a){console.log(a.data);var t=d3.nest().key(function(e){return e.agencyId}).map(a.data.list);console.log(t);var o,n=0;$.each(t,function(a,t){var l=$("<optgroup>");l.attr("label",a),$.each(t,function(a,t){var s=$("<option></option>");(0===n||0===a)&&(o=t.id);var r="Subway"===e[t.type]?t.shortName:t.shortName+" - "+t.longName,i=""===t.longName?t.shortName:r;s.val(t.id),s.text(i),l.append(s)}),$("#next-arrivals-routes").append(l),n++}),$("#next-arrivals-routes").prop("disabled",!1)}})}else console.log("no geolocation available")}),$("#next-arrivals-routes").change(function(){var e;e=$(this).hasClass("nearby")?"nearby":"next",$("#next-arrivals-stops").html('<option value="">[Select Stop]</option>').trigger("change").prop("disabled",!0),$("#next-arrivals-trips").html('<option value="">[Select Direction]</option>'),console.log(this.value);var a=this.value;location.hash+="&route="+a;var t="http://atlanta.onebusaway.org/api/api/where/stops-for-route/"+a+".json?",o={};o.key="TEST",o.includePolylines=!1,t+=serialize(o),$.ajax({url:t,dataType:"jsonp",success:function(t){var o,n=1e10,l="",s=t.data.entry.stopGroupings[0].stopGroups;console.log(t.data.entry.stopGroupings[0].stopGroups),console.log(t.data);var r=d3.nest().key(function(e){return e.id}).map(t.data.references.stops),i=d3.nest().key(function(e){return e.id}).map(s);console.log(r),console.log(i),console.log(a);var c=0;$.each(s,function(a,t){var s=""===t.name.name?t.id:trimHeadsign(t.name.name);s=1===+s?"Inbound":s,s=0===+s?"Outbound":s,console.log(s);var i=$("<option></option>");i.val(t.id),i.text(s),$("#next-arrivals-trips").append(i);var d=$("<optgroup>");d.attr("id",t.id),d.attr("label",s),0===c?o=t.id:d.addClass("hidden-optgroup"),$.each(t.stopIds,function(e,a){var t=r[a][0],o="";"undefined"!=typeof lat&&geolocationBool&&(o=getDistanceFromLatLonInKm(t.lat,t.lon,lat,lon),0===c&&n>o&&(n=o,l=t.id));var s=$("<option></option>");s.val(t.id),geolocationBool&&"undefined"!=typeof lat&&s.attr("distance",o);var i=cleanStopName(t.name),p=""!==t.direction?"("+t.direction+") ":"";s.text(p+i),d.append(s)}),$("#"+e+"-arrivals-stops").append(d),c++});var d=$("#next-arrivals-stops");$("#next-arrivals-trips").prop("disabled",!1),$("#next-arrivals-trips").val(o),d.prop("disabled",!1),geolocationBool&&"undefined"!=typeof lat&&d.val(l),""!==d.val()&&d.trigger("change"),""!==$("#next-arrivals-stops").val()?$("#next-arrivals-btn").prop("disabled",!1):$("#next-arrivals-btn").prop("disabled",!0)}})});var o;$("#next-arrivals-trips").on("focus",function(){o=this.value}).change(function(){var e=1e10,a="";console.log(this.value),$("#"+o).addClass("hidden-optgroup"),$("#"+this.value).removeClass("hidden-optgroup"),geolocationBool&&$("#"+this.value+" > option").each(function(){var t=$(this).attr("distance");console.log(t),e>t&&(e=t,a=this.value)}),console.log(a);var t=$("#next-arrivals-stops");""!==a&&(t.val(a),""!==t.val()&&t.trigger("change"))}),$("#next-arrivals-stops").change(function(){var e=this.value;console.log(e),""!==e?($("#next-arrivals-btn").removeClass("disabled").removeAttr("disabled").val(e),location.hash+="&stop="+e,$(".get-schedules").removeClass("disabled")):($("#next-arrivals-btn").addClass("disabled").attr("disabled","disabled").val(""),$(".get-schedules").addClass("disabled"))}),$("#stop-code").on("keyup",function(e){var a="#stop-code-arrivals-table",t=$(a),o=""===$("#stop-code").val()?"103134":$("#stop-code").val();if(this.value.length<6)console.log(this.value),$("#stop-code-error-msg").html("Please enter a valid <strong>six-digit</strong> stop ID."),$("#stop-code-arrivals-btn").addClass("disabled").val("");else if(6===this.value.length){console.log(e),console.log(this.value);var n="http://atlanta.onebusaway.org/api/api/where/stops-for-location.json?",l={};l.query=o,l.key="TEST",n+=serialize(l),$.ajax({url:n,dataType:"jsonp",success:function(e){console.log(e.data),e.data.list.length>0?(stopId=e.data.list[0].id,stopName=cleanStopName(e.data.list[0].name),$("#stop-code-arrivals-btn").removeClass("disabled").val(stopId),$("#stop-code-error-msg").html("Stop: <strong>"+stopName+"</strong>")):(t.hide(),$("#nearby-arrival-msg").text("No arrivals."),$("#nearby-arrival-msg").show(),$("#stop-code-error-msg").html("Unknown stop ID."),$("#stop-code-arrivals-btn").addClass("disabled").val(""))}})}else $("#stop-code-arrivals-btn").addClass("disabled").val(""),$("#stop-code-error-msg").html("Please enter a valid <strong>six-digit</strong> stop ID.")}),$(".get-arrivals").click(function(){var e,a;e=$(this).hasClass("stop-code")?"stop-code":"next";var t="#"+e+"-arrivals-table",o=$(t);if(a=$("#"+e+"-arrivals-btn").val(),console.log(a),console.log(e),""!==a){var n="http://atlanta.onebusaway.org/api/api/where/arrivals-and-departures-for-stop/"+a+".json?",l={};l.key="TEST",l.minutesBefore=1,n+=serialize(l),$.ajax({url:n,dataType:"jsonp",success:function(n){var l=n.data.entry.arrivalsAndDepartures;console.log(n.data);var s=d3.nest().key(function(e){return e.id}).map(n.data.references.stops);if(console.log(n.data.entry.arrivalsAndDepartures),l.length>0){stopName=s[n.data.entry.stopId][0].name,$("#"+e+"-stop-id").html(cleanStopName("Stop ID: "+a.split("_")[1])),$("#"+e+"-stop-name").html(cleanStopName(stopName)),$("#"+e+"-last-updated .time").html(moment(l[0].lastUpdateTime).format("h:mm a")),$("#nearby-arrival-msg").hide(),o.show(),o.empty(),o.append("<thead><tr><th>Route</th><th>Minutes</th><th>Direction</th></tr></thead>");for(var r=$("<tbody>"),i=[],c=0;c<l.length;c++){var d=l[c].predictedArrivalTime?!0:!1,p=l[c].predictedArrivalTime||l[c].scheduledArrivalTime,u=p-moment().valueOf(),h=l[c].routeShortName,v=Math.floor(u/60/1e3),m=1>=v?"<strong>NOW</strong>":v,g=trimHeadsign(l[c].tripHeadsign),f=new RegExp("Airport");f.test(g)&&(g+=' <i class="fa fa-plane"></i>');var b=$('<tr class="info">');d&&(m+=' <i style="font-size:0.7em;" alt="Predicted arrival time" title="Predicted arrival time" class="fa fa-bolt"></i>'),b.append('<td><span class="'+labelMap[h]+'">'+h+"</span></td>"),b.append('<td data-order="'+v+'">'+m+"</td>"),b.append("<td>"+g+"</td>"),r.append(b)}o.append(r),console.log(i),$.fn.dataTable.isDataTable(t)&&(arrivalsDatatable=o.DataTable(),arrivalsDatatable.destroy()),arrivalsDatatable=o.DataTable({order:[[1,"asc"]],paging:!1,info:!1,bFilter:!1})}else o.hide(),$("#"+e+"-stop-name").html(""),$("#"+e+"-last-updated").html(""),$("#"+e+"-arrival-msg").text("No arrivals in the next 30 minutes."),$("#"+e+"-arrival-msg").show()}})}"next"===e&&$("#next-carousel").carousel("next")}),$(".plan-control").change(function(){}),$(".planner-go-btn").click(function(){var e={},a=$(this).text(),t=$("#planner-options-from-latlng").val(),o=$("#planner-options-dest-latlng").val(),n=$("#planner-timepicker").val();if(!(t&&o&&n))return void $("#planner-message").fadeIn().html("Please add a valid origin, destination, and time.").delay(2e3).fadeOut("slow");if(/Google/.test(a)){e.saddr=t,e.daddr=o,e.dirflg="r";var l="http://maps.google.com/?";window.open(l+serialize(e),"_blank")}else{e.fromPlace=t,e.toPlace=o,e.arriveBy="Arrive by"===$(".planner-time-btn:first-child").val()?!0:!1,e.date=moment().format("YYYY-MM-DD"),e.time="Leave now"===$(".planner-time-btn:first-child").val()?moment().valueOf():getTime(),e.fromName=$("#planner-options-from").val(),e.toName=$("#planner-options-dest").val(),e.mode="TRANSIT,WALK";var s="/plan#";window.location.href=s+serialize(e)}}),$(".planner-time-menu li a").click(function(){$(".planner-time-btn:first-child").html('<i class="fa fa-clock-o right-5"></i>'+$(this).text()+'<i class="fa fa-caret-down left-5"></i>'),$(".planner-time-btn:first-child").val($(this).text());var e=$(".planner-time-btn:first-child").val();"Depart at"===e||"Arrive by"===e?$("#planner-options-inputgroup-time").show():$("#planner-options-inputgroup-time").hide()}),$(".planner-choice-menu li a").click(function(){$(".planner-choice-btn:first-child").html($(this).text()),$(".planner-choice-btn:first-child").val($(this).text())}),$("#trig").on("click",function(){$("#col1").toggleClass("col-md-12 col-md-3"),$("#col2").toggleClass("col-md-0 col-md-9")})});var routeTypeMap={0:"Tram",1:"Subway",2:"Rail",3:"Bus",4:"Ferry",5:"Cable",6:"Gondola",7:"Funicular"},currentTime=moment();setupDatetime(),$("input[type=radio][name=agency-arrivals-option], #schedules-agencies").change(function(){if($("#schedules-routes").html('<option value="">[Select Route]</option>'),$("#schedules-trips").html('<option value="">[Select Direction]</option>').prop("disabled",!0),$("#schedules-stops").html('<option value="">[Select Stop]</option>').trigger("change").prop("disabled",!0),console.log(this.value),"Nearby"===this.value)return $("#get-location").trigger("click"),!0;var e=this.value,a="http://atlanta.onebusaway.org/api/api/where/routes-for-agency/"+e+".json?",t={};t.key="TEST",a+=serialize(t),$.ajax({url:a,dataType:"jsonp",success:function(e){console.log(e.data);var a=d3.nest().key(function(e){return e.type}).sortValues(compareRouteNames).map(e.data.list);console.log(a);e.data.list;$.each(a,function(e,a){var t=$("<optgroup>");t.attr("label",routeTypeMap[e]),$.each(a,function(a,o){var n=$("<option></option>"),l="Subway"===routeTypeMap[e]?o.shortName:o.shortName+" - "+o.longName,s=""===o.longName?o.shortName:l;n.val(o.id),n.text(s),t.append(n)}),$("#schedules-routes").append(t)}),$("#schedules-routes").prop("disabled",!1)}})}),$("#get-location").click(function(){if($("#schedules-agencies").val("Nearby"),$("#schedules-routes").html('<option value="">[Select Route]</option>'),$("#schedules-stops").html('<option value="">[Select Stop]</option>').trigger("change").prop("disabled",!0),$("#schedules-trips").html('<option value="">[Select Direction]</option>').prop("disabled",!0),$(this).val(moment().unix()),geolocationBool&&"undefined"!=typeof lat){var e="http://atlanta.onebusaway.org/api/api/where/routes-for-location.json?",a={};a.lat=lat,a.lon=lon,a.radius=4e3,a.key="TEST",e+=serialize(a),$.ajax({url:e,dataType:"jsonp",success:function(e){console.log(e.data);var a=d3.nest().key(function(e){return e.agencyId}).map(e.data.list);console.log(a);var t,o=0;$.each(a,function(e,a){var n=$("<optgroup>");n.attr("label",e),$.each(a,function(e,a){var l=$("<option></option>");(0===o||0===e)&&(t=a.id);var s="Subway"===routeTypeMap[a.type]?a.shortName:a.shortName+" - "+a.longName,r=""===a.longName?a.shortName:s;l.val(a.id),l.text(r),n.append(l)}),$("#schedules-routes").append(n),o++}),$("#schedules-routes").prop("disabled",!1)}})}else console.log("no geolocation available")}),$("#schedules-routes").change(function(){var e;e=$(this).hasClass("nearby")?"nearby":"next",e="schedules",$("#schedules-stops").html('<option value="">[Select Stop]</option>').trigger("change").prop("disabled",!0),$("#schedules-trips").html('<option value="">[Select Direction]</option>'),console.log(this.value);var a=this.value,t="http://atlanta.onebusaway.org/api/api/where/stops-for-route/"+a+".json?",o={};o.key="TEST",o.includePolylines=!1,t+=serialize(o),$.ajax({url:t,dataType:"jsonp",success:function(e){var t,o=1e10,n="",l=e.data.entry.stopGroupings[0].stopGroups;console.log(e.data.entry.stopGroupings[0].stopGroups),console.log(e.data);var s=d3.nest().key(function(e){return e.id}).map(e.data.references.stops),r=d3.nest().key(function(e){return e.id}).map(l);console.log(s),console.log(r),console.log(a),console.log(r[a]);var i=0;$.each(l,function(e,a){var l=""===a.name.name?a.id:trimHeadsign(a.name.name);l=1===+l?"Inbound":l,l=0===+l?"Outbound":l;var r=$("<option></option>");r.val(a.id),r.text(l),$("#schedules-trips").append(r);var c=$("<optgroup>");c.attr("id",a.id),c.attr("label",l),0===i?t=a.id:c.addClass("hidden-optgroup"),$.each(a.stopIds,function(e,a){var t=s[a][0];console.log(t);var l=getDistanceFromLatLonInKm(t.lat,t.lon,lat,lon);0===i&&o>l&&(o=l,n=t.id);var r=$("<option></option>");r.val(t.id),r.attr("distance",l);var d=cleanStopName(t.name),p=""!==t.direction?"("+t.direction+") ":"";r.text(p+d),c.append(r)}),$("#schedules-stops").append(c),i++});var c=$("#schedules-stops");$("#schedules-trips").prop("disabled",!1),$("#schedules-trips").val(t),c.prop("disabled",!1),c.val(n),""!==c.val()&&c.trigger("change"),""!==$("#schedules-stops").val()?$("#schedules-btn").prop("disabled",!1):$("#schedules-btn").prop("disabled",!0)}})});var previousTrip;$("#schedules-trips").on("focus",function(){previousTrip=this.value}).change(function(){var e=1e10,a="";console.log(this.value),$("#"+previousTrip).addClass("hidden-optgroup"),$("#"+this.value).removeClass("hidden-optgroup"),$("#"+this.value+" > option").each(function(){var t=$(this).attr("distance");console.log(t),e>t&&(e=t,a=this.value)}),console.log(a);var t=$("#schedules-stops");t.val(a),""!==t.val()&&t.trigger("change")}),$("#schedules-stops").change(function(){""!==this.value?($("#schedules-btn").removeClass("disabled").removeAttr("disabled").val(this.value),$(".get-realtime").removeClass("disabled")):($("#schedules-btn").addClass("disabled").attr("disabled","disabled").val(""),$(".get-realtime").addClass("disabled"))}),$(".get-schedules").click(function(){var e,a;e=$(this).hasClass("stop-code")?"stop-code":"next",e="schedules",a=$("#"+e+"-btn").val();var t=$("#"+e+"-routes").val();if(console.log(a),console.log(t),console.log(e),""!==a){var o="http://atlanta.onebusaway.org/api/api/where/schedule-for-stop/"+a+".json?",n={};n.key="TEST",n.minutesBefore=1,o+=serialize(n),$.ajax({url:o,dataType:"jsonp",success:function(o){var n=o.data.entry.stopRouteSchedules;console.log(o.data);var l=d3.nest().key(function(e){return e.id}).map(o.data.references.stops),s=d3.nest().key(function(e){return e.id}).map(o.data.references.routes);if(console.log(s),console.log(o.data.entry.stopRouteSchedules),n.length>0){stopName=l[o.data.entry.stopId][0].name,$("#"+e+"-stop-code").html(cleanStopName("Stop ID: "+a.split("_")[1])),$("#"+e+"-stop-name").html(cleanStopName(stopName)),$("#nearby-arrival-msg").hide();var r=[],i=$(".schedules-tables"),c=$('<div class="row"></div>'),d=$('<div class="row"></div>');i.empty();for(var p=0;p<n.length;p++){console.log(n[p]);for(var u=s[n[p].routeId][0].shortName,h=n[p].stopRouteDirectionSchedules,v=0;v<h.length;v++){var m=h.length*n.length,g=m>4?3:12/m;g=1===m?6:g,g=6;var f=$('<div class="schedule-table table-responsive col-xs-12 col-md-'+g+' col-sm-6"></div>'),b=$('<table class="table table-striped table-condensed table-hover col-md-'+g+'" id="schedule-'+t+v+'"></table>');b.append('<thead><tr><th class="text-right">Hour</th><th>Minute</th></tr></thead>');var y=$("<tbody>"),x=trimHeadsign(h[v].tripHeadsign);if(h[v].scheduleFrequencies.length>0)console.log("freq based");else{console.log("sched based"),console.log(h[v].scheduleStopTimes);for(var T,S,w=h[v].scheduleStopTimes,N=moment(w[0].arrivalTime),C=0,D=N.hour()<12?!0:!1,k=0;k<w.length;k++){var L="";D&&0===k&&(L="<strong>AM</strong>  ");var j,I=w[k].arrivalTime,M=moment(I),E=M.minutes()<10?"0"+M.minutes():M.minutes();k!==w.length-1&&(j=moment(w[k+1].arrivalTime)),M.hour()!==C?(T=$('<tr id="'+p+v+M.hour()+'">'),M.hour()>=12&&D&&(D=!1,y.append('<tr class="blank_row"><td colspan="2"></td></tr>'),L="<strong>PM</strong>  "),T.append('<td class="text-right"><strong>'+L+M.format("h")+":</strong></td>"),S=$('<td class="text-left">'+E+"</td>"),T.append(),C=M.hour()):S.append(" "+E),j.hour()!==M.hour()&&(T.append(S),y.append(T)),k==w.length-1&&(console.log("done"),b.append(y),f.append('<h4><span class="'+labelMap[u]+'">'+u+"</span> - "+x+"</h4").append(b),p>1?d.append(f):c.append(f),i.append(c).append(d))}}}}console.log(r)}}})}$("#schedules-carousel").carousel("next")}),$(".toc a").click(function(e){e.preventDefault();var a=$(this).attr("href").split("#")[1];history.pushState(null,null,"#"+a),scrollToAnchor($(this).attr("href").split("#")[1])}),$.fn.reveal=function(){var e=Array.prototype.slice.call(arguments);return this.each(function(){var a=$(this),t=a.data("src");t&&a.attr("src",t).load(function(){a[e[0]||"show"].apply(a,e.splice(1))})})},$(document).ready(function(){});var waitForFinalEvent=function(){var e={};return function(a,t,o){o||(o="Don't call this twice without a uniqueId"),e[o]&&clearTimeout(e[o]),e[o]=setTimeout(a,t)}}();$(window).resize(function(){waitForFinalEvent(function(){},500,"some unique string")}),jQuery.unparam=function(e){e.length>1&&"#"==e.charAt(0)&&(e=e.substring(1));var a,t,o,n={},l=e.split("&");for(t=0,o=l.length;o>t;t++)a=l[t].split("=",2),n[decodeURIComponent(a[0])]=2==a.length?decodeURIComponent(a[1].replace(/\+/g," ")):!0;return console.log(n),n},jQuery.fn.extend({disable:function(e){return this.each(function(){var a=$(this);a.is("input, button, a")?this.disabled=e:a.toggleClass("disabled",e)})}}),serialize=function(e,a){var t=[];for(var o in e)if(e.hasOwnProperty(o)){var n=a?a+"["+o+"]":o,l=e[o];t.push("object"==typeof l?serialize(l,n):encodeURIComponent(n)+"="+encodeURIComponent(l))}return t.join("&")};var bs=findBootstrapEnvironment();console.log(bs),("md"===bs||"sm"===bs)&&$(".agency-arrivals-radio").addClass("btn-xs");
//# sourceMappingURL=atltransit.js.map