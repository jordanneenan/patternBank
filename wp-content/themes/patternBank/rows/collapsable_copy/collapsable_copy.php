<?php
function callCollapsedCopy(){
?>
	<div class="row">
		<div class="content_container">

			<script type='text/javascript' src='<?php echo get_template_directory_uri(); ?>/js/rows/collapsable-copy.js'></script>

			<div class="collapsable_copy_container">
				<div class="collapsable_copy_gradient"></div>
				<div class="collapsable_copy">
					<?php the_field('collapsed_copy'); ?>
				</div>
			</div>
			<div class="collapsable_toggle">
				<span>
					<img src="<?php echo $GLOBALS['pathImg']; ?>icons/down-arrow.svg" class="svg" alt="Read more">
				</span>
				Read more
			</div>

		</div>
	</div>
<?php
}
?>
