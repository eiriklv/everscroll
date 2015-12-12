Everscroll
----------

[![npm version](https://badge.fury.io/js/everscroll.svg)](http://badge.fury.io/js/everscroll)

Really simple infinite scroll library

Thanks to: https://github.com/alexblack/infinite-scroll

- No dependencies
- Tested in Chrome 17, IE7, Firefox 11, Android 2.3 Browser, iPad 2 with IOS5
- Handles touch events to respond before the end of the user's scroll on devices like the iPad

## Usage (vanilla with callback)

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

## Usage (redux - without callback)
``` js
// setup
var infiniteScroll = require('everscroll')({
  distance: 50,
  disableCallback: true
});

// redux store
var store = configureStore({
  isLoadingNewData: false
});

// initiate
infiniteScroll(function() {
  if (store.getState().isLoadingNewData) {
    return;
  }

  // Dispatch an action creator to do data fetching and trigger a re-render
  // (NOTE: this action creator sequence should also set state.isLoadingNewData appropriately)
  store.dispatch(populateNextPage());
});
```
