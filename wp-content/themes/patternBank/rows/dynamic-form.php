<?php
	$title = get_sub_field('form_title');
	$copy = get_sub_field('form_copy');
	$formId = get_sub_field('form_id');

	function callGravityForm($id){
		echo do_shortcode('[gravityform id="'.$id.'" title="false" description="false" ajax="true"]');
	}
?>

<div class="row form_row" data-aos="fade-up">
	<div class="content_container">
		<div class="copy">
<?php
	if($title){
		echo '<h2>' . $title . '</h2>';
	}
?>
<?php
	if($copy){
		echo $copy;
	}
?>
		</div>
<?php
	if($formId){
		callGravityForm($formId);
	}
?>	
	</div>
</div>