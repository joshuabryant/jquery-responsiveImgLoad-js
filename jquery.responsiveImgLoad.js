/********************************************************
 * function name: responsiveImgLoad()
 *
 * Loads in higher resolution images if size exceeds the hitpoint
 *
 * OPTIONS :
 *   hitpoint : number of pixels at which to load fullsize image
 *   fullAttr : the img attribute that contains the path to the fullsize image

	======================================
	
	Copyright (c) 2011 Joshua Bryant
	
	
	responsiveImgLoad is licensed under GNU GPL.
	--------------------------------------
	
	responsiveImgLoad is free software: you can redistribute it and/or modify
	    it under the terms of the GNU General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	
	    This program is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU General Public License for more details.
	
	    You should have received a copy of the GNU General Public License
	    along with this program.  If not, see <http://www.gnu.org/licenses/>. 
 *
 *
 */


(function( $ ){
	$.fn.responsiveImgLoad = function( method ) {
		
		var vars = {
			hitpoint : 480,
			fullAttr : 'data-fullsrc'
		};
		
		var methods = {
			init : function( options ) {
				if(options) { $.extend(vars, options); }
				
				return this.each(function() {
					var current = $(this),
							original = current.attr('src'),
							fullSize = current.attr(vars.fullAttr);
					
					if(current.width() < vars.hitpoint) {
						$(window).bind('resize.responsiveImgLoad', function() {
							methods.swap(current, fullSize);
						});
					} else {
						methods.swap(current, fullSize);
					}
				});
			},
			swap : function(current, fullSize) {
				if(current.width() > vars.hitpoint) {
					var $img = $('<img>');
					
					$img
						.load(function() { current.attr('src', $(this).attr('src')); })
						.attr('src', fullSize);
				}
			}
		}
		
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.responsiveImgLoad' );
		}
	};
})( jQuery );