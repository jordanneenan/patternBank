$(document).ready(function(){

	//toggle the edit bar in and out
	$('.open_editor').click(function(){

		if(!$('.editor').hasClass('active')){
			$('.editor').addClass('active');
		}else{
			$('.editor').removeClass('active');
		}
	});
	$('.close_editor').click(function(){
		$('.editor').removeClass('active');
	});

	$('.edit_section_title').click(function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$(this).next().slideUp();
			$('.save_field').removeClass('active').slideUp();
		}else{
			$('.collapse').slideUp();
			$('.edit_section_title').removeClass('active');
			$(this).addClass('active').next().slideDown();
			$('.save_field').removeClass('active').slideUp();
			$('.load_container').removeClass('active').slideUp();
			$('.save_message').fadeOut(function(){
				$(this).html('');
			});
		}
	});

	$('.apply').click(function(){
		applyChanges();
	});


	//fill the fields with the current value 
	//layout values - you have to hide the parent which forces jquery to get the actual value rather than the pixel value
	$('html').hide();
	loadValues('.global_container', 'maxWidth', '.form_layout-width');
	loadValues('.row', 'maxWidth', '.form_layout-row');
	loadValues('.content_container', 'maxWidth', '.form_layout-content');
	loadValues('p', 'font-size', '.p_size');
	loadValues('p', 'line-height', '.p_l_height');
	loadValues('p', 'margin-top', '.space_b');
	loadValues('p', 'margin-bottom', '.space_a');
	$('html').show();
	
	//primary colour
	var primaryColor = $('.palette.primary .color>div').css( "background-color" );
	primaryColor = rgb2hex(primaryColor);
	$('.form_primary').val(primaryColor).attr('data-default', primaryColor);
	// $(".form_primary").spectrum({
	//     color: primaryColor,
	//     preferredFormat: "hex",
 //    	showInput: true
	// });

	//secondary colour
	var secondaryColor = $('.palette.secondary .color>div').css( "background-color" );
	secondaryColor =rgb2hex(secondaryColor);
	$('.form_secondary').val(secondaryColor).attr('data-default', secondaryColor);
	// $(".form_secondary").spectrum({
	//     color: secondaryColor,
	//     preferredFormat: "hex",
 //    	showInput: true
	// });

	//tertiary colour
	var tertiaryColor = $('.palette.tertiary .color>div').css( "background-color" );
	tertiaryColor =rgb2hex(tertiaryColor);
	$('.form_tertiary').val(tertiaryColor).attr('data-default', tertiaryColor);
	// $(".form_tertiary").spectrum({
	//     color: tertiaryColor,
	//     preferredFormat: "hex",
 //    	showInput: true
	// });

});

function loadValues(obj, style, field){
	var value = $(obj).css(style);
	$(field).val(value).attr('data-default', value);
}

function applyChanges() {
	var styles = '';

	function setStyles(field, obj, style){
		if(checkForUpdate($(field))){
			var styleVal = $(field).val();
			var addStyle =  obj + '{' + style + ': ' + styleVal + ';}';
			styles += addStyle;
		}
	}

	//Individual styles
	setStyles('.form_layout-width', '.global_container', 'max-width');
	setStyles('.form_layout-row', '.row', 'max-width');
	setStyles('.form_layout-content', '.content_container', 'max-width');
	setStyles('.p_size', 'p', 'font-size');
	setStyles('.p_size', 'li', 'font-size');
	setStyles('.p_l_height', 'p', 'line-height');
	setStyles('.p_l_height', 'li', 'line-height');
	setStyles('.space_b', 'p', 'margin-top');
	setStyles('.space_a', 'p', 'margin-bottom');

	//Change primary colour styles
	if(checkForUpdate($('.form_primary'))){
		var primCol = $('.form_primary').val();
		primStyles = '.palette.primary .color>div {background-color:' + primCol + ';}';//primary
		primStyles += '.palette.primary .color.shadow>div {background-color:' + shadeColor(primCol, -10) + ';}';//primary shadow
		primStyles += '.palette.primary .color.highlight>div {background-color:' + shadeColor(primCol, +10) + ';}';//primary highlight
		primStyles += 'a {color:' + primCol + ';}';
		primStyles += 'a:hover {color:' + shadeColor(primCol, -10) + ';}';
		styles += primStyles;
	}
	//Change secondary colour styles
	if(checkForUpdate($('.form_secondary'))){
		var secCol = $('.form_secondary').val();
		secStyles = '.palette.secondary .color>div {background-color:' + secCol + ';}';//secondary
		secStyles += '.palette.secondary .color.shadow>div {background-color:' + shadeColor(secCol, -10) + ';}';//secondary shadow
		secStyles += '.palette.secondary .color.highlight>div {background-color:' + shadeColor(secCol, +10) + ';}';//secondary highlight
		styles += secStyles;
	}
	//Change tertiary colour styles
	if(checkForUpdate($('.form_tertiary'))){
		var terCol = $('.form_tertiary').val();
		terStyles = '.palette.tertiary .color>div {background-color:' + terCol + ';}';//tertiary
		terStyles += '.palette.tertiary .color.shadow>div {background-color:' + shadeColor(terCol, -10) + ';}';//tertiary shadow
		terStyles += '.palette.tertiary .color.highlight>div {background-color:' + shadeColor(terCol, +10) + ';}';//tertiary highlight
		styles += terStyles;
	}

	//apply all the styles in the DOM
	$('.editor_style style').html(styles);

	//function to check if the field has been changed
	function checkForUpdate(obj){
		var originalVal = obj.attr('data-default');
		var updatedVal = obj.val();
		if(originalVal !== updatedVal){
			return true;
		}
	}
}

//function to darken or lighten a colour
function shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

//function to convert rgb to hex
function rgb2hex(rgb) {
    if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;

    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
