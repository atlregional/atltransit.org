---
layout: page
title: "Discounts & Passes"
id: passes
order: 3
category: fares
permalink: /fares/passes/
tagline: "Discounts are available for bulk purchases, multi-day passes, seniors, and youth."
image: /build/images/breeze_multi_agency.jpeg
published: true
---


* toc goes here
{:toc class="list-inline anchor toc text-center col-sm-12"}

## Base Fares

{% include row_break.html %}
{% include tables/agency_fare_tables.html name=true %}

## List of all fare passes

<div class="col-sm-6 col-xs-12 pull-right">
	<img class="img-responsive center-block" style="max-height: 200px" src="/assets/images/Breeze.png" alt="Breeze Card">
</div>

Wondering about the best way to pay for your trip?  Below is a complete listing of all fare passes available in the region.

Most discounts and passes for each individual transit agency are available on your Breeze Card.

<p class="text-center bottom-buffer"><a class="btn btn-lg btn-primary top-buffer" href="http://breezecard.com/">Visit BreezeCard.com <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span></a></p>


{% include fare-passes.html %}

{% include row_break.html %}


## Discounts

Seniors, youth, and students may qualify for special discounted fare.  Check the list of available discounts below and visit your agency's website for details on qualification and where to buy.

{% for agency in site.agencies %}
{% if agency.fares.discounts %}
<img src="{{ agency.logo }}" style="max-width:200px" class="img-responsive center-block" alt="{{ agency.acronym }}" title="{{ agency.acronym }}">
{% for product in agency.fares.discounts %}
**{{ product.name }}** - {{ product.cost }} {% if product.details %}<small>({{ product.details }})</small>{% endif %}
{: .text-center}
{% endfor %}
<small>[View more info on {{ agency.acronym }} discounts and how to purchase »]({{ agency.fares.info_url }})</small>
{: .text-center}
{% endif %}
{% endfor %}



[Find out more on free transfers »](/fares/transfers)

[Find out more on efforts to make fare payment easier in Atlanta »](/about/regional-transit)

## Individual Agency Fare Passes

<div class="row">
	<div class="col-sm-6">
		<p>
			In addition to the Breeze Card, GRTA Xpress, CobbLinc, and GCT each have their own fare products to use on their services. 
		</p>
		<p>
			Riders may choose to purchase passes from each transit service directly. Passes can be purchased from each individual agency at the links below.
		</p>
	</div>
	<div class="col-sm-6">
		<div class="row">
			{% for agency in site.agencies %}
			{% if agency.fares.info_url %}
			<div class="col-xs-6">
				<div class="thumbnail">
					<div class="caption">
						<h3>{{ agency.acronym }}</h3>
						<a class="btn btn-primary top-buffer" target="_blank" href="{{ agency.fares.info_url }}" alt="Fare information" title="Fare information"><i class="fa fa-info-circle"></i></a>
						<a class="btn btn-success top-buffer" target="_blank" href="{{ agency.fares.purchase_url }}" alt="Purchase fare" title="Purchase fare"><i class="fa fa-shopping-cart"></i></a>
					</div>
				</div>
			</div>
			{% endif %}
			{% endfor %}
		</div>
	</div>
</div>

## Regional Fare Card

Breeze Card is the regional transit fare card for Atlanta.  To pay for your trip, you can either pre-load cash value onto your Breeze Card, or you can pre-load a multi-trip pass product for a specific transit agency (MARTA, Cobb, Gwinnett or GRTA).  Frequent riders should consider purchasing a multi-trip or monthly pass, as it provides added discounts by purchasing in bulk.  To receive a free transfer between MARTA and any Breeze partner agency, you must use a Breeze Card.
