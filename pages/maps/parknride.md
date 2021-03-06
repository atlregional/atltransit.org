---
layout: page
title: Park and Ride
id: parknride
order: 3
category: maps
permalink: /maps/parknride/
related:
  - parking
  - agencies
tagline: >-
  Driving to transit is a great way to avoid unnecessary traffic and save your
  sanity.  Find your closest Park and Ride location here.
image: >-
  http://www.clker.com/cliparts/2/4/8/f/131672402079289369Park%20and%20Ride.svg.hi.png
published: true
---

<h2 class="row-heading">Choose a city to find a nearby Park and Ride</h2>

* toc goes here
{:toc class="list-inline anchor toc text-center col-sm-12"}


<!-- <div markdown="0">
{% include forms/parknride-select.html scroll=true label=true %}
</div> -->
<div class="text-center">
  <h3>Filter Park and Rides by available service</h3>
  <div class="btn-group" role="group" aria-label="Filter park and ride lots">
    <button id="all" class="btn btn-default filter active">All</button>
    <button id="has-transit" class="btn btn-default filter">Transit</button>
    <button id="has-vanpool" class="btn btn-default filter">Vanpool/carpool</button>
  </div>
</div>

{% assign cities = site.data.parknride.features | group_by:'CITY' | sort:'name' %}
{% for city in cities %}

## {{ city.name }}

{% for parknride in city.items %}

<div markdown="1" class="well pnr {% if parknride.has_transit %}has-transit{% else %}no-transit{% endif %} {% if parknride.has_vanpool %}has-vanpool{% else %}no-vanpool{% endif %}">
{% capture pnr_name %}{{ parknride.NAME | slugify }}{% endcapture %}
### {{ parknride.NAME }} Park & Ride
{: .parknride-header}

{{ parknride.LOCATION }},
{{ parknride.CITY }}, GA

Routes: {{ parknride.Route }}
Description: {{ parknride.SPACES }} parking spaces, {{ parknride.LIGHTING }}, with {{ parknride.SHELTER }}.


{% capture latlng %}{{ parknride.geometry.coordinates[1] }},{{ parknride.geometry.coordinates[0] }}{% endcapture %}

{% include pnr-map-embed.html latlng=latlng name=pnr_name %}

[Plan trip from here<i class="fa fa-arrow-circle-o-right left-5"></i>](/plan/#fromPlace={{ parknride.geometry.coordinates[1] }},{{ parknride.geometry.coordinates[0] }}&fromName={{ parknride.NAME }} Park and Ride&mode=TRANSIT%2CWALK)
[<i class="fa fa-long-arrow-up right-5"></i>Back to top](#){: .toc .pull-right}
</div>
{% endfor %}
{% endfor %}

<script type="text/javascript">
	window.onload = function(){
		$('.show-pnr').click(function(){
			console.log(this.id);
			var mapDiv = $(this).next('.pnr-static-map')
			var iframe = mapDiv.children();
			console.log(mapDiv)
			console.log(iframe)
			mapDiv.removeClass('hidden')
			iframe.attr('src', iframe.attr('data-src'));
		})
    $('.filter').click(function(){
			console.log(this.id);
      $('.filter').removeClass('active')
      $(this).addClass('active')
      if (this.id === 'has-vanpool') {
        $('.has-vanpool').show()
        $('.no-vanpool').hide()
      }
      else if (this.id === 'has-transit') {
        $('.has-transit').show()
        $('.no-transit').hide()
      }
      else if (this.id === 'all') {
        $('.pnr').show()
      }
		})
	}
</script>
