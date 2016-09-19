$(document).ready(function(){

	if($('.slide_down').length){
		$('.hamburger').click(function(){
		    if(!$(this).hasClass('active')){
		        $(this).removeClass('dormant');
		        $(this).addClass('active');

		        $('nav ul').slideDown();
		    }else{
		        $(this).removeClass('active');
		        $(this).addClass('dormant');

		        $('nav ul').slideUp();
		    }
		});
	}

});

$(window).load(function(){
	if($('.horizontal_scroll').length){
		scrollNav();
	}
});

var scrollNav = function(){
	var pageWidth = $(window).width();
	var navWidth = 30;

	$('nav li').each(function(){
		itemWidth = $(this).outerWidth() + 1;
		navWidth = navWidth + itemWidth;
	});

	if(pageWidth < navWidth){
		$('nav, .nav_grad').addClass('h_scroll');
		$('nav ul').css('minWidth', navWidth);
	}else{
		$('nav, .nav_grad').removeClass('h_scroll');
	}

	var navHeight = $('nav').outerHeight();
	var navOffset = $('nav').offset();
	$('.nav_grad').css({'height': navHeight, 'top': navOffset.top});
}
