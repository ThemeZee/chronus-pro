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
			var title_color = '#cc5555',
				link_color  = '#cc5555';
				navi_color  = '#cc5555';

			if( typeof wp.customize.value( 'chronus_theme_options[title_color]' ) !== 'undefined' ) {
				title_color = wp.customize.value( 'chronus_theme_options[title_color]' ).get();
			}

			if( typeof wp.customize.value( 'chronus_theme_options[link_color]' ) !== 'undefined' ) {
				link_color = wp.customize.value( 'chronus_theme_options[link_color]' ).get();
			}

			if( typeof wp.customize.value( 'chronus_theme_options[navi_color]' ) !== 'undefined' ) {
				navi_color = wp.customize.value( 'chronus_theme_options[navi_color]' ).get();
			}

			var text_color, meta_color, border_color;

			if( isColorDark( newval ) ) {
				text_color = '#ffffff';
				meta_color = 'rgba(255,255,255,0.45)';
				border_color = 'rgba(255,255,255,0.075)';
			} else {
				text_color = '#303030';
				meta_color = 'rgba(0,0,0,0.45)';
				border_color = 'rgba(0,0,0,0.075)';
			}

			$( '.site, .header-search .header-search-form, .scroll-to-top-button' )
				.css( 'background', newval );

			$( 'body, button, input, select, textarea, blockquote cite, blockquote small, .site-title, .site-title a, .main-navigation ul, .main-navigation ul > li > a, .primary-menu-toggle, .widget-title, .widget-title a, .entry-title, .entry-title a, .archive-title, .comments-header .comments-title, .comment-reply-title, .footer-navigation-menu a' )
				.css( 'color', text_color );

			$( 'a, button, input[type="button"], input[type="reset"], input[type="submit"], .infinite-scroll #infinite-handle span, .tzwb-tabbed-content .tzwb-tabnavi li a, .tzwb-tabbed-content .tzwb-tabnavi li a.current-tab' )
				.not( $( '.header-bar a, .main-navigation ul ul a' ) )
				.hover( function() { $( this ).css( 'color', text_color ); },
					function() { $( this ).css( 'color', link_color ); }
				);

			$( '.site-title a, .entry-title a' )
				.hover( function() { $( this ).css( 'color', title_color ); },
					function() { $( this ).css( 'color', text_color ); }
				);

			$( '.main-navigation ul > li > a, .primary-menu-toggle, .footer-navigation-menu a' )
				.hover( function() { $( this ).css( 'color', navi_color ); },
					function() { $( this ).css( 'color', text_color ); }
				);

			$( '.widget-title a' )
				.hover( function() { $( this ).css( 'color', link_color ); },
					function() { $( this ).css( 'color', text_color ); }
				);

			$( 'pre, th, td, button, input[type="button"], input[type="reset"], input[type="submit"], input[type="text"], input[type="email"], input[type="url"], input[type="password"], input[type="search"], textarea, .site-header, .primary-navigation-wrap, .widget ul li, .widget ol li, .sticky, .infinite-scroll #infinite-handle span, .featured-posts-wrap, .comment, .site-footer, .main-navigation ul, .tzwb-tabbed-content .tzwb-tabnavi li a, .tzwb-social-icons .social-icons-menu li a, .footer-widgets-background, .footer-navigation, .header-search .header-search-form, .entry-author, .scroll-to-top-button' )
				.css( 'border-color', border_color );

			$( '.entry-meta' )
				.css( 'color', meta_color );

			$( '.search-form .search-submit:hover .icon-search, .search-form .search-submit:active .icon-search, .main-navigation ul > .menu-item-has-children > a .icon, .main-navigation ul > li > .dropdown-toggle > .icon, .main-navigation ul > li > .dropdown-toggle:focus > .icon, .primary-menu-toggle .icon, .tzwb-social-icons .social-icons-menu li a:hover .icon, .header-search .header-search-icon .icon-search, .scroll-to-top-button:hover .icon' )
				.css( 'fill', text_color );

			$( '.main-navigation ul > .menu-item-has-children > a, .primary-menu-toggle, .main-navigation ul .submenu-dropdown-toggle' )
				.hover( function() { $( this ).find( '.icon' ).css( 'fill', navi_color ); },
					function() { $( this ).find( '.icon' ).css( 'fill', text_color ); }
				);

			$( '.search-form .search-submit, .tzwb-social-icons .social-icons-menu li a, .scroll-to-top-button' )
				.hover( function() { $( this ).find( '.icon' ).css( 'fill', text_color ); },
					function() { $( this ).find( '.icon' ).css( 'fill', link_color ); }
				);
		} );
	} );

	/* Link & Button Color Option */
	wp.customize( 'chronus_theme_options[link_color]', function( value ) {
		value.bind( function( newval ) {
			var text_color, page_bg_color;

			if( typeof wp.customize.value( 'chronus_theme_options[page_bg_color]' ) !== 'undefined' ) {
				page_bg_color = wp.customize.value( 'chronus_theme_options[page_bg_color]' ).get();
			}

			if( isColorDark( page_bg_color ) ) {
				text_color = '#ffffff';
			} else {
				text_color = '#303030';
			}

			$( 'a, button, input[type="button"], input[type="reset"], input[type="submit"], .infinite-scroll #infinite-handle span, .tzwb-tabbed-content .tzwb-tabnavi li a, .widget-title a' )
				.not( $( '.header-bar a, .site-title a, .entry-title a, .widget-title a, .main-navigation ul a, .main-navigation ul ul a' ) )
				.css( 'color', newval );

			$( 'a, button, input[type="button"], input[type="reset"], input[type="submit"], .infinite-scroll #infinite-handle span, .tzwb-tabbed-content .tzwb-tabnavi li a, .tzwb-tabbed-content .tzwb-tabnavi li a.current-tab' )
				.not( $( '.header-bar a, .site-title a, .entry-title a, .widget-title a, .main-navigation ul a, .main-navigation ul ul a' ) )
				.hover( function() { $( this ).css( 'color', text_color ); },
					function() { $( this ).css( 'color', newval ); }
				);

			$( '.widget-title a' )
				.hover( function() { $( this ).css( 'color', newval ); },
					function() { $( this ).css( 'color', text_color ); }
				);

			$( '.search-form .search-submit .icon, .tzwb-social-icons .social-icons-menu li a .icon, .scroll-to-top-button .icon' )
				.css( 'fill', newval );

			$( '.search-form .search-submit, .tzwb-social-icons .social-icons-menu li a, .scroll-to-top-button' )
				.hover( function() { $( this ).find( '.icon' ).css( 'fill', text_color ); },
					function() { $( this ).find( '.icon' ).css( 'fill', newval ); }
				);

			$( '.has-primary-color' ).css( 'color', newval );
			$( '.has-primary-background-color' ).css( 'background-color', newval );
		} );
	} );

	/* Top Navigation Color Option */
	wp.customize( 'chronus_theme_options[top_navi_color]', function( value ) {
		value.bind( function( newval ) {
			$( '.header-bar-wrap, .top-navigation ul ul' )
				.css( 'background', newval );

			var text_color, hover_color, border_color;

			if( isColorLight( newval ) ) {
				text_color = '#303030';
				hover_color = 'rgba(0,0,0,0.5)';
				border_color = 'rgba(0,0,0,0.05)';
			} else {
				text_color = '#ffffff';
				hover_color = 'rgba(255,255,255,0.5)';
				border_color = 'rgba(255,255,255,0.1)';
			}

			$( '.top-navigation ul, .top-navigation ul ul, .top-navigation ul a, .top-navigation ul ul a' )
				.css( 'border-color', border_color );

			$( '.top-navigation ul ul, .top-navigation ul a, .secondary-menu-toggle' )
				.css( 'color', text_color );

			$( '.top-navigation ul a, .secondary-menu-toggle' )
				.hover( function() { $( this ).css( 'color', hover_color ); },
						function() { $( this ).css( 'color', text_color ); }
				);

			$( '.top-navigation ul > .menu-item-has-children > a .icon, .top-navigation ul ul .menu-item-has-children > a .icon, .header-bar .social-icons-menu li a .icon, .secondary-menu-toggle .icon, .top-navigation .dropdown-toggle .icon, .top-navigation ul .menu-item-has-children > a > .icon' )
				.css( 'fill', text_color );

			$( '.header-bar .social-icons-menu li a:hover .icon, .secondary-menu-toggle:hover .icon, .secondary-menu-toggle:active .icon, .top-navigation .dropdown-toggle:hover .icon, .top-navigation .dropdown-toggle:active .icon, .top-navigation ul .menu-item-has-children > a:hover > .icon, .top-navigation ul .menu-item-has-children > a:active > .icon' )
				.hover( function() { $( this ).find( '.icon' ).css( 'fill', hover_color ); },
					function() { $( this ).find( '.icon' ).css( 'fill', text_color ); }
				);
		} );
	} );

	/* Main Navigation Color Option */
	wp.customize( 'chronus_theme_options[navi_color]', function( value ) {
		value.bind( function( newval ) {
			var text_color, page_bg_color, menu_color, hover_color, border_color;

			if( typeof wp.customize.value( 'chronus_theme_options[page_bg_color]' ) !== 'undefined' ) {
				page_bg_color = wp.customize.value( 'chronus_theme_options[page_bg_color]' ).get();
			}

			if( isColorDark( page_bg_color ) ) {
				text_color = '#ffffff';
			} else {
				text_color = '#303030';
			}

			$( '.main-navigation ul ul' )
				.css( 'background', newval );

			$( '.main-navigation ul > li > a, .main-navigation ul > .menu-item-has-children > a, .primary-menu-toggle, .footer-navigation-menu a' )
				.hover( function() { $( this ).css( 'color', newval ); },
						function() { $( this ).css( 'color', text_color ); }
				);

			$( '.main-navigation ul > .menu-item-has-children > a .icon, .primary-menu-toggle .icon, .main-navigation ul .submenu-dropdown-toggle .icon' )
				.css( 'fill', text_color );

			$( '.main-navigation ul > .menu-item-has-children > a, .primary-menu-toggle, .main-navigation ul .submenu-dropdown-toggle, .header-search .header-search-icon' )
				.hover( function() { $( this ).find( '.icon' ).css( 'fill', newval ); },
					function() { $( this ).find( '.icon' ).css( 'fill', text_color ); }
				);

			if( isColorLight( newval ) ) {
				menu_color = 'rgba(0,0,0,0.75)';
				hover_color = 'rgba(0,0,0,0.5)';
				border_color = 'rgba(0,0,0,0.05)';
			} else {
				menu_color = '#ffffff';
				hover_color = 'rgba(255,255,255,0.5)';
				border_color = 'rgba(255,255,255,0.1)';
			}

			$( '.main-navigation ul ul a' )
				.css( 'border-color', border_color );

			$( '.main-navigation ul ul, .main-navigation ul ul a' )
				.css( 'color', menu_color );

			$( '.main-navigation ul ul a' )
				.hover( function() { $( this ).css( 'color', hover_color ); },
						function() { $( this ).css( 'color', menu_color ); }
				);

			$( '.main-navigation ul ul .menu-item-has-children > a .icon, .main-navigation ul ul > li > .dropdown-toggle > .icon, .main-navigation ul ul > li > .dropdown-toggle:focus > .icon' )
				.css( 'fill', menu_color );

			$( '.main-navigation ul ul .menu-item-has-children > a, .main-navigation ul ul > li > .dropdown-toggle' )
				.hover( function() { $( this ).find( '.icon' ).css( 'fill', hover_color ); },
						function() { $( this ).find( '.icon' ).css( 'fill', menu_color ); }
				);
		} );
	} );

	/* Title Color Option */
	wp.customize( 'chronus_theme_options[title_color]', function( value ) {
		value.bind( function( newval ) {
			var text_color, page_bg_color;

			if( typeof wp.customize.value( 'chronus_theme_options[page_bg_color]' ) !== 'undefined' ) {
				page_bg_color = wp.customize.value( 'chronus_theme_options[page_bg_color]' ).get();
			}

			if( isColorDark( page_bg_color ) ) {
				text_color = '#ffffff';
			} else {
				text_color = '#303030';
			}

			$( '.site-title, .site-title a, .entry-title, .entry-title a' )
				.css( 'color', text_color );

			$( '.site-title a, .entry-title a' )
				.hover( function() { $( this ).css( 'color', newval ); },
						function() { $( this ).css( 'color', text_color ); }
				);
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
