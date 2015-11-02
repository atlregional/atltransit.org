---

---
sort order
{% assign pages = site.pages | group_by:"category" %}
{% for category in pages %}
{{ category.name }}
{% assign items = category.items %}

	{% for item in items %}
		{%if item.id == 'products' %}
			{% assign sections = item.content | markdownify | split: '<h2>' %}

			{% for section in sections %}
				new section
				{{section}}
			{% assign headers = section | newline_to_br | split: '<br />' %}
				new header
				{{headers[0]}}
			{% endfor %}
		{% endif %}
	{% endfor %}
{% endfor %}

Hello

1. dfadsf
1. d
1. df
