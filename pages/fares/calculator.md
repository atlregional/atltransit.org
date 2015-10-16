---
layout: page
title: Fare calculator
id: calculator
category: 'fares'
permalink: '/fares/calculator/'
tagline: Travelling across the region?  Find out how much your trip costs!
---
<div class="top-buffer"></div>
<div class="row">
	<div class="col-md-12 col-sm-12 col-xs-12 form-inline">
		<span class="text-center" style="">I'm transferring from:</span>
		<select class="form-control operator-select" id="from-select">
			<option value="none">[Choose Provider]</option>
			<option value="marta">MARTA</option>
			<option value="grta">GRTA</option>
			<option value="gct">GCT</option>
			<option value="cct">CCT</option>
		</select>
		<span class="text-center">to:</span>
		<select class="form-control operator-select " id="to-select">
			<option value="none">[Choose Provider]</option>
			<option value="marta">MARTA</option>
			<option value="grta">GRTA</option>
			<option value="gct">GCT</option>
			<option value="cct">CCT</option>
		</select>
	</div>
</div>
<div class="col-md-12 col-sm-12 col-xs-12 panel panel-default" style="min-height:200px">      
	<div class="transfer-blurb" id="none-to-none">
		<h4 style="text-center">Choose two providers from the select boxes to the left to see transfer information.</h4>
	</div>
	<div class="hidden transfer-blurb" id="grta-to-marta">
		<h4>GRTA Xpress to MARTA</h4>
		<ul class="list-unstyled">
			<div class="col-sm-3 col-xs-6">
				<div class="thumbnail transfer-info-card">
					<p class="text-center"><i class="fa fa-check fa-3x"></i></p>
					<strong>FREE</strong> with Breeze Card
				</div>
			</div>
			<div class="col-sm-3 col-xs-6">
				<div class="thumbnail transfer-info-card">
					<p class="text-center"><i class="fa fa-usd fa-3x"></i></p>
					cash value on Breeze Card (if trip begins on GRTA)
				</div>
			</div>
			<div class="col-sm-3 col-xs-6">
				<div class="thumbnail transfer-info-card">
					<p class="text-center"><i class="fa fa-clock-o fa-3x"></i></p>
					valid for 3 hours from start of trip
				</div>
			</div>
			<div class="col-sm-3 col-xs-6">
				<div class="thumbnail transfer-info-card">
					<p class="text-center"><i class="fa fa-tachometer fa-3x"></i></p>
					4 transfer limit
				</div>
			</div>
		</ul>
	</div>

	<div class="hidden transfer-blurb" id="marta-to-marta">
		<h4>MARTA to MARTA</h4>
		<ul class="list-unstyled">
			<div class="col-sm-3 col-xs-6">
				<div class="thumbnail transfer-info-card">
					<p class="text-center"><i class="fa fa-check fa-3x"></i></p>
					<strong>FREE</strong> with Breeze Card
				</div>
			</div>
			<div class="col-sm-3 col-xs-6">
				<div class="thumbnail transfer-info-card">
					<p class="text-center"><i class="fa fa-usd fa-3x"></i></p>
					MARTA fare product or cash value on Breeze Card
				</div>
			</div>
			<div class="col-sm-3 col-xs-6">
				<div class="thumbnail transfer-info-card">
					<p class="text-center"><i class="fa fa-clock-o fa-3x"></i></p>
					valid for 3 hours from start of trip
				</div>
			</div>
			<div class="col-sm-3 col-xs-6">
				<div class="thumbnail transfer-info-card">
					<p class="text-center"><i class="fa fa-tachometer fa-3x"></i></p>
					4 transfer limit
				</div>
			</div>
		</ul>
	</div>

	<div class="hidden transfer-blurb" id="gct-to-marta">
		<h4>Gwinnett County Transit (GCT) to MARTA</h4>
		<ul class="list-unstyled">
			<div class="col-sm-3 col-xs-6">
				<div class="thumbnail transfer-info-card">
					<p class="text-center"><i class="fa fa-check fa-3x"></i></p>
					<strong>FREE</strong> with Breeze Card
				</div>
			</div>
			<div class="col-sm-3 col-xs-6">
				<div class="thumbnail transfer-info-card">
					<p class="text-center"><i class="fa fa-usd fa-3x"></i></p>
					GCT fare product or cash value on Breeze Card (if trip begins on GCT)
				</div>
			</div>
			<div class="thumbnail">
				<div class="class=">
					<p class="text-center"><i class="fa fa-arrow-up fa-3x"></i></p>
					upcharges apply when transferring to a higher fare, e.g. from local to express bus
				</div>
			</div>
			<div class="col-sm-3 col-xs-6">
				<div class="thumbnail transfer-info-card">
					<p class="text-center"><i class="fa fa-clock-o fa-3x"></i></p>
					valid for 1.5 hours from start of a trip
				</div>
			</div>
			<div class="col-sm-3 col-xs-6">
				<div class="thumbnail transfer-info-card">
					<p class="text-center"><i class="fa fa-tachometer fa-3x"></i></p>
				</span> 3 transfer limit
			</div>
		</div>
	</ul>
