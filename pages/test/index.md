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


<div id="timeline"></div>
<script type="text/javascript" src="{{ site.baseurl }}/build/js/vendor.js"></script>
<script type="text/javascript" src="https://cdn.rawgit.com/jiahuang/d3-timeline/master/src/d3-timeline.js"></script>
<script type="text/javascript">
window.onload = function(){
	var rectAndCircleTestData = [
    {times: [{"starting_time": 1355752800000, "display": "circle"},
             {"starting_time": 1355767900000, "ending_time": 1355774400000}]},
    {times: [{"starting_time": 1355759910000, "display":"circle"}, ]},
    {times: [{"starting_time": 1355761910000, "ending_time": 1355763910000}]},
  ];
  var testData = [
  {class: "pA", label: "person a", times: [
    {"starting_time": 1355752800000, "ending_time": 1355759900000},
    {"starting_time": 1355767900000, "ending_time": 1355774400000}]},
  {class: "pB", label: "person b", times: [
    {"starting_time": 1355759910000, "ending_time": 1355761900000}]},
  {class: "pC", label: "person c", times: [
    {"starting_time": 1355761910000, "ending_time": 1355763910000}]},
  ];
	// var testData = [
	//   {label: "person a", times: [
	//     {"starting_time": 1355752800000, "ending_time": 1355759900000},
	//     {"starting_time": 1355767900000, "ending_time": 1355774400000}]},
	//   {label: "person b", times: [
	//     {"starting_time": 1355759910000, "ending_time": 1355761900000}]},
	//   {label: "person c", times: [
	//     {"starting_time": 1355761910000, "ending_time": 1355763910000}]},
	//   ];

	var chart = d3.timeline().showTimeAxisTick();

	var svg = d3.select("#timeline").append("svg").attr("width", 500)
	  .datum(testData).call(chart);
};
</script>