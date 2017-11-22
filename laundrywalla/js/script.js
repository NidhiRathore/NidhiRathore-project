$(document).ready(function() {
    AOS.init();
    $('[data-toggle="tooltip"]').tooltip();

    $( ".select" ).select2({
        theme: "bootstrap"
    });

    $(".select-month").select2({
      placeholder: "Select Month",
      allowClear: true
    });

    $(".select-year").select2({
      placeholder: "Select Year",
      allowClear: true
    });

    $(".select-detergent").select2({
      placeholder: "Select Detergent Type",
      allowClear: true
    });


});

var $topHeader = $('.top-header');

/* When user clicks the Icon */
$(".nav-toggle").click(function() {
    $(this).toggleClass("active");
    if ($(".overlay-boxify").hasClass('open')) {
      $(".overlay-boxify").removeClass("open");
    } else {
      $(".overlay-boxify").addClass("open");
    }
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

/***********************************
 Header Scroll Effect
 ***********************************/

 var timer = setInterval(function () {
    var scrolled = $(window).scrollTop();
    if (scrolled >= 80) {
        $topHeader.addClass('scrolled');
    }

    if (scrolled <= 40) {
        $topHeader.removeClass('scrolled');
    }
 }, 500);

 /***********************************
  Pricing Table
  ***********************************/

$('body').on('click', '.show-pricing-btn', function(event) {
    event.preventDefault();
    /* Act on the event */
    $('.pricing-container').addClass('showed').slideDown('slow');
});

$('body').on('click', '.pricing-container > .close-btn > .fa-close', function(event) {
    event.preventDefault();
    /* Act on the event */
    $(this).parents('.pricing-container').slideUp('slow');
});

$('body').on('click', '.pricing-content .item', function(event) {
    event.preventDefault();
    /* Act on the event */
    $(this).find('.pricing-list-container').addClass('showed');
});

$('body').on('click', '.pricing-list-container > .close-btn > .fa-close', function(event) {
    event.preventDefault();
    /* Act on the event */
    $(this).parents('.pricing-list-container').slideUp('slow');
});
