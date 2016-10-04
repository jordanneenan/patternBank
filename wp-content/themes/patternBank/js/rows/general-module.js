$(document).ready(function(){

	if ($('.equal_height').length){
		matchHeight($('.equal_height .content'))
	}

	if ($('.masonry').length){
		$('.masonry').masonry({
			// options
			itemSelector: '.general_module',
			columnWidth: '.general_module'
		});
	}
});