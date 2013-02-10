function screenSize() {

	var winWidth = $( window ).width(),
		mainWidth = $( '#main' ).width();

	if ( winWidth < 320 ) {
		$('body').removeClass().addClass('view-160');
	} else if ( winWidth > 319 && winWidth < 480 ) {
		$('body').removeClass().addClass('view-320');
	} else if ( winWidth > 479 && winWidth < 480 ) {
		$('body').removeClass().addClass('view-480');
	} else if ( winWidth > 639 && winWidth < 960 ) {
		$('body').removeClass().addClass('view-640');
	} else {
		$('body').removeClass().addClass('view-960');
	}


}

jQuery( document ).ready(function($) {

	screenSize();

	$( window ).resize(function() {
		screenSize();
	});

	// Make external links target _blank
	$( 'a:not([href^="http://' + document.domain + '"]):not([href^="#"]):not([href^="/"])' ).attr( 'target', '_blank' );

});