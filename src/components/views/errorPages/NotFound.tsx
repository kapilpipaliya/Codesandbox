import * as React from 'react';

import SwipeableViews from 'react-swipeable-views';

const swipeableStyles = {
  'slide': {
    'padding': 15,
    'minHeight': 100,
    'color': '#fff'
  },
  'slide1': {'background': '#FEA900'},
  'slide2': {'background': '#B3DC4A'},
  'slide3': {'background': '#6AC0FF'}
};

export default () => <div>
  <h3>404 page not found</h3>
  <p>We are sorry but the page you are looking for does not exist.</p>
  <SwipeableViews enableMouseEvents>
    <div
      style={Object.assign(
        {},
        swipeableStyles.slide,
        swipeableStyles.slide1
      )}
    >
            slide n°1
    </div>
    <div
      style={Object.assign(
        {},
        swipeableStyles.slide,
        swipeableStyles.slide2
      )}
    >
            slide n°2
    </div>
    <div
      style={Object.assign(
        {},
        swipeableStyles.slide,
        swipeableStyles.slide3
      )}
    >
            slide n°3
    </div>
  </SwipeableViews>
</div>;
