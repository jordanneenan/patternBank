$(document).ready(function(){

	if($('.carousel').length){
		$('.carousel').slick({
			dots: true,
			arrows: true,
		    autoplay: true,
		    autoplaySpeed: 6000,
		    prevArrow: '<div class="carousel_arrow prev"><img src="/wp-content/themes/patternBank/img/icons/carousel_prev.svg" alt="Previous slide"></div>',
		    nextArrow: '<div class="carousel_arrow next"><img src="/wp-content/themes/patternBank/img/icons/carousel_next.svg" alt="Next slide"></div>',
		    fade: true,
		    speed: 1000
		  });
	}

});
