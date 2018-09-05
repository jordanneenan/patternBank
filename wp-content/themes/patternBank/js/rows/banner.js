$(document).ready(function(){

	//Automatically add an absolute position to the header if it needs it
	if($(".banner.full_height").length){
		var bannerPos = $(".banner.full_height").offset();
		if(bannerPos.top !== 0 && bannerPos.top < 100){
			if(!$("header").hasClass("absolute_pos")){
				$("header").addClass("absolute_pos");
			}
		}
	}
	
});