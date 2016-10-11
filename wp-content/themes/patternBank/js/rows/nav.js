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

	$('nav.main_page_navigation li').each(function(){
		itemWidth = $(this).outerWidth() + 1;
		navWidth = navWidth + itemWidth;
	});

	if(pageWidth < navWidth){
		$('nav.main_page_navigation, .nav_grad').addClass('h_scroll');
		$('nav.main_page_navigation ul').css('minWidth', navWidth);
	}else{
		$('nav.main_page_navigation, .nav_grad').removeClass('h_scroll');
	}

	var navHeight = $('nav.main_page_navigation').outerHeight();
	var navOffset = $('nav.main_page_navigation').offset();
	$('.nav_grad').css({'height': navHeight, 'top': navOffset.top});
}
