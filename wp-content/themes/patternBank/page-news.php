<?php
/**
  * Template Name: News template
*/

	get_header();
?>

<!-- BANNER -->
<?php
	include_once(ABSPATH .'wp-content/themes/patternBank/rows/banner/banner.php');
?>
<!-- /BANNER -->

<?php
	//include_once(ABSPATH .'wp-content/themes/patternBank/rows/article_filter/article-filter.php');
?>
<script type='text/javascript' src='<?php echo get_template_directory_uri(); ?>/js/rows/article-filter.js'></script>

<div class="row">
		<div class="content_container">

<?php $args = array(
	'parent' => 0,
	'exclude' => '1' 
);

$cats = get_categories($args); ?>
<ul class="category-filters cfx">
<?php foreach($cats as $cat) {
	$output = '<li data-catid="'.$cat->term_id.'"><a href="' . get_category_link( $cat->term_id ) . '"">' . $cat->category_nicename . '</a></li>';
	echo $output;
} ?>
</ul>


<?php
	// the query
	$wp_query = new WP_Query(array('post_type'=>'post', 'post_status'=>'publish', 'paged' => $paged));

	if ( $wp_query->have_posts() ) :
?>

	<div class="posts_container">
		<div class="posts">

<?php

		while ( $wp_query->have_posts() ) : $wp_query->the_post();
?>
			<article class="post">
				<div class="post_content_wrapper">
					<div class="img"></div>
					<div class="content">
						<h2><?php the_title(); ?></h2>
						<p><?php echo content(20); ?></p>
					</div>
				</div>
			</article>

<?php			
		endwhile;

		the_posts_pagination( array( 'mid_size' => 5 ) ); 
		wp_reset_postdata();
?>

		</div>
	</div><!-- close post list container -->

<?php
	endif;
?>

	</div>
</div>

<?php 
	get_footer(); 
?>
