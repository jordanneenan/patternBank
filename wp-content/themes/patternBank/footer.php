
<?php wp_footer(); ?>
			</div><!--close page_wrapper -->
			<footer>
				<div class="footer-wrapper">

					<div class="social cfx">
						<a class="icon" href="#" target="_blank"><img class="svg" src="<?php echo $GLOBALS['pathImg']; ?>icons/fb.svg" alt=""></a>
						<a class="icon" href="#" target="_blank"><img class="svg" src="<?php echo $GLOBALS['pathImg']; ?>icons/tw.svg" alt=""></a>
						<a class="icon" href="#" target="_blank"><img class="svg" src="<?php echo $GLOBALS['pathImg']; ?>icons/li.svg" alt=""></a>
					</div>

					<nav class="footer-nav cfx"><?php wp_nav_menu (array ("theme_location" => "footer_nav")); ?></nav>

					<p class="copy">&copy; patternBank <?php echo date('Y'); ?>. All rights reserved.</p>

				</div>
			</footer>

        </div>
        
    </body>
</html>