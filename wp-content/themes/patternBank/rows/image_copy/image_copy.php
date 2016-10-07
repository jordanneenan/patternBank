<?php
function callImageCopy($fieldName, $textAlign, $imgStyle){
//field name - name of the flexible content field
//text align options: default (left aligned copy), center-copy
//image style options: cropped (limited width), full-width (bgSize: cover)

	if($textAlign == 'default'){
		$textAlign = '';
	}
	if($imgStyle == 'default'){
		$imgStyle = '';
	}

	// check if the flexible content field has rows of data
	if( have_rows($fieldName) ):
	     // loop through the rows of data
	    while ( have_rows($fieldName) ) : the_row();

	        if( get_row_layout() == 'image_image' ):
	        	$layout = 'image_image';

	        	$leftImg = get_sub_field('left_image');
	        	$rightImg = get_sub_field('right_image');

	        elseif( get_row_layout() == 'copy_copy' ): 
	        	$layout = 'copy_copy';

	        	$lTitle = get_sub_field('left_title');
		        $lCopy = get_sub_field('left_copy');
		        $lBtnCopy = get_sub_field('left_button_copy');
		        $lBtnLink = get_sub_field('left_button_link');

		        $rTitle = get_sub_field('right_title');
		        $rCopy = get_sub_field('right_copy');
		        $rBtnCopy = get_sub_field('right_button_copy');
		        $rBtnLink = get_sub_field('right_button_link');

	        elseif( get_row_layout() == 'image_copy' ):
	        	$layout = 'image_copy'; 

	        	$img = get_sub_field('left_image');

	        	$title = get_sub_field('right_title');
		        $copy = get_sub_field('right_copy');
		        $btnText = get_sub_field('right_button_copy');
		        $btnLink = get_sub_field('right_button_link');

	        elseif( get_row_layout() == 'copy_image' ):
	        	$layout = 'copy_image';

	        	$title = get_sub_field('left_title');
		        $copy = get_sub_field('left_copy');
		        $btnText = get_sub_field('left_button_copy');
		        $btnLink = get_sub_field('left_button_link');

	        	$img = get_sub_field('right_image');

	        endif;

	    endwhile;
	endif;

	//for the copy_copy and image_image row we set the HTML separately...so skip them here
	if ($layout !== 'copy_copy' && $layout !== 'image_image') {
		//image html
		$imgInner  = '<div class="ic_image" style="background: url('.$img.') center center no-repeat;"></div>';

		//copy html
		$copyInner = '<div class="ic_copy">'
					   . '<h2>'.$title.'</h2>'
					   //. '<h3>'.$subTitle.'</h3>'
					   . '<div class="copy">'.$copy.'</div>'
					   . '<a href="'.$btnLink.'" class="button black">'.$btnText.'</a>'
				   . '</div>';
	}

	//put the image and/or copy into the correct column
	switch($layout){
		case "image_image":

			$leftImgInner = '<div class="ic_image" style="background: url('.$leftImg.') center center no-repeat;"></div>';
			$rightImgInner = '<div class="ic_image" style="background: url('.$rightImg.') center center no-repeat;"></div>';

			$leftContent = $leftImgInner;
			$rightContent = $rightImgInner;
			break;

		case "copy_copy":

			$leftCopyInner     = '<div class="ic_copy">'
								   . '<h2>'.$lTitle.'</h2>'
								   //. '<h3>'.$subTitle.'</h3>'
								   . '<div class="copy">'.$lCopy.'</div>'
								   . '<a href="'.$lBtnLink.'" class="button black">'.$lBtnCopy.'</a>'
							   . '</div>';

			$rightCopyInner    = '<div class="ic_copy">'
								   . '<h2>'.$rTitle.'</h2>'
								   //. '<h3>'.$subTitle.'</h3>'
								   . '<div class="copy">'.$rCopy.'</div>'
								   . '<a href="'.$rBtnLink.'" class="button black">'.$rBtnCopy.'</a>'
							   . '</div>';


			$leftContent = $leftCopyInner;
			$rightContent = $rightCopyInner;
			break;

		case "image_copy":

			$leftContent = $imgInner;
			$rightContent = $copyInner;
			break;

		case "copy_image":

			$leftContent = $copyInner;
			$rightContent = $imgInner;
			break;
	}

	//left and right html - for copy-image, we need to swap the rows over for mob layout
	$left = '<div class="left">'
	  	      . '<div class="left_inner">'
	  	          . $leftContent
  	          . '</div>'
            . '</div>';

    $right = '<div class="right">'
	  	      . '<div class="right_inner">'
	  	          . $rightContent
  	          . '</div>'
            . '</div>';

    //swap the rows if it's the copy-image row
    if($layout == 'copy-image'){
    	$right = '<div class="left">'
		  	      . '<div class="left_inner">'
		  	          . $leftContent
	  	          . '</div>'
	            . '</div>';

	    $left = '<div class="right">'
		  	      . '<div class="right_inner">'
		  	          . $rightContent
	  	          . '</div>'
	            . '</div>';
    }

?>

<div class="row">

		<div class="image_copy_row <?php echo $layout; ?> <?php echo $textAlign; ?> <?php echo $imgStyle; ?>">
			<div class="image_copy_inner cfx">
				<?php echo $left; ?>
				<?php echo $right; ?>
			</div>
		</div>

</div>
<?php
};
?>