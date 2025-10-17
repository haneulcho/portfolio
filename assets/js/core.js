"use strict";

var $body = $('body'),
    $html = $('html'),
    $pageLoader = $('#page-loader'),
    $ajaxContent, $ajaxScrollWrap;

var $header = $('#header'),
    scrolledBarrier = $(window).height()/2,
    scrolled = 0,
    appearFlag = false;

var setHeader = function() {
    scrolled = $(window).scrollTop();

    if(scrolled >= scrolledBarrier) {
        $header.addClass('scrolled');
    } else {
        $header.removeClass('scrolled');
    }
}

var Portfolio = {
  init: function() {
    if($('#ajax-content').length == 1) {
      $ajaxContent = $('#ajax-content');
      $ajaxScrollWrap = $('#ajax-project');
      this.backgrounds();
      this.animations();
      this.scroller();
      this.typing();
    }
  },
  backgrounds: function() {
      // Video
      if($('.pt-video').length > 0) {
        var $bgVideo = $('.pt-video');
        if(trueMobile) {
          $bgVideo.remove();
        }
        var $videoSrc = $bgVideo.data('video-src');
        $bgVideo.appear(function() {
            $bgVideo.vide({
              mp4: $videoSrc
            }, {
              volume: 0,
              muted: true,
              loop: true,
              autoplay: true,
              position: '0% 45%',
              posterType: 'none',
              resizing: true,
              bgColor: 'transparent'
            });
        })
      }
  },
  animations: function() {
    // Animation - appear
    $('.ani').appear(function() {
        $(this).each(function(){
          var $target =  $(this);
          var delay = $(this).data('animation-delay');
          setTimeout(function() {
              $target.addClass($target.data('animation')).addClass('visible');
          }, delay);
        });
    });
  },
  scroller: function() {
      $ajaxContent.on('click', '.more', function(e){
          e.preventDefault();
          var $href = $(this).attr('href');
          var $scrollTo = $($href).offset().top;
          $ajaxScrollWrap.animate({
              scrollTop: $scrollTo
          }, 700, 'easeInCubic');
      });
  },
  typing: function() {
      $ajaxContent.find('.typing2').each(function(){
          var $target =  $(this);
          var text = $target.data('text');
          var delay = $target.data('delay');
          $target.typed({
              strings: text,
              startDelay: delay,
              typeSpeed: 20,
              contentType: 'html'
          });
      });
  },
}

