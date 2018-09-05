<?php

//set paths
$pathImg = get_template_directory_uri().'/img/';
global $pathImg;
$pathIcon = get_template_directory_uri().'/img/icons/';
global $pathIcon;

// if( function_exists('acf_add_options_page') ) {
//   acf_add_options_page();
// }

add_theme_support( 'menus' );
// Add Your Menu Locations
function register_my_menus() {
  register_nav_menus(
    array(  
      'main_nav' => __( 'Main nav' ),
      'footer_nav' => __( 'Footer navigation' )
      //'product_left' => __( 'Product left' )
    )
  );
} 
add_action( 'init', 'register_my_menus' );

function excerpt($limit) {
  $excerpt = explode(' ', get_the_excerpt(), $limit);
  if (count($excerpt)>=$limit) {
    array_pop($excerpt);
    $excerpt = implode(" ",$excerpt).'...';
  } else {
    $excerpt = implode(" ",$excerpt);
  }
  $excerpt = preg_replace('`\[[^\]]*\]`','',$excerpt);
  return $excerpt;
}

function content($limit) {
  $content = explode(' ', get_the_content(), $limit);
  if (count($content)>=$limit) {
    array_pop($content);
    $content = implode(" ",$content).'...';
  } else {
    $content = implode(" ",$content);
  }
  $content = preg_replace('/\[.+\]/','', $content);
  $content = apply_filters('the_content', $content);
  $content = str_replace(']]>', ']]&gt;', $content);
  return $content;
}

function flexibleContent($contentVal, $limit) {
  $content = explode(' ', $contentVal, $limit);
  if (count($content)>=$limit) {
    array_pop($content);
    $content = implode(" ",$content).'...';
  } else {
    $content = implode(" ",$content);
  }
  $content = preg_replace('/\[.+\]/','', $content);
  $content = apply_filters('the_content', $content);
  $content = str_replace(']]>', ']]&gt;', $content);
  $content = strip_tags($content);
  return $content;
}

// A better body class
function condensed_body_class($classes) {
    global $post;

    // add a class for the name of the page - later might want to remove the auto generated pageid class which isn't very useful
    if( is_page()) {
        $pn = $post->post_name;
        $classes[] = "page_".$pn;
    }

    if( !is_page() ) {          
        $pn = $post->post_name;
        $classes[] = "post_".$pn;
    }

    if ( $post && $post->post_parent ) {
        // add a class for the parent page name
        $post_parent = get_post($post->post_parent);
        $parentSlug = $post_parent->post_name;

        if ( is_page() && $post->post_parent ) {
                $classes[] = "parent_".$parentSlug;
        }

    }

    // add class for the name of the custom template used (if any)
    $temp = get_page_template();
    if ( $temp != null ) {
        $path = pathinfo($temp);
        $tmp = $path['filename'] . "." . $path['extension'];
        $tn= str_replace(".php", "", $tmp);
        $classes[] = "template_".$tn;
    }
    return $classes;
}


remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
