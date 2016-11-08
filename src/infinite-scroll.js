module.exports = function({
  distance = 50,
  disableCallback = false
}) {
  function getScrollPos(){
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
    const scrollPos = getScrollPos();
    const pageHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const distanceToBottom = pageHeight - (scrollPos + clientHeight);

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

    handleScroll(scroller);

    window.onscroll = (event) => {
      handleScroll(scroller, event);
    };

    document.ontouchmove = (event) => {
      handleScroll(scroller, event);
    };
  };
};
