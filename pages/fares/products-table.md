<table class="table">
<thead>
        <th>Fare product</th>
        <th>Cost</th>
    </thead>
{% for agency in site.data.fares %}



    
    <tr class="active"><td colspan="3"><strong>{{ agency.name }}</strong></td></tr>
    {% for product in agency.base %}
        <tr>
            <td>{{ product.name }}</td><td>${{ product.cost }}</td>
        </tr>
    {% endfor %}


{% endfor %}
</table>



<table class="table table-hover">
<thead>
	<th>Agency</th>
	<th>Product</th>
	<th>Cost</th>
</thead>
<tbody>
	{% for agency in site.data.fares %}
		{% for product in agency.passes %}
			{% if forloop.first %}
				<tr style="border-top:3px !important;"><td><strong>{{ agency.name }}</strong></td>
			{% else %}
				<tr><td></td>
			{% endif %}
				<td>{{ product.name }}</td><td>${{ product.cost }}</td></tr>
		{% endfor %}
	{% endfor %}
</tbody>
</table>