<?php
function callBanner($pageID){
	$image = get_field('banner_image', $pageID);
	$title = get_field('banner_title', $pageID);
	$copy = get_field('banner_copy', $pageID);
	$btnCopy = get_field('banner_button_copy', $pageID);
	$btnLink = get_field('banner_button_link', $pageID);
?>

	<div class="row">

		<!-- Banner settings - left_align will align the content left -->

		<div class="banner" style="background: url('<?php echo $image; ?>') center center no-repeat;">

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
							<a href="<?php echo $btnLink; ?>" class="button"><?php echo $btnCopy; ?></a>
						<?php } ?>
					</div>
				</div>
		  	</div>

		</div>

	</div>

<?php
}
?>