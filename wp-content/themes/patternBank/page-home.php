<?php
/**
 * Template Name: Homepage template
 */

 get_header();
?>

<div class="style_guide">

<!-- CAROUSEL -->
<?php
	include_once(ABSPATH .'wp-content/themes/patternBank/rows/carousel/carousel.php');
	callCarousel(get_queried_object_id());
?>
<!-- /CAROUSEL -->

<!-- Image copy -->
<?php
	include_once(ABSPATH .'wp-content/themes/patternBank/rows/image_copy/image_copy.php');
	callImageCopy('image_copy', 'default', 'full-width');
?>
<!-- /Image copy -->


	<div class="row form_row dark">
		<div class="content_container">
			<div class="copy">
				<h2>Form heading</h2>
				<p>Et aut hil idipsam autem aut fuga. Sapiet lantemporro maximperem volut atur, unte vel in nestiur?</p>
			</div>
<?php
	include_once(ABSPATH .'wp-content/themes/patternBank/rows/form/form.php');
	callGravityForm('1');
?>	
		</div>
	</div>


</div>
<?php get_footer(); ?>