var Haneul = {
    init: function() {

        this.Basic.init();
        this.Component.init();

    },
    Basic: {
        init: function() {

            this.mobileDetector();
            this.backgrounds();
            this.masonry();
            this.scroller();
            this.filter();
            this.imagesList();

        },
        mobileDetector: function () {

            var isMobile = {
                Android: function() {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function() {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function() {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function() {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function() {
                    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
                }
            };

            window.trueMobile = isMobile.any();

        },
        backgrounds: function() {

            // Image
            $('.bg-image, .item-image').each(function(){
                var src = $(this).children('img').attr('src');
                $(this).css('background-image','url('+src+')').children('img').hide();
            });

            // Video
            var $bgVideo = $('.bg-video');
            if($bgVideo) {
              setTimeout(function() {
                $bgVideo.vide({
                  mp4: 'assets/video/lecture'
                }, {
                  volume: 0,
                  muted: true,
                  loop: true,
                  autoplay: true,
                  position: '0% 45%',
                  posterType: 'none',
                  resizing: true,
                  bgColor: 'transparent'
                });
              }, 3500);
                // $bgVideo.YTPlayer();
            }
            if(trueMobile && $bgVideo) {
                $bgVideo.prev('.bg-video-placeholder').show();
                $bgVideo.remove();
            }

        },
        imagesList: function() {
            $('.images-list .image-box').on('mouseover', function(){
                var $container = $(this).parents('.images-list'),
                    $hover = $container.next('.images-list-hover'),
                    $content = $hover.children('.content'),
                    $self = $(this),
                    x = $self.offset().left - $container.offset().left - 10,
                    y = $self.offset().top - $container.offset().top - 10,
                    width = $self.width() + 20,
                    height = $self.height() + 20;

                    $hover.css({
                        'left': x + 'px',
                        'top': y + 'px',
                        'width': width + 'px',
                        'height': height + 'px'
                    });

                    $content.html($(this).find('.hover').html());
            });
        },
        animations: function() {
            // Animation - appear
            $('.animated').appear(function() {
                $(this).each(function(){
                  var $target =  $(this);
                  var delay = $(this).data('animation-delay');
                  setTimeout(function() {
                      $target.addClass($target.data('animation')).addClass('visible');
                      if($target.hasClass('skills')) {
                          $('.progress-bar').appear(function() {
                              var $progressBar = $(this);
                              $progressBar.each(function() {
                                var value;
                                var $target = $(this);
                                value = $target.attr('aria-valuenow');
                                $target.html(value + '%').css('width', value + '%');
                              });
                          });
                      }
                  }, delay);
                });
            });
            $('.timeline').appear(function() {
              var $target = $(this);
              setTimeout(function() {
                $target.addClass('active');
              }, 500);
            });
            setTimeout(function() {
              $('#start').addClass('visible');
              setTimeout(function(){
                  Waypoint.refreshAll()
              },600);
            }, 1500);
        },
        masonry: function() {

            // var $grid = $('.masonry','#content');
            //
            // $grid.masonry({
            //     columnWidth: '.masonry-sizer',
            //     itemSelector: '.masonry-item',
            //     percentPosition: true
            // });
            //
            // $grid.imagesLoaded().progress(function() {
            //     $grid.masonry('layout');
            // });
            //
            // $grid.on('layoutComplete', Waypoint.refreshAll());

        },
        scroller: function() {

            var $header = $('#header');
            var headerHeight = $('#header').height();
            var $mobileNav = $('#mobile-nav');
            var $section = $('.section','#content');
            var $body = $('body');
            var scrollOffset = 0;

            // 스크롤 부드럽게 scrollSpeed 플러그인
            //$.scrollSpeed(100, 800, "easeOutQuint");

            var $scrollers = $('#gnb, [data-local-scroll]');
            $scrollers.find('a').on('click', function(e){
                $(this).blur();
                e.preventDefault();
            });

            // hash 따라 스크롤 부드럽게 접근
            $scrollers.localScroll({
                offset: scrollOffset,
                duration: 1300,
                easing: 'easeInCubic'
            });

            var $mainMenu = $('#gnb'),
                $menuItem = $('#gnb li > a'),
                mainMenuOffset = null,
                $selector = $mainMenu.children('.selector');

            window.setMenuSelector = function() {
                var $activeItem = $mainMenu.find('a.active');
                if($activeItem.length != 0) {
                  mainMenuOffset = $mainMenu.offset().top;
                  $selector.css({
                      'height': $activeItem.outerHeight(),
                      'top': $activeItem.offset().top - mainMenuOffset + 'px'
                  });
                }
            }

            $menuItem.on('click', function(){
                if($(this).attr('href').indexOf('.html') == -1) {
                    $body.removeClass('mobile-nav-open');
                    $('.nav-toggle').removeClass('active');
                    return false;
                }
            });

            var checkMenuItem = function(id) {
                $menuItem.each(function(){
                    var link = $(this).attr('href');
                    if(id==link) {
                        $(this).addClass('active');
                        setMenuSelector();
                    }
                    else $(this).removeClass('active');
                });
            }

            // Element Offset 가져와서 GNB Selector 움직임
            $section.waypoint({
                handler: function(direction) {
                    if(direction=='up') {
                        var id = '#'+this.element.id;
                        checkMenuItem(id);
                    }
                },
                offset: function() {
                    if ($header.hasClass('header-horizontal')) return -this.element.clientHeight+headerHeight;
                    else return -this.element.clientHeight+2;
                }
            });
            $section.waypoint({
                handler: function(direction) {
                    if(direction=='down') {
                        var id = '#'+this.element.id;
                        checkMenuItem(id);
                    }
                },
                offset: function() {
                    if ($header.hasClass('header-horizontal')) return headerHeight+1;
                    else return 1;
                }
            });
            $(window).resize(function(){
                setTimeout(function(){
                    Waypoint.refreshAll()
                },600);
            });

        },
        filter: function() {

            var $filter = $('.filter'),
                $list,
                filterValue;

            $filter.on('click', 'a', function(){

                $list = $($(this).parents('.filter').data('filter-list'));
                filterValue = $(this).attr('data-filter');

                $list.children().filter('.not-matched').removeClass('not-matched');
                if(filterValue!="*") $list.children().not(filterValue).addClass('not-matched');

                $(this).parents('ul').find('.active').removeClass('active');
                $(this).parent('li').addClass('active');

                return false;
            });

        }
    },
    Component: {
        init: function() {

            this.ajaxModal();
            this.carousel();
            this.forms();
            this.modal();
            this.tabs();

            $('*[data-toggle="mobile-nav"]').on('click', function(){
                $(this).toggleClass('active');
                $body.toggleClass('mobile-nav-open');
                return false;
            });

        },
        ajaxModal: function() {

            $body.append('<div id="ajax-tmp"></div>');

            var toLoad;
            var offsetTop;
            var $ajaxModal = $('#ajax-modal');
            var $ajaxTmp = $('#ajax-tmp');

            function loadContent() {　

               $ajaxTmp.load(toLoad + ' #ajax-project', function() {

                    $ajaxModal.show(0).addClass('loading-started');
                    $pageLoader.fadeIn(200).css('display','inline-block');

                    var $self = $(this);

                    $self.waitForImages({
                        finished: function() {
                            $ajaxModal.append($ajaxTmp.html());

                            setTimeout(function(){
                                $ajaxModal.addClass('loading-finished');
                                $body.addClass('ajax-modal-loaded');
                                $pageLoader.fadeOut(400);
                                $ajaxTmp.html('');

                                // Portfolio ajax-content 로드시 실행
                                Portfolio.init();
                            },1200);
                        },
                        waitForAll: true
                    });
               });

        　  }

            function closeDetails() {
                $body.removeClass('locked-scrolling');
                $body.css('top', '').scrollTop(offsetTop);
                $body.removeClass('ajax-modal-loaded');
                setTimeout(function() {
                  $ajaxModal.removeClass('loading-started loading-finished');
                }, 300);
                setTimeout(function() {
                  $('#ajax-project').remove();
                  $ajaxModal.hide();
                }, 1400);
            }

            $body.delegate('*[data-toggle="ajax-modal"]','click', function() {
                offsetTop = $body.scrollTop();
                $body.css('top', -offsetTop);
                $body.addClass('locked-scrolling');
                toLoad = $(this).attr('href');　
                loadContent();
                Haneul.Basic.animations();
                return false;
            });

            $body.delegate('*[data-dismiss="ajax-modal"]','click', function(){
                closeDetails();
                return false;
            });

        },
        carousel: function() {

            // Slideshow
            var $slider = $('.owl-carousel');
            $slider.owlCarousel({
              items:1,
              loop:true,
              margin:10,
              autoplay:true,
              autoplayTimeout:3000,
              autoplaySpeed:1500,
              autoplayHoverPause:true,
              dotsEach:true,
              dotsSpeed:800,
              dragEndSpeed:800,
              nav:true,
              navText:["<i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>", "<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>"],
              smartSpeed:800,
              navSpeed:800
            });
            $slider.on('mousewheel', '.owl-stage', function (e) {
              if (e.deltaY > 0) {
                $slider.trigger('prev.owl');
              } else {
                $slider.trigger('next.owl');
              }
              e.preventDefault();
            });
        },
        forms: function(){

            /* Validate Form */
            $('.validate-form').each(function(){
                $(this).validate({
                    validClass: 'valid',
                    errorClass: 'error',
                    onfocusout: function(element,event) {
                        $(element).valid();
                    },
                    errorPlacement: function(error,element) {
                        return true;
                    },
                    rules: {
                        email: {
                            required    : true,
                            email       : true
                        }
                    }
                });
            });


            // Contact Form
            var $contactForm  = $('#contact-form'),
                $contactPopup = $('#contact-popup'),
                offsetTop = 0,
                contactTimer = null;

            $('[data-toggle="contact-popup"]').on('click', function(e){
                if($body.hasClass('contact-popup-open')) {
                    clearTimeout(contactTimer);
                    $body.removeClass('locked-scrolling');
                    $body.css('top', '').scrollTop(offsetTop);
                    $body.toggleClass('contact-popup-open');
                    contactTimer = setTimeout(function(){
                        $contactPopup.hide();
                    },900);
                } else {
                    clearTimeout(contactTimer);
                    $contactPopup.show(function(){
                      $body.toggleClass('contact-popup-open');
                    });
                    offsetTop = $body.scrollTop();
                    $body.css('top', -offsetTop);
                    $body.addClass('locked-scrolling');
                }
                e.preventDefault();
            });

            if($contactForm.length>0) {

                var $contactFormActiveStep = $contactForm.find('.step.active'),
                    $contactFormPrevStep = null,
                    $contactFormSender = $contactForm.find('#sender');

                $contactFormActiveStep.show();

                $contactForm.submit(function() {
                    var $form = $(this);
                    var $title = $form.find('.head');
                    var $btn = $form.find('.btn-submit');
                    var $title_h3_txt = $title.find('h3').text();
                    var $title_p_txt = $title.find('p').html();
                    var response;
                    if ($form.valid()){
                        $btn.addClass('loading');
                        $.ajax({
                            type: 'POST',
                            url:  'assets/php/contact-form.php',
                            data: $form.serialize(),
                            error       : function(err) {
                                setTimeout(function(){
                                  $title.find('h3').text('ERROR!');
                                  $title.find('p').text('전송 중 에러가 발생했어요. 다시 시도해 보세요.');
                                  $title.addClass('error');
                                  $btn.addClass('error');
                                }, 1200); },
                            success     : function(data) {
                                if (data != "success") {
                                    response = 'error';
                                    $title.find('h3').text('ERROR!');
                                    $title.find('p').text('전송 중 에러가 발생했어요. 다시 시도해 보세요.');
                                } else {
                                    response = 'success';
                                    $title.find('h3').text('성공적으로 발송했어요!');
                                    $title.find('p').text('고마워요~ 읽은 후에 답장 드릴게요!');
                                }
                                setTimeout(function(){
                                    $title.addClass(response);
                                    $btn.addClass(response);
                                }, 400);
                            },
                            complete: function(data) {
                                setTimeout(function(){
                                    $title.removeClass('error success');
                                    $btn.removeClass('loading error success');
                                    $title.find('h3').text($title_h3_txt);
                                    $title.find('p').html($title_p_txt);
                                }, 6000);
                            }
                        });
                        return false;
                    }
                    return false;
                });

            }

        },
        modal: function() {

            $('[data-toggle="video-modal"]').on('click', function() {
                var modal = $(this).data('target'),
                    video = $(this).data('video')

                $(modal + ' iframe').attr('src', video + '?autoplay=1');
                $(modal).modal('show');

                $(modal).on('hidden.bs.modal', function () {
                    $(modal + ' iframe').removeAttr('src');
                })

                return false;
            });

        },
        tabs: function() {
            window.setTabs = function() {
                $('.tabs-wrapper').each(function(){

                    var $selector = $(this).children('.selector'),
                        $elActive = $(this).find('.active'),
                        navOffset = $(this).offset().left,
                        thisOffset = $elActive.offset().left,
                        offset = thisOffset - navOffset,
                        width = $elActive .outerWidth();

                    $selector.css({
                        'width': width+'px',
                        'left': offset+'px'
                    });
                });
            }

            $('.tabs-wrapper > .nav-tabs > li > a').on('click', function(){
                var $selector = $(this).parents('.tabs-wrapper').children('.selector'),
                    navOffset = $(this).parents('.tabs-wrapper').offset().left,
                    thisOffset = $(this).offset().left,
                    offset = thisOffset - navOffset,
                    width = $(this).outerWidth();

                    $selector.css({
                        'width': width+'px',
                        'left': offset+'px'
                    });
            });
        },
        typing: function() {
            $('.typing').appear(function(){
                $(this).each(function(){
                    var text = $(this).data('text');
                    var height = $(this).height();
                    $(this).html('').parent('.typing-wrapper').css('min-height',height+'px');
                    $(this).typed({
                        strings: text,
                        startDelay: 1000,
                        typeSpeed: 50,
                        backDelay: 1500,
                        contentType: 'html'
                    });
                });
            });
            $('.typing2').appear(function(){
                $(this).each(function(){
                    var text = $(this).data('text');
                    var delay = $(this).data('delay');
                    $(this).typed({
                        strings: text,
                        startDelay: delay,
                        typeSpeed: 10,
                        contentType: 'html'
                    });
                });
            });
        },
        tooltip: function() {
            $("[data-toggle='tooltip']").tooltip();
        }
    }
};

$(document).ready(function (){
    Haneul.init();
    setTimeout(function() {
      $('#header').addClass('loaded');
    }, 200);
});

$(window).scroll(function(){
    setHeader();
});

$(window).resize(function(){
    $header.removeClass('uncollapsed');
    $body.removeClass('mobile-nav-open');
    $('.nav-toggle').each(function(){
        $(this).removeClass('active');
    });
    setTabs();
    setMenuSelector();
});

$(window).load(function(){
    $body.addClass('loaded');
    Haneul.Component.typing();
    setTabs();
    setMenuSelector();
    if($pageLoader.length != 0) {
        $('#page-loader').fadeOut(600, function(){
            Haneul.Basic.animations();
        });
    } else {
        Haneul.Basic.animations();
    }
});
