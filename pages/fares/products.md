---
layout: page
title: How to pay your fare
id: products
order: 1
category: 'fares'
permalink: '/fares/products/'
sections: ["Breeze vending machine", "Online", "On the bus", "Basic fare prices"]
image: "/build/images/breezecard_hand.png"
---

<div class="row">
	<div class="col-sm-12">
		<h2 id="{{ page.sections[0] | slugify }}">{{ page.sections[0] }}</h2>


		<div class="col-sm-6 col-xs-12 pull-right text-center">
			<img class="img-responsive img-rounded center-block" style="max-height:285px" src="http://ukc.ksea.org/UKC2015/images/direct5.jpg">
		</div>

		<p>
			You can purchase fare at any Breeze vending machine which are located at every MARTA rail station.  Breeze vending machines are also at major regional transfer centers. 
		</p>
		<p>
			<strong>Note:</strong> only select Breeze vending machines distribute regional fare products.  Regional fare products are only available at the MARTA Lindbergh Center Station and ...
		</p>
	</div>
</div>

<div class="row">
	<div class="col-sm-12">
		<h2 id="{{ page.sections[1] | slugify }}">{{ page.sections[1] }}</h2>


		<div class="col-sm-6 col-xs-12 pull-right text-center">
			<img class="img-responsive center-block" style="max-height:285px" src="/build/images/breezecard_website.png">
		</div>


		Any of the fare products available at the Breeze vending machines are also available at [Breezecard.com](http://breezecard.com).  In fact, you can purchase a number of regional fare products (including discounts and passes) online.  [Learn more about discounts and passes available online.](/fares/passes)
	</div>
</div>

<div class="row">
	<div class="col-sm-12">
		<h2 id="{{ page.sections[2] | slugify }}">{{ page.sections[2] }}</h2>

		<div class="col-sm-6 col-xs-12 pull-right text-center">
			<img class="img-responsive img-rounded center-block" style="max-height:285px" src="/build/images/breeze_farebox.png">
		</div>

		If you already have a Breeze Card, you may load cash value onto your card when boarding a bus.  The process involves three easy steps:
		<ol>
			<li>Tap Breeze Card on the bus farebox</li>
			<li>Insert cash (bills and/or coins)</li>
			<li>Tap your card again to load the value and transfer</li>
		</ol>
		[Learn more about discounts and passes available online.](/fares/passes)

	</div>
</div>

## {{ page.sections[3] }}

A single ride on any transit system can be taken with the following fares:

<div class="row">
	{% for agency in site.data.fares %}
	<div class="col-md-4 col-sm-6 equal-height">
			<h3>{{ agency.name }}</h3>
			<table class="table">
				<thead>
					<th>Fare product</th>
					<th>Cost</th>
				</thead>
				{% for product in agency.base %}
				<tr>
					<td>{{ product.name }}</td><td>{{ product.cost }}</td>
				</tr>
				{% endfor %}
			</table>
	</div>
	{% endfor %}
</div>