"use strict";

module.exports = function (_ref) {
  var _ref$distance = _ref.distance;
  var distance = _ref$distance === undefined ? 50 : _ref$distance;

  var prevScrollPos = getScrollPos();

  function getScrollPos() {
    return isIE ? document.documentElement.scrollTop : window.pageYOffset;
  }

  function handleScroll(scroller, event) {
    if (scroller.isUpdating) {
      return;
    }

    var scrollPos = getScrollPos();

    if (scrollPos == prevScrollPos) {
      return; // nothing to do
    }

    // Find the pageHeight and clientHeight(the no. of pixels to scroll to make the scrollbar reach max pos)
    var pageHeight = document.documentElement.scrollHeight;
    var clientHeight = document.documentElement.clientHeight;

    // Check if scroll bar position is just 50px above the max, if yes, initiate an update
    if (pageHeight - (scrollPos + clientHeight) < scroller.options.distance) {
      scroller.isUpdating = true;

      scroller.callback(function () {
        scroller.isUpdating = false;
      });
    }

    prevScrollPos = scrollPos;
  }

  return function infiniteScroll(callback) {
    var scroller = {
      callback: callback,
      options: { distance: distance },
      isUpdating: false
    };

    window.onscroll = function (event) {
      handleScroll(scroller, event);
    };
    // For touch devices, try to detect scrolling by touching
    document.ontouchmove = function (event) {
      handleScroll(scroller, event);
    };
  };
};