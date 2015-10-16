---
layout: page
title: Discounts & passes
id: passes
category: 'fares'
permalink: '/fares/passes/'
tagline: Buy in bulk and reap the rewards.
---

## Regional fare pass

Currently, a single regional fare pass **does not exist** for the Atlanta region. To receive bulk or monthly discounts you must buy a pass for a single transit agency.

<div class="row">
	<div class="col-md-6">
		<h3>Breeze Card passes</h3>

		<p>Most discounts and passes for each individual transit agency are available on your Breeze Card. Here's a complete listing of Breeze Card fare products:</p>
		{% for agency in site.data.fares %}
			<div class="panel-group" role="tablist">
					{% for product in agency.passes %}
						{% if forloop.first %}
							<div class="panel panel-default">
								<div class="panel-heading" role="tab" id="collapseListGroupHeading{{ agency.id }}">
									<h4 class="panel-title">
									<a class="" role="button" data-toggle="collapse" href="#collapseListGroup{{ agency.id }}" aria-expanded="false" aria-controls="collapseListGroup{{ agency.id }}">
											{{ agency.name }}
										</a>
									</h4>
								</div>
								<div id="collapseListGroup{{ agency.id }}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="collapseListGroupHeading{{ agency.id }}" aria-expanded="false">
									<ul class="list-group">
						{% else %}
							<li class="list-group-item">{{ product.name }} <span class="pull-right">${{ product.cost }}</span></li>
						{% endif %}
					{% endfor %}
						</ul>
						<!-- <div class="panel-footer">Footer</div> -->
					</div>
				</div>
				{% endfor %}	
			</div>
		</div>
	</div>
	</div>
	<div class="col-md-6">
		<h3>Individual agency fare products</h3>
		In addition to the Breeze Card, GRTA Xpress, CCT, and GCT each have their own fare products to use on their services. Riders may choose to purchase passes from each transit service directly. Passes can be purchased from each individual agency at the links below.

		<div class="row">
			<div class="col-xs-6">
				<a class="btn btn-default" href="http://breezecard.com/">MARTA (breezecard.com)</a>
			</div>
			<div class="col-xs-6">
				<a class="btn btn-default" href="http://www.gwinnettcounty.com/portal/gwinnett/Departments/Transportation/GwinnettCountyTransit/PassesandTickets" target="_new">GCT Ticketing</a>
			</div>
			<div class="col-xs-6">
				<a class="btn btn-default" href="http://egov.cobbcountyga.gov/index.php/estore-categories/2/168/cct-bus-passes" target="_new">CCT Ticketing</a>
			</div>
			<div class="col-xs-6">
				<a class="btn btn-default" href="http://onlinesales.xpressga.com" target="_new">GRTA Xpress Online Sales</a>
			</div>
		</div>
	</div>
</div>


