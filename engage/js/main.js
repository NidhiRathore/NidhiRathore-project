$(document).ready(function() {
	$(document).scroll(function() {
		var scroll = $(this).scrollTop();
		var naviTop = $("#E2E").position();
		if(scroll > naviTop.top) {
			$("nav").addClass("fixed-nav");
			} else{
				$("nav").removeClass("fixed-nav");
		}
	});

	function scrollNav() {
		$(".nav a").click(function(){
			//Toggle js
			$(".active").removeClass("select")
			$(this).closest("li").addClass("select");
			var navHover = $(this).attr("class");
			$("." +navHover).parent("li").addClass('select');

			//Animation JS 
			$("html, body").stop().animate({
				scrollTop : $ ($(this).attr("href")).offset().top - 100
			}, 2000);
			return false;
		});
		$(".scrollTop a").scrollTop();
	}
	scrollNav();
})