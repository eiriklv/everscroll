"use strict";

module.exports = function (_ref) {
  var _ref$distance = _ref.distance,
      distance = _ref$distance === undefined ? 50 : _ref$distance,
      _ref$disableCallback = _ref.disableCallback,
      disableCallback = _ref$disableCallback === undefined ? false : _ref$disableCallback;

  function getScrollPos() {
    if (self.pageYOffset) {
      return self.pageYOffset;
    } else if ((document.documentElement || {}).scrollTop) {
      return document.documentElement.scrollTop;
    } else if (document.body) {
      return document.body.scrollTop;
    } else {
      return 0;
    }
  }

  function handleScroll(scroller, event) {
    var scrollPos = getScrollPos();
    var pageHeight = document.documentElement.scrollHeight;
    var clientHeight = document.documentElement.clientHeight;
    var distanceToBottom = pageHeight - (scrollPos + clientHeight);

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

    handleScroll(scroller);

    window.onscroll = function (event) {
      handleScroll(scroller, event);
    };

    document.ontouchmove = function (event) {
      handleScroll(scroller, event);
    };
  };
};