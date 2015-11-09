---
layout: page
title: Interactive map
order: 1
id: interactive
category: 'maps'
permalink: '/maps/interactive/'
related: ["Agency information", "Plan a trip"]
image: "/build/images/tools/interactive-map.png"
tagline: Easily find regional connections and the closest rail station or park 'n' ride lot to you.
---

The map below shows the major regional connections for transit service in the Atlanta region.

**Note:** local bus service (in Fulton, DeKalb, Cobb, Gwinnett, Clayton, and Cherokee counties) is **not shown** here.

<!-- Container for interactive svg map -->
<div class="svg-container col-sm-12 thumbnail">
	<svg version="1.1" viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet" class="svg-content">
    <div class="leaflet-control-zoom leaflet-bar leaflet-control svg-buttons">
      <a class="leaflet-control-zoom-in" data-zoom="+1" title="Zoom in">+</a>
      <a class="leaflet-control-zoom-out" data-zoom="-1" title="Zoom out">-</a>
    </div>
  </svg>
</div>

<script>
window.onload = function () { 
  var margin = {top: 0, right: 0, bottom: 0, left: 0};
      // width = 960 - margin.left - margin.right,
      // height = 500 - margin.top - margin.bottom;
  var width = 500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  var x = d3.scale.linear()
      .domain([-width / 2, width / 2])
      .range([0, width]);

  var y = d3.scale.linear()
      .domain([-height / 2, height / 2])
      .range([height, 0]);

  var zoom = d3.behavior.zoom()
    .x(x)
    .y(y)
    .scaleExtent([1, 10])
    .size([width, height])
    .center([width / 2, height / 2])
    .on("zoom", zoomed);

  var svg = d3.select(".svg-content")
    .append("g")
    // .attr("transform", "translate(0," + height + ")")
    // .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(zoom)
    .append("g");

  d3.selectAll("a[data-zoom]")
      .on("click", clicked);
  d3.xml("../../assets/images/regional_map_final_legend.svg", function(error, documentFragment) {
    if (error) {console.log(error); return;}
    svg.append("button").text("wiggle").attr("float", "left").on("click", zoomed);
    var svgNode = documentFragment
                  .getElementsByTagName("svg")[0];

    svg.node().appendChild(svgNode);

  });

  function clicked() {
    if (zoom.scale() <= zoom.scaleExtent()[0] && +this.getAttribute("data-zoom") === -1){
      return;
    }
    else if (zoom.scale() >= zoom.scaleExtent()[1] && +this.getAttribute("data-zoom") === 1){
      return;
    }
    else{
      svg.call(zoom.event); // https://github.com/mbostock/d3/issues/2387

      // Record the coordinates (in data space) of the center (in screen space).
      var center0 = zoom.center(), translate0 = zoom.translate(), coordinates0 = coordinates(center0);
      // console.log(center0)
      zoom.scale(zoom.scale() * Math.pow(2, +this.getAttribute("data-zoom")));

      // Translate back to the center.
      var center1 = point(coordinates0);
      console.log(center1)
      zoom.translate([translate0[0] + center0[0] - center1[0], translate0[1] + center0[1] - center1[1]]);

      svg.transition().duration(750).call(zoom.event);
    }
    
  }
  function coordinates(point) {
    // console.log(point)
    var scale = zoom.scale(), translate = zoom.translate();
    console.log(point[0]);
    return [(point[0] - translate[0]) / scale, (point[1] - translate[1]) / scale];
  }

  function point(coordinates) {
    var scale = zoom.scale(), translate = zoom.translate();
    return [coordinates[0] * scale + translate[0], coordinates[1] * scale + translate[1]];
  }
  function zoomed() {
    console.log(zoom.scale())
    svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  }
}
</script>