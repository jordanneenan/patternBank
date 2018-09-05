//match height of elements

//only fire if the window width changes (iPad bug fix)
var w = false;
$( window ).load( function(){
   w = $( window ).width();

   if($('.equal_height').length){
        matchHeight($('.equal_height'));
   }
   
});

function matchHeight($element) {
    var heighest = 0;

    $element.each(function () {
        var $child = $(this).find('.content');
        var heighest = 0;

        $child.each(function(){
            var elemHeight = $(this).outerHeight();
            if (elemHeight > heighest) {
                heighest = elemHeight;
            }
        });

        $child.css('height', heighest);
        
    });
    
}

var mh_rtime;
var mh_timeout = false;
var mh_delta = 200;

function mh_resizeend() {
    if (new Date() - mh_rtime < mh_delta) {
        setTimeout(mh_resizeend, mh_delta);
    } else {
        mh_timeout = false;
        if($('.equal_height').length){matchHeight($('.equal_height'));}

        w = $( window ).width();
    }               
}

$(window).resize(function() {

    if( w !== $( window ).width() ){

        mh_rtime = new Date();
        if (mh_timeout === false) {
            mh_timeout = true;
            setTimeout(mh_resizeend, mh_delta);

            $('.equal_height .content').css('height', 'auto');
        }

    }

});
