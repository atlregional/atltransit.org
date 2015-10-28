---
layout: default
title: Home
category: ''
permalink: '/'
---
<!-- <div class="status-widget col-sm-12 alert alert-info" role="alert">
	<p><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> <strong>Status:</strong> All vehicles are running smoothly.</p>
</div> -->
<!-- <div class="row">
	<div class="col-md-12 hidden-xs text-right">
		<div class="jumbotron" style="padding: 0px; background-color: #fff">
			<img src="/build/images/atltransit-logo-blue.png" width="300">
			<p class="">Your source for regional transit info</p>
		</div>
	</div>
</div> -->
<div class="row">
	<div class="col-xs-12 col-sm-5 col-md-4">
		<div class="row">
			<div class="col-xs-12 planner-widget">
				<div class="well wellington">
					{% include planner-widget.html %}
				</div>
			</div>
			<!-- <div class="col-xs-12">
				<div class="well wellington">
					<p>Recent trips</p>
					<ul class="list-group">
						<li class="list-group-item"><a href=""><strong>90 Elizabeth St NE</strong> to <strong>40 Co...</strong><span class="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true"></span></a></li>
						<li class="list-group-item"><a href=""><strong>Georgia Dome</strong> to <strong>Midtown, At...</strong><span class="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true"></span></a></li>
					</ul>
				</div>
			</div> -->
		</div>
	</div>
	<div class="col-xs-12 col-sm-7 col-md-8 carousel-widget">
		<div class="row">
			<div class="col-xs-12">
				{% include carousel-widget.html %}
			</div>
		</div>
	</div> 
</div>
<div class="row l-newsbar">
	<div class="col-xs-12 col-sm-6 col-md-3">
		<a href="/destinations/airport">
			<div class="news">
				<h3 class="news-text"><i class="fa fa-plane"></i> Hitch a ride to the airport on MARTA!</h3>
				<div class="news-box" style="background-image: url('/build/images/marta_airport_historic.png');"></div>
				<!-- <div class="caption">
					<p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</p>
				</div> -->
			</div>
		</a>
	</div>
	<div class="col-xs-12 col-sm-6 col-md-3">
		<a href="/fares/products">
			<div class="news">
				<h3 class="news-text">Purchase your Breeze Card today!</h3>
				<div class="news-box" style="background-image: url('{{ site.baseurl }}/build/images/breeze_multi_agency.jpeg');"></div>
				<!-- <div class="caption">
					<p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</p>
				</div> -->
			</div>
		</a>
	</div>
	<div class="col-xs-12 col-sm-6 col-md-3">
		<a href="/tools/realtime">
			<div class="news">
				<h3 class="news-text">Get real-time arrivals for trains and buses!</h3>
				<div class="news-box" style="background-image: url('/build/images/train_realtime.jpeg');"></div>
				<!-- <div class="caption">
					<p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</p>
				</div> -->
			</div>
		</a>
	</div>
	<div class="col-xs-12 col-sm-6 col-md-3">
		<a href="/fares/transfers">
			<div class="news">
				<h3 class="news-text">Not sure how to transfer?</h3>
				<div class="news-box" style="background-image: url('/build/images/bus_transfer.png');"></div>
				<!-- <div class="caption">
					<p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</p>
				</div> -->
			</div>
		</a>
	</div>
</div>
<div class="row">
	<div class="col-xs-12 col-sm-12 col-md-6">
		<a href="/about/regional-transit" class="thumbnail thumbnail-link main-item">
			<!-- <div class="row"> -->
				<!-- <img class="col-xs-3 col-sm-2 col-md-3 top-buffer img-responsive" src="/build/images/atltransit-badge.png"> -->
				<!-- <div class="caption col-xs-9 col-sm-10 col-md-9"> -->
				<div class="caption">
					<h3>Is transit in Atlanta regional?</h3>
					<p class="">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</p>
				<!-- </div> -->
			</div>
		</a>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-6">
		<a href="/about/history" class="thumbnail thumbnail-link main-item">
			<!-- <div class="row"> -->
				<!-- <img class="col-xs-3 col-sm-2 col-md-3 top-buffer img-responsive" src="/build/images/atltransit-badge.png"> -->
				<!-- <div class="caption col-xs-9 col-sm-10 col-md-9"> -->
				<div class="caption">
					<h3>What is ATLtransit?</h3>
					<p class="">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</p>
				<!-- </div> -->
			</div>
		</a>
	</div>
</div>
<script type="text/javascript">
	$('#test-carousel').carousel({
		interval: false
	});
</script> 