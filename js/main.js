/* jshint curly:true, debug:true */
/* globals $, firebase, location */

function menuIconHover() {
  $(".menu-icon span").on({
    "mouseenter": function() {
      $(this).addClass("swing");
    },
    "mouseleave": function() {
      $(this).removeClass("swing");
    }
  });
};

function scrollToTop() {
  $(".main-icon a").click(function() {
    $("html, body").animate({scrollTop:0}, "200");
  });
};


function showTab(selecter) {
  $("#switch li").removeClass("active");
  $("#switch a[href='" + selecter + "']").parent("li").addClass("active");

  $("#tabs-content > section").hide();
  $(selecter).show();
};

function showAboutTab(aboutSelecter) {
  $("#about-switch li").removeClass("about-active");
  $("#about-switch a[href='" + aboutSelecter + "']").parent("li").addClass("about-active");

  $("#about-tabs-content > section").hide();
  $(aboutSelecter).show();
}

function fadeInAnimation(mainTextSelecter){
  $(mainTextSelecter).waypoint({
      handler: function(direction) {
        if (direction === "down") {
          $(function() {
            $(mainTextSelecter).find(".answer").css("visibility", "visible");
            $(mainTextSelecter).find(".answer").addClass("bounceInLeft");
          });
        }
      },
      offset: "50%"
    });
}

function borderAnimation(aboutSelecter){
  $(aboutSelecter).waypoint({
      handler: function(direction) {
        if (direction === "down") {
          $(function() {
            $(aboutSelecter).find(".title-border").addClass("border-animation");
          });
        }
      },
      offset: "70%"
    });
}

function imgSlideAnimation(box, innerBox){
  $(box).addClass("isImgSlideIn");
  $(box).css("visibility", "visible");
  $(".isImgSlideIn").on('webkitAnimationEnd', function() {
    $(innerBox).addClass("isSlideInRight");
    $(innerBox).css("visibility", "visible");
  });
}

function dataSlideAnimation(box, innerBox){
  $(box).addClass("isDataSlideIn");
  $(box).css("visibility", "visible");
  $(".isDataSlideIn").on('webkitAnimationEnd', function() {
    $(innerBox).addClass("isSlideInLeft");
    $(innerBox).css("visibility", "visible");
  });
}

function scrollSpeedChangeForPC(paraEllement, innerEllement, pcPosition, visiblePosition) {
  $(window).scroll(function() {
    var scroll = $(this).scrollTop();
    var nowPosition = pcPosition - scroll * weight
    weight = 0.5;
    if ( nowPosition < visiblePosition ) {
      imgSlideAnimation(paraEllement, innerEllement);
    }
    $(paraEllement).css( "top", nowPosition + "px");
  });
}

function scrollSpeedChangeForSP(paraEllement, innerEllement, spPosition, visiblePosition) {
  $(window).scroll(function() {
    var scroll = $(this).scrollTop();
    var nowPosition = spPosition - scroll * weight;
    weight = 0.5;
    $(paraEllement).css( "top", nowPosition + "px");
    if ( nowPosition < visiblePosition ) {
      imgSlideAnimation(paraEllement, innerEllement);
    }
  });
}

function scrollSpeedChange1(paraEllement, spPosition, pcPosition) {
  $(window).scroll(function() {
    var windowwidth = window.innerWidth;
    var scroll = $(this).scrollTop();
    weight = 0.5;
    if ( windowwidth >= 768) {
      var nowPosition = pcPosition - scroll * weight;
      $(paraEllement).css( "top", nowPosition + "px");
      if ( nowPosition < 450) {
        imgSlideAnimation("#onkan-img-box", "#onkan-img-inner-box");
      }
    } else {
      var nowPosition = spPosition - scroll * weight;
      $(paraEllement).css( "top", spPosition - scroll * weight + "px");
      if ( nowPosition < 400 ) {
        imgSlideAnimation("#onkan-img-box", "#onkan-img-inner-box");
      }
    }
  });
}

function scrollSpeedChange2ForPC(visiblePosition) {
  $(window).scroll(function() {
    var scroll = $(this).scrollTop();
    var nowPosition = 1250 - scroll * weight
    weight = 0.3;
    if ( nowPosition < visiblePosition ) {
      dataSlideAnimation("#data-text-box", "#data-text-inner-box");
    }
    $("#data-text-box").css( "top", nowPosition + "px");
  });
}

function scrollSpeedChange2ForSP(visiblePosition) {
  $(window).scroll(function() {
    var scroll = $(this).scrollTop();
    var nowPosition = 1000 - scroll * weight
    weight = 0.3;
    if ( nowPosition < visiblePosition ) {
      dataSlideAnimation("#data-text-box", "#data-text-inner-box");
    }
    $("#data-text-box").css( "top", nowPosition + "px");
  });
}

function scrollspeedChange3() {
  $(window).scroll(function() {
    var windowwidth = window.innerWidth;
    var scroll = $(this).scrollTop();
    weight = -0.2;
    $("#parallax-box").css("visibility", "visible");
    if ( windowwidth >= 768) {
      $("#para1").css( "top", 120 - scroll * weight + "px");
      $("#para2").css( "top", 280 - scroll * weight + "px");
      $("#para3").css( "top", 800 - scroll * weight + "px");
      $("#para4").css( "top", 1300 - scroll * weight + "px");
      $("#para5").css( "top", 1600 - scroll * weight + "px");
      $("#para6").css( "top", 2100 - scroll * weight + "px");
      $("#para7").css( "top", 2600 - scroll * weight + "px");
    } else {
      $("#para1").css( "top", 100 - scroll * weight + "px");
      $("#para2").css( "top", 300 - scroll * weight + "px");
      $("#para3").css( "top", 700 - scroll * weight + "px");
      $("#para4").css( "top", 1200 - scroll * weight + "px");
      $("#para5").css( "top", 1500 - scroll * weight + "px");
      $("#para6").css( "top", 2000 - scroll * weight + "px");
      $("#para7").css( "top", 2300 - scroll * weight + "px");
    }
  });
}

function parallax() {
  var windowwidth = window.innerWidth;
  scrollSpeedChange1("#onkan-img-box", 850, 1050);
  if ( windowwidth >= 768 ) {
    scrollSpeedChangeForPC("#act-img-box", "#act-img-inner-box", 2150, 500);
    scrollSpeedChange2ForPC(650);
  } else {
    scrollSpeedChangeForSP("#act-img-box", "#act-img-inner-box", 1550, 350);
    scrollSpeedChange2ForSP(500);
  }
}

$(function() {
  scrollToTop();
  menuIconHover();
  showTab("#about");
  showAboutTab("#otokai");
  fadeInAnimation("#onkan-main-text");
  fadeInAnimation("#activity-main-text");
  borderAnimation("#about-onkan-title");
  borderAnimation("#about-activity-title");
  borderAnimation("#column-title");
  scrollspeedChange3()
  parallax();

  $("#switch a").click(function() {
    var selecter = $(this).attr("href");
    showTab(selecter);

    return false;
  })

  $("#about-switch a").click(function() {
    var aboutSelecter = $(this).attr("href");
    showAboutTab(aboutSelecter);

    return false;
  })
})
