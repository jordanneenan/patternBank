<?php
	$bgColour = get_sub_field('background_colour');
	$copyColour = get_sub_field('copy_colour');

	if($bgColour){
		$styleBg = 'style="background-color: '.$bgColour.'"';
	}

	if($copyColour){
		$styleCopy = 'style="color: '.$copyColour.'"';
	}
?>

<div class="row simple_copy" data-aos="fade-up" <?php echo $styleBg; ?>>
	<div class="content_container" <?php echo $styleCopy; ?>>
		<p>
		<?php the_sub_field('copy'); ?>
		</p>
	</div>
</div>