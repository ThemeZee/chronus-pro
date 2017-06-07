<?php
/**
 * Chronus Pro Settings Page Class
 *
 * Adds a new tab on the themezee plugins page and displays the settings page.
 *
 * @package Chronus Pro
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }


/**
 * Settings Page Class
 */
class Chronus_Pro_Settings_Page {

	/**
	 * Setup the Settings Page class
	 *
	 * @return void
	 */
	static function setup() {

		// Add settings page to appearance menu.
		add_action( 'admin_menu', array( __CLASS__, 'add_settings_page' ), 12 );

		// Enqueue Settings CSS.
		add_action( 'admin_enqueue_scripts', array( __CLASS__, 'settings_page_css' ) );
	}

	/**
	 * Add Settings Page to Admin menu
	 *
	 * @return void
	 */
	static function add_settings_page() {

		// Return early if Chronus Theme is not active.
		if ( ! current_theme_supports( 'chronus-pro' ) ) {
			return;
		}

		add_theme_page(
			esc_html__( 'Pro Version', 'chronus-pro' ),
			esc_html__( 'Pro Version', 'chronus-pro' ),
			'edit_theme_options',
			'chronus-pro',
			array( __CLASS__, 'display_settings_page' )
		);

	}

	/**
	 * Display settings page
	 *
	 * @return void
	 */
	static function display_settings_page() {

		// Get Theme Details from style.css.
		$theme = wp_get_theme();

		ob_start();
		?>

		<div class="wrap pro-version-wrap">

			<h1><?php echo CHRONUS_PRO_NAME; ?> <?php echo CHRONUS_PRO_VERSION; ?></h1>

			<div id="chronus-pro-settings" class="chronus-pro-settings-wrap">

				<form class="chronus-pro-settings-form" method="post" action="options.php">
					<?php
						settings_fields( 'chronus_pro_settings' );
						do_settings_sections( 'chronus_pro_settings' );
					?>
				</form>

				<p><?php printf( __( 'You can find your license keys and manage your active sites on <a href="%s" target="_blank">themezee.com</a>.', 'chronus-pro' ), __( 'https://themezee.com/license-keys/', 'chronus-pro' ) . '?utm_source=plugin-settings&utm_medium=textlink&utm_campaign=chronus-pro&utm_content=license-keys' ); ?></p>

			</div>

		</div>

		<?php
		echo ob_get_clean();
	}

	/**
	 * Enqueues CSS for Settings page
	 *
	 * @param String $hook Slug of settings page.
	 * @return void
	 */
	static function settings_page_css( $hook ) {

		// Load styles and scripts only on theme info page.
		if ( 'appearance_page_chronus-pro' != $hook ) {
			return;
		}

		// Embed theme info css style.
		wp_enqueue_style( 'chronus-pro-settings-css', plugins_url( '/assets/css/settings.css', dirname( dirname( __FILE__ ) ) ), array(), CHRONUS_PRO_VERSION );

	}
}

// Run Chronus Pro Settings Page Class.
Chronus_Pro_Settings_Page::setup();
