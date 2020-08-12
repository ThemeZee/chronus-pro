<?php
/**
 * Author Bio
 *
 * Displays author bio below single posts
 * Registers and displays footer navigation
 *
 * @package Chronus Pro
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

/**
 * Author Bio Class
 */
class Chronus_Pro_Author_Bio {

	/**
	 * Author Bio Setup
	 *
	 * @return void
	 */
	static function setup() {

		// Return early if Chronus Theme is not active.
		if ( ! current_theme_supports( 'chronus-pro' ) ) {
			return;
		}

		// Remove default footer text function and replace it with new one.
		add_action( 'chronus_author_bio', array( __CLASS__, 'author_bio' ) );

		// Add Author Bio checkbox in Customizer.
		add_action( 'customize_register', array( __CLASS__, 'author_bio_settings' ) );

		// Hide Author Bio if disabled.
		add_filter( 'chronus_hide_elements', array( __CLASS__, 'hide_author_bio' ) );
	}

	/**
	 * Displays author bio.
	 *
	 * @return void
	 */
	static function author_bio() {

		// Get Theme Options from Database.
		$theme_options = Chronus_Pro_Customizer::get_theme_options();

		// Show author bio if activated.
		if ( true === $theme_options['author_bio'] || is_customize_preview() ) : ?>

			<div class="entry-author clearfix">
				<div class="author-avatar">
					<?php echo get_avatar( get_the_author_meta( 'user_email' ), 128 ); ?>
				</div>

				<div class="author-heading">
					<h4 class="author-title"><?php printf( esc_html__( 'About %s', 'chronus-pro' ), '<span class="author-name">' . get_the_author() . '</span>' ); ?></h4>
					<a class="author-link" href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>" rel="author">
						<?php esc_html_e( 'View all posts', 'chronus-pro' ); ?>
					</a>
				</div>

				<p class="author-bio">
					<?php the_author_meta( 'description' ); ?>
				</p>
			</div><!-- .author-box -->

		<?php
		endif;
	}

	/**
	 * Adds author bio checkbox setting
	 *
	 * @param object $wp_customize / Customizer Object.
	 */
	static function author_bio_settings( $wp_customize ) {

		// Add Author Bio setting and control.
		$wp_customize->add_setting( 'chronus_theme_options[author_bio]', array(
			'default'           => false,
			'type'              => 'option',
			'transport'         => 'postMessage',
			'sanitize_callback' => 'chronus_sanitize_checkbox',
		) );

		$wp_customize->add_control( 'chronus_theme_options[author_bio]', array(
			'label'    => __( 'Display Author Bio', 'chronus-pro' ),
			'section'  => 'chronus_section_post',
			'settings' => 'chronus_theme_options[author_bio]',
			'type'     => 'checkbox',
			'priority' => 65,
		) );
	}

	/**
	 * Hide Author Bio if deactivated.
	 *
	 * @param array $elements / Elements to be hidden.
	 * @return array $elements
	 */
	static function hide_author_bio( $elements ) {

		// Get Theme Options from Database.
		$theme_options = Chronus_Pro_Customizer::get_theme_options();

		// Hide Author Bio?
		if ( false === $theme_options['author_bio'] ) {
			$elements[] = '.type-post .entry-footer .entry-author';
		}

		return $elements;
	}
}

// Run Class.
add_action( 'init', array( 'Chronus_Pro_Author_Bio', 'setup' ) );