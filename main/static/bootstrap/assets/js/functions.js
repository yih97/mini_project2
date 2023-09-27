// @codekit-prepend "/vendor/hammer-2.0.8.js";

$( document ).ready(function() {

  // DOMMouseScroll included for firefox support
  var canScroll = true,
      scrollController = null;
  $(this).on('mousewheel DOMMouseScroll', function(e){

    if (!($('.outer-nav').hasClass('is-vis'))) {

      e.preventDefault();

      var delta = (e.originalEvent.wheelDelta) ? -e.originalEvent.wheelDelta : e.originalEvent.detail * 20;

      if (delta > 50 && canScroll) {
        canScroll = false;
        clearTimeout(scrollController);
        scrollController = setTimeout(function(){
          canScroll = true;
        }, 800);
        updateHelper(1);
      }
      else if (delta < -50 && canScroll) {
        canScroll = false;
        clearTimeout(scrollController);
        scrollController = setTimeout(function(){
          canScroll = true;
        }, 800);
        updateHelper(-1);
      }

    }

  });

  $('.side-nav li, .outer-nav li').click(function(){

    if (!($(this).hasClass('is-active'))) {

      var $this = $(this),
          curActive = $this.parent().find('.is-active'),
          curPos = $this.parent().children().index(curActive),
          nextPos = $this.parent().children().index($this),
          lastItem = $(this).parent().children().length - 1;

      updateNavs(nextPos);
      updateContent(curPos, nextPos, lastItem);

    }

  });

  $('.cta').click(function(){

    var curActive = $('.side-nav').find('.is-active'),
        curPos = $('.side-nav').children().index(curActive),
        lastItem = $('.side-nav').children().length - 1,
        nextPos = lastItem;

    updateNavs(lastItem);
    updateContent(curPos, nextPos, lastItem);

  });

  // swipe support for touch devices
  var targetElement = document.getElementById('viewport'),
      mc = new Hammer(targetElement);
  mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
  mc.on('swipeup swipedown', function(e) {

    updateHelper(e);

  });

  $(document).keyup(function(e){

    if (!($('.outer-nav').hasClass('is-vis'))) {
      e.preventDefault();
      updateHelper(e);
    }

  });

  // determine scroll, swipe, and arrow key direction
  function updateHelper(param) {

    var curActive = $('.side-nav').find('.is-active'),
        curPos = $('.side-nav').children().index(curActive),
        lastItem = $('.side-nav').children().length - 1,
        nextPos = 0;

    if (param.type === "swipeup" || param.keyCode === 40 || param > 0) {
      if (curPos !== lastItem) {
        nextPos = curPos + 1;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
      else {
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
    }
    else if (param.type === "swipedown" || param.keyCode === 38 || param < 0){
      if (curPos !== 0){
        nextPos = curPos - 1;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
      else {
        nextPos = lastItem;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
    }

  }

  // sync side and outer navigations
  function updateNavs(nextPos) {

    $('.side-nav, .outer-nav').children().removeClass('is-active');
    $('.side-nav').children().eq(nextPos).addClass('is-active');
    $('.outer-nav').children().eq(nextPos).addClass('is-active');

  }

  // update main content area
  function updateContent(curPos, nextPos, lastItem) {

    $('.main-content').children().removeClass('section--is-active');
    $('.main-content').children().eq(nextPos).addClass('section--is-active');
    $('.main-content .section').children().removeClass('section--next section--prev');

    if (curPos === lastItem && nextPos === 0 || curPos === 0 && nextPos === lastItem) {
      $('.main-content .section').children().removeClass('section--next section--prev');
    }
    else if (curPos < nextPos) {
      $('.main-content').children().eq(curPos).children().addClass('section--next');
    }
    else {
      $('.main-content').children().eq(curPos).children().addClass('section--prev');
    }

    if (nextPos !== 0 && nextPos !== lastItem) {
      $('.header--cta').addClass('is-active');
    }
    else {
      $('.header--cta').removeClass('is-active');
    }

  }

  function outerNav() {

    $('.header--nav-toggle').click(function(){

      $('.perspective').addClass('perspective--modalview');
      setTimeout(function(){
        $('.perspective').addClass('effect-rotate-left--animate');
      }, 25);
      $('.outer-nav, .outer-nav li, .outer-nav--return').addClass('is-vis');

    });

    $('.outer-nav--return, .outer-nav li').click(function(){

      $('.perspective').removeClass('effect-rotate-left--animate');
      setTimeout(function(){
        $('.perspective').removeClass('perspective--modalview');
      }, 400);
      $('.outer-nav, .outer-nav li, .outer-nav--return').removeClass('is-vis');

    });

  }

  function workSlider() {

    $('.slider--prev, .slider--next').click(function() {

      var $this = $(this),
          curLeft = $('.slider').find('.slider--item-left'),
          curLeftPos = $('.slider').children().index(curLeft),
          curCenter = $('.slider').find('.slider--item-center'),
          curCenterPos = $('.slider').children().index(curCenter),
          curRight = $('.slider').find('.slider--item-right'),
          curRightPos = $('.slider').children().index(curRight),
          totalWorks = $('.slider').children().length,
          $left = $('.slider--item-left'),
          $center = $('.slider--item-center'),
          $right = $('.slider--item-right'),
          $item = $('.slider--item');

      $('.slider').animate({ opacity : 0 }, 400);

      setTimeout(function(){

      if ($this.hasClass('slider--next')) {
        if (curLeftPos < totalWorks - 1 && curCenterPos < totalWorks - 1 && curRightPos < totalWorks - 1) {
          $left.removeClass('slider--item-left').next().addClass('slider--item-left');
          $center.removeClass('slider--item-center').next().addClass('slider--item-center');
          $right.removeClass('slider--item-right').next().addClass('slider--item-right');
        }
        else {
          if (curLeftPos === totalWorks - 1) {
            $item.removeClass('slider--item-left').first().addClass('slider--item-left');
            $center.removeClass('slider--item-center').next().addClass('slider--item-center');
            $right.removeClass('slider--item-right').next().addClass('slider--item-right');
          }
          else if (curCenterPos === totalWorks - 1) {
            $left.removeClass('slider--item-left').next().addClass('slider--item-left');
            $item.removeClass('slider--item-center').first().addClass('slider--item-center');
            $right.removeClass('slider--item-right').next().addClass('slider--item-right');
          }
          else {
            $left.removeClass('slider--item-left').next().addClass('slider--item-left');
            $center.removeClass('slider--item-center').next().addClass('slider--item-center');
            $item.removeClass('slider--item-right').first().addClass('slider--item-right');
          }
        }
      }
      else {
        if (curLeftPos !== 0 && curCenterPos !== 0 && curRightPos !== 0) {
          $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
          $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
          $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
        }
        else {
          if (curLeftPos === 0) {
            $item.removeClass('slider--item-left').last().addClass('slider--item-left');
            $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
            $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
          }
          else if (curCenterPos === 0) {
            $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
            $item.removeClass('slider--item-center').last().addClass('slider--item-center');
            $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
          }
          else {
            $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
            $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
            $item.removeClass('slider--item-right').last().addClass('slider--item-right');
          }
        }
      }

    }, 400);

    $('.slider').animate({ opacity : 1 }, 400);

    });

  }



//  function workSlider_() {
//
//    $('.slider--prev_, .slider--next_').click(function() {
//
//      var $this = $(this),
//          curLeft = $('.slider_').find('.slider--item-left_'),
//          curLeftPos = $('.slider_').children().index(curLeft),
//          curCenter = $('.slider_').find('.slider--item-center_'),
//          curCenterPos = $('.slider_').children().index(curCenter),
//          curRight = $('.slider_').find('.slider--item-right_'),
//          curRightPos = $('.slider_').children().index(curRight),
//          totalWorks = $('.slider_').children().length,
//          $left = $('.slider--item-left_'),
//          $center = $('.slider--item-center_'),
//          $right = $('.slider--item-right_'),
//          $item = $('.slider--item_');
//
//      $('.slider_').animate({ opacity : 0 }, 400);
//
//      setTimeout(function(){
//
//      if ($this.hasClass('slider--next_')) {
//        if (curLeftPos < totalWorks - 1 && curCenterPos < totalWorks - 1 && curRightPos < totalWorks - 1) {
//          $left.removeClass('slider--item-left_').next().addClass('slider--item-left_');
//          $center.removeClass('slider--item-center_').next().addClass('slider--item-center_');
//          $right.removeClass('slider--item-right_').next().addClass('slider--item-right_');
//        }
//        else {
//          if (curLeftPos === totalWorks - 1) {
//            $item.removeClass('slider--item-left_').first().addClass('slider--item-left_');
//            $center.removeClass('slider--item-center_').next().addClass('slider--item-center_');
//            $right.removeClass('slider--item-right_').next().addClass('slider--item-right_');
//          }
//          else if (curCenterPos === totalWorks - 1) {
//            $left.removeClass('slider--item-left_').next().addClass('slider--item-left_');
//            $item.removeClass('slider--item-center_').first().addClass('slider--item-center_');
//            $right.removeClass('slider--item-right_').next().addClass('slider--item-right_');
//          }
//          else {
//            $left.removeClass('slider--item-left_').next().addClass('slider--item-left_');
//            $center.removeClass('slider--item-center_').next().addClass('slider--item-center_');
//            $item.removeClass('slider--item-right_').first().addClass('slider--item-right_');
//          }
//        }
//      }
//      else {
//        if (curLeftPos !== 0 && curCenterPos !== 0 && curRightPos !== 0) {
//          $left.removeClass('slider--item-left_').prev().addClass('slider--item-left_');
//          $center.removeClass('slider--item-center_').prev().addClass('slider--item-center_');
//          $right.removeClass('slider--item-right_').prev().addClass('slider--item-right_');
//        }
//        else {
//          if (curLeftPos === 0) {
//            $item.removeClass('slider--item-left_').last().addClass('slider--item-left_');
//            $center.removeClass('slider--item-center_').prev().addClass('slider--item-center_');
//            $right.removeClass('slider--item-right_').prev().addClass('slider--item-right_');
//          }
//          else if (curCenterPos === 0) {
//            $left.removeClass('slider--item-left_').prev().addClass('slider--item-left_');
//            $item.removeClass('slider--item-center_').last().addClass('slider--item-center_');
//            $right.removeClass('slider--item-right_').prev().addClass('slider--item-right_');
//          }
//          else {
//            $left.removeClass('slider--item-left_').prev().addClass('slider--item-left_');
//            $center.removeClass('slider--item-center_').prev().addClass('slider--item-center_');
//            $item.removeClass('slider--item-right_').last().addClass('slider--item-right_');
//          }
//        }
//      }
//
//    }, 400);
//
//    $('.slider_').animate({ opacity : 1 }, 400);
//
//    });
//
//  }



  function transitionLabels() {

    $('.work-request--information input').focusout(function(){

      var textVal = $(this).val();

      if (textVal === "") {
        $(this).removeClass('has-value');
      }
      else {
        $(this).addClass('has-value');
      }

      // correct mobile device window position
      window.scrollTo(0, 0);

    });

  }

  outerNav();
  workSlider();
  transitionLabels();

});


// @codekit-prepend "/vendor/hammer-2.0.8.js";

$(document).ready(function() {

  // DOMMouseScroll included for firefox support
  var canScroll_ = true,
      scrollController_ = null;
  $(this).on('mousewheel DOMMouseScroll', function(e_) {

    if (!$('.outer-nav_').hasClass('is-vis_')) {

      e_.preventDefault();

      var delta_ = (e_.originalEvent.wheelDelta) ? -e_.originalEvent.wheelDelta : e_.originalEvent.detail * 20;

      if (delta_ > 50 && canScroll_) {
        canScroll_ = false;
        clearTimeout(scrollController_);
        scrollController_ = setTimeout(function() {
          canScroll_ = true;
        }, 800);
        updateHelper_(1);
      }
      else if (delta_ < -50 && canScroll_) {
        canScroll_ = false;
        clearTimeout(scrollController_);
        scrollController_ = setTimeout(function() {
          canScroll_ = true;
        }, 800);
        updateHelper_(-1);
      }

    }

  });

  $('.side-nav_ li_, .outer-nav_ li_').click(function() {

    if (!($(this).hasClass('is-active_'))) {

      var $this_ = $(this),
          curActive_ = $this_.parent().find('.is-active_'),
          curPos_ = $this_.parent().children().index(curActive_),
          nextPos_ = $this_.parent().children().index($this_),
          lastItem_ = $(this).parent().children().length - 1;

      updateNavs_(nextPos_);
      updateContent_(curPos_, nextPos_, lastItem_);

    }

  });

  $('.cta_').click(function() {

    var curActive_ = $('.side-nav_').find('.is-active_'),
        curPos_ = $('.side-nav_').children().index(curActive_),
        lastItem_ = $('.side-nav_').children().length - 1,
        nextPos_ = lastItem_;

    updateNavs_(lastItem_);
    updateContent_(curPos_, nextPos_, lastItem_);

  });

  // swipe support for touch devices
  var targetElement_ = document.getElementById('viewport_'),
      mc_ = new Hammer(targetElement_);
  mc_.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
  mc_.on('swipeup swipedown', function(e_) {

    updateHelper_(e_);

  });

  $(document).keyup(function(e_) {

    if (!$('.outer-nav_').hasClass('is-vis_')) {
      e_.preventDefault();
      updateHelper_(e_);
    }

  });

  // determine scroll, swipe, and arrow key direction
  function updateHelper_(param_) {

    var curActive_ = $('.side-nav_').find('.is-active_'),
        curPos_ = $('.side-nav_').children().index(curActive_),
        lastItem_ = $('.side-nav_').children().length - 1,
        nextPos_ = 0;

    if (param_.type === "swipeup" || param_.keyCode === 40 || param_ > 0) {
      if (curPos_ !== lastItem_) {
        nextPos_ = curPos_ + 1;
        updateNavs_(nextPos_);
        updateContent_(curPos_, nextPos_, lastItem_);
      }
      else {
        updateNavs_(nextPos_);
        updateContent_(curPos_, nextPos_, lastItem_);
      }
    }
    else if (param_.type === "swipedown" || param_.keyCode === 38 || param_ < 0) {
      if (curPos_ !== 0) {
        nextPos_ = curPos_ - 1;
        updateNavs_(nextPos_);
        updateContent_(curPos_, nextPos_, lastItem_);
      }
      else {
        nextPos_ = lastItem_;
        updateNavs_(nextPos_);
        updateContent_(curPos_, nextPos_, lastItem_);
      }
    }

  }

  // sync side and outer navigations
  function updateNavs_(nextPos_) {

    $('.side-nav_, .outer-nav_').children().removeClass('is-active_');
    $('.side-nav_').children().eq(nextPos_).addClass('is-active_');
    $('.outer-nav_').children().eq(nextPos_).addClass('is-active_');

  }

  // update main content area
  function updateContent_(curPos_, nextPos_, lastItem_) {

    $('.main-content_').children().removeClass('section--is-active_');
    $('.main-content_').children().eq(nextPos_).addClass('section--is-active_');
    $('.main-content_ .section_').children().removeClass('section--next_ section--prev_');

    if (curPos_ === lastItem_ && nextPos_ === 0 || curPos_ === 0 && nextPos_ === lastItem_) {
      $('.main-content_ .section_').children().removeClass('section--next_ section--prev_');
    }
    else if (curPos_ < nextPos_) {
      $('.main-content_').children().eq(curPos_).children().addClass('section--next_');
    }
    else {
      $('.main-content_').children().eq(curPos_).children().addClass('section--prev_');
    }

    if (nextPos_ !== 0 && nextPos_ !== lastItem_) {
      $('.header--cta_').addClass('is-active_');
    }
    else {
      $('.header--cta_').removeClass('is-active_');
    }

  }

  function outerNav_() {

    $('.header--nav-toggle_').click(function() {

      $('.perspective_').addClass('perspective--modalview_');
      setTimeout(function() {
        $('.perspective_').addClass('effect-rotate-left--animate_');
      }, 25);
      $('.outer-nav_, .outer-nav_ li_, .outer-nav--return_').addClass('is-vis_');

    });

    $('.outer-nav--return_, .outer-nav_ li_').click(function() {

      $('.perspective_').removeClass('effect-rotate-left--animate_');
      setTimeout(function() {
        $('.perspective_').removeClass('perspective--modalview_');
      }, 400);
      $('.outer-nav_, .outer-nav_ li_, .outer-nav--return_').removeClass('is-vis_');

    });

  }

  function workSlider_() {

    $('.slider--prev_, .slider--next_').click(function() {

      var $this_ = $(this),
          curLeft_ = $('.slider_').find('.slider--item-left_'),
          curLeftPos_ = $('.slider_').children().index(curLeft_),
          curCenter_ = $('.slider_').find('.slider--item-center_'),
          curCenterPos_ = $('.slider_').children().index(curCenter_),
          curRight_ = $('.slider_').find('.slider--item-right_'),
          curRightPos_ = $('.slider_').children().index(curRight_),
          totalWorks_ = $('.slider_').children().length,
          $left_ = $('.slider--item-left_'),
          $center_ = $('.slider--item-center_'),
          $right_ = $('.slider--item-right_'),
          $item_ = $('.slider--item_');

      $('.slider_').animate({ opacity: 0 }, 400);

      setTimeout(function() {

        if ($this_.hasClass('slider--next_')) {
          if (curLeftPos_ < totalWorks_ - 1 && curCenterPos_ < totalWorks_ - 1 && curRightPos_ < totalWorks_ - 1) {
            $left_.removeClass('slider--item-left_').next().addClass('slider--item-left_');
            $center_.removeClass('slider--item-center_').next().addClass('slider--item-center_');
            $right_.removeClass('slider--item-right_').next().addClass('slider--item-right_');
          }
          else {
            if (curLeftPos_ === totalWorks_ - 1) {
              $item_.removeClass('slider--item-left_').first().addClass('slider--item-left_');
              $center_.removeClass('slider--item-center_').next().addClass('slider--item-center_');
              $right_.removeClass('slider--item-right_').next().addClass('slider--item-right_');
            }
            else if (curCenterPos_ === totalWorks_ - 1) {
              $left_.removeClass('slider--item-left_').next().addClass('slider--item-left_');
              $item_.removeClass('slider--item-center_').first().addClass('slider--item-center_');
              $right_.removeClass('slider--item-right_').next().addClass('slider--item-right_');
            }
            else {
              $left_.removeClass('slider--item-left_').next().addClass('slider--item-left_');
              $center_.removeClass('slider--item-center_').next().addClass('slider--item-center_');
              $item_.removeClass('slider--item-right_').first().addClass('slider--item-right_');
            }
          }
        }
        else {
          if (curLeftPos_ !== 0 && curCenterPos_ !== 0 && curRightPos_ !== 0) {
            $left_.removeClass('slider--item-left_').prev().addClass('slider--item-left_');
            $center_.removeClass('slider--item-center_').prev().addClass('slider--item-center_');
            $right_.removeClass('slider--item-right_').prev().addClass('slider--item-right_');
          }
          else {
            if (curLeftPos_ === 0) {
              $item_.removeClass('slider--item-left_').last().addClass('slider--item-left_');
              $center_.removeClass('slider--item-center_').prev().addClass('slider--item-center_');
              $right_.removeClass('slider--item-right_').prev().addClass('slider--item-right_');
            }
            else if (curCenterPos_ === 0) {
              $left_.removeClass('slider--item-left_').prev().addClass('slider--item-left_');
              $item_.removeClass('slider--item-center_').last().addClass('slider--item-center_');
              $right_.removeClass('slider--item-right_').prev().addClass('slider--item-right_');
            }
            else {
              $left_.removeClass('slider--item-left_').prev().addClass('slider--item-left_');
              $center_.removeClass('slider--item-center_').prev().addClass('slider--item-center_');
              $item_.removeClass('slider--item-right_').last().addClass('slider--item-right_');
            }
          }
        }

      }, 400);

      $('.slider_').animate({ opacity: 1 }, 400);

    });

  }

  function transitionLabels_() {

    $('.work-request--information_ input').focusout(function() {

      var textVal_ = $(this).val();

      if (textVal_ === "") {
        $(this).removeClass('has-value_');
      }
      else {
        $(this).addClass('has-value_');
      }

      // correct mobile device window position
      window.scrollTo(0, 0);

    });

  }

  outerNav_();
  workSlider_();
  transitionLabels_();

});
