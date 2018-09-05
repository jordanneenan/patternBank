$(document).ready(function($){

	var catId = 0;
	populatePosts(catId);

	$('.category_filters li a').click(function(event){

		if(!$(this).hasClass('active')){
			$(this).addClass('active');
		}else{
			$(this).removeClass('active');
		}

		//reset the currentpage value to 0
		$('#currentpage').attr('data-currentpage', 0);

		var catArray = [];

		$('.category_filters li a').each(function(){
			if($(this).hasClass('active')){
				var catId = $(this).attr('data-catid');
				catArray.push(catId);
			}
		});

		populatePosts(catArray);

		event.preventDefault();
	});

	$('.ajax_pagination a').click(function(event){
		var maxPages = $('#page_int').attr('data-maxpage');
			maxPages = Number(maxPages);
		var currentPage = $('#currentpage').attr('data-currentpage');
			currentPage = Number(currentPage);

		if($(this).hasClass('newer')){
			currentPage = currentPage - 1;
			$('#currentpage').attr('data-currentpage', currentPage );
		}

		if($(this).hasClass('older')){
			currentPage = currentPage + 1;
			$('#currentpage').attr('data-currentpage', currentPage );
		}

		var catArray = [];

		$('.category_filters li a').each(function(){
			if($(this).hasClass('active')){
				var catId = $(this).attr('data-catid');
				catArray.push(catId);
			}
		});

		populatePosts(catArray);

		event.preventDefault();
	});

});



function populatePosts(catIds){
	if($('.category_filters').length){

		var sendCurrentPage = $('#currentpage').attr('data-currentpage');

		$.ajax({
            type: 'POST',
            url: '/wp-content/themes/patternBank/rows/ajax-news/ajax-news.php',
            data: {cats: catIds, currentPage: sendCurrentPage},
            success: function(response){
                $('.posts').html(response);
                showPagination();
            }
		});

	}
}


function showPagination(){
	var maxPages = $('#page_int').attr('data-maxpage');
		maxPages = Number(maxPages);
	var currentPage = $('#currentpage').attr('data-currentpage');
		currentPage = Number(currentPage);
	$('.ajax_pagination a').hide();

	if(currentPage > 0){
		$('.ajax_pagination a.newer').fadeIn();
	}

	if(currentPage < maxPages-1){
		$('.ajax_pagination a.older').fadeIn();
	}

	
}
