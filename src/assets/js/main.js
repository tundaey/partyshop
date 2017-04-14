(function($) {
  'use strict';
  $(document).ready(function() {

    /* Microsoft Smooth Scroll Disabler */
    var form_validate, menu_mobile, sidebar, sidebar_toggle, url;
    if ($.browser.msie) {
      $('#ct-js-wrapper').on('mousewheel', function() {
        event.preventDefault();
        window.scrollTo(0, window.pageYOffset - event.wheelDelta / 2);
      });
    }

    /* Browsers */
    if ($.browser.mozilla) {
      el_html.addClass('browser-mozilla');
    }
    if ($.browser.msie) {
      el_html.addClass('browser-msie');
    }
    if ($.browser.webkit) {
      el_html.addClass('browser-webkit');
    }
    if ($.browser.safari) {
      el_html.addClass('browser-safari');
    }

    /* Text Color */
    set_text_color();

    /* Font Size */
    set_font_size();

    /* Background Color */
    set_background();

    /* Height */
    set_height();

    /* Show */
    data_show();

    /* Page Scroll */
    $('[data-scroll]').on('click', function(e) {
      var scroll;
      e.preventDefault();
      scroll = $(this).attr('data-scroll');
      if (scroll === 'up') {
        $('html, body').animate({
          scrollTop: 0
        }, 900, 'swing');
      } else if (scroll.charAt(0) === '#') {
        if (device.mobile()) {
          $('html, body').animate({
            scrollTop: $(scroll).offset().top - 55
          }, 900, 'swing');
        } else {
          $('html, body').animate({
            scrollTop: $(scroll).offset().top - 0
          }, 900, 'swing');
        }
      }
      return false;
    });

    /* Skrollr Parallax */
    if (!device.mobile() && !device.tablet()) {
      $('[data-parallax]').each(function() {
        var attr, that;
        that = $(this);
        attr = that.attr('data-parallax');
        that.attr('data-top-bottom', 'background-position: 50% -' + attr + 'px');
        that.attr('data-bottom-top', 'background-position: 50% ' + attr + 'px');
        that.attr('data-center', 'background-position: 50% 0px');
      });
    }

    /* Selectize */
    if ($().selectize) {
      $('.ct-select').each(function() {
        $(this).selectize({
          create: true
        });
      });
    }

    /* Navbar Active Class */
    url = window.location;
    $('.ct-menu .nav-item').find('a').filter(function() {
      return this.href === location.href.replace(/#.*/, "");
    }).closest('.nav-item').addClass('active');
    $('.ct-menu .dropdown-menu').find('a').filter(function() {
      return this.href === location.href.replace(/#.*/, "");
    }).addClass('active');

    /* Mobile Menu */
    (menu_mobile = function() {
      menu_mobile = $('.ct-mobile-menu');
      if (menu_mobile.length) {

        /* Mobile Menu Toggle */
        $('.ct-mobile-navbar__toggle').on('click', function(e) {
          e.preventDefault();
          el_html.addClass('mobile-open');
          return false;
        });

        /* Menu Mobile */
        menu_mobile.hammer().bind('swiperight', function() {
          return el_html.addClass('mobile-open');
        });
        el_body.hammer().bind('swipeleft', function() {
          return el_html.removeClass('mobile-open');
        });

        /* Mobile Dropdown */
        return menu_mobile.find('.dropdown > a, .submenu > a').each(function() {
          var parent, that;
          that = $(this);
          parent = that.parent();
          return that.on('click', function(e) {
            if (!parent.hasClass('active')) {
              e.preventDefault();
              parent.addClass('active');
              return false;
            } else {
              return window.open(this.href, '_self');
            }
          });
        });
      }
    })();

    /* Form Validate */
    (form_validate = function() {
      return $('.ct-js-validate').each(function() {
        var button, input, message, that;
        that = $(this);
        button = that.find('button[type="submit"]');
        input = that.find('input[required]');
        message = that.find('.fill-message');
        return button.on('click', function() {
          return input.each(function() {
            var thiz;
            thiz = $(this);
            if (thiz.val() === '') {
              $('html, body').animate({
                scrollTop: thiz.offset().top - 80
              }, 600, 'swing', thiz.trigger('focus'));
              return false;
            }
          });
        });
      });
    })();

    /* Sidebar */
    if (el_body.hasClass('is-sidebar') && device_width < 992 && (device.mobile() || device.tablet())) {

      /* Sidebar Toggle */
      sidebar_toggle = $('.ct-sidebar__mobile-toggle');
      sidebar_toggle.on('click', function(e) {
        e.preventDefault();
        if (el_html.hasClass('sidebar-open')) {
          el_html.removeClass('sidebar-open');
        } else {
          el_html.addClass('sidebar-open');
        }
        return false;
      });

      /* Sidebar */
      sidebar = $('.ct-sidebar');
      sidebar.hammer().bind('swipeleft', function() {
        return el_html.addClass('sidebar-open');
      });
      el_body.hammer().bind('swiperight', function() {
        return el_html.removeClass('sidebar-open');
      });
    }

    /* Midbar Search */
    $('.midbar__search-toggle').on('click', function(e) {
      var input, midbar;
      e.preventDefault();
      midbar = $('.midbar');
      input = $('.midbar__search input');
      if (midbar.hasClass('search-open')) {
        midbar.removeClass('search-open');
      } else {
        midbar.addClass('search-open');
      }
      input.focus();
      return false;
    });

    /* Close Stuff on click */
    $(document).on('click touchend', function(event) {

      /* Close Mobile Menu */
      if (!$(event.target).closest('.ct-mobile-menu').length && el_html.hasClass('mobile-open')) {
        el_html.removeClass('mobile-open');
      }

      /* Close Search Form */
      if (!$(event.target).closest('#midbar-search').length) {
        $('.midbar').removeClass('search-open');
      }

      /* Close Sidebar */
      if (!$(event.target).closest('.ct-sidebar').length) {
        el_html.removeClass('sidebar-open');
      }
    });

    /* Newsletter Form */
    $('.ct-newsletter__form').on('submit', function(e) {
      var that;
      that = $(this);
      that.addClass('newsletter-subscribed');
      return false;
    });

    /* nst Slider */
    nst_slider();
  });
  $(window).on('scroll', function() {
    var button_up, scroll;
    scroll = $(window).scrollTop();

    /* Navbar Class */
    if (device.mobile() && scroll > 75) {
      el_body.addClass('page-scrolled');
    } else if (!device.mobile() && scroll > nav_offset) {
      el_body.addClass('page-scrolled');
    } else {
      el_body.removeClass('page-scrolled');
    }
    if ($('.ct-js-infinite').length) {
      $('.ct-js-infinite').each(function() {
        var offset, that;
        that = $(this);
        offset = parseInt(that.offset().top);
        if (that.visible()) {
          return that.trigger('click');
        }
      });
    }

    /* Button Scroll Up */
    (button_up = function() {
      var button;
      button = $('.ct-btn--scroll-up');
      if (scroll > $(window).height() * 1.5) {
        return button.addClass('visible');
      } else {
        return button.removeClass('visible');
      }
    })();
  });
  $(window).on('load', function() {

    /* Magnific Popup Init */
    var isotope_gallery, magnific_popup, preloader, read_more_wrapper, skroll;
    (magnific_popup = function() {
      var mfp_ajax, mfp_image, mfp_video;
      if ($().magnificPopup) {
        mfp_ajax = $('.mfp-ajax');
        mfp_image = $('.mfp-image');
        mfp_video = $('.mfp-video');
        mfp_ajax.magnificPopup({
          type: 'ajax'
        });
        mfp_image.magnificPopup({
          type: 'image',
          gallery: {
            enabled: true
          }
        });
        return mfp_video.magnificPopup({
          type: 'iframe'
        });
      }
    })();

    /* Party Read More */
    (read_more_wrapper = function() {
      var box;
      box = $('.ct-party-box--simple, .ct-feature-box');
      if (box.length) {
        return box.each(function() {
          return show_more($(this));
        });
      }
    })();

    /* Preloader */
    (preloader = function() {
      var spinner;
      preloader = $('.ct-preloader');
      spinner = preloader.find('.ct-preloader__spinner');
      if (preloader.length) {
        spinner.animate({
          opacity: 0
        }, 200, 'swing');
        return preloader.animate({
          opacity: 0
        }, 400, 'swing', function() {
          return preloader.remove();
        });
      }
    })();

    /* Isotope */
    (isotope_gallery = function() {
      var isotope_filter, isotope_load;
      if ($().isotope) {
        isotope_gallery = $('.ct-isotope-gallery');
        isotope_filter = $('.ct-isotope-filtering button');
        isotope_load = $('#load-more');
        isotope_gallery.isotope({
          itemSelector: '.ct-isotope-item',
          percentPosition: true,
          masonry: {
            columnWidth: '.isotope-grid-sizer'
          }
        });
        isotope_filter.on('click', function() {
          var filter_value, that;
          that = $(this);
          isotope_filter.removeClass('is-active');
          that.addClass('is-active');
          filter_value = that.attr('data-filter');
          return isotope_gallery.isotope({
            filter: filter_value
          });
        });
        return isotope_load.on('click', function() {
          var load_name, load_page, response, that;
          that = $(this);
          load_name = that.attr('data-load-name');
          load_page = parseInt(that.attr('data-load-page'));
          response = '';
          $.ajax({
            type: 'GET',
            url: load_name + load_page + '.html',
            async: false,
            success: function(value) {
              response = value;
              return isotope_gallery.isotope('insert', $(response));
            },
            complete: function() {
              magnific_popup();
              return $.ajax({
                type: 'GET',
                url: load_name + (load_page + 1) + '.html',
                async: false,
                error: function() {
                  return that.remove();
                }
              });
            }
          });
          return that.attr('data-load-page', load_page + 1);
        });
      }
    })();

    /* Prevent "#" Clicks */
    $('[href="#"]').on('click', function(e) {
      e.preventDefault();
      return false;
    });

    /* Skrollr */
    if (!device.mobile() && !device.tablet() && !el_html.hasClass('ie8')) {
      skroll = skrollr.init({
        forceHeight: false,
        smoothScrolling: false
      });
    }
  });
})(jQuery);
