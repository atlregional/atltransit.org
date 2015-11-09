---
layout: default
title: Home
category: ''
permalink: '/'
---
{% include service_alerts_bar.html %}

<div class="row">
	<div class="col-xs-12 col-sm-5 col-md-4">
		<div class="row">
			<div class="col-xs-12 planner-widget">
				<div class="well wellington">
					{% include planner-widget.html %}
				</div>
			</div>
			<div class="col-xs-12">
				<div class="list-group">
					<a class="list-group-item" href="#"><strong>90 Elizabeth St NE</strong> to <strong>40 Courtland...</strong><span class="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true"></span></a>
					<a class="list-group-item" href="#"><strong>Georgia Dome</strong> to <strong>Midtown, Atlanta...</strong><span class="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true"></span></a>
				</div>
			</div>
		</div>
	</div>
	<div class="col-xs-12 col-sm-7 col-md-8 carousel-widget">
		{% include carousel-widget.html %}
	</div> 
</div>
<div class="agencies-row">
<div class="row l-newsbar">
	<div class="col-xs-12 text-center bottom-buffer">
		<hr>
		<h2 class="row-heading">Featured Content</h2>
	</div>
	{% for item in site.data.features %} 
	<div class="col-xs-12 col-sm-6 col-md-3">
		<a href="{{ item.url }}">
			<div class="news">
				<h3 class="news-text">{{ item.tagline }}</h3>
				<div class="news-box" style="background-image: url('{{ item.image }}');"></div>
			</div>
		</a>
	</div>
	{% endfor %}
</div>
<div class="row">
	<div class="col-xs-12 col-sm-12 col-md-6">
		<a href="/about/regional-transit" class="thumbnail thumbnail-link main-item">
			<div class="caption">
				<h3>Is transit in Atlanta regional?</h3>
				<p class="">How can a transit system with more than 4 agencies work in harmony? Find out how these agencies are stitching transit together.</p>
			</div>
		</a>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-6">
		<a href="/about/history" class="thumbnail thumbnail-link main-item">
			<div class="caption">
				<h3>What is atltransit?</h3>
				<p class="">atltransit is <em>the</em> regional transit information hub. Whether you're looking for tools or tips, you've come to the right place.</p>
			</div>
		</a>
	</div>
</div>
</div>
<!-- <div class="agencies-row"> -->
<div class="row">
	<div class="col-xs-12 text-center bottom-buffer">
		<hr>
		<h2 class="row-heading">Agencies</h2>
	</div>
</div>

{% include agency_cards.html %}
<!-- </div> -->
