<?php
/**
 * Custom Colors
 *
 * Adds color settings to Customizer and generates color CSS code
 *
 * @package Chronus Pro
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Custom Colors Class
 */
class Chronus_Pro_Custom_Colors {

	/**
	 * Custom Colors Setup
	 *
	 * @return void
	 */
	static function setup() {

		// Return early if Chronus Theme is not active.
		if ( ! current_theme_supports( 'chronus-pro' ) ) {
			return;
		}

		// Add Custom Color CSS code to custom stylesheet output.
		add_filter( 'chronus_pro_custom_css_stylesheet', array( __CLASS__, 'custom_colors_css' ) );

		// Add Custom Color Settings.
		add_action( 'customize_register', array( __CLASS__, 'color_settings' ) );
	}

	/**
	 * Adds Color CSS styles in the head area to override default colors
	 *
	 * @param String $custom_css Custom Styling CSS.
	 * @return string CSS code
	 */
	static function custom_colors_css( $custom_css ) {

		// Get Theme Options from Database.
		$theme_options = Chronus_Pro_Customizer::get_theme_options();

		// Get Default Fonts from settings.
		$default_options = Chronus_Pro_Customizer::get_default_options();

		// Color Variables.
		$color_variables = '';

		// Set Page Background Color.
		if ( $theme_options['page_bg_color'] !== $default_options['page_bg_color'] ) {
			$color_variables .= '--page-background-color: ' . $theme_options['page_bg_color'] . ';';

			// Check if a dark background color was chosen.
			if ( self::is_color_dark( $theme_options['page_bg_color'] ) ) {
				$color_variables .= '--text-color: #fff;';
				$color_variables .= '--medium-text-color: rgba(255,255,255,0.8);';
				$color_variables .= '--light-text-color: rgba(255,255,255,0.6);';
				$color_variables .= '--dark-border-color: #fff;';
				$color_variables .= '--medium-border-color: rgba(255,255,255,0.2);';
				$color_variables .= '--light-border-color: rgba(255,255,255,0.1);';

				$color_variables .= '--navi-color: #fff;';
				$color_variables .= '--title-color: #fff;';
				$color_variables .= '--widget-title-color: #fff;';
				$color_variables .= '--link-hover-color: #fff;';
				$color_variables .= '--button-hover-color: #fff;';
			}
		}

		// Set Top Navigation Color.
		if ( $theme_options['top_navi_color'] !== $default_options['top_navi_color'] ) {
			$color_variables .= '--header-bar-background-color: ' . $theme_options['top_navi_color'] . ';';

			// Check if a dark background color was chosen.
			if ( self::is_color_light( $theme_options['top_navi_color'] ) ) {
				$color_variables .= '--header-bar-text-color: #151515;';
				$color_variables .= '--header-bar-text-hover-color: rgba(0, 0, 0, 0.5);';
				$color_variables .= '--header-bar-border-color: rgba(0, 0, 0, 0.1);';
			}
		}

		// Set Main Navigation Color.
		if ( $theme_options['navi_color'] !== $default_options['navi_color'] ) {
			$color_variables .= '--navi-hover-color: ' . $theme_options['navi_color'] . ';';
			$color_variables .= '--navi-submenu-color: ' . $theme_options['navi_color'] . ';';

			// Check if a light background color was chosen.
			if ( self::is_color_light( $theme_options['navi_color'] ) ) {
				$color_variables .= '--navi-submenu-text-color: #151515;';
				$color_variables .= '--navi-submenu-hover-color: rgba(0, 0, 0, 0.5);';
				$color_variables .= '--navi-submenu-border-color: rgba(0, 0, 0, 0.1);';
			}
		}

		// Set Link Color.
		if ( $theme_options['link_color'] !== $default_options['link_color'] ) {
			$color_variables .= '--link-color: ' . $theme_options['link_color'] . ';';
			$color_variables .= '--button-color: ' . $theme_options['link_color'] . ';';
		}

		// Set Title Color.
		if ( $theme_options['title_color'] != $default_options['title_color'] ) {
			$color_variables .= '--title-hover-color : ' . $theme_options['title_color'] . ';';
			$color_variables .= '--widget-title-hover-color : ' . $theme_options['title_color'] . ';';
		}

		// Set Color Variables.
		if ( '' !== $color_variables ) {
			$custom_css .= ':root {' . $color_variables . '}';
		}

		return $custom_css;
	}

