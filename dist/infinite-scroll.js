"use strict";

module.exports = function (_ref) {
  var _ref$distance = _ref.distance;
  var distance = _ref$distance === undefined ? 50 : _ref$distance;

  function getScrollPos() {
    var yScroll = 0;

    if (self.pageYOffset) {
      yScroll = self.pageYOffset;
    } else if ((document.documentElement || {}).scrollTop) {
      yScroll = document.documentElement.scrollTop;
    } else if (document.body) {
      yScroll = document.body.scrollTop;
    }

    return yScroll;
  }

  function handleScroll(scroller, event) {
    // find some relevant values
    var scrollPos = getScrollPos();
    var pageHeight = document.documentElement.scrollHeight;
    var clientHeight = document.documentElement.clientHeight;
    var distanceToBottom = pageHeight - (scrollPos + clientHeight);

    // check if we are within the max distance to the bottom
    if (distanceToBottom < scroller.options.distance) {
      if (scroller.isUpdating) {
        return;
      }

      scroller.isUpdating = true;

      scroller.callback(function () {
        scroller.isUpdating = false;
        handleScroll(scroller, event);
      });
    }
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

    handleScroll(scroller, event);
  };
};