---
layout: default
title: Home
category: ""
permalink: '/'
---
<div class="home-container">
<!-- <div class="bg" style="background-image: url('/assets/source_images/marta_train_blur_2.jpg'); width:100%;background-repeat:no-repeat; background-size:contain;"> -->
<div class="container-fluid site-container">
<div class="row">
<div class="col-md-12">
{% include service_alerts_bar.html %}

<div class="row">
	<div class="col-xs-12 col-sm-5 col-md-4">
		<div class="row">
			<div class="col-xs-12 planner-widget">
				<div class="well wellington">
					{% include planner-widget.html %}
				</div>
				{% include forms/parknride-go.html inline=true %}
			</div>
			<!-- <div class="col-xs-12 hidden-sm hidden-xs">
				<div class="list-group">
					<a class="list-group-item" href="#"><strong>90 Elizabeth St NE</strong> to <strong>40 Courtland...</strong><span class="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true"></span></a>
					<a class="list-group-item" href="#"><strong>Georgia Dome</strong> to <strong>Midtown, Atlanta...</strong><span class="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true"></span></a>
				</div>
			</div> -->
		</div>
	</div>
	<div class="col-sm-7 col-md-8 col-xs-12">

		{% include carousel-widget.html %}
		<!-- <h2 class="row-heading">Quick Links</h2> -->
		<!-- <div class="col-sm-6">
			<a href="/tools/schedules" class="btn btn-lg btn-block btn-primary">
				<span class="hidden-xs"><i class="fa fa-5x fa-calendar"></i><br></span><i class="fa hidden-sm hidden-md hidden-lg right-5 fa-calendar"></i>View Schedules<span class="hidden-sm"> by Stop</span>
			</a>
			<a href="/guide/parking" class="btn btn-lg btn-block btn-primary">
				<span class="hidden-xs"><i class="fa fa-5x fa-car"></i><br></span><i class="fa hidden-sm hidden-md hidden-lg right-5 fa-car"></i>Find a Park 'n' Ride<span class="hidden-sm"> Lot Near You</span>
			</a>
			<a href="/fares" class="hidden-sm btn btn-lg btn-block btn-default">
				<span class="hidden-xs"><i class="fa fa-5x fa-usd"></i><br></span><i class="fa hidden-sm hidden-md hidden-lg right-5 fa-usd"></i>Learn About Fares & Transfers
			</a>
		</div> -->
		
		<!-- <div class="col-md-6"> -->
			
			<!-- <div class="top-buffer">
				<a href="/maps/interactive">
					<img src="/build/images/interactive-map.png" class="img-responsive" alt="interactive map">
					<p>Find out where regional transit takes you!</p>
				</a>
			</div> -->
			<!-- <div class="top-buffer">
				<a href="/maps/interactive">
					<div class="news">
						<h3 class="news-text">Find out where regional transit takes you!</h3>
						<div class="news-box" style="background-image: url('/build/images/interactive-map.png');"></div>
					</div>
				</a>
			</div>
		</div>
		<div class="col-sm-6">
			<a href="/tools/realtime" class="btn btn-lg btn-block btn-warning">
				<span class="hidden-xs"><i class="fa fa-5x fa-bolt"></i><br></span><i class="fa hidden-sm hidden-md hidden-lg right-5 fa-bolt"></i>Get Real-time Arrivals
			</a>
			<a href="/tools/alerts" class="btn btn-lg btn-block btn-danger">
				<span class="hidden-xs"><i class="fa fa-5x fa-exclamation-triangle"></i><br></span><i class="fa hidden-sm hidden-md hidden-lg right-5 fa-exclamation-triangle"></i>View Service Alerts
			</a> -->
			<!-- <a href="/maps/interactive" class="hidden-sm btn btn-lg btn-block btn-default">
				<span class="hidden-xs"><i class="fa fa-5x fa-globe"></i><br></span><i class="fa hidden-sm hidden-md hidden-lg right-5 fa-globe"></i>View Regional Map 
			</a> -->
		<!-- </div> -->
		
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
				<h3>What is ATLtransit?</h3>
				<p class="">ATLtransit is <em>the</em> regional transit information hub. Whether you're looking for tools or tips, you've come to the right place.</p>
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

</div>
</div>
</div>
<!-- </div> -->
</div>
