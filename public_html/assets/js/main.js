/*
Author       : Theme-Family
Template Name: Softio - Multipage App & Software Landing Page Template
Version      : 1.0.0
*/

(function($) {
    "use strict";
	
	
	/*PRELOADER JS*/
	setTimeout(function () {
		$('.atf-status').fadeOut();
	}, 3000);
	/*END PRELOADER JS*/

	/*--------------------------------------------------------------
      Sticky Header
    --------------------------------------------------------------*/
	
	$(window).on("scroll", function() {
		 var scroll = $(window).scrollTop();
		if (scroll >= 10) {
			$('.atf-sticky-header').addClass('atf-sticky-active');
		} else {
			$('.atf-sticky-header').removeClass('atf-sticky-active');
		}
	});
     
    /*--------------------------------------------------------------
       Mobile Menu
      --------------------------------------------------------------*/

	$('.atf-nav').append('<span class="atf-menu-toggle"><span></span></span>');
	$('.menu-item-has-children').append('<span class="atf-menu-dropdown-toggle"></span>');
	$('.atf-menu-toggle').on('click', function() {
		$(this).toggleClass("atf-toggle-active").siblings('.atf-nav-list').slideToggle();;
	});
	$('.atf-menu-dropdown-toggle').on('click', function() {
		$(this).toggleClass('active').siblings('ul').slideToggle();
	});
	
	// Auto close menu after clicking link (for one-page)
    $(".atf-onepage-nav > li > a").on("click", function () {
        if ($(window).width() <= 992) {
            $(".atf-nav-list").slideUp();
            $(".atf-menu-toggle").removeClass("atf-toggle-active");
        }
    });

    
    /*--------------------------------------------------------------
       One Page Navigation
      --------------------------------------------------------------*/
	// Click To Go Top
	$('.atf-smooth-move').on('click', function() {
		var thisAttr = $(this).attr('href');
		if ($(thisAttr).length) {
			var scrollPoint = $(thisAttr).offset().top - 50;
			$('body,html').animate({
				scrollTop: scrollPoint
			}, 800);
		}
		return false;
	});

	// One Page Active Class
	var topLimit = 300,
		ultimateOffset = 200;

	$('.atf-onepage-nav').each(function() {
		var $this = $(this),
			$parent = $this.parent(),
			current = null,
			$findLinks = $this.find("a");

		function getHeader(top) {
			var last = $findLinks.first();
			if (top < topLimit) {
				return last;
			}
			for (var i = 0; i < $findLinks.length; i++) {
				var $link = $findLinks.eq(i),
					href = $link.attr("href");

				if (href.charAt(0) === "#" && href.length > 1) {
					var $anchor = $(href).first();
					if ($anchor.length > 0) {
						var offset = $anchor.offset();
						if (top < offset.top - ultimateOffset) {
							return last;
						}
						last = $link;
					}
				}
			}
			return last;
		}

		$(window).on("scroll", function() {
			var top = window.scrollY,
				height = $this.outerHeight(),
				max_bottom = $parent.offset().top + $parent.outerHeight(),
				bottom = top + height + ultimateOffset;

			var $current = getHeader(top);

			if (current !== $current) {
				$this.find(".active").removeClass("active");
				$current.addClass("active");
				current = $current;
			}
		});
	});

	/*--------------------------------------------------------------
       Sticky Back To Top
    --------------------------------------------------------------*/
  
	$(window).on('scroll', function() {
		if ($(window).scrollTop() > 50) {
			$('.atf-sticky-header').addClass('atf-nav');
			$('.atf-back-to-top').addClass('open');
		} else {
			$('.atf-sticky-header').removeClass('atf-nav');
			$('.atf-back-to-top').removeClass('open');
		}
	});
	/*--------------------------------------------------------------
       START SCROLL UP
      --------------------------------------------------------------*/	  
	if ($('.atf-back-to-top').length) {
	  $(".atf-back-to-top").on('click', function () {
		var target = $(this).attr('data-targets');
		// animate
		$('html, body').animate({
		  scrollTop: $(target).offset().top
		}, 1000);

	  });
	}
	
	/*--------------------------------------------------------------
         END SCROLL UP
      --------------------------------------------------------------*/
	
	/*START PARTNER LOGO*/
	$('.atf-brand-active').owlCarousel({
		margin:25,
		autoplay:true,
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
		items: 4,
		loop:true,
		nav:false,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:2
			},
			1000:{
				items:4
			}
		}
	})
	/*END PARTNER LOGO*/

	/*START Testimonials */
	$("#testimonial-slider").owlCarousel({
		margin:20,
		nav: false,
		autoplay:true,
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
		loop:true,
		dots:true,
		responsive:{
			0:{
				items:1
			},
			768:{
				items:1
			},
			1000:{
				items:3
			}
		}
	});

	/*END Testimonials LOGO*/
	
	/*Start Screenshot Slider*/
	$('.screenshot-carousel').owlCarousel({
		margin:15,
		autoplay:true,
		nav: false,
		navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		items: 3,
		dots:true,
		loop:true,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:2
			},
			992:{
				items:3
			}
		}
	})
	
	// mailchamp
	$("#mc-form").ajaxChimp({
		url: "https://themesfamily.us22.list-manage.com/subscribe/post?u=e056d9c3aeb53b20aff997467&amp;id=e307d7e1b8&amp;f_id=0012cee1f0",
		/* Replace Your AjaxChimp Subscription Link */
	});	
	
	/* --------------------------------------------------------
		12.	WOW SCROLL
		--------------------------------------------------------- */
    var wow = new WOW({
        //disabled for mobile
        mobile: false,
    });

    wow.init();
	
	// Odometer JS
	$('.odometer').appear(function() {
		var odo = $(".odometer");
		odo.each(function() {
			var countNumber = $(this).attr("data-count");
			$(this).html(countNumber);
		});
	});
	
	/*--------------------------------------------------------------
		START TABS 
	--------------------------------------------------------------*/	  
	 // Tabs
	$('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
	$('.tab ul.tabs li a').on('click', function (g) {
		var tab = $(this).closest('.tab'), 
		index = $(this).closest('li').index();
		tab.find('ul.tabs > li').removeClass('current');
		$(this).closest('li').addClass('current');
		tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
		tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();
		g.preventDefault();
	});
	/*--------------------------------------------------------------
		END TABS 
	--------------------------------------------------------------*/	
	
    
})(jQuery);

