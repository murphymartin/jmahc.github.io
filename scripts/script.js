var Jmac = {}; //SiteName can be an abbreviation (e.g. SN for SiteName)
Jmac.development = false;
Jmac.debug = false;

Jmac.getQueryParams = function () {
    var params = [];
    var query = window.location.search;
    query = query.slice(1, query.length);
    var nv = query.split('&');
    for (var i = 0; i < nv.length; i++) {
        var q = nv[i].split('=');
        params[q[0]] = q[1];
    }
    return params;
};

Jmac.home = {};

Jmac.home.init = function () {
    var t = this;

    t.init_variables();
    t.init_methods();
};

Jmac.home.init_variables = function () {
    var t = this;

    t.queryParams = Jmac.getQueryParams();
    t.$nav = $('nav');
    t.$arrow = $('.arrow.bounce');
    t.$page = $('body');
    t.$hero = $('.homepage-hero-module');
    t.$navBar = $('#navbar');
};

Jmac.home.init_methods = function () {
    var t = this;

    //enables navbar affix-top
    t.$nav.affix();

    //navbar affix closes arrow
    t.$nav.on('affixed.bs.affix', function(){
        t.$arrow.fadeOut(200);
    });
    t.$nav.on('affixed-top.bs.affix', function() {
        t.$arrow.fadeIn(200);
    });

    $(function() {
      //close navbar menu on click mobile
      $('.navbar-collapse ul li a:not(.dropdown-toggle)').bind('click touchstart', function () {
          $('.navbar-toggle:visible').click();
      });

      //Remove arrow bounce
      if (t.$nav.hasClass('affix'))
      {
          t.$arrow.fadeOut(200);
      }
      //enables scrollspy for navbar
      t.$page.scrollspy({ target: '#navbar' });

      //smooth scrolling
      $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });

      //video scaling
      scaleVideoContainer();
      initBannerVideoSize('.video-container .poster img');
      initBannerVideoSize('.video-container .filter');
      initBannerVideoSize('.video-container video');

      $(window).on('resize', function() {
          scaleVideoContainer();
          scaleBannerVideoSize('.video-container .poster img');
          scaleBannerVideoSize('.video-container .filter');
          scaleBannerVideoSize('.video-container video');
      });

        $('.hover').bind('touchstart touchend', function(e) {
            e.preventDefault();
            $(this).toggleClass('hover_effect');
        });
    });

    function scaleVideoContainer() {

        var height = $(window).height() + 5;
        var unitHeight = parseInt(height) + 'px';
        t.$hero.css('height',unitHeight);

    }

    function initBannerVideoSize(element){

        $(element).each(function(){
            $(this).data('height', $(this).height());
            $(this).data('width', $(this).width());
        });

        scaleBannerVideoSize(element);

    }

    function scaleBannerVideoSize(element){

        var windowWidth = $(window).width(),
        windowHeight = $(window).height() + 5,
        videoWidth,
        videoHeight;
        var windowRatio = windowHeight/windowWidth;
        console.log(windowHeight);

        $(element).each(function(){
            var videoAspectRatio = $(this).data('height')/$(this).data('width');

            $(this).width(windowWidth);

            if(windowWidth < 1000){
                videoHeight = windowHeight;
                videoWidth = videoHeight / videoAspectRatio;

                if($(this).hasClass('no_stretch')){
                  var increase = 300;
                  var newW = videoWidth + increase;
                  var newH = (newW * videoHeight)/videoWidth;
                  videoWidth = newW;
                  videoHeight = newH;

                    $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

                }
                $(this).width(videoWidth).height(videoHeight);
            } else if (windowWidth > 1000) {
                if (windowRatio < 0.7 && windowRatio > 0.58) {
                videoHeight = windowHeight;
                videoWidth = videoHeight / videoAspectRatio;
                videoWidth = (videoHeight / videoAspectRatio) + 200;

                $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});
                $(this).width(videoWidth).height(videoHeight);
              }
            }

            $('.homepage-hero-module .video-container video').addClass('fadeIn animated');
        });
    }
};


Jmac.header = {};

Jmac.header.init = function () {
    var t = this;

    t.init_variables();
    t.init_methods();
};

Jmac.header.init_variables = function () {
    var t = this;

    t.button = $('#navbar');
};

Jmac.header.init_methods = function () {
    var t = this;
};
