<?php
function callGeneralModule(){
?>
	<div class="row">
		<div class="content_container">
			
			<script type='text/javascript' src='<?php echo get_template_directory_uri(); ?>/js/rows/general-module.js'></script>

<?php

// check if the repeater field has rows of data
if( have_rows('general_modules') ):
?>
		<div class="general_modules gm_thirds masonry">
			<div class="general_modules_inner cfx">
<?php
 	// loop through the rows of data
    while ( have_rows('general_modules') ) : the_row();

    $title = get_sub_field('title');
    $subTitle = get_sub_field('sub_title');
    $img = get_sub_field('image');
    $caption = get_sub_field('caption');
    $copy = get_sub_field('copy');
    $btnText = get_sub_field('button_text');
    $btnlink = get_sub_field('button_link');

?>
				<div class="general_module">
					<a href="<?php echo $btnlink; ?>" class="general_module_inner">
						<!-- <h2><?php echo $title; ?></h2> -->
						<div class="image">
							<img src="<?php echo $img; ?>" alt="<?php echo $title; ?>">
							<div class="image_content v-align">
								<!-- <div class="icon">
									<img src="<?php echo get_template_directory_uri(); ?>/img/icons.play.svg">
								</div> -->
								<!-- <div class="image_heading">
									<h2><?php echo $title; ?></h2>
								</div> -->
							</div>
						</div>
						<div class="content">
							<span><?php echo $caption; ?></span>
							<h2><?php echo $title; ?></h2>
							<h3><?php echo $subTitle; ?></h3>
							<div class="copy"><?php echo $copy; ?></div>
						</div>

						<span class="button black"><?php echo $btnText; ?></span>
					</a>
				</div>
<?php
    endwhile;
?>
			</div>
		</div>
<?php
endif;

?>		

		</div>
	</div>
<?php
}
?>
