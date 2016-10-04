<?php
function callCarousel($pageID){
?>

<?php

// check if the repeater field has rows of data
if( have_rows('slides', $pageID) ):
?>

	<div class="row">
		<script type='text/javascript' src='<?php echo get_template_directory_uri(); ?>/js/rows/carousel.js'></script>

		<!-- Carousel settings - left_align will align the content left -->
		<div class="carousel">

<?php
 	// loop through the rows of data
    while ( have_rows('slides', $pageID) ) : the_row();

    	$img = get_sub_field('image');
        $title = get_sub_field('title');
        $copy = get_sub_field('copy');
        $btnCopy = get_sub_field('button_copy');
        $btnLink = get_sub_field('button_link');

?>

			<div class="slide-container" style="background: url('<?php echo $img; ?>') center center no-repeat;">
				<div class="slide">
					<div class="slide_align">
						<div class="slide_content">

						<?php if($title){ ?>
							<h1><?php echo $title; ?></h1>
						<?php } ?>

						<?php if($copy){ ?>
							<p><?php echo $copy; ?></p>
						<?php } ?>

						<?php if($btnCopy){ ?>
							<a href="<?php echo $btnLink; ?>" class="button"><?php echo $btnCopy; ?></a>
						<?php } ?>

						</div>
					</div>
				</div>
		  	</div>

<?php

    endwhile;
?>
		</div>
	</div>
<?php

endif;

?>

<?php
}
?>