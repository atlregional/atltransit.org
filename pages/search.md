---
layout: search
title: Search results
id: search
category: ""
permalink: '/search/'
tagline: "Search the site"

---
{% include forms/search.html class="bottom-buffer" %}

<script>
  (function() {
    var cx = '012656238249604753028:qzpqrvzllsa';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
        '//cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();
</script>
<gcse:searchresults-only></gcse:searchresults-only>