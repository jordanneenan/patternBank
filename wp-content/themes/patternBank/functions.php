<?php

//set paths
$pathImg = get_template_directory_uri().'/img/';
global $pathImg;
$pathIcon = get_template_directory_uri().'/img/icons/';
global $pathIcon;

add_theme_support( 'menus' );
// Add Your Menu Locations
function register_my_menus() {
  register_nav_menus(
    array(  
      'main_nav' => __( 'Main nav' ), 
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

remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
