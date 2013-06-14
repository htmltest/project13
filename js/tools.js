var speedSlider     = 1000;
var periodSlider    = 10000;

var timerSlider = null;

(function($) {

    $(document).ready(function() {

        if ((navigator.platform.toLowerCase().indexOf('mac') != -1) || (navigator.userAgent.match(/iPad/i) != null) || (navigator.userAgent.toLowerCase().match(/android/i) != null)) {
            $('head').append('<link rel="stylesheet" href="css/style-fix.css">');
        }

        $('.logo a').click(function() {
            $.scrollTo(0, 500);
            return false;
        });

        $('header nav a, .link-inner').click(function() {
            $.scrollTo($('.' + $(this).attr('href').replace('#', '')), 500);
            return false;
        });

        $('.header-email').click(function() {
            windowOpen($('.contacts-window').html());
            return false;
        });

        $('.slider').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', true);
            if (curSlider.find('li').length > 1 && periodSlider > 0) {
                timerSlider = window.setTimeout(function() { $('.slider-next').trigger('click'); }, periodSlider);
            }
            $('.slider-info-text').html($('.slider ul li:first .slider-item-text').html());

            $('.slider').height($('.slider-place').height());
            $('.slider-place').remove();
        });

        $('.slider-next').click(function() {
            window.clearTimeout(timerSlider);
            timerSlider = null;

            var curSlider = $('.slider');
            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                var newIndex = curIndex + 1;
                if (newIndex == curSlider.find('ul li').length) {
                    newIndex = 0;
                }

                curSlider.data('curIndex', newIndex);
                curSlider.data('disableAnimation', false);
                curSlider.find('ul li').eq(curIndex).css({'z-index': 2});
                curSlider.find('ul li').eq(newIndex).css({'z-index': 1, 'display': 'block', 'left': 0, 'top': 0});
                $('.slider-info-text').html($('.slider ul li').eq(newIndex).find('.slider-item-text').html());
                $('.slider-info').attr('style', $('.slider ul li').eq(newIndex).find('.slider-item-text').attr('style'));
                curSlider.find('ul li').eq(curIndex).fadeOut(speedSlider, function() {
                    curSlider.find('ul li').eq(curIndex).css({'z-index': 1, 'display': 'block', 'left': -9999, 'top': -9999});
                    curSlider.data('disableAnimation', true);
                    if (periodSlider > 0) {
                        timerSlider = window.setTimeout(function() { $('.slider-next').trigger('click'); }, periodSlider);
                    }
                });
            }

            return false;
        });

        $('.slider-prev').click(function() {
            window.clearTimeout(timerSlider);
            timerSlider = null;

            var curSlider = $('.slider');
            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                var newIndex = curIndex - 1;
                if (newIndex == -1) {
                    newIndex = curSlider.find('ul li').length - 1;
                }

                curSlider.data('curIndex', newIndex);
                curSlider.data('disableAnimation', false);
                curSlider.find('ul li').eq(curIndex).css({'z-index': 2});
                curSlider.find('ul li').eq(newIndex).css({'z-index': 1, 'display': 'block', 'left': 0, 'top': 0});
                $('.slider-info-text').html($('.slider ul li').eq(newIndex).find('.slider-item-text').html());
                $('.slider-info').attr('style', $('.slider ul li').eq(newIndex).find('.slider-item-text').attr('style'));
                curSlider.find('ul li').eq(curIndex).fadeOut(speedSlider, function() {
                    curSlider.find('ul li').eq(curIndex).css({'z-index': 1, 'display': 'block', 'left': -9999, 'top': -9999});
                    curSlider.data('disableAnimation', true);
                    if (periodSlider > 0) {
                        timerSlider = window.setTimeout(function() { $('.slider-next').trigger('click'); }, periodSlider);
                    }
                });
            }

            return false;
        });

        $('.approach-photo').parallax('50%', -.2);
        $('.twitter').parallax('50%', -.5);
        $('.partners').parallax('50%', -.2);

        $('.portfolio-list a').hover(
            function() {
                $(this).find('.portfolio-item-photo sup').stop(true, true).css({'opacity': 0, 'margin-top': -34}).animate({'opacity': .75, 'margin-top': -17});
            },

            function() {
                $(this).find('.portfolio-item-photo sup').stop(true, true).css({'opacity': .75, 'margin-top': -17}).animate({'opacity': 0, 'margin-top': -34});
            }
        );

        var viewFilter = '';
        $('.portfolio-tabs li').each(function() {
            if (!$(this).find('a').hasClass('portfolio-group-all')) {
                viewFilter += '.' + $(this).find('a').attr('class') + ', ';
            }
        });
        viewFilter = viewFilter.substr(0, viewFilter.length - 2);

        $('.portfolio-list').isotope({
            itemSelector: '.portfolio-list-item',
            filter: viewFilter
        });

        $('.portfolio-tabs a').click(function() {
            var curLink = $(this);
            var curLi = curLink.parent();
            if (!curLi.hasClass('active')) {
                viewFilter = '';
                if (curLink.hasClass('portfolio-group-all')) {
                    $('.portfolio-tabs li').each(function() {
                        if (!$(this).find('a').hasClass('portfolio-group-all')) {
                            viewFilter += '.' + $(this).find('a').attr('class') + ', ';
                        }
                    });
                } else {
                    viewFilter += '.' + curLink.attr('class') + ', ';
                }
                viewFilter = viewFilter.substr(0, viewFilter.length - 2);
                $('.portfolio-tabs li.active').removeClass('active')
                curLi.addClass('active');
                $('.portfolio-list').isotope({filter:viewFilter});
            }
            return false;
        });

        $('.contacts-menu ul li a').hover(
            function() {
                if (!$(this).parent().hasClass('active')) {
                    $(this).stop(true, true).animate({'background-color': '#8fad25'});
                }
            },

            function() {
                if (!$(this).parent().hasClass('active')) {
                    $(this).stop(true, true).animate({'background-color': '#2d3037'});
                }
            }
        );

        $('.contacts-social ul li a').hover(
            function() {
                $(this).find('sub').stop(true, true).animate({'background-color': '#8fad25', 'opacity': .75});
            },

            function() {
                $(this).find('sub').stop(true, true).animate({'background-color': '#868991', 'opacity': .5});
            }
        );

        $('.contacts-menu a').click(function() {
            var curLi = $(this).parent();

            if (!(curLi.hasClass('active'))) {
                var curIndex = $('.contacts-menu li').index(curLi);
                $('.contacts-menu .active').removeClass('active');
                curLi.addClass('active');
                $('.contacts-menu a[class!="active"]').animate({'background-color': '#2d3037'});
                $('.contacts-content').hide();
                $('.contacts-content').eq(curIndex).fadeIn();
                initialize();
            }

            return false;
        });

        $('.contacts-input input, .contacts-input textarea').each(function() {
            if ($(this).val() == '') {
                $(this).parent().find('span').css({'display': 'block'});
            }
        });

        $('.contacts-input input, .contacts-input textarea').focus(function() {
            $(this).parent().find('span').css({'display': 'none'});
        });

        $('.contacts-input input, .contacts-input textarea').blur(function() {
            if ($(this).val() == '') {
                $(this).parent().find('span').css({'display': 'block'});
            }
        });

        $('.portfolio-list a').click(function() {
            $('.portfolio-window').load($(this).attr('href'), function() {
                windowOpen($('.portfolio-window').html());
                $('.portfolio-window').html('');
                $('.portfolio-zoom').fancybox();
                $('.portfolio-window-bigs').each(function() {
                    var curSlider = $(this);
                    curSlider.data('curIndex', 0);
                    curSlider.data('disableAnimate', false);
                    curSlider.find('ul').width(curSlider.find('li:first').width() * curSlider.find('li').length);
                });
                $('.portfolio-window-slider').each(function() {
                    var curSlider = $(this);
                    curSlider.data('disableAnimate', false);
                    curSlider.find('ul').width(curSlider.find('li:first').width() * curSlider.find('li').length);
                    var newHTML = '';
                    curSlider.find('li').each(function() {
                        newHTML += '<a href="#"></a>';
                    });
                    curSlider.find('.portfolio-window-slider-ctrl').html(newHTML);
                    curSlider.find('.portfolio-window-slider-ctrl a:first').addClass('active');
                });
            });
            return false;
        });

        $('.portfolio-zoom, .portfolio-window-bigs-prev, .portfolio-window-bigs-next').live('mouseover', function() {
            $(this).stop(true, true).animate({'opacity': 1});
        });

        $('.portfolio-zoom, .portfolio-window-bigs-prev, .portfolio-window-bigs-next').live('mouseout', function() {
            $(this).stop(true, true).animate({'opacity': .75});
        });

        $('.portfolio-window-bigs-next').live('click', function() {
            var curSlider = $(this).parents().filter('.portfolio-window-bigs');
            if (curSlider.find('li').length > 1) {
                if (!curSlider.data('disableAnimate')) {
                    curSlider.data('disableAnimate', true);

                    var curIndex = curSlider.data('curIndex');
                    curIndex++;
                    if (curIndex == curSlider.find('li').length) {
                        curIndex = 0;
                    }
                    curSlider.data('curIndex', curIndex);

                    curSlider.find('ul').animate({'left': -curIndex * curSlider.find('li:first').width()}, function() {
                        curSlider.data('disableAnimate', false);
                    });
                }
            }
            return false;
        });

        $('.portfolio-window-bigs-prev').live('click', function() {
            var curSlider = $(this).parents().filter('.portfolio-window-bigs');
            if (curSlider.find('li').length > 1) {
                if (!curSlider.data('disableAnimate')) {
                    curSlider.data('disableAnimate', true);

                    var curIndex = curSlider.data('curIndex');
                    curIndex--;
                    if (curIndex == -1) {
                        curIndex = curSlider.find('li').length - 1;
                    }
                    curSlider.data('curIndex', curIndex);

                    curSlider.find('ul').animate({'left': -curIndex * curSlider.find('li:first').width()}, function() {
                        curSlider.data('disableAnimate', false);
                    });
                }
            }
            return false;
        });

        $('.portfolio-window-bigs-prev').live('click', function() {
            var curSlider = $(this).parents().filter('.portfolio-window-bigs');
            if (curSlider.find('li').length > 1) {
                if (!curSlider.data('disableAnimate')) {
                    curSlider.data('disableAnimate', true);

                    var curIndex = curSlider.data('curIndex');
                    curIndex--;
                    if (curIndex == -1) {
                        curIndex = curSlider.find('li').length - 1;
                    }
                    curSlider.data('curIndex', curIndex);

                    curSlider.find('ul').animate({'left': -curIndex * curSlider.find('li:first').width()}, function() {
                        curSlider.data('disableAnimate', false);
                    });
                }
            }
            return false;
        });

        $('.portfolio-window-slider-ctrl a').live('click', function() {
            var curSlider = $(this).parents().filter('.portfolio-window-slider');
            if (curSlider.find('li').length > 1) {
                if (!curSlider.data('disableAnimate')) {
                    curSlider.data('disableAnimate', true);

                    var curIndex = curSlider.find('.portfolio-window-slider-ctrl a').index($(this));
                    curSlider.find('.portfolio-window-slider-ctrl a').removeClass('active');
                    $(this).addClass('active');

                    curSlider.find('ul').animate({'left': -curIndex * curSlider.find('li:first').width()}, function() {
                        curSlider.data('disableAnimate', false);
                    });
                }
            }
            return false;
        });

        $('.portfolio-window-slider-content a').live('click', function() {
            var curSlider = $(this).parents().filter('.portfolio-window-images').find('.portfolio-window-bigs');
            if (curSlider.find('li').length > 1) {
                if (!curSlider.data('disableAnimate')) {
                    curSlider.data('disableAnimate', true);

                    var curIndex = $(this).parents().filter('.portfolio-window-images').find('.portfolio-window-slider-content a').index($(this));
                    curSlider.data('curIndex', curIndex);

                    curSlider.find('ul').animate({'left': -curIndex * curSlider.find('li:first').width()}, function() {
                        curSlider.data('disableAnimate', false);
                    });
                }
            }
            return false;
        });

        $('.services-group a').hover(
            function() {
                $(this).find('.services-detail').stop(true, true).slideDown();
            },

            function() {
                $(this).find('.services-detail').stop(true, true).slideUp();
            }
        );

        $('.video-btn').live('click', function() {
            $(this).parent().find('.portfolio-window-video').html('<iframe width="600" height="400" src="' + $(this).attr('href') + '?wmode=transparent&autoplay=1" frameborder="0" allowfullscreen></iframe>');
            $(this).parent().find('.portfolio-window-video').show();
            $(this).hide();
            return false;
        });

    });

    $(window).bind('load resize', function() {
        var windowWidth  = $(window).width();
        var windowHeight = $(window).height();

        $('.slider, .slider ul, .slider ul li').height(windowHeight);
        $('.slider img').each(function() {
            var img = $(this);

            img.css({'width': 'auto', 'height': 'auto'});

            var imgWidth  = img.width();
            var imgHeight = img.height();

            var newWidth = windowWidth;
            var newHeight = newWidth / imgWidth * imgHeight;
            if (newHeight < windowHeight) {
                newHeight = windowHeight;
                newWidth = newHeight / imgHeight * imgWidth;
            }

            img.css({'width': newWidth, 'height': newHeight, 'left': '50%', 'top': '50%', 'margin': '-' + (newHeight / 2) + 'px 0 0 -' + (newWidth / 2) + 'px'});
        });
    });

    $(window).load(function() {
        $('.slider li').css({'left': -9999, 'top': -9999});
        $('.slider li:first').css({'left': 0, 'top': 0});
        $('.slider ul').css({'left': 0, 'top': 0});
    });

    function windowOpen(contentWindow) {
        var windowWidth  = $(window).width();
        var windowHeight = $(window).height();
        var curScrollTop = $(window).scrollTop();

        $('header').width($('header').width());
        $('body').css({'width': windowWidth, 'height': windowHeight, 'overflow': 'hidden'});
        $(window).scrollTop(0);
        $('.wrapper').css({'top': -curScrollTop});
        $('.wrapper').data('scrollTop', curScrollTop);

        $('body').append('<div class="window"><div class="window-overlay"></div><div class="window-container">' + contentWindow + '<a href="#" class="window-close"></a></div></div>')
        recalcWindow();

        $('.window-overlay').click(function() {
            windowClose();
        });

        $('.window-close').click(function() {
            windowClose();
            return false;
        });

        $('body').bind('keypress keydown', keyDownBody);
    }

    function recalcWindow() {
        var windowWidth  = $(window).width();
        var windowHeight = $(window).height();
        if ($('.window-container').width() < windowWidth) {
            $('.window-container').css({'margin-left': -$('.window-container').width() / 2});
        } else {
            $('.window-container').css({'left': 0});
        }
        if ($('.window-container').height() < windowHeight) {
            $('.window-container').css({'margin-top': -$('.window-container').height() / 2});
        } else {
            $('.window-container').css({'top': 66});
            $('.window-overlay').css({'min-height': $('.window-container').height() + 134});
        }
    }

    function keyDownBody(e) {
        if (e.keyCode == 27) {
            if (!$('body').hasClass('fancybox-lock')) {
                windowClose();
            }
        }
    }

    function windowClose() {
        $('body').unbind('keypress keydown', keyDownBody);
        $('.window').remove();
        $('.wrapper').css({'top': 'auto'});
        $('header').width('100%');
        $('body').css({'width': 'auto', 'height': '100%', 'overflow': 'auto'});
        var curScrollTop = $('.wrapper').data('scrollTop');
        $(window).scrollTop(curScrollTop);
    }

})(jQuery);