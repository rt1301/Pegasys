window.onload = function()
{
var width = window.innerWidth;
var height = window.innerHeight;
var lastScroll =0;

function size()
{
    $("div.homef").css("width",width);
    $("div.homef").css("height",height);
    $("div.home1").css("width",width);
    $("div.home1").css("height",height);
}
$(document).scroll(function()
{
    var st = $(this).scrollTop();
    var nav = $("#mainNavbar");
    if(st > lastScroll)
    {
       nav.removeClass('scrolled');
       nav.fadeOut();
    }
    else
    {
        nav.fadeIn();
        nav.addClass("scrolled");
    }
    lastScroll = st;
    var prop = {
        "opacity" : "1",
        "transition": "opacity",
        "transition-duration":"0.7s",
        "transition-timing-function":"linear",
    };
});
}