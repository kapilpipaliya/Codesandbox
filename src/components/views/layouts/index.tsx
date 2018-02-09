// https://www.gatsbyjs.org/tutorial/part-three/
import * as React from 'react';

export default ({ children }) => (
  <div style={{ margin: `0 auto`, maxWidth: 650, padding: `0 1rem` }}>
    {children()}
  </div>
);

// Notice that unlike most children props, the children prop passed to layout components is a function and needs to be executed