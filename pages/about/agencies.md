---
layout: page
title: Agency information
id: agencies
order: 2
category: 'about'
permalink: '/about/agencies/'
related: ["Maps"]
---
<div class="row">
{% for agency in site.agencies %}
{% if forloop.index0 == 0 or forloop.index0 == 3 %}
<!-- <div class="row"> -->
{% endif %}
	<div class="col-md-4 col-sm-6">
		<div class="thumbnail equal-height">
			<a href="{{ agency.url }}"><img class="img-rounded" src="{{ agency.logo }}" alt="{{ agency.name }}"></a>
			<div class="caption">
				<h3><a href="{{ agency.url }}">{{ agency.acronym }}</a></h3>
				<p>{{ agency.tagline | truncatewords:6 }}</p>
				<p>
				<!-- <a href="{{ agency.url }}" class="btn btn-primary" role="button">More...</a> -->
				<a href="{{ agency.website }}" target="_blank" class="btn btn-default" role="button">Visit website</a>
				</p>
			</div>
		</div>
	</div>

{% if forloop.index0 == 2 or forloop.last %}
<!-- </div> -->
{% endif %}
{% endfor %}
</div>