<?php
	function callGravityForm($id){
		echo do_shortcode('[gravityform id="'.$id.'" title="false" description="false" ajax="true"]');
	}
?>