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
    t.config1 = {
        "id": '150323168',
        "domId": 'example1',
        "maxTweets": 1,
        "enableLinks": true
    };

    //FullPageJS
    t.$fullPageContent = $('#fullpage');

    //Navbar items
    t.$background = $('.navbar.navbar-default');
    t.$btn = $('#hamburger');
    t.$navbarContent = $('#navbar');
    t.$navbarCollapse = $(".navbar-collapse");
    t.$navbarLink = $(".navbar-nav li a");
    t.$profile = $('.profile');
    t.$contact = $('.profile-contact');
    t.$pic = $('.profile-pic');

    //Slide #3
    t.$icon = $('.intro div ul li i');
    t.$toolTip = $('[data-toggle="tooltip"]');
    t.$visualStudio = $('.devicons-visualstudio');
    t.$msqlServer = $('.devicons-msql_server');

    //Slide #4
    t.email = "jordanmcardle@gmail.com";
    t.$emailMe = $('#form-submit');
    t.$emailName = $('#form-name');
    t.$emailComments = $('#form-comments');


};

Jmac.home.init_methods = function () {
    var t = this;

    //initiates Bootstrap Tooltips
    t.$toolTip.tooltip()

    // //initiates FullPageJS for slides
    // t.$fullPageContent.fullpage({
    //     sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
    //     anchors: ['intro', 'tech', 'about', 'contact'],
    //     scrollingSpeed: 800
    // });

    //Initiates Scrolly

    //Profile name click
    t.$profile.on('click', function () {
        if (t.$contact.css('position') == 'absolute') {
            t.$profile.animate({
                left: '-1000%',
            }, 500);
            t.$contact.fadeIn('slow');
        }
    });
    t.$contact.on('click', function () {
        t.$contact.fadeOut('fast');
        t.$profile.animate({
            left: '95px',
        }, 500);
    });

    //highlights m$-vs & m$-sql icons
    t.$visualStudio.on('mouseenter', function () {
        t.visualStudio.css('color', 'rgb(104,33,122)');
    });

    t.$visualStudio.on('mouseleave', function () {
        t.visualStudio.css('color', 'rgb(255,255,255)');
    });

    t.$msqlServer.on('mouseenter', function () {
        t.$msqlServer.css('color', '#a51d29');
    });

    t.$msqlServer.on('mouseleave', function () {
        t.$msqlServer.css('color', 'rgb(255,255,255)');
    });

    //highlights dev-icons
    t.$icon.on('mouseenter', function () {
        $(this).addClass('colored');
    });

    t.$icon.on('mouseleave', function () {
        $(this).removeClass('colored');
    });

    t.$emailMe.on('click', function (e) {
        e.preventDefault();
        var name = t.$emailName.val();
        var com = t.$emailComments.val();
        var subject = "Contact Form from " + name +" via jordanmcardle.me";
        window.location = 'mailto:' + t.email + '?subject=' + subject + '&body=' + com;
    });
};


Jmac.game = {};

Jmac.game.init = function () {
    var t = this;

    t.init_variables();
    t.init_methods();
};


Jmac.game.init_variables = function () {
    var t = this;

    t.$pic = $('.profile-pic');
};

Jmac.game.init_methods = function () {
    var t = this;

    var $d = t.$pic;

    var x1, x2, y1, y2, t1, t2, // Posititons/Time
    minDistance = 100,       // Minimum px distance object must be dragged to enable momentum.
    friction = 10;           // Set friction higher to make tossing harder

    var onMouseMove = function(e) {
        var mouseEvents = $d.data("mouseEvents");
        if (e.timeStamp - mouseEvents[mouseEvents.length - 1].timeStamp > 40) {
            mouseEvents.push(e);
            if (mouseEvents.length > 2) {
                mouseEvents.shift();
            }
        }
    };

    var onMouseUp = function() {
        $(document).unbind("mousemove mouseup");
    };

    $d.draggable({
        containment: 'window',
        start: function(e, ui) {
            $d.data("mouseEvents", [e]);
            $(document).mousemove(onMouseMove).mouseup(onMouseUp);
        },
        stop: function(e, ui) {
            $d.stop();
            $d.css("text-indent", 100);

            var lastE = $d.data("mouseEvents").shift();

            x1 = lastE.pageX;
            y1 = lastE.pageY;
            t1 = lastE.timeStamp;
            x2 = e.pageX;
            y2 = e.pageY;
            t2 = e.timeStamp;

            // Deltas
            var dX = x2 - x1,
                dY = y2 - y1,
                dMs = Math.max(t2 - t1, 1);

            // Speeds
            var speedX = Math.max(Math.min(dX / dMs, 1), -1),
                speedY = Math.max(Math.min(dY / dMs, 1), -1);

            // Distance moved (Euclidean distance)
            var distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

            if (distance > minDistance) {
                // Momentum
                var lastStepTime = new Date();

                var maxLeft = $(window).width() - ($d.width() + 15),
                    maxTop = $(window).height() - ($d.height() + 15);

                $d.animate({
                    textIndent: 0
                }, {
                    duration: Math.max(Math.abs(speedX), Math.abs(speedY)) * 2000,
                    step: function(currentStep) {
                        speedX *= (currentStep / 100);
                        speedY *= (currentStep / 100);

                        var now = new Date();
                        var stepDuration = now.getTime() - lastStepTime.getTime();

                        lastStepTime = now;

                        var position = $d.position();

                        var newLeft = (position.left + (speedX * stepDuration / friction)),
                            newTop = (position.top + (speedY * stepDuration / friction));
                        newLeft = newLeft > maxLeft ? maxLeft : newLeft < 10 ? 10 : newLeft;
                        newTop  = newTop  > maxTop  ? maxTop  : newTop  < 10 ? 10 : newTop;
                        $d.css({
                            left: newLeft + "px",
                            top: newTop + "px"
                        });
                    }
                });
            }
        }
    });
};


//jQuery is required to run this code
$( document ).ready(function() {

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

});

function scaleVideoContainer() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

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

    console.log(windowHeight);

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}
