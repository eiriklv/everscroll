module.exports = function({
  distance = 50
}) {
  const isIE = navigator.appName === 'Microsoft Internet Explorer';

  let prevScrollPos = getScrollPos();

  function getScrollPos() {
    return isIE ?
      document.documentElement.scrollTop :
      window.pageYOffset;
  }

  function handleScroll(scroller, event) {
    if (scroller.isUpdating) {
      return;
    }

    const scrollPos = getScrollPos();

    if (scrollPos == prevScrollPos) {
      return; // nothing to do
    }

    // Find the pageHeight and clientHeight(the no. of pixels to scroll to make the scrollbar reach max pos)
    const pageHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    // Check if scroll bar position is just 50px above the max, if yes, initiate an update
    if (pageHeight - (scrollPos + clientHeight) < scroller.options.distance) {
      scroller.isUpdating = true;

      scroller.callback(() => {
        scroller.isUpdating = false;
      });
    }

    prevScrollPos = scrollPos;
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
  };
};
