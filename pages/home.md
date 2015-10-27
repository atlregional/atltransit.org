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
<div class="row">
	<div class="col-xs-12 col-sm-6 col-md-4">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title"><i class="fa fa-plane"></i> Hitch a ride to the airport on MARTA!</h3>
			</div>
			<div class="panel-body">
				<a href="#" class="thumbnail">
					<img class="home-thumbnail" src="{{ site.baseurl }}/assets/images/marta_train_interior.jpg" alt="...">
				</a>
			</div>
		</div>
	</div>
	<div class="col-xs-12 col-sm-6 col-md-4">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">Purchase your Breeze Card today!</h3>
			</div>
			<div class="panel-body">
				<a href="/fares/products" class="thumbnail">
					<img class="home-thumbnail" src="{{ site.baseurl }}/assets/images/breeze_card.png" alt="...">
				</a>
			</div>
		</div>
	</div>
	<div class="col-xs-12 col-sm-6 col-md-4">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">Get real-time arrivals for trains and buses!</h3>
			</div>
			<div class="panel-body">
				<a href="/tools/realtime" class="thumbnail">
					<img class="home-thumbnail" src="//c1.staticflickr.com/1/12/96724309_985b8acd3f_m.jpg" alt="...">
				</a>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
	$('#test-carousel').carousel({
		interval: false
	});
</script> 