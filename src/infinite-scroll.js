module.exports = function({
  distance = 50,
  disableCallback = false
}) {
  function getScrollPos(){
    let yScroll = 0;

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
    const scrollPos = getScrollPos();
    const pageHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const distanceToBottom = pageHeight - (scrollPos + clientHeight);

    // check if we are within the max distance to the bottom
    if (distanceToBottom < scroller.options.distance) {
      if (!disableCallback && scroller.isUpdating) {
        return;
      }

      if (!disableCallback) {
        scroller.isUpdating = true;
      }

      scroller.callback(() => {
        if (!disableCallback) {
          scroller.isUpdating = false;
        }
      });
    }
  }

  return function infiniteScroll(callback) {
    const scroller = {
      callback,
      options: { distance },
      isUpdating: false
    };

    window.onscroll = (event) => {
      handleScroll(scroller, event);
    };

    document.ontouchmove = (event) => {
      handleScroll(scroller, event);
    };
  };
};
