$(document).ready(function() {
    AOS.init();
});

/* When user clicks the Icon */
$(".nav-toggle").click(function() {
    $(this).toggleClass("active");
    if ($(".overlay-boxify").hasClass('open')) {
      $(".overlay-boxify").removeClass("open");
    } else {
      $(".overlay-boxify").addClass("open");
    }
    // $(".overlay-boxify").toggleClass("open");
});

/* When user clicks a link */
$(".overlay ul li a").click(function() {
    $(".nav-toggle").removeClass("active");
    $(".overlay-boxify").removeClass("open");
});

/* When user clicks outside */
$(".overlay").click(function() {
    $(".nav-toggle").removeClass("active");
    $(".overlay-boxify").removeClass("open");
});

/***********************************
 Date picker
 ***********************************/

$(function() {
    $( "#pick-up-datepicker" ).datepicker();
    $( "#drop-datepicker" ).datepicker();
    $('[data-toggle="popover"]').popover({ trigger: "hover" });
});
