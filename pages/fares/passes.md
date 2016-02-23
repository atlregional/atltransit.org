---
layout: page
title: "Discounts & passes"
id: passes
order: 3
category: fares
permalink: /fares/passes/
tagline: "Buy in bulk and reap the rewards. Also, find info on discounts for seniors, youth, and more."
image: /build/images/breeze_multi_agency.jpeg
published: true
---


* toc goes here
{:toc class="list-inline anchor toc text-center col-sm-12"}

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



## Regional fare pass

Currently, a single regional fare pass **does not exist** for the Atlanta region. 

To receive bulk or monthly discounts you must buy a pass for a single transit agency.

If you regularly ride with more than one agency (e.g., MARTA and CCT), **your monthly pass will not give you a free transfer between agencies**.

[Find out more on free transfers »](/fares/transfers)

[Find out more on efforts to make fare payment easier in Atlanta »](/about/regional-transit)

## List of all fare passes

<div class="col-sm-6 col-xs-12 pull-right">
	<img class="img-responsive center-block" style="max-height: 285px" src="/assets/images/Breeze.png">{: .img-responsive .center-block style="max-height:150px"}
</div>

Wondering about the best way to pay for your trip?  Below is a complete listing of all fare passes available in the region.

Most discounts and passes for each individual transit agency are available on your Breeze Card.

<p class="text-center bottom-buffer"><a class="btn btn-lg btn-primary top-buffer" href="http://breezecard.com/">Visit breezecard.com <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span></a></p>

<i class="fa fa-circle right-5"></i> = available on Breeze Card  
<i class="fa fa-circle-thin right-5"></i> = can be purchased with Breeze Card stored value

{% include fare-passes.html %}

{% include row_break.html %}

## Individual agency fare products

<div class="row">
	<div class="col-sm-6">
		<p>
			In addition to the Breeze Card, GRTA Xpress, CCT, and GCT each have their own fare products to use on their services. 
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
