import * as React from 'react';

const ErrorHOC = (InnerComponent) => class extends React.Component {
  loading(is_loading) => {
    is_loading ? <CircularProgress size={60} thickness={5} /> : null
  }

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
