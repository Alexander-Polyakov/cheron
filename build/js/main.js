$(document).ready(function() {
    var carouselGallery = $(".js-carousel-gallery");
    if ($(window).outerWidth() < 768) {
        carouselGallery.owlCarousel({
            dots: false,
            nav: false,
            margin: 15,
            responsive:{
                0:{
                    items: 1,
                    nav: true
                },
                500:{
                    items: 2,
                    nav: true
                }
            }
        });
    }

    var sync1 = $(".js-full-slider");
    var sync2 = $(".js-carousel");
    var slidesPerPage = 1;
    var syncedSecondary = true;

    sync1.owlCarousel({
        items : 1,
        slideSpeed : 2000,
        nav: true,
        dots: false,
        loop: true,
        responsiveRefreshRate : 200,
        responsive:{
            0:{
                nav: true
            },
            992:{
                nav: true
            }
        }
    }).on('changed.owl.carousel', syncPosition);

    sync2
        .on('initialized.owl.carousel', function () {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items : 5,
            dots: false,
            margin: 15,
            nav: false,
            smartSpeed: 200,
            slideSpeed : 500,
            mouseDrag: false,
            slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
            responsiveRefreshRate : 100
        }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        //if you set loop to false, you have to restore this next line
        //var current = el.item.index;

        //if you disable loop you have to comment this block
        var count = el.item.count-1;
        var current = Math.round(el.item.index - (el.item.count/2) - .5);

        if(current < 0) {
            current = count;
        }
        if(current > count) {
            current = 0;
        }

        //end block

        sync2
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();

        if (current > end) {
            sync2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            sync2.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if(syncedSecondary) {
            var number = el.item.index;
            sync1.data('owl.carousel').to(number, 100, true);
        }
    }

    sync2.on("click", ".owl-item", function(e){
        e.preventDefault();
        var number = $(this).index();
        sync1.data('owl.carousel').to(number, 300, true);
    });


    $(".js-collapse-button").click(function(){
       var _this = $(this).closest('.js-collapse-parent'),
           target = _this.find('.js-collapse-dropdown');


        target.slideToggle(400, function(){
            _this.toggleClass("opened");
        });



    });

    $('.js-objects-popup-toggle').click(function(){
        var thisBlock = $(this).closest('.objects'),
            ofl = $(this).offset().left;

        if ($(window).outerWidth() > 992) {
            thisBlock.find('.objects__popup').css('width', ofl + 270);
        } else {
            thisBlock.find('.objects__popup').stop().slideToggle(400);
        }

        thisBlock.toggleClass('popup-opened');
    });

    $('.js-page-menu-open').click(function () {
        $('.js-page-menu').addClass("opened");
    });


    $('.js-page-menu-close').click(function () {
        $('.js-page-menu').removeClass("opened");
    });

    $(".js-dropmenu-toggle").click(function (e) {
        e.preventDefault();
        $(this).closest(".js-dropmenu").toggleClass('opened');
        $(this).closest(".js-dropmenu").find(".main-nav-item__dropmenu").slideToggle('400');
    });


    $("[data-fancybox]").fancybox({
        thumbs : {
            autoStart : true
        }
    });


    $(".js-header-basket").hover(function(){
        $(this).addClass("opened");
    }, function(){
        $(this).removeClass("opened");
    });

    $(".js-header-basket .basket-box__close").click(function () {
       $(this).closest('.js-header-basket').removeClass("opened");
    });

    $(".js-slider-button").click(function () {
        var itemNumber = $(this).data('item'),
            textTitle = $(this).text();

        $('.js-slider-title').text(textTitle);
        $(".js-slider-button").removeClass('active');
        $('.js-slider-item').removeClass('active');
        $('.js-slider-item[data-item="' + itemNumber + '"]').addClass("active");
        $(this).addClass("active");
    });

    $('.js-nav-grid-toggle').click(function () {
       $(this).closest(".section-grid-nav").addClass('opened');
    });

    $('.js-nav-grid-close').click(function () {
        $(this).closest(".section-grid-nav").removeClass('opened');
    });

    $(".grid-nav-item__toggle").click(function(){
        $(this).closest(".grid-nav-item").find('.grid-nav-item__dropbox').slideToggle(400);
        $(this).toggleClass('active');
    });


    $('.js-open-popup').click(function (e) {
        e.preventDefault();
        $('body').addClass('ovh');

        var targetPopup = $(this).data('target-popup');

        if (targetPopup == 'video') {
            var videoSrc = $(this).data('video-src');
            $(".js-popup-video").attr('src', videoSrc);
        }

        $('.js-popups-overlay').fadeIn(400);
        $('.js-popups').fadeIn(400);

        $('[data-popup-name='+targetPopup+']').fadeIn(400);
    });

    $(".js-close-popups").click(function () {
        $('body').removeClass('ovh');

        $(".js-popup-video").attr('src', '');
        $('.js-popups-overlay').fadeOut(400);
        $('.js-popups').fadeOut(400);

        $('[data-popup-name]').fadeOut(400);
    });


    $(".js-toggle-content").on('click', '.toggle-content__button', function(){
        var thisBlock = $(this).closest('.js-toggle-content'),
            index = $(this).index();

        thisBlock.find('.toggle-content__button').removeClass("active");
        thisBlock.find('.toggle-content__content-item').removeClass('active');
        thisBlock.find('.toggle-content__content-item').eq(index).addClass("active");
        $(this).addClass("active");
    });


    $(".slider-carousel").owlCarousel({
        items: 4,
        slideSpeed: 2000,
        nav: true,
        dots: false,
        loop: true,
        margin: 30,
        responsiveRefreshRate: 200,
        responsive: {
            0: {
                nav: true
            },
            992: {
                nav: true
            }
        }
    })


    $(".js-promo-slider").owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: true,
        dots: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        loop: true,
        margin: 30,
        responsiveRefreshRate: 200,
        responsive: {
            0: {
                nav: true
            },
            992: {
                nav: true
            }
        }
    })


    var $grid = $('.masonry-grid').isotope({
        itemSelector: '.masonry-grid__item',
        layoutMode: 'masonry',
        filter: '.kitchen'
    });
    // filter functions
        var filterFns = {
            // show if number is greater than 50
            numberGreaterThan50: function() {
                var number = $(this).find('.number').text();
                return parseInt( number, 10 ) > 50;
            },
            // show if name ends with -ium
            ium: function() {
                var name = $(this).find('.name').text();
                return name.match( /ium$/ );
            }
        };

    // bind filter button click
        $('.filters-button-group').on( 'click', 'button', function() {
            var filterValue = $( this ).attr('data-filter');
            // use filterFn if matches value
            filterValue = filterFns[ filterValue ] || filterValue;
            $grid.isotope({ filter: filterValue });
        });

        // change is-checked class on buttons

        $('.button-group').each( function( i, buttonGroup ) {
            var $buttonGroup = $( buttonGroup );
            $buttonGroup.on( 'click', 'button', function() {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                $( this ).addClass('is-checked');
            });
        });


        $('.js-counter').each(function(){
            var _this = $(this),
                field = _this.find(".counter__field"),
                value,
                minus = _this.find(".counter__button_minus"),
                plus = _this.find(".counter__button_plus");

            minus.click(function () {
                value = +field.val();
                if (value > 1) {
                    field.val(value-1);
                }
            });

            plus.click(function () {
                value = +field.val();
                field.val(value+1);

            });
        });



        $(".js-checkbox-toggle").change(function(){
            var _id = $(this).attr('id'),
                _target = $('[data-checkbox-toggle-target='+_id+']');

            if ($(this).is(':checked')) {
                _target.stop().slideDown(300);
            } else {
                _target.stop().slideUp(300);
            }
        });


        $(".js-video-dummy").click(function (event) {
            var video = $(this).find('.video-box__video'),
                oldSrc = video.attr('src');

            video.show();
            video.attr('src', oldSrc+'&autoplay=1');
            event.preventDefault();



        });
});