</div>

<div class="hidden transfer-blurb" id="gct-to-gct">
	<h4>GCT to GCT</h4>
	<ul class="list-unstyled">
		<div class="col-sm-3 col-xs-6">
			<div class="thumbnail transfer-info-card">
				<p class="text-center"><i class="fa fa-check fa-3x"></i></p>
				<strong>FREE</strong> with Breeze Card
			</div>
		</div>
		<div class="col-sm-3 col-xs-6">
			<div class="thumbnail transfer-info-card">
				<p class="text-center"><i class="fa fa-usd fa-3x"></i></p>
				GCT fare product or cash value on Breeze Card
			</div>
		</div>
		<div class="thumbnail">
			<div class="class=">
				<p class="text-center"><i class="fa fa-arrow-up fa-3x"></i></p>
				upcharges apply when transferring to a higher fare, e.g. from local to express bus
			</div>
		</div>
		<div class="col-sm-3 col-xs-6">
			<div class="thumbnail transfer-info-card">
				<p class="text-center"><i class="fa fa-clock-o fa-3x"></i></p>
				valid for 1.5 hours from start of a trip
			</div>
		</div>
		<div class="col-sm-3 col-xs-6">
			<div class="thumbnail transfer-info-card">
				<p class="text-center"><i class="fa fa-tachometer fa-3x"></i></p>
			</span> 3 transfer limit
		</div>
	</div>
</ul>
</div>

<div class="hidden transfer-blurb" id="cct-to-marta">
	<h4>Cobb Community Transit (CCT) to MARTA</h4>
	<ul class="list-unstyled">
		<div class="col-sm-3 col-xs-6">
			<div class="thumbnail transfer-info-card">
				<p class="text-center"><i class="fa fa-check fa-3x"></i></p>
				<strong>FREE</strong> with Breeze Card
			</div>
		</div>
		<div class="col-sm-3 col-xs-6">
			<div class="thumbnail transfer-info-card">
				<p class="text-center"><i class="fa fa-usd fa-3x"></i></p>
				CCT fare product or cash value on Breeze Card (if trip begins on CCT)
			</div>
		</div>
		<div class="col-sm-3 col-xs-6">
			<div class="thumbnail transfer-info-card">
				<p class="text-center"><i class="fa fa-clock-o fa-3x"></i></p>
				valid for 3 hours from start of trip
			</div>
		</div>
		<div class="col-sm-3 col-xs-6">
			<div class="thumbnail transfer-info-card">
				<p class="text-center"><i class="fa fa-tachometer fa-3x"></i></p>
			</span> 4 transfer limit
		</div>
	</div>
</ul>
</div>

