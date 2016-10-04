<?php
/**
 * Template Name: Style guide template
 */

 get_header();
?>

<div class="style_guide">

<!-- CAROUSEL -->
<?php
	// include_once(ABSPATH .'wp-content/themes/patternBank/rows/carousel/carousel.php');
	// callCarousel(get_queried_object_id());
?>
<!-- /CAROUSEL -->

<!-- BANNER -->
<?php
	include_once(ABSPATH .'wp-content/themes/patternBank/rows/banner/banner.php');
	callBanner(get_queried_object_id());
?>
<!-- /BANNER -->

<!-- GENERAL MODULE -->
<?php
	include_once(ABSPATH .'wp-content/themes/patternBank/rows/general_module/general_module.php');
	callGeneralModule();
?>
<!-- /GENERAL MODULE -->

	<div class="row">
		<div class="content_container">

			<h1><?php the_title(); ?></h1>
<?php 
	if ( have_posts() ) {
		while ( have_posts() ) {
			the_post();
			the_content();
		} // end while
	} // end if
?>
		</div>
	</div>

<?php
	// include_once(ABSPATH .'wp-content/themes/patternBank/editor/editor.php');
	// addEditor();
?>

<!-- COLOUR PALETTE -->
	<div class="row">
		<div class="content_container">
			<h2>Colour palette</h2>
			<div class="color_palette">

				<div class="palette primary cfx">
					<div class="color">
						<strong><span>Primary</span></strong>
						<div></div>
					</div>
					<div class="color shadow">
						<span>Shadow</span>
						<div></div>
					</div>
					<div class="color highlight">
						<span>Highlight</span>
						<div></div>
					</div>
				</div>

				<div class="palette secondary cfx">
					<div class="color">
						<strong><span>Secondary</span></strong>
						<div></div>
					</div>
					<div class="color shadow">
						<span>Shadow</span>
						<div></div>
					</div>
					<div class="color highlight">
						<span>Highlight</span>
						<div></div>
					</div>
				</div>

				<div class="palette tertiary cfx">
					<div class="color">
						<strong><span>Tertiary</span></strong>
						<div></div>
					</div>
					<div class="color shadow">
						<span>Shadow</span>
						<div></div>
					</div>
					<div class="color highlight">
						<span>Highlight</span>
						<div></div>
					</div>
				</div>

			</div>
		</div>
	</div>
<!-- /COLOUR PALETTE -->

<!-- COLLAPSABLE TEXT -->
<?php
	include_once(ABSPATH .'wp-content/themes/patternBank/rows/collapsable_copy/collapsable_copy.php');
	callCollapsedCopy();
?>
<!-- /COLLAPSABLE TEXT -->

</div>
<?php get_footer(); ?>