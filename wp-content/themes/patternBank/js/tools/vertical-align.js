//vertically align element to the middle of its parent
function vAlign(){
  if($('.v-align').length){
    var $vaChild = $('.v-align');
    $vaChild.each(function(){
      var vaChildHeight = $(this).height();
      var vaParentHeight = $(this).parent().height();
      var topOffset = (vaParentHeight - vaChildHeight) / 2;
      $(this).css({'paddingTop': topOffset, opacity: 1}).addClass('show');
    });
  }
}

//only fire if the window width changes (iPad bug fix)
$(window).load(function(){
  w = $( window ).width();
  vAlign();
});

var va_rtime;
var va_timeout = false;
var va_delta = 200;

function va_resizeend() {
    if (new Date() - va_rtime < va_delta) {
        setTimeout(va_resizeend, va_delta);
    } else {
        va_timeout = false;

        //reinit after resize
        if($('.v-align').length){vAlign();}
    }               
}

$(window).resize(function() {

  if( w !== $( window ).width() ){

    va_rtime = new Date();
    if (va_timeout === false) {
        va_timeout = true;
        setTimeout(va_resizeend, va_delta);

        //reset all values while window is resizing
        $('.v-align').css({'paddingTop': 0, 'opacity': 0}).removeClass('show');
    }

  }
  
});

