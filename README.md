Everscroll
----------

[![npm version](https://badge.fury.io/js/everscroll.svg)](http://badge.fury.io/js/everscroll)

Really simple infinite scroll library

Thanks to: https://github.com/alexblack/infinite-scroll

- No dependencies
- Tested in Chrome 17, IE7, Firefox 11, Android 2.3 Browser, iPad 2 with IOS5
- Handles touch events to respond before the end of the user's scroll on devices like the iPad

## Usage
``` js
// setup
var infiniteScroll = require('everscroll')({
  distance: 50
});

// initiate
infiniteScroll(function(done) {
  // 1. fetch data from the server
  // 2. insert it into the document
  // 3. call done when we are done
  done();
});
```
