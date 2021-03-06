<?php
/**
 * Customizer
 *
 * Setup the Customizer and theme options for the Pro plugin
 *
 * @package Chronus Pro
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

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
		return wp_parse_args( get_option( 'chronus_theme_options', array() ), self::get_default_options() );
	}


	/**
	 * Returns the default settings of the plugin
	 *
	 * @return array
	 */
	static function get_default_options() {

		$default_options = array(
			'header_search'             => false,
			'author_bio'                => false,
			'scroll_to_top'             => false,
			'footer_text'               => '',
			'credit_link'               => true,
			'primary_color'             => '#cc5555',
			'secondary_color'           => '#b33c3c',
			'tertiary_color'            => '#992222',
			'accent_color'              => '#91cc56',
			'highlight_color'           => '#239999',
			'light_gray_color'          => '#f0f0f0',
			'gray_color'                => '#999999',
			'dark_gray_color'           => '#303030',
			'page_bg_color'             => '#ffffff',
			'top_navi_color'            => '#cc5555',
			'navi_text_color'           => '#303030',
			'navi_color'                => '#cc5555',
			'link_color'                => '#cc5555',
			'link_hover_color'          => '#303030',
			'titles_color'              => '#303030', // Title
			'title_color'               => '#cc5555', // Title Hover
			'text_font'                 => 'Raleway',
			'title_font'                => 'Rambla',
			'title_is_bold'             => true,
			'title_is_uppercase'        => false,
			'navi_font'                 => 'Rambla',
			'navi_is_bold'              => false,
			'navi_is_uppercase'         => false,
			'widget_title_font'         => 'Rambla',
			'widget_title_is_bold'      => false,
			'widget_title_is_uppercase' => false,
		);

		return $default_options;
	}

	/**
	 * Embed JS file to make Theme Customizer preview reload changes asynchronously.
	 *
	 * @return void
	 */
	static function customize_preview_js() {
		wp_enqueue_script( 'chronus-pro-customizer-js', CHRONUS_PRO_PLUGIN_URL . 'assets/js/customize-preview.min.js', array( 'customize-preview' ), '20210309', true );
	}

	/**
	 * Embed CSS styles for the theme options in the Customizer
	 *
	 * @return void
	 */
	static function customize_preview_css() {
		wp_enqueue_style( 'chronus-pro-customizer-css', CHRONUS_PRO_PLUGIN_URL . 'assets/css/customizer.css', array(), '20210212' );
	}
}

// Run Class.
add_action( 'init', array( 'Chronus_Pro_Customizer', 'setup' ) );
