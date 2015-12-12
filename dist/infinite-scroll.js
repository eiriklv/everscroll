"use strict";

module.exports = function (_ref) {
  var _ref$distance = _ref.distance;
  var distance = _ref$distance === undefined ? 50 : _ref$distance;
  var _ref$disableCallback = _ref.disableCallback;
  var disableCallback = _ref$disableCallback === undefined ? false : _ref$disableCallback;

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
      if (!disableCallback && scroller.isUpdating) {
        return;
      }

      if (!disableCallback) {
        scroller.isUpdating = true;
      }

      scroller.callback(function () {
        if (!disableCallback) {
          scroller.isUpdating = false;
        }
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

    document.ontouchmove = function (event) {
      handleScroll(scroller, event);
    };
  };
};