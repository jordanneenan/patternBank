<?php
/**
 * Template Name: Dynamic Template
 */

 get_header();


if (have_posts()) : while (have_posts()) : the_post();

	if( have_rows('rows') ):
	    while ( have_rows('rows') ) : the_row();

	        if( get_row_layout() == 'carousel' ):
	        	get_template_part('rows/dynamic', 'carousel');

	        elseif( get_row_layout() == 'banner' ):
	        	get_template_part('rows/dynamic', 'banner');

	        elseif( get_row_layout() == 'one_col_text' ): 
	        	get_template_part('rows/dynamic', 'simple-copy');

	        elseif( get_row_layout() == 'article' ): 
	        	get_template_part('rows/dynamic', 'article');

	        elseif( get_row_layout() == 'image_copy' ): 
	        	get_template_part('rows/dynamic', 'image-copy');

	        elseif( get_row_layout() == 'gravity_form' ): 
	        	get_template_part('rows/dynamic', 'form');

        	elseif( get_row_layout() == 'row_spacing' ): 
	        	get_template_part('rows/dynamic', 'spacing');

	        endif;

	    endwhile;
	endif;

endwhile; endif; // close the WordPress loop
?>








<?php get_footer(); ?>