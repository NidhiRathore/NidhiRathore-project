/* ==========================================================================
  Author's custom script
  ========================================================================== */
"use strict";

(function($){
  $(function(){
    AOS.init({
      duration: 1000,
    });

    $('.scrollspy').scrollSpy();

    $('.materialboxed').materialbox();

    $(".button-collapse").sideNav();

    var h = $(window).innerHeight();
    $('.slider').slider({
      height: h,
      indicators: true,
    });
    // $('.slider').slider('pause');

    setInterval(function () {
      var scrollTop = $(window).scrollTop();
      if (scrollTop >= 100) {
        $('#navbar').fadeIn('slow');
      } else {
        $('#navbar').fadeOut('slow');
      }
    }, 1000);

    // var options = [
    //   {selector: '#navbar', offset: 50, callback: function(el) {
    //     $(el).addClass('active')
    //   } },
    // ];
    // Materialize.scrollFire(options);
  }); // end of document ready
})(jQuery); // end of jQuery name space
