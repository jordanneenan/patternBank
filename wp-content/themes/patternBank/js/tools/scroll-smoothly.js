$(document).ready(function(){

    //Give the navigation itims with this class the ability to smooth scroll
    $('.scroll-link a').each(function() {
        $(this).attr('data-scroll', '');
    });

    smoothScroll.init({
        speed: 1500,
        offset: 0,
        callback: function () {if($('#fieldName').length){$('#fieldName').focus();}}
    });

});