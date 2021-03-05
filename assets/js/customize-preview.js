/**
 * Customizer JS
 *
 * Reloads changes on Theme Customizer Preview asynchronously for better usability
 *
 * @package Chronus Pro
 */

( function( $ ) {

	/* Header Search checkbox */
	wp.customize( 'chronus_theme_options[header_search]', function( value ) {
		value.bind( function( newval ) {
			if ( false === newval ) {
				hideElement( '.primary-navigation .main-navigation li.header-search' );
			} else {
				showElement( '.primary-navigation .main-navigation li.header-search' );
			}
		} );
	} );

	/* Author Bio checkbox */
	wp.customize( 'chronus_theme_options[author_bio]', function( value ) {
		value.bind( function( newval ) {
			if ( false === newval ) {
				hideElement( '.type-post .entry-footer .entry-author' );
			} else {
				showElement( '.type-post .entry-footer .entry-author' );
			}
		} );
	} );

	/* Footer textfield. */
	wp.customize( 'chronus_theme_options[footer_text]', function( value ) {
		value.bind( function( to ) {
			$( '.site-info .footer-text' ).text( to );
		} );
	} );

	/* Page Background Color Option */
	wp.customize( 'chronus_theme_options[page_bg_color]', function( value ) {
		value.bind( function( newval ) {
			var text_color, medium_text_color, light_text_color, dark_border_color, medium_border_color, light_border_color;

			if( isColorDark( newval ) ) {
				text_color = '#fff';
				medium_text_color = 'rgba(255,255,255,0.8)';
				light_text_color = 'rgba(255,255,255,0.6)';
				dark_border_color = '#fff';
				medium_border_color = 'rgba(255,255,255,0.2)';
				light_border_color = 'rgba(255,255,255,0.1)';

			} else {
				text_color = '#303030';
				medium_text_color = '#666';
				light_text_color = '#999';
				dark_border_color = '#303030';
				medium_border_color = 'rgba(0, 0, 0, 0.15)';
				light_border_color = 'rgba(0, 0, 0, 0.075)';
			}

			document.documentElement.style.setProperty( '--page-background-color', newval );
			document.documentElement.style.setProperty( '--text-color', text_color );
			document.documentElement.style.setProperty( '--medium-text-color', medium_text_color );
			document.documentElement.style.setProperty( '--light-text-color', light_text_color );
			document.documentElement.style.setProperty( '--dark-border-color', dark_border_color );
			document.documentElement.style.setProperty( '--medium-border-color', medium_border_color );
			document.documentElement.style.setProperty( '--light-border-color', light_border_color );

			document.documentElement.style.setProperty( '--navi-color', text_color );
			document.documentElement.style.setProperty( '--title-color', text_color );
			document.documentElement.style.setProperty( '--widget-title-color', text_color );
			document.documentElement.style.setProperty( '--link-hover-color', text_color );
			document.documentElement.style.setProperty( '--button-hover-color', text_color );
		} );
	} );

	/* Top Navigation Color Option */
	wp.customize( 'chronus_theme_options[top_navi_color]', function( value ) {
		value.bind( function( newval ) {
			var text_color, hover_color, border_color;

			if( isColorLight( newval ) ) {
				text_color = '#151515';
				hover_color = 'rgba(0, 0, 0, 0.5)';
				border_color = 'rgba(0, 0, 0, 0.1)';
			} else {
				text_color = '#fff';
				hover_color = 'rgba(255, 255, 255, 0.5)';
				border_color = 'rgba(255, 255, 255, 0.1)';
			}

			document.documentElement.style.setProperty( '--header-bar-background-color', newval );
			document.documentElement.style.setProperty( '--header-bar-text-color', text_color );
			document.documentElement.style.setProperty( '--header-bar-text-hover-color', hover_color );
			document.documentElement.style.setProperty( '--header-bar-border-color', border_color );
		} );
	} );

	/* Main Navigation Color Option */
	wp.customize( 'chronus_theme_options[navi_color]', function( value ) {
		value.bind( function( newval ) {
			var text_color, hover_color, border_color;

			if( isColorLight( newval ) ) {
				text_color = '#151515';
				hover_color = 'rgba(0, 0, 0, 0.5)';
				border_color = 'rgba(0, 0, 0, 0.1)';
			} else {
				text_color = '#fff';
				hover_color = 'rgba(255, 255, 255, 0.5)';
				border_color = 'rgba(255, 255, 255, 0.1)';
			}

			document.documentElement.style.setProperty( '--navi-hover-color', newval );
			document.documentElement.style.setProperty( '--navi-submenu-color', newval );
			document.documentElement.style.setProperty( '--navi-submenu-text-color', text_color );
			document.documentElement.style.setProperty( '--navi-submenu-hover-color', hover_color );
			document.documentElement.style.setProperty( '--navi-submenu-border-color', border_color );
		} );
	} );

	/* Link & Button Color Option */
	wp.customize( 'chronus_theme_options[link_color]', function( value ) {
		value.bind( function( newval ) {
			document.documentElement.style.setProperty( '--link-color', newval );
			document.documentElement.style.setProperty( '--button-color', newval );
		} );
	} );

	/* Title Color Option */
	wp.customize( 'chronus_theme_options[title_color]', function( value ) {
		value.bind( function( newval ) {
			document.documentElement.style.setProperty( '--title-hover-color', newval );
			document.documentElement.style.setProperty( '--widget-title-hover-color', newval );
		} );
	} );

	/* Text Font */
	wp.customize( 'chronus_theme_options[text_font]', function( value ) {
		value.bind( function( newval ) {

			// Load Font in Customizer.
			loadCustomFont( newval, 'text-font' );

			// Set Font.
			var systemFont = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';
			var newFont = newval === 'SystemFontStack' ? systemFont : newval;

			// Set CSS.
			document.documentElement.style.setProperty( '--text-font', newFont );
		} );
	} );

	/* Title Font */
	wp.customize( 'chronus_theme_options[title_font]', function( value ) {
		value.bind( function( newval ) {

			// Load Font in Customizer.
			loadCustomFont( newval, 'title-font' );

			// Set Font.
			var systemFont = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';
			var newFont = newval === 'SystemFontStack' ? systemFont : newval;

			// Set CSS.
			document.documentElement.style.setProperty( '--title-font', newFont );
		} );
	} );

	/* Title Font Weight */
	wp.customize( 'chronus_theme_options[title_is_bold]', function( value ) {
		value.bind( function( newval ) {
			var fontWeight = newval ? 'bold' : 'normal';
			document.documentElement.style.setProperty( '--title-font-weight', fontWeight );
		} );
	} );

	/* Title Text Transform */
	wp.customize( 'chronus_theme_options[title_is_uppercase]', function( value ) {
		value.bind( function( newval ) {
			var textTransform = newval ? 'uppercase' : 'none';
			document.documentElement.style.setProperty( '--title-text-transform', textTransform );
		} );
	} );

	/* Navi Font */
	wp.customize( 'chronus_theme_options[navi_font]', function( value ) {
		value.bind( function( newval ) {

			// Load Font in Customizer.
			loadCustomFont( newval, 'navi-font' );

			// Set Font.
			var systemFont = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';
			var newFont = newval === 'SystemFontStack' ? systemFont : newval;

			// Set CSS.
			document.documentElement.style.setProperty( '--navi-font', newFont );
		} );
	} );

	/* Navi Font Weight */
	wp.customize( 'chronus_theme_options[navi_is_bold]', function( value ) {
		value.bind( function( newval ) {
			var fontWeight = newval ? 'bold' : 'normal';
			document.documentElement.style.setProperty( '--navi-font-weight', fontWeight );
		} );
	} );

	/* Navi Text Transform */
	wp.customize( 'chronus_theme_options[navi_is_uppercase]', function( value ) {
		value.bind( function( newval ) {
			var textTransform = newval ? 'uppercase' : 'none';
			document.documentElement.style.setProperty( '--navi-text-transform', textTransform );
		} );
	} );

	/* Widget Title Font */
	wp.customize( 'chronus_theme_options[widget_title_font]', function( value ) {
		value.bind( function( newval ) {

			// Load Font in Customizer.
			loadCustomFont( newval, 'widget-title-font' );

			// Set Font.
			var systemFont = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';
			var newFont = newval === 'SystemFontStack' ? systemFont : newval;

			// Set CSS.
			document.documentElement.style.setProperty( '--widget-title-font', newFont );
		} );
	} );

	/* Widget Title Font Weight */
	wp.customize( 'chronus_theme_options[widget_title_is_bold]', function( value ) {
		value.bind( function( newval ) {
			var fontWeight = newval ? 'bold' : 'normal';
			document.documentElement.style.setProperty( '--widget-title-font-weight', fontWeight );
		} );
	} );

	/* Widget Title Text Transform */
	wp.customize( 'chronus_theme_options[widget_title_is_uppercase]', function( value ) {
		value.bind( function( newval ) {
			var textTransform = newval ? 'uppercase' : 'none';
			document.documentElement.style.setProperty( '--widget-title-text-transform', textTransform );
		} );
	} );

	function hideElement( element ) {
		$( element ).css({
			clip: 'rect(1px, 1px, 1px, 1px)',
			position: 'absolute',
			width: '1px',
			height: '1px',
			overflow: 'hidden'
		});
	}

	function showElement( element ) {
		$( element ).css({
			clip: 'auto',
			position: 'relative',
			width: 'auto',
			height: 'auto',
			overflow: 'visible'
		});
	}

	function hexdec( hexString ) {
		hexString = ( hexString + '' ).replace( /[^a-f0-9]/gi, '' );
		return parseInt( hexString, 16 );
	}

	function getColorBrightness( hexColor ) {

		// Remove # string.
		hexColor = hexColor.replace( '#', '' );

		// Convert into RGB.
		var r = hexdec( hexColor.substring( 0, 2 ) );
		var g = hexdec( hexColor.substring( 2, 4 ) );
		var b = hexdec( hexColor.substring( 4, 6 ) );

		return ( ( ( r * 299 ) + ( g * 587 ) + ( b * 114 ) ) / 1000 );
	}

	function isColorLight( hexColor ) {
		return ( getColorBrightness( hexColor ) > 130 );
	}

	function isColorDark( hexColor ) {
		return ( getColorBrightness( hexColor ) <= 130 );
	}

	function loadCustomFont( font, type ) {
		var fontFile = font.split( " " ).join( "+" );
		var fontFileURL = "https://fonts.googleapis.com/css?family=" + fontFile + ":400,700";

		var fontStylesheet = "<link id='chronus-pro-custom-" + type + "' href='" + fontFileURL + "' rel='stylesheet' type='text/css'>";
		var checkLink = $( "head" ).find( "#chronus-pro-custom-" + type ).length;

		if (checkLink > 0) {
			$( "head" ).find( "#chronus-pro-custom-" + type ).remove();
		}
		$( "head" ).append( fontStylesheet );
	}

} )( jQuery );
