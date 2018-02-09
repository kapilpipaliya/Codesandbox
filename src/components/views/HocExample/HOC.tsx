import * as React from 'react';

const HOCFetch = (InnerComponent) => class extends React.Component {
  state = {};

  render() {
    return (
      <InnerComponent
        {...this.props}
        {...this.state}
      />
    );
  }
};

export default HOCFetch;
