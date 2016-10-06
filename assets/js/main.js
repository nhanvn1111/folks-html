(function($) {
  "use strict";

	$(document).ready( function($) {
			
			// Load Page
			$( window ).load(function() {
				if ( $('body').hasClass('loadpage') )
					$('body').removeClass('loadpage');
			});
			
			// Dribbble
			$.jribbble.getShotsByPlayerId('MunFactory', function (work) {
					var $i = 0,
						$active = '';
					$.each(work.shots, function (x, shot) {
						$i++;
						if ($i == 1 ) {
							$active = ' active';
							
						} else $active = '';
						
						$('#carousel-dribbble .carousel-inner').append('<div class="item'+ $active +'"><a href="' + shot.url + '"><img src="' + shot.image_400_url + '" alt="' + shot.title + '"></a></div> ');
					});
				}, {page: 1, per_page: 5}
			);
			
			/* Instagram Feed */
			var $instafeed = $('#instafeed');
			
			if ( $instafeed.length > 0 ) {
				var feed = new Instafeed({
					get: 'tagged',
					tagName: 'bergdorfs',
					limit: 12,
					clientId: 'e7661456ccb5467495d5ee3ea8d7d887',
					template: '<div class="instagram_thumbnail"><a href="{{link}}"><img src="{{image}}" /></a></div>'
				 });
				 feed.run();
			}
			 
			// Carousel
			var $carousel = $('.carousel');
			$( window ).load(function() {
				if ( $carousel.length > 0 ) {
					
					$carousel.on('slide.bs.carousel', function () {
						if ( $(this).attr('id') != 'carousel-dribbble' ) {
							var $height = $(this).find('.item.active > *').height();
							$(this).find('.item').animate({height: $height});
						}
					});
					
					$carousel.on('slid.bs.carousel', function () {
						if ( $(this).attr('id') != 'carousel-dribbble' ) {
							var $height = $(this).find('.item.active > *').height();
							$(this).find('.item').animate({height: $height});
						}
					});
				}
			});
			
			// Isotope
			var $isotope_portfolio = $('.portfolioIsotope .row'),
				$isotope_blog = $('.blogIsotope .row');
			
			if ( $isotope_blog.length > 0 ) {
				$isotope_blog.imagesLoaded(function() {
					$isotope_blog.isotope({
						layoutMode : 'masonry',
					});
				});
				
				$('a.loadMore').click( function(event) {
					
					var $this = $(this), $url = $this.attr('href');
					
					event.preventDefault();
					
					$( document ).ajaxStart(function() {
						$this.html('Load more <i class="fa fa-spin fa-spinner"></i>');
					});
					$( document ).ajaxStop(function() {
						$this.html('Load more <span>&darr;</span>');
					});
					
					if ( $url != '' && $url != '#' ) {
						$.ajax({
							url: $url,
							cache: false,
							
						}).done(function( html ) {
							
							var elements = $(html).find('.journal_v2 .container > .row > div');
							
							$this.attr('href', '#');
							
							$isotope_blog.append( elements ).isotope( 'insert', elements );
							
							$isotope_blog.imagesLoaded(function() {
								$isotope_blog.isotope('layout');
							});
							
							Waypoint.refreshAll();
						});
					} else {
						$this.parent().html('<button type="submit" disabled="disabled">No More Posts to Show</button>');
					}
				} );

			}
			
			if ( $isotope_portfolio.length > 0 ) {
				
				var $layout = $('.portfolioIsotope').attr('data-layout');
				
				if ( typeof $layout === "undefined" ){
					$layout = 'fitRows';
				}
				
				$isotope_portfolio.imagesLoaded(function() {
					$isotope_portfolio.isotope({
						layoutMode : $layout,
					});
				});
				
				// filter items on button click
				$('#filters .filters').on('click', 'button', function() {
					var $this = $(this),
						filterValue = $this.attr('data-filter'),
						$filters = $this.parents('#filters');
					
					$filters.find('.filters li').each(function(){
						if ( $(this).hasClass('active') ) {
							$(this).removeClass('active');
						}
					});
					
					$this.parent().addClass('active');
					
					$isotope_portfolio.isotope({
						filter : filterValue,
					});
					
					Waypoint.refreshAll();
					
				});
				
				$('a.loadMore').click( function(event) {
					
					var $this = $(this), $url = $this.attr('href');
					
					event.preventDefault();
					
					$( document ).ajaxStart(function() {
						$this.html('Load more <i class="fa fa-spin fa-spinner"></i>');
					});
					$( document ).ajaxStop(function() {
						$this.html('Load more <span>&darr;</span>');
					});
					
					if ( $url != '' && $url != '#' ) {
						$.ajax({
							url: $url,
							cache: false,
							
						}).done(function( html ) {
							
							var elements = $(html).find('.portfolio .row > div');
							
							$this.attr('href', '#');
							
							$isotope_portfolio.append( elements ).isotope( 'insert', elements );
							
							$isotope_portfolio.imagesLoaded(function() {
								$isotope_portfolio.isotope('layout');
							});
							
							Waypoint.refreshAll();
							
						});
					} else {
						$this.parent().html('<button type="submit" disabled="disabled">No More Posts to Show</button>');
					}
				} );
			}
			
			// Modal
			$('.portfolio').on('click', 'a[href="#portfolioModal"]', function () {
				var $this = $(this);
				
				$('#portfolioModal').on('show.bs.modal', function (e) {
					$(this).find('.modal-title').html( $this.attr('title') );
					$(this).find('.modal-body').html('<img alt="" src="'+ $this.attr('data-src') +'">');
				});
				
			});
			
			// Min-Height portfolio-post of v3
			$( window ).load(function() {
				var $min_height = 0;
				
				$('.portfolio_v3 .portfolio-post').each(function() {
					
					if ( $(this).height() > $min_height ) 
						$min_height = $(this).height();
				});
				
				$('.portfolio_v3 .portfolio-post').css('min-height', $min_height);
			});
			
			// Menu of Home v3
			$('.cbp-spmenu li').each(function() {
				$(this).css('line-height', $(this).height() + 'px');
			});
			
			// Portfolio Home v3
			$( window ).load(function() {
				var $height_aside = $('.home_v3 section.portfolio aside');
				
				if ($height_aside.length > 0 )
					$height_aside.css('margin-top', '-' + $height_aside.height()/2 + 'px');
			});
			
			/* Back Top */
			if ($('#backTop').length) {
				
				$('#backTop').on('click', 'a', function(event){
					event.preventDefault();
					
					$('html,body').animate({
			            scrollTop: 0
			        }, 700);
				});
			}
		});
	
	// detect if IE : from http://stackoverflow.com/a/16657946		
	var ie = (function(){
		var undef,rv = -1; // Return value assumes failure.
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf('MSIE ');
		var trident = ua.indexOf('Trident/');

		if (msie > 0) {
			// IE 10 or older => return version number
			rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		} else if (trident > 0) {
			// IE 11 (or newer) => return version number
			var rvNum = ua.indexOf('rv:');
			rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
		}

		return ((rv > -1) ? rv : undef);
	}());


	// disable/enable scroll (mousewheel and keys) from http://stackoverflow.com/a/4770179					
	// left: 37, up: 38, right: 39, down: 40,
	// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
	var keys = [32, 37, 38, 39, 40], wheelIter = 0;

	function preventDefault(e) {
		e = e || window.event;
		if (e.preventDefault)
		e.preventDefault();
		e.returnValue = false;  
	}

	function keydown(e) {
		for (var i = keys.length; i--;) {
			if (e.keyCode === keys[i]) {
				preventDefault(e);
				return;
			}
		}
	}

	function touchmove(e) {
		preventDefault(e);
	}

	function wheel(e) {
		// for IE 
		//if( ie ) {
			//preventDefault(e);
		//}
	}

	function disable_scroll() {
		window.onmousewheel = document.onmousewheel = wheel;
		document.onkeydown = keydown;
		document.body.ontouchmove = touchmove;
	}

	function enable_scroll() {
		window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;  
	}

	var docElem = window.document.documentElement,
		scrollVal,
		isRevealed, 
		noscroll, 
		isAnimating,
		container = document.getElementById( 'wrap' ),
		trigger = container.querySelector( 'button.trigger' );

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}
	
	function scrollPage() {
		scrollVal = scrollY();
		
		if( noscroll && !ie ) {
			if( scrollVal < 0 ) return false;
			// keep it that way
			window.scrollTo( 0, 0 );
		}

		if( classie.has( container, 'notrans' ) ) {
			classie.remove( container, 'notrans' );
			return false;
		}

		if( isAnimating ) {
			return false;
		}
		
		if( scrollVal <= 0 && isRevealed ) {
			toggle(0);
		}
		else if( scrollVal > 0 && !isRevealed ){
			toggle(1);
		}
	}

	function toggle( reveal ) {
		isAnimating = true;
		
		if( reveal ) {
			classie.add( container, 'modify' );
		}
		else {
			noscroll = true;
			disable_scroll();
			classie.remove( container, 'modify' );
		}
		
		// simulating the end of the transition:
		setTimeout( function() {
			isRevealed = !isRevealed;
			isAnimating = false;
			if( reveal ) {
				noscroll = false;
				enable_scroll();
			}
		}, 1200 );
	}

	if ( container.querySelector( 'header.header' ) ) {
		
		// refreshing the page...
		var pageScroll = scrollY();
		noscroll = pageScroll === 0;
		
		disable_scroll();
		
		if( pageScroll ) {
			isRevealed = true;
			classie.add( container, 'notrans' );
			classie.add( container, 'modify' );
		}
		
		window.addEventListener( 'scroll', scrollPage );
		trigger.addEventListener( 'click', function() { toggle( 'reveal' ); } );
	}
	
	
	function Polygon(x, y, radius, sides) {
		  this.x = x;
		  this.y = y;
		  this.radius = radius;
		  this.sides = sides;
		  this.rotation = 0;
		}

		Polygon.prototype.draw = function(ctx, width, height) {
		  var a = ((Math.PI * 2) / this.sides), 
		      i, n;

		  ctx.save();
		  ctx.lineJoin = 'round';
		  ctx.strokeStyle = '#ff9394';
		  ctx.translate(width / 2, height / 2);
		  ctx.rotate(this.rotation * Math.PI / 180)
		  ctx.lineWidth = 1;
		  ctx.beginPath();
		  ctx.moveTo(this.radius, 0);
		  for (i = 0; i < this.sides; i++) {
		    for (n = 0; n < this.sides; n++) {
		      ctx.lineTo(this.radius * Math.cos(a * i), this.radius * Math.sin(a * i));
		      ctx.lineTo(this.radius * Math.cos(a * n), this.radius * Math.sin(a * n));
		    }
		  }
		  ctx.closePath();
		  ctx.stroke();
		  ctx.restore();
		}

		window.onload = function() {
		  var canvas = document.querySelector('canvas');
		  
		  if (!canvas)
			  return false; 
		  
		  var ctx = canvas.getContext('2d'),
		      W = canvas.width = window.innerWidth,
		      H = canvas.height = window.innerHeight,
		      polygon = new Polygon(W / 2, H / 2, 220, 2),
		      sidesCounter = 2,
		      increment = 1;

		 var grd = ctx.createLinearGradient(0, 0, 0, W/1.5);
		  grd.addColorStop(0, "#ff0544");
		  grd.addColorStop(1, "#ff7b6a");

		  (function drawFrame(){
		    requestAnimationFrame(drawFrame, canvas);
		    ctx.fillStyle = grd;
		    ctx.fillRect(0, 0, W, H);
		    polygon.draw(ctx, W, H);
		  }());
		  
		  setInterval(function(){
		    sidesCounter += increment;
		    if (sidesCounter >= 7) increment *= -1;
		    if (sidesCounter <= 2) increment *= -1;
		    TweenMax.to(polygon, 1, {sides: sidesCounter, rotation: sidesCounter * -20, ease: Power3.easeOut});
		  }, 900);
			
		}
		
		var menuRight = document.getElementById( 'cbp-spmenu-s2' ),
		showRight = document.getElementById( 'showRight' ),
		showRightPush = document.getElementById( 'showRightPush' ),
		body = document.body;;
	
	if ( !showRight || !menuRight ) 
		return false;
	
	showRight.onclick = function() {
		classie.toggle( this, 'active' );
		classie.toggle( menuRight, 'cbp-spmenu-open' );
		disableOther( 'showRight' );
	};
	showRightPush.onclick = function() {
		classie.toggle( this, 'active' );
		classie.toggle( body, 'cbp-spmenu-push-toleft' );
		classie.toggle( menuRight, 'cbp-spmenu-open' );
		disableOther( 'showRightPush' );
	};
	function disableOther( button ) {
		if( button !== 'showRight' ) {
			classie.toggle( showRight, 'disabled' );
		}
		if( button !== 'showRightPush' ) {
			classie.toggle( showRightPush, 'disabled' );
		}
	}
	
})(jQuery);