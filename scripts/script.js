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
    t.background = $('.navbar.navbar-default');
    t.cont = $('.container');
    t.fullPageContent = $('#fullpage');
    t.icon = $('.intro div ul li i');
    t.visualStudio = $('.devicons-visualstudio');
    t.msqlServer = $('.devicons-msql_server');
    t.toolTip = $('[data-toggle="tooltip"]');
};

Jmac.home.init_methods = function () {
    var t = this;

    t.toolTip.tooltip()

    t.visualStudio.on('mouseenter', function () {
        t.visualStudio.css('color','rgb(104,33,122)');
    });

    t.visualStudio.on('mouseleave', function () {
        t.visualStudio.css('color','rgb(255,255,255)');
    });

    t.msqlServer.on('mouseenter', function () {
        t.msqlServer.css('color', '#a51d29');
    });

    t.msqlServer.on('mouseleave', function () {
        t.msqlServer.css('color', 'rgb(255,255,255)');
    });

    t.icon.on('mouseenter', function () {
        $(this).addClass('colored');
    });

    t.icon.on('mouseleave', function () {
        $(this).removeClass('colored');
    });

    t.fullPageContent.fullpage({
        sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
        scrollingSpeed: 800
    });
};