$(document).ready(function(){

	//call functions
	vAlign();

	//Replace all SVG images with inline SVG
	$('img.svg').each(function(){
	    var $img = $(this);
	    var imgID = $img.attr('id');
	    var imgClass = $img.attr('class');
	    var imgURL = $img.attr('src');

	    $.get(imgURL, function(data) {
	        // Get the SVG tag, ignore the rest
	        var $svg = $(data).find('svg');
	        // Add replaced image's ID to the new SVG
	        if (typeof imgID !== 'undefined') {
	            $svg = $svg.attr('id', imgID);
	        }
	        // Add replaced image's classes to the new SVG
	        if (typeof imgClass !== 'undefined') {
	            $svg = $svg.attr('class', imgClass+' replaced-svg');
	        }
	        // Remove any invalid XML tags as per http://validator.w3.org
	        $svg = $svg.removeAttr('xmlns:a');
	        // Replace image with new SVG
	        $img.replaceWith($svg);
	    });
	});	
});

var rtime;
var timeout = false;
var delta = 200;
$(window).resize(function() {
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);

        $('.equal_height .content').css('height', 'auto');
        $('.v-align').css({'paddingTop': 0, 'opacity': 0});
    }
});

function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;
        if($('.collapsable_toggle').length){collapsableCopy();}
        if($('.horizontal_scroll').length){scrollNav();}
        if($('.equal_height').length){matchHeight($('.equal_height .content'));}
        if($('.v-align').length){vAlign();}
    }               
}

//vertically align element to the middle of its parent
function vAlign(){
  if(jQuery('.v-align').length){
    var jQueryvaChild = jQuery('.v-align');
    jQueryvaChild.each(function(){
      var vaChildHeight = jQuery(this).height();
      var vaParentHeight = jQuery(this).parent().height();
      var topOffset = (vaParentHeight - vaChildHeight) / 2;
      $(this).css({'paddingTop': topOffset, opacity: 1}).addClass('show');
    });
  }
}

//match height of elements
function matchHeight($element) {
    var heighest = 0;
    $element.each(function () {
        var elemHeight = $(this).outerHeight();
        if (elemHeight > heighest) {
            heighest = elemHeight;
        }
    });
    $element.css('height', heighest);
}
