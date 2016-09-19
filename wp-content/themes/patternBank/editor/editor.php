<?php
	function addEditor(){
?>
	<script src='<?php echo get_template_directory_uri(); ?>/editor/spectrum/spectrum.js'></script>
	<link rel='stylesheet' href='<?php echo get_template_directory_uri(); ?>/editor/spectrum/spectrum.css' />

	<script type='text/javascript' src='<?php echo get_template_directory_uri(); ?>/editor/js/editor.js'></script>
	<script type='text/javascript' src='<?php echo get_template_directory_uri(); ?>/editor/js/save.js'></script>
	<script type='text/javascript' src='<?php echo get_template_directory_uri(); ?>/editor/js/load.js'></script>

	<div class="open_editor">
		<img src="<?php echo get_template_directory_uri(); ?>/editor/img/settings.svg" alt="Open editor">
	</div>

	<div class="editor">
		<!-- <h2>Editor</h2> -->

		<div class="save_load cfx">
			<div class="action_buttons">
				<div class="action_btn save">
					SAVE
				</div>

				<div class="action_btn load">
					LOAD
				</div>

				<div class="action_btn export">
					EXPORT
				</div>
			</div>

			<div class="close_editor">
				<img src="<?php echo get_template_directory_uri(); ?>/editor/img/close.svg" alt="Close editor" class="svg">
			</div>

		</div>

		<div class="save_field">
			<div class="save_field_inner cfx">
				<span>Save as:</span>
				<input type="text" class="save_name">
				<div class="save_message"></div>
				<div class="small_btn save_go">
					GO
				</div>
				<div class="cfx"></div>
				<div class="save_over">
					<div class="save_over_list"></div>
				</div>
			</div>
		</div>

		<div class="load_container">
			<div class="load_container_inner cfx">
				<div class="cfx"></div>
				<div class="load_options">
					<div class="load_list"></div>
				</div>
			</div>
		</div>

		<div class="editor_form">

			<div class="edit_section">
				<div class="edit_section_title">Layout</div>
				<div class="collapse">
					<div class="edit_field">
						<span>Site width: </span>
						<input type="text" class="form_layout-width" id="layoutWidth">
					</div>

					<div class="edit_field">
						<span>Row width: </span>
						<input type="text" class="form_layout-row" id="layoutRow">
					</div>

					<div class="edit_field">
						<span>Content width: </span>
						<input type="text" class="form_layout-content" id="layoutContent">
					</div>
				</div>
			</div>

			<div class="edit_section">
				<div class="edit_section_title">Colours</div>
				<div class="collapse">
					<div class="edit_field">
						<span>Primary: </span>
						<input type="text" class="form_primary form_color" id="primaryColor">
					</div>

					<div class="edit_field">
						<span>Secondary: </span>
						<input type="text" class="form_secondary form_color" id="secondaryColor">
					</div>

					<div class="edit_field">
						<span>Tertiary: </span>
						<input type="text" class="form_tertiary form_color" id="tertiaryColor">
					</div>
				</div>
			</div>

			<div class="edit_section">
				<div class="edit_section_title">Paragraphs</div>
				<div class="collapse">

					<div class="edit_field">
						<span>Font size:</span>
						<input type="text" class="p_size" id="paragraphSize">
					</div>

					<div class="edit_field">
						<span>Line height:</span>
						<input type="text" class="p_l_height" id="paragraphLineHeight">
					</div>

					<div class="edit_field">
						<span>Space before:</span>
						<input type="text" class="space_b" id="paragraphMarginTop">
					</div>

					<div class="edit_field">
						<span>Space after:</span>
						<input type="text" class="space_a" id="paragraphMarginBottom">
					</div>
				</div>
			</div>

			<div class="apply">
				APPLY
			</div>

			
		</div>
	</div>

	<div class="editor_style">
		<style>
			
		</style>
	</div>
<?php
	}
?>