<div class="hidden transfer-blurb" id="cct-to-cct">
	<h4>CCT to CCT</h4>
	<ul class="list-unstyled">
		<div class="col-sm-3 col-xs-6">
			<div class="thumbnail transfer-info-card">
				<p class="text-center"><i class="fa fa-check fa-3x"></i></p>
				<strong>FREE</strong> with Breeze Card
			</div>
		</div>
		<div class="col-sm-3 col-xs-6">
			<div class="thumbnail transfer-info-card">
				<p class="text-center"><i class="fa fa-usd fa-3x"></i></p>
				CCT fare product or cash value on Breeze Card
			</div>
		</div>
		<div class="col-sm-3 col-xs-6">
			<div class="thumbnail transfer-info-card">
				<p class="text-center"><i class="fa fa-clock-o fa-3x"></i></p>
				valid for 3 hours from start of trip
			</div>
		</div>
		<div class="col-sm-3 col-xs-6">
			<div class="thumbnail transfer-info-card">
				<p class="text-center"><i class="fa fa-tachometer fa-3x"></i></p>
				4 transfer limit
			</div>
		</div>
	</ul>
</div>

<div class="hidden transfer-blurb" id="marta-to-sub">
	<h4>MARTA to any suburban/express transit provider</h4>
	<ul class="list-unstyled">
		<div class="col-sm-3 col-xs-6">
			<div class="thumbnail transfer-info-card">
				<p class="text-center"><i class="fa fa-check fa-3x"></i></p>
				<strong>FREE</strong> with Breeze Card
			</div>
		</div>
		<div class="col-sm-3 col-xs-6">
			<div class="thumbnail transfer-info-card">
				<p class="text-center"><i class="fa fa-usd fa-3x"></i></p>
				MARTA fare product or cash value on Breeze Card (if trip begins on MARTA)
			</div>
		</div>
		<div class="col-sm-3 col-xs-6">
			<div class="thumbnail transfer-info-card">
				<p class="text-center"><i class="fa fa-clock-o fa-3x"></i></p>
				valid for 3 hours from start of a trip
			</div>
		</div>
		<div class="col-sm-3 col-xs-6">
			<div class="thumbnail transfer-info-card">
				<p class="text-center"><i class="fa fa-tachometer fa-3x"></i></p>
				4 transfer limit
			</div>
		</div>
	</ul>
</div>


<div class="hidden transfer-blurb" id="sub-to-sub">
	<h4><span class="emphasis">NO free transfers</span> between GCT, CCT, and GRTA Xpress</h4>
	<ul class="list-unstyled">
		<div class="col-sm-3 col-xs-6">
			<div class="thumbnail transfer-info-card">
				<p class="text-center"><i class="fa fa-times fa-3x"></i></p>
				<strong>NOT FREE</strong>, even with Breeze Card
			</div>
		</div> 

		<div class="col-sm-3 col-xs-6">
			<div class="thumbnail transfer-info-card">
				<p class="text-center"><i class="fa fa-usd fa-3x"></i></p>
				<strong>must have both transit providers' fare products</strong> or enough stored cash value loaded to pay for each trip individually</li>
			</div>
		</div>
	</ul>
</div>
<div class="hidden transfer-blurb" id="grta-to-grta">
	<h4><span class="emphasis">NO free transfers</span> between GRTA Xpress buses</h4>
	<ul class="list-unstyled">
		<div class="col-sm-3 col-xs-6">
			<div class="thumbnail transfer-info-card">
				<p class="text-center"><i class="fa fa-times fa-3x"></i></p>
				<strong>NOT FREE</strong>, even with Breeze Card
			</div>
		</div> 

		<div class="col-sm-3 col-xs-6">
			<div class="thumbnail transfer-info-card">
				<p class="text-center"><i class="fa fa-usd fa-3x"></i></p>
				<strong>must have two Xpress fares</strong> or enough stored cash value loaded to pay for each trip individually</li>
			</div>
		</div>
	</ul>
</div>
</div>
<script type="text/javascript">
    $('.operator-select').on('change', function(){
        var from = $('#from-select').val();
        var to = $('#to-select').val();
        if (from !== "none" && to !== "none"){
            if (to !== "marta" && to !== "none" && to !== from){
                to = 'sub';
                if (from !== 'marta' && from !== "none"){
                    from = 'sub'
                }
            }
            var id = '#' + from + '-to-' + to;
            console.log(id)
            $('.transfer-blurb').addClass('hidden');
            $(id).removeClass('hidden');
        }
        else if (from !== "none" || to !== "none"){
            $('.transfer-blurb').addClass('hidden');
            $('#none-to-none').removeClass('hidden');
        }
    })
</script>
