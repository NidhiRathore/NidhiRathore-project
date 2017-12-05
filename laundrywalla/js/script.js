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

$('.show-pricing-btn').on('click', function(event) {
    event.preventDefault();
    $('.pricing-container').slideDown('slow').addClass('showed');
});

$('.pricing-container > .close-btn > .fa-close').on('click', function(event) {
    event.preventDefault();
    $(this).parents('.pricing-container').slideUp('slow').removeClass('showed');
});

/*$('.pricing-content .item').on('click', function(event) {
    event.preventDefault();
    $(this).find('.pricing-list-container').addClass('showed').slideDown('fast');
});

$('.pricing-list-container > .close-btn > .fa-close').on('click', function(event) {
    event.preventDefault();
    $(this).parents('.pricing-list-container').slideUp('fast');
});*/

function showPricing(self) {
    var data_item = $(self).data('item');
    $('#' + data_item).addClass('showed').fadeIn('fast');
}

function closePricing(self) {
    var parent = $(self).parents('.pricing-list-container');
    $(parent).removeClass('showed').fadeOut('fast');
}

function GetListTime(date)
{
    $('#ajaxTimeLoader').fadeIn();
    $("ul.list-time").empty();
    $.ajax({
        url: '/order/GetListPickupTime',
        data: { date: date },
        success: function(data){
            var arr_json = JSON.parse(data);
            $.each(arr_json, function (i, time) {
                var timeItem = "<li index=\"" + i + "\">" + time + "</li>";
                if (time == $('#selected_time').text()) {
                    timeItem = "<li class=\"selected_time\" index=\"" + i + "\">" + time + "</li>";
                }
                $("ul.list-time").append(timeItem);
            });
            if ($('li.selected_time').length > 0) {
                var currentIndex = parseInt($('li.selected_time').attr('index'));
                if (currentIndex > 1) {
                    var toIndex = parseInt($('li.selected_time').attr('index')) - 2;
                    $('.list-time').scrollTo($('.list-time li[index=' + toIndex + ']'));
                }

            }
            else {
                $('#selected_time').text('- Select Time -');
                $('#pickupTime').val('');
            }
            $('#ajaxTimeLoader').fadeOut();
        },
        cache: false
    });
}

function ShowTimePicker(date, timePicker, stateActive)
{
    var pos = $(stateActive).position();
    $(timePicker).show();
    $(timePicker).find('.list-time').show();

    $(timePicker).css({ left: pos.left - 100, top: pos.top + 48 });
    // GetListTime(date);
}
$(function () {
    var availableDates = JSON.parse($('#ListPickupDate').val());

    var defaultDate = $('#SelectedDate').val();

    $('#pick-up-datepicker').datepicker({
        inline: true,
        firstDay: 0,
        minDate: 0,
        showOtherMonths: true,
        selectOtherMonths: true,
        dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        defaultDate: defaultDate,
        onSelect: function (date,inst) {
            setTimeout(function() {
                inst.dpDiv.find('a.ui-state-active').css('background-color','blue');
            }, 1);
            $(this).datepicker("refresh");
            $('#pickupDate').val(date);
            ShowTimePicker(date, $(this).find('.time-picker'), $(this).find('a.ui-state-active'));
        },
        /*beforeShowDay: function (d) {
            var dmy = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
            if ($.inArray(dmy, availableDates) != -1) {
                return [true, "available", ""];
            } else {
                return [false, "unavailable", ""];
            }
        }*/
    });

    $('#drop-datepicker').datepicker({
        inline: true,
        firstDay: 0,
        minDate: 0,
        showOtherMonths: true,
        selectOtherMonths: true,
        dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        defaultDate: defaultDate,
        onSelect: function (date,inst) {
            setTimeout(function() {
                inst.dpDiv.find('a.ui-state-active').css('background-color','blue');
            }, 1);
            $(this).datepicker("refresh");
            $('#dropDate').val(date);
            ShowTimePicker(date, $(this).find('.time-picker'), $(this).find('a.ui-state-active'));
        },
        /*beforeShowDay: function (d) {
            var dmy = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
            if ($.inArray(dmy, availableDates) != -1) {
                return [true, "available", ""];
            } else {
                return [false, "unavailable", ""];
            }
        }*/
    });

    if (defaultDate.length > 0) {
        var dtDefaultDate = new Date(defaultDate);
        var dmy = (dtDefaultDate.getMonth() + 1) + "/" + dtDefaultDate.getDate() + "/" + dtDefaultDate.getFullYear();
        if ($.inArray(dmy, availableDates) != -1) {
            $('a.ui-state-active').css('background-image', 'url(/images/schedule-misc-dayhighlight.png)');
            ShowTimePicker(defaultDate);
            var selectedTime = $('#SelectedTime').val();
            $('#selected_time').html(selectedTime);
            $('#pickupDate').val(defaultDate);
            $('#pickupTime').val(selectedTime);
        } else {
            $('#errorMessage').html('The pick up time has passed');
        }
    }
    $(document).on('click', '.list-time>li', function () {
        var time = $(this).text();
        var dataId = $(this).parent('ul').data('id');
        $(this).parent('ul').siblings('.selected-time-box').text(time);
        // $('#selected_time').text(time);
        $('#' + dataId).val(time);
        $(this).parent('.list-time').hide();
    });

    $('.selected-time-box').click(function () {
        if ($(this).siblings('.list-time').is(":visible") == false) {
            // GetListTime($('#pickupDate').val());
        }
        $(this).siblings('.list-time').slideToggle();
        return false;
    });

    $('#month').html($('.ui-datepicker-month').html().toUpperCase());
    $(document).on('click', '.ui-datepicker-prev', function () {
        $('.time-picker').hide();
    });
    $(document).on('click', '.ui-datepicker-next', function () {
        $('.time-picker').hide();
    });
    /*$('#prevMonth').click(function () {
        $('.ui-datepicker-prev').trigger('click');
        $('#month').html($('.ui-datepicker-month').html().toUpperCase());
        if ($('a.ui-state-active').is(":visible") && $('#pickupDate').val().length > 0) {
            $('a.ui-state-active').css('background-image', 'url(/images/schedule-misc-dayhighlight.png)');
            ShowTimePicker($('#pickupDate').val());
        }
        else {
            $('.time-picker').hide();
        }
    });
    $('#nextMonth').click(function () {
        $('.ui-datepicker-next').trigger('click');
        $('#month').html($('.ui-datepicker-month').html().toUpperCase());
        if ($('a.ui-state-active').is(":visible") && $('#pickupDate').val().length > 0) {
            $('a.ui-state-active').css('background-image', 'url(/images/schedule-misc-dayhighlight.png)');
            ShowTimePicker($('#pickupDate').val());
        }
        else
        {
            $('.time-picker').hide();
        }
    });*/

    $("#pick-up-datepicker").clickOff(function () {
        $(this).find('.list-time').hide();
    });

    $("#drop-datepicker").clickOff(function () {
        $(this).find('.list-time').hide();
    });
});

$.fn.clickOff = function(n, t) {
    var i = !1,
        r = this,
        u = t || !0;
    r.click(function() {
        i = !0
    });
    $(document).click(function(t) {
        i || n(r, t);
        u;
        i = !1
    })
};

//RECO
if ($('#reco_recurring').is(':checked')) {
    $('#reco-type-list').show();
}
else {
    $('#reco-type-list').hide();
}
$('label.reco').click(function () {
    var value = $(this).find('input:radio').val();
    if (value == 1) {
        $('#reco-type-list').fadeIn();
    }
    else {
        $('#reco-type-list').fadeOut();
    }
});
