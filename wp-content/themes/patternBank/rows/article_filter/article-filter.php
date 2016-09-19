<?php

    require('../../../../../wp-load.php');

	if(isset($_POST['catID'])){
        //get the answers selected by the user
        $catID = $_POST['catID'];

        echo 'Great success '.$catID;
        wp_reset_postdata();

		// the query
		$wp_query = new WP_Query(array('post_type'=>'post', 'post_status'=>'publish', 'cat'=>$catID, 'posts_per_page'=>2));

		if ( $wp_query->have_posts() ) :
?>







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
?>










	
<?php
	//wp_reset_postdata();
?>


<?php
		endif;

	}

?>
