<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">

        <?php
            if(is_home()){
        ?>
                <title><?php bloginfo( 'name' ); ?></title>
        <?php
            }else{
        ?>
                <title><?php wp_title($sep = ''); ?> - <?php bloginfo( 'name' ); ?></title>
        <?php
            }
        ?>

        <meta name="viewport" content="user-scalable=0, width=device-width, initial-scale=1.0,  minimum-scale=1.0, maximum-scale=1.0">
        <meta name="format-detection" content="telephone=no">

        <?php get_stylesheet_uri(); ?>
        <link rel='stylesheet' id='Main stylesheet-css'  href='<?php echo get_template_directory_uri(); ?>/css/style.css?v=1.0' type='text/css' />
        <link rel='stylesheet' href='<?php echo get_template_directory_uri(); ?>/rows/carousel/slick/slick.css' type='text/css' />

        <!--[if lt IE 9]>
            <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js""></script>
        <![endif]-->
        <!--[if gte IE 9]><!-->
            <script src="//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
        <!--<![endif]-->

        <script>
            if (!window.jQuery) {
                document.write('<?php echo get_template_directory_uri(); ?>/js/vendor/jquery-1.11.3.min.js');
            }
        </script>

        <script type='text/javascript' src='<?php echo get_template_directory_uri(); ?>/js/vendor/modernizr-3.3.1.min.js'></script>
        <script type='text/javascript' src='<?php echo get_template_directory_uri(); ?>/rows/carousel/slick/slick.min.js'></script>
        <script type='text/javascript' src='<?php echo get_template_directory_uri(); ?>/js/vendor/masonry.js'></script>

        <script type='text/javascript' src='<?php echo get_template_directory_uri(); ?>/js/main.js'></script>
        <script type='text/javascript' src='<?php echo get_template_directory_uri(); ?>/js/plugins.js'></script>
        <script type='text/javascript' src='<?php echo get_template_directory_uri(); ?>/js/rows/nav.js'></script>

        <!--[if lt IE 9]>
            <script src="http://html5shiv-printshiv.googlecode.com/svn/trunk/html5shiv-printshiv.js"></script>
        <![endif]-->

    </head>
    <body>
        <?php wp_head(); ?>
        <!--[if lt IE 9]>
            <p class="browserupgrade" style="text-align: center; padding: 50px 0;">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <div class="global_container">

            <!-- Header options - Desktop hover/active: fade, underline, solid_bg -->
            <!-- Header options - Mobile layout: horizontal_scroll, slide_down -->

            <!-- Header options - Absolutely position the header with absolute_pos - this is used when the container below the nav sets its height using 100vh...like a full screen carousel on the home page -->

        <?php
            //get the slug of the current page
            global $post;
            $post_slug=$post->post_name;

            //check if the page is the home page or the style guide and add the absolute_pos classname
            $absPos = '';
            if(is_home() || $post_slug == 'style-guide'){
                $absPos = 'absolute_pos';
            } 
        ?>

            <header class="underline horizontal_scroll cfx <?php echo $absPos; ?>">
                <div class="logo">
                    <a href="/">
                        <!-- <img src="<?php echo $GLOBALS['pathImg']; ?>logo.png" alt=""> -->
                    </a>
                    <span>Pattern Bank</span>
                </div>

                <div class="hamburger">
                    <div class="line line-1"></div>
                    <div class="line line-2"></div>
                    <div class="line line-3"></div>
                </div>

                <nav>
                    <?php wp_nav_menu( array( 'theme_location' => 'main_nav', 'sort_column' => 'menu_order', 'container_class' => 'page-nav' ) ); ?>
                </nav>
                <div class="nav_grad"></div>

            </header>
