$('.nav-search').submit(function(e){
	e.preventDefault();
	console.log(this.value);
});



// For fare table tooltips
$('[data-toggle="tooltip"]').tooltip();

// Close currently open nav div when another is clicked
// http://stackoverflow.com/a/23973965/915811
$("[data-collapse-group='navbarCollapse']").click(function (e) {
	e.preventDefault();
    var $this = $(this);
    console.log(this);
    $("[data-collapse-group='navbarCollapse']:not([data-target='" + $this.data("target") + "'])").each(function () {
    	$(this).addClass('collapsed');
    	console.log(this);
        $($(this).data("target")).removeClass("in").addClass('collapse');

    });
});

// Google custom search engine javascript
// (function() {
//   var cx = '012656238249604753028:qzpqrvzllsa'; // Insert your own Custom Search engine ID here
//   var gcse = document.createElement('script'); gcse.type = 'text/javascript'; gcse.async = true;
//   gcse.src = (document.location.protocol == 'https' ? 'https:' : 'http:') +
//       '//cse.google.com/cse.js?cx=' + cx;
//   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gcse, s);
// })();


// function doneResizing(){$(".drawer-marker").toggleClass("is-resizing",!1)}$("#gov_form").submit(function(){var e=(new RegExp("/@/","g"),$("#gov_form input").val());/@/g.test(e)?($("#gov_form select option[value=email]").attr("selected","selected"),$('#gov_form input[type="text"]').attr("id","email").attr("name","email"),$("#gov_form label").attr("for","email")):($("#gov_form").append('<input id="country_code" name="country_code" title="Country code" type="hidden" value="1" />'),$("#gov_form select option[value=phone]").attr("selected","selected"),$('#gov_form input[type="text"]').attr("id","phone").attr("name","phone"),$("#gov_form label").attr("for","phone"))}),$skip=$(".mast-skip"),$mastLogo=$(".mast-logo"),$menu=$(".mast-menu"),$menuControl=$(".menu-control"),$menuHeader=$(".menu-item-header"),$menuContent=$(".menu-content"),$linkHeader=$(".menu-item-link"),$drawers=$(".drawer"),$drawerHeaders=$(".drawer-header"),$drawerContents=$(".drawer-content"),$drawerFacade=$(".drawer-facade"),$moreDrawer=$(".drawer-alt > .drawer-content"),$menuControl.click(function(e){menuControlClick(e)}),$menuHeader.click(function(e){menuHeaderClick(e)}),$linkHeader.click(function(e){linkHeaderClick(e)}),$drawerHeaders.focus(function(e){drawerHeaderFocus(e)}),$drawerHeaders.blur(function(e){drawerHeaderBlur(e)}),$drawerHeaders.click(function(e){drawerHeaderClick(e)}),$skip.click(function(e){onSkip(e)}),this.lastWidth=0,this.lastHeight=0;var height,resizeId;this.isExpanded=!1,$content=$("#content"),$(window).resize(function(e){$(".drawer-marker").toggleClass("is-resizing",!0),clearTimeout(resizeId),resize(e),resizeId=setTimeout(doneResizing,500)}),setTimeout(function(){$(window).trigger("resize")},1e3),this.activeDrawer=this.$drawers.eq(0),this.activeContent=this.activeDrawer.find(".drawer-content").eq(0),this.activeDrawer.addClass("is-active-drawer"),this.isMobile=$(window).width()<720,this.isLastMobile=this.isMobile,resize=function(e){this.isLastMobile=this.isMobile,this.isMobile=$(window).width()<720,this.isMobile!==this.isLastMobile&&(this.collapseDrawer(),this.setDrawerHeight(0),this.$drawerHeaders.parent().removeClass("is-active").siblings().removeClass("is-active")),!this.isMobile&&this.isExpanded?this.setDrawerHeight(this.activeContent.children().outerHeight(!0)):this.setDrawerHeight(),this.lastWidth=$(window).width()},menuControlClick=function(e){this.isExpanded?(this.collapseDrawer(),this.setDrawerHeight(0)):(this.expandDrawer(),this.setDrawerHeight(100)),setTimeout(function(){$moreDrawer.attr("aria-hidden",!self.isExpanded)},260)},menuHeaderClick=function(e){$(e.currentTarget).parent().toggleClass("is-active").siblings().removeClass("is-active")},onSkip=function(e){e.preventDefault(),$("#content").find(":focusable").eq(0).trigger("focus")},linkHeaderClick=function(e){this.collapseDrawer(),this.setDrawerHeight(0)},drawerHeaderClick=function(e){this.isMobile||e.preventDefault(),this.setActiveDrawer($(e.currentTarget))},drawerHeaderFocus=function(e){this.isMobile||e.preventDefault()},drawerHeaderBlur=function(e){this.isMobile||e.preventDefault()},setActiveDrawer=function(e){this.activeDrawer=e.parent(),this.activeContent=e.siblings(".drawer-content").eq(0),this.isExpanded&&this.activeDrawer.hasClass("is-active-drawer")?(this.collapseDrawer(),this.setDrawerHeight(0)):(this.expandDrawer(),this.setDrawerHeight(this.activeContent.children().outerHeight(!0))),e.parent().addClass("is-active-drawer").siblings().removeClass("is-active-drawer")},expandDrawer=function(){this.isExpanded=!0,this.activeContent.attr("aria-hidden","false")},collapseDrawer=function(){this.isExpanded=!1,setTimeout(function(){$drawerContents.attr("aria-hidden","true")},250)},setDrawerHeightNarrow=function(e){0!==e&&(e=this.$menuContent.children().eq(0).outerHeight(!0)),this.setContentBuffer(e)},setDrawerHeight=function(e){return void 0===e?e=this.lastHeight:this.lastHeight=e,this.isMobile?void this.setDrawerHeightNarrow(e):void this.setContentBuffer(e)},

// setContentBuffer=function(e){$content.css({transform:["translate3d(0",e+"px","0)"].join(",")}),$("#footer").css({transform:["translate3d(0",e+"px","0)"].join(","),"margin-bottom":e})};

shiftContent=function(e){
	// $('.content, .footer').animate({ left: '+=300' }, 400);
	// $(".content, .footer").animate({
	//     step: function() {
	//         $(this).css('-webkit-transform',"translate3d(0px, " + e + "px, 0px)");
	//     },
	//     duration: 1000,
	//     easing: 'easeOutQuint'
	// });
	$('.content').animate({ marginTop: '+='+e+'px' }, 600, 'easeOutQuint');
};

// $('.dropdown-link').click(function(e){
// 	e.preventDefault();
// 	var $this = $(this);
// 	shiftContent($this.height());

// })


// Active nav
// console.log(atltransit.nav);
// console.log(atltransit.nav['{{ page.category }}']);
// $('.nav-sidebar').append('<li><a href="/{{ page.category }}">{{ page.category }}</a></li>');
// $.each(atltransit.nav['{{ page.category }}'], function(i, item){
// 	var activeLabel = '';
// 	var activeBar = '';
// 	if ('{{ page.id }}' === item ){
// 		activeLabel = '<span class="sr-only">(current)</span>';
// 		activeBar = 'class="active"';
// 	}
// 	$('.nav-sidebar').append('<li ' + activeBar + '><a href="/{{ page.category }}/' + item + '">'+item + activeLabel + '</a></li>');
// });
