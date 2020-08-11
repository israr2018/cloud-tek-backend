//----------------------------------
//   Copyright (C) Leaf Admin 2018
//   Author          : Aditya Singhal
//   URL             : https://templateclub.co.in/
//   Version         : 1.0.0
//----------------------------------

//----------------------------------
// Main JS File
//----------------------------------
"use strict";

//----------------------------------
// Sidebar Menu
//----------------------------------
var treeviewMenu = $('.sidebar-menu');

$('[data-toggle="sidebar"]').click(function(event) {
	event.preventDefault();
	$('.app').toggleClass('sidenav-toggled');
});

$("[data-toggle='treeview']").click(function(event) {
	event.preventDefault();
	if(!$(this).parent().hasClass('is-expanded')) {
		treeviewMenu.find("[data-toggle='treeview']").parent().removeClass('is-expanded');
	}
	$(this).parent().toggleClass('is-expanded');
});

$("[data-toggle='treeview.'].is-expanded").parent().toggleClass('is-expanded');

$(".sidebar").css("height",$(document).height() + 80);
$(".sidebar-fixed").css("padding-top","80px");

if($(window).width() < 330) {
	var scrollwidth = "230px";
	var scrollheight = $(window).outerHeight() - 0;
	var wheelStep = 20;
}
else if($(window).width() < 500) {
	var scrollwidth = "300px";
	var scrollheight = $(window).outerHeight() - 40;
	var wheelStep = 20;
}
else{
	var scrollwidth = "230px";
	var scrollheight = $(window).outerHeight() - 70;
	var wheelStep = 5;
}

$('.sidebar-fixed .scrollbar').slimscroll({
	height: scrollheight,
	width: scrollwidth,
	size: '5px',
	position: 'left',
	color: '#343D49',
	alwaysVisible: false,
	distance: '0px',
	railVisible: true,
	railColor: 'rgba(255,255,255,0)',
	railOpacity: 0.3,
	allowPageScroll: false,
	disableFadeOut: false,
	wheelStep: wheelStep,
	opacity: 0
}).mouseover(function() {
	$(this).next('.slimScrollBar').css('opacity', 0.4);
});


//----------------------------------
// Add active class
//----------------------------------
var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
$(".sidebar ul.sidebar-menu li.treeview a").each(function(){
    if($(this).attr("href") == pgurl || $(this).attr("href") == '' )
    {
        $(this).addClass(" active");
		$(this).parent().parent().parent().addClass(" active");
        $(this).parent().parent().parent().addClass(" is-expanded");
    }
})

$(".sidebar ul.sidebar-menu li a").each(function(){
    if($(this).attr("href") == pgurl || $(this).attr("href") == '' )
    {
        $(this).addClass(" active");
    }
})

var title = "";
//var title = $("pre").children("code").attr('class');
title = $("pre").children("code").attr('class');
title = title.replace("language-", "");
title = title.toLowerCase();
if (title == "markup") {
	title = "html";
}

var span = '<span class="language-name">' + title + '</span>';
$("pre").prepend(span);
