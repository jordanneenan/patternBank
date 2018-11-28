var w = false;

$(window).on("load", function (e) {
	fixFooter();

	w = $( window ).width();
});

var ff_rtime;
var ff_timeout = false;
var ff_delta = 200;

function ff_resizeend() {
    if (new Date() - ff_rtime < ff_delta) {
        setTimeout(ff_resizeend, ff_delta);
    } else {
        ff_timeout = false;
        fixFooter();

        w = $( window ).width();
    }               
}

$(window).resize(function() {

    if( w !== $( window ).width() ){

        ff_rtime = new Date();
        if (ff_timeout === false) {
            ff_timeout = true;
            setTimeout(ff_resizeend, ff_delta);

            $('#page_wrapper').css('minHeight', 'auto');
        }

    }

});

function fixFooter(){
	var pageHeight = $(window).height();
	var footerOffset = $('footer').offset();
		footerOffset = footerOffset.top;

	if(pageHeight > footerOffset){
		var headerHeight = $('header').outerHeight();
		var footerHeight = $('footer').outerHeight();

		var fixVal = pageHeight - headerHeight - footerHeight;

		$('#page_wrapper').css('minHeight', fixVal);
	}
}
