$(document).ready(function(){

	//open and close the save field
	$('.save').click(function(){
		if(!$('.save_field').hasClass('active')){
			$('.collapse').slideUp();
			$('.edit_section_title').removeClass('active');
			$('.save_field').addClass('active').slideDown();

			$('.load_container.active').removeClass('active').slideUp();
			saveCall('get_save_list', 'false');
		}else{
			$('.save_field').removeClass('active').slideUp();
			$('.save_message').fadeOut(function(){
				$(this).html('');
			});
		}
	});

	$('.save_go').click(function(){
		var saveName = $('.save_field').find('input').val();

		if(saveName !== ''){
			saveCall('save', saveName);
		}else{
			$('.save_message').html('Please enter a name').fadeIn();
		}
	});

	$('.save_over_list').on("click",".save_over_name", function(){
		var savedId = $(this).attr('data-savedname');
		saveCall('save_over', savedId);
	});

});

//call to save.php 
//options: 
//-------- 'save' (save list of values to DB)
//-------- 'save_over' (save over previous save)
//-------- 'get_save_list' (returns a list of previous saves)
function saveCall(action, saveId){
	if(saveId == 'undefined'){saveName = '';}
	valueArray = getValues();

	$.ajax({
        type: 'POST',
        url: '/wp-content/themes/patternBank/editor/app/save.php',
        data: {doAction: action, saveID: saveId, fieldData: valueArray},
        success: function(returnedVal){

        	if(action == 'save'){
	            $('.save_message').html(returnedVal).fadeIn();
	            $('.save_field').find('input').val('');
	            saveCall('get_save_list', 'false');
        	}

        	if(action == 'save_over'){
        		if(returnedVal == 'saved'){
	        		$('.save_message').html('Saved over').fadeIn();
	        	}
        	}

        	if(action == 'get_save_list'){
        		if(returnedVal !==""){
	        		$('.save_over_list').html(returnedVal).promise().done(function(){
				        $('.save_over').slideDown();
				    });
	        	} 
        	}

        }
    });
}

//add the value of each field to an array
function getValues(){
	var valueArray = [];

	$('.edit_field').each(function(){
		var fieldVal = $(this).find('input').val();
		valueArray.push(fieldVal);
	});

	return valueArray;
}
