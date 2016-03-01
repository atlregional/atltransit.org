---
layout: page
design: img_left
title: Accessibility
id: accessibility
order: 1
category: 'guide'
permalink: '/guide/accessibility/'
image: "http://i.istockimg.com/image-zoom/34098832/3/380/253/zoom-34098832-3.jpg"
tagline: Transit in Atlanta is accessible to people of all abilities.  Paratransit, as well as most fixed route (i.e., bus and train) service, is available to eligible seniors and persons with disabilities.
scripts: ["/plan/plan-util.js", "https://api.tiles.mapbox.com/mapbox.js/plugins/turf/v2.0.0/turf.min.js"]
---

* toc goes here
{:toc class="list-inline anchor toc text-center col-sm-12"}

## Services

{% include right_image.html alt="mobility services" src="/assets/images/accessibility.png" title="Accessible transit is available throughout the region." %}

Every transit agency that operates fixed route service is required by federal law to operate a complementary paratransit service.

Here is a listing of all the paratransit services available in the Atlanta region:

<div class="row">
<div class="col-sm-6">
	<table class="table">
		<thead>
			<th>Agency</th><th>Service</th><th>Description</th><th>Website</th>
		</thead>
		<tbody>
			{% for agency in site.agencies %}
			{% if agency.paratransit %}
			<tr><td>{{ agency.acronym }}</td><td>{{ agency.paratransit.name }}</td><td>{{ agency.paratransit.description | truncate: 30}} <a href="{{ agency.url }}#paratransit">more »</a></td><td><a target="_blank" href="{{ agency.paratransit.url }}">link<i class="fa fa-external-link left-5"></i><span class="sr-only">Paratransit website link</span></a></td></tr>
			{% endif %}
			{% endfor %}
		</tbody>
	</table>
</div>
</div>

[View agency information for more on each agency's paratransit offerings »](/about/agencies)

{% include row_break.html %}

## Eligibility

{% include right_image.html alt="mobility services" src="/assets/images/guide/woman_application.jpg" title="Accessible transit is available throughout the region." %}

Eligibility for paratransit trips is determined on two levels:

1. **Person-level** - individual eligibility is determined by each transit agency.  

   To learn more about eligibility requirements for each agency, [review the agency information pages](/about/agencies).
2. **Trip-level** - for any given trip, both the origin and destination must fall within the agency's service area.  

   To see if your trip qualifies, [visit the Paratransit map](/maps/paratransit).

{% include row_break.html %}

## Planning your trip


{% include right_image.html alt="SimplyGetThere website" src="/build/images/guide/simplygetthere.png" title="Simply Get There helps you plan trips for accessible modes." %}


[Simply Get There](http://www.simplygetthere.org) is a trip planning tool specifically designed for comparing specialized services like paratransit with other mobility options.

[<i class="fa fa-arrow-circle-o-right right-5"></i>Plan my trip](http://www.simplygetthere.org)

The website pulls together a large database of door-to-door and curb-to-curb transportation providers, along with public transit and other resources.

Need to quickly check whether your trip qualifies?  [Use the ATLtransit paratransit map.](/maps/paratransit)
