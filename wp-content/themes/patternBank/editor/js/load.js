$(document).ready(function(){

	$('.load').click(function(){

		if(!$('.load_container').hasClass('active')){
			$('.collapse').slideUp();
			$('.edit_section_title').removeClass('active');
			$('.load_container').addClass('active').slideDown();

			$('.save_field.active').removeClass('active').slideUp();

			loadCall('get_load_list', 'false');
		}else{
			$('.load_container').removeClass('active').slideUp();
		}

	});

	$('.load_list').on("click",".load_name", function(){
		var loadName = $(this).attr('data-loadName');
		loadCall('load_in', loadName);
	});

});

function loadCall(action, loadId){

	$.ajax({
        type: 'POST',
        url: '/wp-content/themes/patternBank/editor/app/load.php',
        data: {doAction: action, loadID: loadId},
        success: function(returnedVal){

        	if(action == 'get_load_list'){
        		if(returnedVal !==""){
	        		$('.load_list').html(returnedVal).promise().done(function(){
				        $('.load_options').slideDown();
				    });
	        	} 
        	}

        	if(action == 'load_in'){
        		var $i = 0;
        		$('.edit_field').each(function(){
					var theValue;

					$.each(JSON.parse(returnedVal), function(key, value){
	        			if(key == $i){
        					theValue = value;
	        			}
	        		});

	        		$(this).find('input').val(theValue);
					$i++;

					applyChanges();

					$('.form_color').each(function(){
						var colorVal = $(this).val();
						$(this).spectrum({
						    color: colorVal,
						    preferredFormat: "hex",
					    	showInput: true
						});
					});
				});
        	}

        }
    });
}
