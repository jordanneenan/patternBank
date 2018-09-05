<?php
	$image = get_sub_field('banner_image');
	$title = get_sub_field('banner_title');
	$copy = get_sub_field('banner_copy');
	$btnCopy = get_sub_field('button_copy');
	$btnLink = get_sub_field('button_link');
	$newTab = get_sub_field('new_tab');
	$leftAlign = get_sub_field('left_align_content');
	$fullScreen = get_sub_field('full_screen_banner');

	$classes = '';

	if($leftAlign){
		$classes = "left_align ";
	}

	if($fullScreen){
		$classes .= "full_height ";
	}

	$target = "";

	if($newTab){
		$target = 'target="_blank"';
	}
?>

	<div class="row">

		<!-- Banner settings - left_align will align the content left, full_height will set the banner to viewport height -->

		<div class="banner <?php echo $classes; ?>" style="background: url('<?php echo $image; ?>') center center no-repeat;">

			<div class="banner_container">
				<div class="banner_align">
					<div class="banner_content">
						<?php if($title){ ?>
							<h1><?php echo $title; ?></h1>
						<?php } ?>

						<?php if($copy){ ?>
							<p><?php echo $copy; ?></p>
						<?php } ?>

						<?php if($btnCopy){ ?>
							<a href="<?php echo $btnLink; ?>" class="button" <?php echo $target; ?>><?php echo $btnCopy; ?></a>
						<?php } ?>
					</div>
				</div>
		  	</div>

		</div>

	</div>