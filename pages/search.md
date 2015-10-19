---
layout: page
title: Search
id: search
category: 'search'
permalink: '/search/'
tagline: "Search the site"
---

<!-- Put the following javascript before the closing  tag. -->
<script>
(function() {
  var cx = '012656238249604753028:qzpqrvzllsa'; // Insert your own Custom Search engine ID here
  var gcse = document.createElement('script'); gcse.type = 'text/javascript'; gcse.async = true;
  gcse.src = (document.location.protocol == 'https' ? 'https:' : 'http:') +
      '//cse.google.com/cse.js?cx=' + cx;
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gcse, s);
})();
</script>

<!-- Place this tag where you want both of the search box and the search results to render -->
<gcse:search></gcse:search>
<div></div>
