jQuery(document).ready(function() {

	//BEGIN: TOGGLE QUICKLINKS NAV
	var $menu = jQuery('.quicklinksMenu');
	jQuery(document).mouseup(function (e) {
	   if (!$menu.is(e.target) // if the target of the click isn't the container...
	   && $menu.has(e.target).length === 0) // ... nor a descendant of the container
	   {
		$menu.removeClass('open');
		if(jQuery(".quicklinksMenu").hasClass('open')) {
			jQuery("#toggleQuicklinks").attr('aria-expanded', true);
		} else {
			jQuery("#toggleQuicklinks").attr('aria-expanded', false);
		}
		jQuery("#quicklinkSubMenu").slideUp("slow");
	  }
	 });
	jQuery('#toggleQuicklinks').click(function () {
		$menu.toggleClass('open');
		if(jQuery(".quicklinksMenu").hasClass('open')) {
			jQuery("#toggleQuicklinks").attr('aria-expanded', true);
		} else {
			jQuery("#toggleQuicklinks").attr('aria-expanded', false);
		}
		jQuery("#quicklinkSubMenu").slideToggle("slow");
	});
	// ESC Mobile Menu
	$(document).keydown(function(e) {
		if (e.keyCode == 27) { // escape key maps to keycode '27'
			jQuery('.quicklinksMenu.open > #toggleQuicklinks').trigger('click');
		}
	});
	//END: TOGGLE QUICKLINKS NAV
	
	//BEGIN: TOGGLE QUICKLINKS MOBILE NAV
	var $menuMob = jQuery('.quicklinksMenu.mobile');
	jQuery(document).mouseup(function (e) {
	   if (!$menuMob.is(e.target) // if the target of the click isn't the container...
	   && $menuMob.has(e.target).length === 0) // ... nor a descendant of the container
	   {
		$menuMob.removeClass('open');
		if(jQuery(".quicklinksMenu.mobile").hasClass('open')) {
			jQuery("#toggleQuicklinksMobile").attr('aria-expanded', true);
		} else {
			jQuery("#toggleQuicklinksMobile").attr('aria-expanded', false);
		}
		jQuery("#quicklinkSubMenuMobile").slideUp("slow");
	  }
	 });
	jQuery('#toggleQuicklinksMobile').click(function () {
		$menuMob.toggleClass('open');
		if(jQuery(".quicklinksMenu.mobile").hasClass('open')) {
			jQuery("#toggleQuicklinksMobile").attr('aria-expanded', true);
		} else {
			jQuery("#toggleQuicklinksMobile").attr('aria-expanded', false);
		}
		jQuery("#quicklinkSubMenuMobile").slideToggle("slow");
	});
	// ESC Mobile Menu
	$(document).keydown(function(e) {
		if (e.keyCode == 27) { // escape key maps to keycode '27'
			jQuery('.quicklinksMenu.mobile.open > #toggleQuicklinksMobile').trigger('click');
		}
	});
	//END: TOGGLE QUICKLINKS MOBILE NAV

    // BEGIN: TOP NAV ACCESSIBLE MENU
	if (jQuery(".menuContainer").length != 0) {
		var menuItems = document.querySelectorAll('#menu li.navItem.sub');
		Array.prototype.forEach.call(menuItems, function(el, i){
			var activatingA = el.querySelector('a');
			var btn = '<button class="navSubButton" tab-index="-1" aria-haspopup="true"><span class="visuallyhidden">show submenu for ' + activatingA.text + '</span></button>';
			activatingA.insertAdjacentHTML('afterend', btn);
			el.querySelector('.navSubButton').addEventListener("click",  function(event){
				jQuery(this).next('.subMenu').slideToggle();
				if (this.parentNode.className == "navItem sub open") {
					this.parentNode.className = "navItem sub";
					this.parentNode.querySelector('a').setAttribute('aria-expanded', "false");
					this.parentNode.querySelector('button').setAttribute('aria-expanded', "false");
					this.parentNode.querySelector('.subMenu').setAttribute('aria-expanded', "false");
					this.parentNode.querySelector('.subMenu').setAttribute('aria-hidden', "true");
				} else {
					this.parentNode.className = "navItem sub open";
					this.parentNode.querySelector('a').setAttribute('aria-expanded', "true");
					this.parentNode.querySelector('button').setAttribute('aria-expanded', "true");
					this.parentNode.querySelector('.subMenu').setAttribute('aria-expanded', "true");
					this.parentNode.querySelector('.subMenu').setAttribute('aria-hidden', "false");
				}
				event.preventDefault();
			});
		});
		// ESC MOBILE MENU
		$(document).keydown(function(e) {
			if (e.keyCode == 27) {
				$('#toggleButton.open').trigger('click');
			}
		});
		$(document).keydown(function(e) {
			if (e.keyCode == 27) {
				$('#menu button[aria-expanded="true"]').trigger('click');
			}
		});
		// ACTIVATE KEYBOARD FOR TOP NAV
		jQuery(".topNav").accessibleMegaMenu();
		// TOGGLE MOBILE MENU BUTTON
		jQuery(".dim,#toggleButton").bind('click', function() {
			if (jQuery("#toggleButton").attr('aria-expanded') == "true") {
				jQuery("#toggleButton").attr('aria-expanded', false);
				jQuery("#toggleButton").removeClass('open');
				jQuery("body").css("overflow-y","auto");
				jQuery(".dim").removeClass('on');
			} else {
				jQuery("#toggleButton").attr('aria-expanded', true);
				jQuery("#toggleButton").addClass('open');
				jQuery(".dim").addClass('on');
				jQuery("body").css("overflow-y","hidden");
			}
			jQuery(".bar1").toggleClass("bar1Active");
			jQuery(".bar2").toggleClass("bar2Active");
			jQuery(".bar3").toggleClass("bar3Active");
		});
	}
	// END: TOP NAV ACCESSIBLE MENU
	
	//BEGIN: TOGGLE SEARCH NAV
	var $menuSearch = jQuery('.searchMenu');
	jQuery(document).mouseup(function (e) {
	   if (!$menuSearch.is(e.target) // if the target of the click isn't the container...
	   && $menuSearch.has(e.target).length === 0) // ... nor a descendant of the container
	   {
		$menuSearch.removeClass('open');
		if(jQuery(".searchMenu").hasClass('open')) {
			jQuery("#toggleSearch").attr('aria-expanded', true);
		} else {
			jQuery("#toggleSearch").attr('aria-expanded', false);
			jQuery(".topNav").removeClass("searchActive");
		}
	  }
	 });
	var $menuSearchClick = jQuery('.searchMenu');
	jQuery('#toggleSearch').click(function () {
		$menuSearchClick.toggleClass('open');
		if(jQuery(".searchMenu").hasClass('open')) {
			jQuery(".topNav").addClass("searchActive");
			jQuery("#toggleSearch").attr('aria-expanded', true);
			setTimeout(function () {
			jQuery("#searchBoxLabel").focus();
			}, 500);
		} else {
			jQuery(".topNav").removeClass("searchActive");
			jQuery("#toggleSearch").attr('aria-expanded', false);
		}
	});
	// ESC Mobile Menu
	$(document).keydown(function(e) {
		if(jQuery(".searchMenu").hasClass('open')) {
			if (e.keyCode == 27) { // escape key maps to keycode '27'
				jQuery('#toggleSearch').trigger('click');
				jQuery(".topNav").removeClass("searchActive");
			}
		}
	});
	//END: TOGGLE SEARCH NAV
	
	//BEGIN: MAIN SEARCH INPUT FOCUS KEYPRESS
	jQuery('#toggleSearch').keypress(function(){
		setTimeout(function () {
			jQuery("#searchBoxLabel").focus();
		}, 500);
	});
	//END: MAIN SEARCH INPUT FOCUS KEYPRESS
	
	// ACTIVATE KEYBOARD FOR SECTION NAV
	jQuery(".sectionNav").accessibleMegaMenu();
	
	//BEGIN: TOGGLE SECTION NAV
	var $sectionMenu = jQuery('.sectionNav');
	jQuery(document).mouseup(function (e) {
	   if (!$sectionMenu.is(e.target) // if the target of the click isn't the container...
	   && $sectionMenu.has(e.target).length === 0) // ... nor a descendant of the container
	   {
		$sectionMenu.removeClass('open');
		if ($(window).width() <= 1060 ) {
			if(jQuery(".sectionNav").hasClass('open')) {
				jQuery("#navSection").attr('aria-expanded', true);
				jQuery("#sectionNavMenu").attr('aria-expanded', true);
			} else {
				jQuery("#navSection").attr('aria-expanded', false);
				jQuery("#sectionNavMenu").attr('aria-expanded', false);
			}
			if (jQuery('#navSection').is(":visible")) {
				jQuery("#sectionNavMenu").slideUp("slow");
			}
		}
	  }
	 });
	jQuery('#navSection').click(function () {
		$sectionMenu.toggleClass('open');
		if(jQuery(".sectionNav").hasClass('open')) {
			jQuery("#navSection").attr('aria-expanded', true);
			jQuery("#sectionNavMenu").attr('aria-expanded', true);
		} else {
			jQuery("#navSection").attr('aria-expanded', false);
			jQuery("#sectionNavMenu").attr('aria-expanded', false);
		}
		if (jQuery('#navSection').is(":visible")) {
			jQuery("#sectionNavMenu").slideToggle("slow");
		}
	});
	// on mobile update section navigation ARIA roles
	$(window).on('resize', function(){
		if($(window).width()<= 1060) {
			jQuery("#sectionNavMenu, #navSection").attr('aria-expanded', false);
		}
	});
	// on desktop update section navigation ARIA roles
	if ($(window).width() >= 1060) {
		jQuery("#sectionNavMenu, #navSection").attr('aria-expanded', true);
	}
	$(window).on('resize', function(){
		if($(window).width()>= 1060) {
			jQuery("#sectionNavMenu, #navSection").attr('aria-expanded', true);
		}
	});
	// ESC Mobile Menu
	$(document).keydown(function(e) {
		if (e.keyCode == 27) { // escape key maps to keycode '27'
			jQuery('.sectionNav.open #navSection').trigger('click');
		}
	});
	//END: TOGGLE SECTION NAV
	
	//BEGIN: ANIMATE ACCORDIONS
	if (jQuery(".accordion").length != 0) {
		jQuery(".accordion > h2, .accordion > h3").click(function () {
			jQuery(this).next(".accordionPanel").slideToggle("slow");
		});
		var hashACC = window.location.hash;
			 if (hashACC) {
			   var element = $(hashACC);
			   if (element.length) {
			   element.trigger('click');
			 }
		}
	}
	//END: ANIMATE ACCORDIONS
	
	$("#quick-exit").on("click", function() {
	  window.open("http://weather.com", "_newtab");
	  window.location.replace('http://google.com');
	 });

	document.addEventListener('click', function(event) {
        if (event.target.matches('.vip-close-button')) {
            document.querySelector('.vip-popup-banner').style.display = 'none';
        }
    });




	// Use Enter Key for Inputs
	  jQuery('input:checkbox').keypress(function(e){
		if((e.keyCode ? e.keyCode : e.which) == 13){
		  $(this).trigger('click');
		}
	  });
	  // Aria Expanded
	  jQuery(".bottomLinks").bind('click', function() {
		if ($(this).attr('aria-expanded') == "true") {
		  $(this).attr('aria-expanded', false);
		} else {
		  $(this).attr('aria-expanded', true);
		}
	  });
	  
	// BEGIN: VIDEO PLAY OPTIONS - UPDATE IDs AND SPAN TEXT AS NEEDED
	if (jQuery("#theVideo1").length != 0) {
		var ppbutton = document.getElementById("playButton");
		ppbutton.addEventListener("click", playPause);
		mainVideo = document.getElementById("theVideo1");
		jQuery("#playButton").on('click', function(){
            $(this).addClass('initial');
        });
		function playPause() { 
			if (mainVideo.paused) {
				mainVideo.play();
				ppbutton.innerHTML = "<span>Pause Home Video</span>";
				jQuery("#playButton").addClass("on");
				jQuery("#playButton").removeClass("initial");
				}
			else  {
				mainVideo.pause(); 
				ppbutton.innerHTML = "<span>Play Home Video</span>";
				jQuery("#playButton").removeClass("on");
				jQuery("#playButton").removeClass("initial");
				}
		}
		var screenWidth = $(window).width();
		if (screenWidth < 768){
			$('#theVideo1').removeAttr('controls');
		} else {
		$('#theVideo1').attr('controls');
		}
	}
    // END: VIDEO PLAY OPTIONS - UPDATE IDs AND SPAN TEXT AS NEEDED

	//BEGIN: HOME IMPACT SLIDER WITH VIDEO AND IMAGE
	if (jQuery(".slider-main.video-image").length != 0) {
		jQuery('.slider-main.video-image').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  accessibility: false,
		  arrows: false,
		  dots: true,
		  fade: false,
		  autoplay: true,
		  speed: 300,
		  autoplaySpeed: 0,
		  pauseOnHover: false,
		  pauseOnFocus: false,
		  regionLabel: 'home impact carousel'
		});
		jQuery('.slider-main').on('afterChange', function(event, slick, currentSlide) {
		  var vid = $(slick.$slides[currentSlide]).find('video');
		  if (vid.length > 0) {
			jQuery('.slider-main').slick('slickPause');
			jQuery(vid).get(0).play();
		  }
		  else {
			if (currentSlide === 0) {
			  jQuery('.slider-main').slick("setOption", "autoplaySpeed", 0);
			  jQuery('.slider-main').slick("setOption", "speed", 0);
			}
			else {
			  jQuery('.slider-main').slick("setOption", "autoplaySpeed", 5000);
			  jQuery('.slider-main').slick("setOption", "speed", 300);
			}
		  }
		});
		jQuery('video').on('ended',function(){      
		  jQuery('.slider-main').slick('slickPlay');
		});
	}
	//END: HOME IMPACT SLIDER WITH VIDEO AND IMAGE

	//BEGIN: HOME IMPACT SLIDER WITH VIDEO
	if (jQuery(".slider-main.video-only").length != 0) {
	  jQuery('.slider-main.video-only').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		accessibility: false,
		arrows: true,
		useCSS: false,
		pauseOnFocus: false,
		pauseOnHover: false,
		fade: false,
		autoplay: true,
		autoplaySpeed: 1,
		regionLabel: 'home impact carousel'
	  });
	  jQuery('.slider-main.video-only').on('afterChange', function(event, slick, currentSlide) {
		var vid = $(slick.$slides[currentSlide]).find('video');
		if (vid.length > 0) {
				$('.slider-main').slick('slickPause');
		  $(vid).get(0).play();
		}
	  });
	  jQuery('video').on('ended',function(){      
		$('.slider-main.video-only').slick('slickPlay');
	  });
	}
	//END: HOME IMPACT SLIDER WITH VIDEO

	//BEGIN: HOME IMPACT SLIDER WITH IMAGE
	if (jQuery(".slider-main.image-only").length != 0) {
	  jQuery('.slider-main.image-only').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		accessibility: false,
		arrows: false,
		useCSS: false,
		pauseOnFocus: true,
		pauseOnHover: true,
		dots: true,
		fade: false,
		autoplay: false,
		autoplaySpeed: 7500,
		regionLabel: 'home impact carousel'
	  });
	  // PLAY AND PAUSE BUTTONS FOR IMAGES
	  jQuery('.playSlide').css('display', 'none');
	  jQuery('.pauseSlide').click(function() {
		jQuery('.slider-main').slick('slickPause');
		jQuery('.playSlide').css('display', 'block');
		jQuery('.pauseSlide').css('display', 'none');
	  });
	  
	  jQuery('.playSlide').click(function() {
		jQuery('.slider-main').slick('slickPlay');
		jQuery('.playSlide').css('display', 'none');
		jQuery('.pauseSlide').css('display', 'block');
	  });
	}
	//END: HOME IMPACT SLIDER WITH IMAGE

	if ($('.featured-slider').length > 0) {   
		  $('.slider').slick({
			//slide: '.slide',
			//centerMode: true,
			centerPadding: '2em',
			slidesToShow:2.5,
			infinite: false,
			prevArrow: '.previous.fa.fa-chevron-left',
			arrows: true,
			nextArrow: '.next.fa.fa-chevron-right',
			dots: true,
			appendDots: '.dots',
			regionLabel: 'featured slides carousel',
			responsive: [
			  {
				breakpoint: 720,
				 settings: {    
					slidesToShow: 1 
				 }
			   }
			]
		  });

		  $('.slide').each(function () {    
			  var $slide = $(this);        
			  if ($slide.attr('aria-describedby') != undefined) { 
				// ignore extra/cloned slides        
				$(this).attr('id', $slide.attr('aria-describedby'));    
			  }
		  });
	  }
	  
	  //BEGIN: GALLERY SLIDER SLIDES
	if (jQuery(".sliderGallery.four").length != 0) {
	  jQuery('.sliderGallery.four').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		accessibility: false,
		arrows: true,
		useCSS: true,
		pauseOnFocus: false,
		pauseOnHover: false,
		dots: false,
		fade: false,
		autoplay: false,
		regionLabel: 'content gallery carousel',
		responsive: [
		  {
			breakpoint: 1600,
			settings: {
			  slidesToShow: 2,
			  slidesToScroll: 1
			}
		  },
		  {
			breakpoint: 767,
			settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1
			}
		  }
		]
	  });
	}
	//END: GALLERY SLIDER SLIDES

	// YOUTUBE POPUP MAGNIFIC-POPUP
	if (jQuery('.popupYoutube').length > 0) {
	  jQuery('.popupYoutube').magnificPopup({
		  //disableOn: 700,
		  type: 'iframe',
		  mainClass: 'mfp-fade',
		  removalDelay: 160,
		  preloader: false,
		  fixedContentPos: false
	  });
	}

	// VERTICAL SCROLL ON HOMPAGE
	if ($('.vertScroll').length > 0) {  
		$window = $(window);
		const $slider = $(".vertScrollSlides");
		settings = ({
			slidesToShow: 1,
			infinite: false,
			vertical: true,
			verticalSwiping: true,
			arrows: false,
			dots: true,
			appendDots: '.dots',
			accessibility: true,
			regionLabel: 'colleges and schools carousel',
			responsive: [
			  {
				breakpoint: 1060,
				settings: "unslick",
			   }
			]  
		});
		$slider.slick(settings);
		$window.on('resize', function() {
			if ( ! $slider.hasClass('slick-initialized'))
			return $slider.slick(settings);
		});
		//$slider.on('wheel', (function(e) {
			//e.preventDefault();
			//if (e.originalEvent.deltaY < 0) {
			  //$(this).slick('slickPrev');
			//} else {
			  //$(this).slick('slickNext');
			//}
		//}));
		
		var maxHeight = -1;
		$('.vertScrollSlides .slide').each(function() {
		  if ($(this).height() > maxHeight) {
			maxHeight = $(this).height();
		  }
		});
		$('.vertScrollSlides .slide').each(function() {
		  if ($(this).height() < maxHeight) {
			$(this).css('margin-bottom', Math.ceil((maxHeight-$(this).height())/2) + 'px');
		  }
		});
		
	}

	// HOMEPAGE TESTIMONIALS
	if ($('.success .stories').length > 0) {   
		  $('.storiesSlides').slick({         
			slidesToShow:1,
			infinite: true,
			arrows: true,
			//prevArrow: ".prevArrow",
			//nextArrow: ".nextArrow",
			dots: false,
			regionLabel: 'stories and testimonials carousel'
		  });
	}

	  $('.nav-tabs li').click(function (event) {
		  $(this).siblings('.active').removeClass('active');
		  $(this).addClass('active');
		  event.preventDefault();
	  });


	  $(window).on('load', function() {
		  if ($('.juicer-feed h1').length > 0) {     
			  $('h1').remove('.referral');
		  }   
	  });
	  
	  
	  // POLICY PAGE MIXITUP
	if ($('.policyListing').length > 0) {
	  var container = document.querySelector('[data-ref="container"]');
	  var inputSearch = document.querySelector('[data-ref="input-search"]');
	  var keyupTimeout;
	  var targetSelector = '.mix';
		function getSelectorFromHash() {
			var hash = window.location.hash.replace(/^#/g, '');

			var selector = hash ? '.' + hash : targetSelector;

			return selector;
		}
		function setHash(state) {
			var selector = state.activeFilter.selector;
			var newHash = '#' + selector.replace(/^\./g, '');

			if (selector === targetSelector && window.location.hash) {
				history.pushState(null, document.title, window.location.pathname);
			} else if (newHash !== window.location.hash && selector !== targetSelector) {
				history.pushState(null, document.title, window.location.pathname + newHash);
			}
		}

	  var mixer = mixitup(container, {
		  selectors: {
				target: targetSelector
			},
			load: {
				filter: getSelectorFromHash()
			},
		  multifilter: {
			  enable: true
		  },
		  animation: {
			  duration: 350
		  },
		  callbacks: {
			  onMixClick: function() {
				  if (this.matches('[data-filter]')) {
					  inputSearch.value = '';
				  }
			  },
				onMixEnd: setHash
		  }
	  });
	  window.onhashchange = function() {
			var selector = getSelectorFromHash();
			if (selector === mixer.getState().activeFilter.selector) return;
			mixer.filter(selector);
		};

	  // Set up a handler to listen for "keyup" events from the search input

	  inputSearch.addEventListener('keyup', function() {
		  var searchValue;

		  if (inputSearch.value.length < 3) {
			  // If the input value is less than 3 characters, don't send

			  searchValue = '';
		  } else {
			  searchValue = inputSearch.value.toLowerCase().trim();
		  }

		  // Very basic throttling to prevent mixer thrashing. Only search
		  // once 350ms has passed since the last keyup event

		  clearTimeout(keyupTimeout);

		  keyupTimeout = setTimeout(function() {
			  filterByString(searchValue);
		  }, 350);
	  });

	  /**
	   * Filters the mixer using a provided search string, which is matched against
	   * the contents of each target's "class" attribute. Any custom data-attribute(s)
	   * could also be used.
	   *
	   * @param  {string} searchValue
	   * @return {void}
	   */

	  function filterByString(searchValue) {
		  if (searchValue) {
			  // Use an attribute wildcard selector to check for matches

			  mixer.filter('[data-search-terms*="' + searchValue + '"]');
		  } else {
			  // If no searchValue, treat as filter('all')

			  mixer.filter('all');
		  }
	  }
	}
});

// FOR PASSIVE EVENT LISTENERS
jQuery.event.special.touchstart = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
    }
};
jQuery.event.special.touchmove = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchmove", handle, { passive: !ns.includes("noPreventDefault") });
    }
};
jQuery.event.special.wheel = {
    setup: function( _, ns, handle ){
        this.addEventListener("wheel", handle, { passive: true });
    }
};
jQuery.event.special.mousewheel = {
    setup: function( _, ns, handle ){
        this.addEventListener("mousewheel", handle, { passive: true });
    }
};