$(document).ready(function(){

	collapsableCopy();

	$('.collapsable_toggle').click(function(){
		var $parent = $(this).prev();
		var $gradient = $(this).prev().find('.collapsable_copy_gradient');

		var expandedHeight = $parent.attr('data-height');
		var collapsedHeight = 200;

		if(!$(this).hasClass('active')){
			$(this).addClass('active');
			$gradient.addClass('active')
			$parent.css('height', expandedHeight);
		}else{
			$(this).removeClass('active');
			$gradient.removeClass('active');
			$parent.css('height', collapsedHeight);
		}
	});
});

var collapsableCopy = function(){
	$('.collapsable_copy_gradient').each(function(){
		var $parent = $(this).parent();
		var $copyBox= $(this).next();
		var expandedHeight = $copyBox.height();
		var collapsedHeight = 200;
		$parent.attr('data-height', expandedHeight);
		$parent.attr('data-colheight', collapsedHeight);

		if($(this).hasClass('active')){
			$parent.css('height', expandedHeight);
		}
	});
}
