---
layout: page
title: How to buy fare
id: products
category: 'fares'
permalink: '/fares/products/'
---

## Basic fare

A single ride on any transit system can be taken with the following fares:

<div class="row">
{% for agency in site.data.fares %}
<div class="col-md-4">
<h3>{{ agency.name }}</h3>
<table class="table">
    <thead>
        <th>Fare product</th>
        <th>Cost</th>
    </thead>
    {% for product in agency.base %}
        <tr>
            <td>{{ product.name }}</td><td>${{ product.cost }}</td>
        </tr>
    {% endfor %}
</table>
</div>
{% endfor %}
</div>