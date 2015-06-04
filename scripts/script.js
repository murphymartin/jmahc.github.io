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

    //initiates FullPageJS for slides
    t.$fullPageContent.fullpage({
        sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
        anchors: ['intro', 'tech', 'about', 'contact'],
        scrollingSpeed: 800
    });

    t.$pic.draggable().resizable();

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