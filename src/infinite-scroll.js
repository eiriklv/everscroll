module.exports = function({
  distance = 50
}) {
  function getScrollPos(){
    var yScroll;
    if (self.pageYOffset) {
        yScroll = self.pageYOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {
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
      if (scroller.isUpdating) {
        return;
      }

      scroller.isUpdating = true;

      scroller.callback(() => {
        scroller.isUpdating = false;
        handleScroll(scroller, event);
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
    // For touch devices, try to detect scrolling by touching
    document.ontouchmove = (event) => {
      handleScroll(scroller, event);
    };

    handleScroll(scroller, event);
  };
};
