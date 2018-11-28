<?php
	$switchSides = get_sub_field('switch_order');
?>

<div class="row">
	<div class="content_container">

		<div class="image_copy_row not_full">
			<div class="wrapper">
<?php
if( have_rows('image_copy_row') ):
	$i = 0;
	if($switchSides){
		$i = 1;
	}
    while ( have_rows('image_copy_row') ) : the_row();
    	if($i % 2){
    		$sideMod = 'normal';
    	}else{
    		$sideMod = 'alternate';
    	}
?>
				<div class="image_copy cfx <?php echo $sideMod; ?>" data-aos="fade-up">
					<div class="image_wrapper">
						<div class="image">
							<img src="<?php the_sub_field('image'); ?>" alt="<?php the_sub_field('title'); ?>">
						</div>
					</div>

					<div class="copy v-align">
						<div class="content">
							<div class="row_title">
								<h2><?php the_sub_field('title'); ?><div class="line"></div></h2>
							</div>
							<?php the_sub_field('copy'); ?>
							
						</div>
					</div>
				</div>
<?php
		$i++;
    endwhile;
endif;
?>
			</div>
		</div>

	</div>
</div>