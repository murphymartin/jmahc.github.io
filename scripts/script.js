(function ($) {
    // Init Skrollr
    var s = skrollr.init({
        render: function (data) {
            //Debugging - Log the current scroll position.
            //console.log(data.curTop);
        }
    });
})(jQuery);

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
    t.btn = $('#returnToMe');
};

Jmac.home.init_methods = function () {
    var t = this;

    t.btn.on('click', function () {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if (t.btn.hasClass('collapsed')) {
            t.btn.removeClass('collapsed');
        }
        else {
            t.btn.addClass('collapsed');
        }
    });
    //$(window).on('scroll', function () {
    //    var x = t.background.scrollTop();
    //    t.background.css('background-position', '100% ' + parseInt(-(x + 20)) + 'px');
    //});
};