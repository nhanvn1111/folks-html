/*!
Waypoints Sticky Element Shortcut - 3.1.1
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
(function($) {
  "use strict";

  var $ = window.jQuery;
  var Waypoint = window.Waypoint;

  /* http://imakewebthings.com/waypoints/shortcuts/sticky-elements */
  function Sticky(options) {
    this.options = $.extend({}, Waypoint.defaults, Sticky.defaults, options);
    this.element = this.options.element;
    this.$element = $(this.element);
    this.createWrapper();
    this.createWaypoint();
  }

  /* Private */
  Sticky.prototype.createWaypoint = function() {
    var originalHandler = this.options.handler;
    this.waypoint = new Waypoint($.extend({}, this.options, {
      element: this.wrapper,
      handler: $.proxy(function(direction) {
        var shouldBeStuck = this.options.direction.indexOf(direction) > -1;
        var wrapperHeight = shouldBeStuck ? this.$element.outerHeight(true) : '';
       
        this.$wrapper.height(wrapperHeight);
        this.$element.toggleClass(this.options.stuckClass, shouldBeStuck);

        if (originalHandler) {
          originalHandler.call(this, direction);
        }
      }, this)
    }));
  };

  /* Private */
  Sticky.prototype.createWrapper = function() {
    this.$element.wrap(this.options.wrapper);
    this.$wrapper = this.$element.parent();
    this.wrapper = this.$wrapper[0];
  };

  /* Public */
  Sticky.prototype.destroy = function() {
    if (this.$element.parent()[0] === this.wrapper) {
      this.waypoint.destroy();
      this.$element.removeClass(this.options.stuckClass).unwrap();
    }
  };

  Sticky.defaults = {
    wrapper: '<div class="sticky-wrapper" />',
    stuckClass: 'stuck',
    direction: 'down right'
  };

  Waypoint.Sticky = Sticky;

  jQuery(document).ready(
			function($) {
				
				// Navbar Sticky
				var $primary_navigation = $('#primary-navigation');
				if ($primary_navigation.length > 0) {
					new Waypoint.Sticky({
					  element: $primary_navigation[0],
					  wrapper: '<div class="primary-sticky" />',
					  stuckClass: 'primary-stuck',
					  offset: '-1'
					});
				}
				
				$( window ).load(function() {
					// Single Meta Sticky
					var $meta = $('section.single .entry-meta'), $single = $('section.single');
					if ($meta.length > 0) {
						var $max_height = $single.height() - $meta.height();
						
						new Waypoint.Sticky({
						  element: $meta[0],
						  wrapper: '<div class="meta-sticky" />',
						  stuckClass: 'meta-stuck',
						  offset: '63'
						});
						
						new Waypoint.Sticky({
							  element: $single[0],
							  wrapper: '<div class="single-sticky"/>',
							  stuckClass: 'remove-meta-stuck',
							  offset: '-' + $max_height
						});
						
					}
					
					// Transition Scroll
					var $skills_v2 = $('#skills.skills_v2'), 
						$skills_v1 = $('#skills.skills_v1'),
						$ourVision = $('#ourVision'),
						$portfolio = $('#portfolio'),
						$feed = $('#feed'),
						$testimonials = $('#testimonials'),
						$whyTCUs = $('#whyTCUs'),
						$awards = $('#awards'),
						$journal = $('#journal.journal_v2'),
						$services = $('#services'),
						$contact = $('#contact'),
						$visitUs = $('#visitUs'),
						$portfolio_v4 = $('#portfolio.portfolio_v4');
					
					if ($skills_v2.length > 0) {
						new Waypoint({
						  element: $skills_v2[0],
						  handler: function(direction) {
							  if ( $skills_v2.find('.circle canvas').length == 0 ) {
								  $skills_v2.find('.circle').each (function () {
									var $this = $(this);
									
								  	$this.circleProgress({
										 value: '.' + $this.attr('data-value'),
										 size: 220,
										 startAngle: -1.6,
										 reverse: true,
										 thickness: 5,
										 lineCap: 'round',
										 fill: { color: $this.attr('data-fill') },
										 emptyFill: '#eaeaec',
										 animation: { duration: 1500 },
								    }).on('circle-animation-progress', function(event, progress) {
								    	$(this).find('strong').html(parseInt($this.attr('data-value') * progress) + '<i>%</i>');
								    });
							  	});
							  }
						  },
						  offset: '85%'
						});
					}
					
					if ($skills_v1.length > 0) {
						new Waypoint({
							element: $skills_v1[0],
							handler: function(direction) {
								if ( !$skills_v1.hasClass('skills-stuck') )
									$skills_v1.addClass('skills-stuck');
							},
							offset: '55%'
						});
					}
					
					if ($portfolio.length > 0) {
						new Waypoint({
							element: $portfolio[0],
							handler: function(direction) {
								if ( !$portfolio.hasClass('portfolio-stuck') )
									$portfolio.addClass('portfolio-stuck');
							},
							offset: '55%'
						});
					}
					
					if ($testimonials.length > 0) {
						new Waypoint({
							element: $testimonials[0],
							handler: function(direction) {
								if ( !$testimonials.hasClass('testimonials-stuck') )
									$testimonials.addClass('testimonials-stuck');
							},
							offset: '55%'
						});
					}
					
					if ($feed.length > 0) {
						new Waypoint({
							element: $feed[0],
							handler: function(direction) {
								if ( !$feed.hasClass('feed-stuck') )
									$feed.addClass('feed-stuck');
							},
							offset: '55%'
						});
					}
					
					if ($ourVision.length > 0) {
						new Waypoint({
							element: $ourVision[0],
							handler: function(direction) {
								if ( !$ourVision.hasClass('ourVision-stuck') )
									$ourVision.addClass('ourVision-stuck');
							},
							offset: '55%'
						});
					}
					
					if ($whyTCUs.length > 0) {
						new Waypoint({
							element: $whyTCUs[0],
							handler: function(direction) {
								if ( !$whyTCUs.hasClass('whyTCUs-stuck') )
									$whyTCUs.addClass('whyTCUs-stuck');
							},
							offset: '25%'
						});
					}
					
					if ($awards.length > 0) {
						new Waypoint({
							element: $awards[0],
							handler: function(direction) {
								if ( !$awards.hasClass('awards-stuck') )
									$awards.addClass('awards-stuck');
							},
							offset: '55%'
						});
					}
					
					if ($journal.length > 0) {
						new Waypoint({
							element: $journal[0],
							handler: function(direction) {
								if ( !$journal.hasClass('journal-stuck') )
									$journal.addClass('journal-stuck');
							},
							offset: '55%'
						});
					}
					
					if ($contact.length > 0) {
						new Waypoint({
							element: $contact[0],
							handler: function(direction) {
								if ( !$contact.hasClass('contact-stuck') )
									$contact.addClass('contact-stuck');
							},
							offset: '55%'
						});
					}
					
					if ($services.length > 0) {
						new Waypoint({
							element: $services[0],
							handler: function(direction) {
								if ( !$services.hasClass('services-stuck') )
									$services.addClass('services-stuck');
							},
							offset: '55%'
						});
					}
					
					if ($visitUs.length > 0) {
						new Waypoint({
							element: $visitUs[0],
							handler: function(direction) {
								if ( !$visitUs.hasClass('visitUs-stuck') )
									$visitUs.addClass('visitUs-stuck');
							},
							offset: '55%'
						});
					}
					
					if ($portfolio_v4.length > 0) {
						$portfolio_v4.find('a.loadMore').css('display', 'none');
						$portfolio_v4.append('<div class="loading"><div class="loading-inner">Load more <i class="fa fa-spin fa-spinner"></i></div></div>');
						$portfolio_v4.find('.loading').hide();
						new Waypoint({
							element: $portfolio_v4[0],
							handler: function(direction) {
								
								var $url = $portfolio_v4.find('a.loadMore').attr('href');
								
								$( document ).ajaxStart(function() {
									$portfolio_v4.find('.loading').fadeIn();
								});
								$( document ).ajaxStop(function() {
									$portfolio_v4.find('.loading').fadeOut();
								});
								
								if ( typeof $url !== "undefined" && $url != '' && $url != '#' ) {
									$.ajax({
										url: $url,
										cache: false,
										
									}).done(function( html ) {
										
										var elements = $(html).find('.portfolio .row > div');
										
										$portfolio_v4.find('a.loadMore').attr('href', '#');
										
										$portfolio_v4.find('.row').append( elements ).isotope( 'insert', elements );
										
										$portfolio_v4.find('.row').imagesLoaded(function() {
											$portfolio_v4.find('.row').isotope('layout');
										});
										Waypoint.refreshAll();
									});
								} else {
									$portfolio_v4.find('.loading-inner').html('No More Posts to Show');
									$portfolio_v4.find('.loading').fadeIn().delay(2500).fadeOut();
								}
							},
							offset: 'bottom-in-view'
						});
					}
					
				});
				
			}
	);
})(jQuery);