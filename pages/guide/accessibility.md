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
---

* toc goes here
{:toc class="list-inline anchor toc text-center col-sm-12"}

## Services

{% include right_image.html alt="mobility services" src="http://i.istockimg.com/image-zoom/34098832/3/380/253/zoom-34098832-3.jpg" title="Accessible transit is available throughout the region." %}

Every transit agency that operates fixed route service is required by federal law to operate a complementary paratransit service.

Here is a listing of all the paratransit services available in the Atlanta region:

<div class="row">
<div class="col-sm-6">
	<table class="table">
		<thead>
			<th>Agency</th><th>Service</th><th>Description</th>
		</thead>
		<tbody>
			{% for agency in site.agencies %}
			{% if agency.paratransit %}
			<tr><td>{{ agency.acronym }}</td><td>{{ agency.paratransit.name }}</td><td>{{ agency.paratransit.description | truncate: 30}} <a href="{{ agency.url }}#paratransit">more »</a></td></tr>
			{% endif %}
			{% endfor %}
		</tbody>
	</table>
</div>
</div>

{% include row_break.html %}

## Eligibility

{% include right_image.html alt="mobility services" src="http://i.istockimg.com/image-zoom/54648578/3/380/253/stock-photo-54648578-african-american-woman-sitting-at-table-completing-job-application.jpg" title="Accessible transit is available throughout the region." %}

Determining your eligibility is different for each provider in the region.

{% include row_break.html %}

## Planning your trip


{% include right_image.html alt="SimplyGetThere website" src="/build/images/guide/simplygetthere.png" title="Simply Get There helps you plan trips for accessible modes." %}


[Simply Get There](http://oneclick-arc.camsys-apps.com/) is a trip planning tool specifically designed for comparing specialized services like paratransit with other mobility options.

The website pulls together a large database of door-to-door and curb-to-curb transportation providers, along with public transit and other resources.