	/**
	 * Adds all color settings in the Customizer
	 *
	 * @param object $wp_customize / Customizer Object.
	 */
	static function color_settings( $wp_customize ) {

		// Add Section for Theme Colors.
		$wp_customize->add_section( 'chronus_pro_section_colors', array(
			'title'    => __( 'Theme Colors', 'chronus-pro' ),
			'priority' => 70,
			'panel'    => 'chronus_options_panel',
		) );

		// Get Default Colors from settings.
		$default_options = Chronus_Pro_Customizer::get_default_options();

		// Add Page Background Color setting.
		$wp_customize->add_setting( 'chronus_theme_options[page_bg_color]', array(
			'default'           => $default_options['page_bg_color'],
			'type'              => 'option',
			'transport'         => 'postMessage',
			'sanitize_callback' => 'sanitize_hex_color',
		) );
		$wp_customize->add_control( new WP_Customize_Color_Control(
			$wp_customize, 'chronus_theme_options[page_bg_color]', array(
				'label'    => _x( 'Page Background', 'color setting', 'chronus-pro' ),
				'section'  => 'chronus_pro_section_colors',
				'settings' => 'chronus_theme_options[page_bg_color]',
				'priority' => 10,
			)
		) );

		// Add Top Navigation Color setting.
		$wp_customize->add_setting( 'chronus_theme_options[top_navi_color]', array(
			'default'           => $default_options['top_navi_color'],
			'type'              => 'option',
			'transport'         => 'postMessage',
			'sanitize_callback' => 'sanitize_hex_color',
		) );
		$wp_customize->add_control( new WP_Customize_Color_Control(
			$wp_customize, 'chronus_theme_options[top_navi_color]', array(
				'label'    => _x( 'Top Navigation', 'color setting', 'chronus-pro' ),
				'section'  => 'chronus_pro_section_colors',
				'settings' => 'chronus_theme_options[top_navi_color]',
				'priority' => 20,
			)
		) );

		// Add Navigation Color setting.
		$wp_customize->add_setting( 'chronus_theme_options[navi_color]', array(
			'default'           => $default_options['navi_color'],
			'type'              => 'option',
			'transport'         => 'postMessage',
			'sanitize_callback' => 'sanitize_hex_color',
		) );
		$wp_customize->add_control( new WP_Customize_Color_Control(
			$wp_customize, 'chronus_theme_options[navi_color]', array(
				'label'    => _x( 'Main Navigation', 'color setting', 'chronus-pro' ),
				'section'  => 'chronus_pro_section_colors',
				'settings' => 'chronus_theme_options[navi_color]',
				'priority' => 30,
			)
		) );

		// Add Link and Button Color setting.
		$wp_customize->add_setting( 'chronus_theme_options[link_color]', array(
			'default'           => $default_options['link_color'],
			'type'              => 'option',
			'transport'         => 'postMessage',
			'sanitize_callback' => 'sanitize_hex_color',
		) );
		$wp_customize->add_control( new WP_Customize_Color_Control(
			$wp_customize, 'chronus_theme_options[link_color]', array(
				'label'    => _x( 'Links and Buttons', 'color setting', 'chronus-pro' ),
				'section'  => 'chronus_pro_section_colors',
				'settings' => 'chronus_theme_options[link_color]',
				'priority' => 40,
			)
		) );

		// Add Title Color setting.
		$wp_customize->add_setting( 'chronus_theme_options[title_color]', array(
			'default'           => $default_options['title_color'],
			'type'              => 'option',
			'transport'         => 'postMessage',
			'sanitize_callback' => 'sanitize_hex_color',
		) );
		$wp_customize->add_control( new WP_Customize_Color_Control(
			$wp_customize, 'chronus_theme_options[title_color]', array(
				'label'    => _x( 'Post Titles', 'color setting', 'chronus-pro' ),
				'section'  => 'chronus_pro_section_colors',
				'settings' => 'chronus_theme_options[title_color]',
				'priority' => 50,
			)
		) );
	}

	/**
	 * Returns color brightness.
	 *
	 * @param int Number of brightness.
	 */
	static function get_color_brightness( $hex_color ) {

		// Remove # string.
		$hex_color = str_replace( '#', '', $hex_color );

		// Convert into RGB.
		$r = hexdec( substr( $hex_color, 0, 2 ) );
		$g = hexdec( substr( $hex_color, 2, 2 ) );
		$b = hexdec( substr( $hex_color, 4, 2 ) );

		return ( ( ( $r * 299 ) + ( $g * 587 ) + ( $b * 114 ) ) / 1000 );
	}

	/**
	 * Check if the color is light.
	 *
	 * @param bool True if color is light.
	 */
	static function is_color_light( $hex_color ) {
		return ( self::get_color_brightness( $hex_color ) > 130 );
	}

	/**
	 * Check if the color is dark.
	 *
	 * @param bool True if color is dark.
	 */
	static function is_color_dark( $hex_color ) {
		return ( self::get_color_brightness( $hex_color ) <= 130 );
	}
}

// Run Class.
add_action( 'init', array( 'Chronus_Pro_Custom_Colors', 'setup' ) );
