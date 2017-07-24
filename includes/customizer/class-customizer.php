<?php
/**
 * Customizer
 *
 * Setup the Customizer and theme options for the Pro plugin
 *
 * @package Chronus Pro
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

/**
 * Customizer Class
 */
class Chronus_Pro_Customizer {

	/**
	 * Customizer Setup
	 *
	 * @return void
	 */
	static function setup() {

		// Return early if Chronus Theme is not active.
		if ( ! current_theme_supports( 'chronus-pro' ) ) {
			return;
		}

		// Enqueue scripts and styles in the Customizer.
		add_action( 'customize_preview_init', array( __CLASS__, 'customize_preview_js' ) );
		add_action( 'customize_controls_print_styles', array( __CLASS__, 'customize_preview_css' ) );

		// Remove Upgrade section.
		remove_action( 'customize_register', 'chronus_customize_register_upgrade_settings' );
	}

	/**
	 * Get saved user settings from database or plugin defaults
	 *
	 * @return array
	 */
	static function get_theme_options() {

		// Merge Theme Options Array from Database with Default Options Array.
		$theme_options = wp_parse_args( get_option( 'chronus_theme_options', array() ), self::get_default_options() );

		// Return theme options.
		return $theme_options;

	}


	/**
	 * Returns the default settings of the plugin
	 *
	 * @return array
	 */
	static function get_default_options() {

		$default_options = array(
			'scroll_to_top'     => false,
			'footer_text'       => '',
			'credit_link'       => true,
			'page_bg_color'     => '#ffffff',
			'top_navi_color'    => '#cc5555',
			'navi_color'        => '#cc5555',
			'link_color'        => '#cc5555',
			'title_color'       => '#cc5555',
			'text_font'         => 'Raleway',
			'title_font'        => 'Rambla',
			'navi_font'         => 'Rambla',
			'widget_title_font' => 'Rambla',
			'available_fonts'   => 'favorites',
		);

		return $default_options;

	}

	/**
	 * Embed JS file to make Theme Customizer preview reload changes asynchronously.
	 *
	 * @return void
	 */
	static function customize_preview_js() {

		wp_enqueue_script( 'chronus-pro-customizer-js', CHRONUS_PRO_PLUGIN_URL . 'assets/js/customizer.js', array( 'customize-preview' ), CHRONUS_PRO_VERSION, true );

	}

	/**
	 * Embed CSS styles for the theme options in the Customizer
	 *
	 * @return void
	 */
	static function customize_preview_css() {

		wp_enqueue_style( 'chronus-pro-customizer-css', CHRONUS_PRO_PLUGIN_URL . 'assets/css/customizer.css', array(), CHRONUS_PRO_VERSION );

	}
}

// Run Class.
add_action( 'init', array( 'Chronus_Pro_Customizer', 'setup' ) );
