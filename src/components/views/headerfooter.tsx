import * as React from 'react';
import { Count, Sum } from 'utils/libs';

/* eslint jsx-quotes: 0, react/no-multi-comp: 0 */
export class FooterTotal extends React.Component {
  render() {
    return (
      <span><strong>Sum:</strong>{Sum(this.props.data, this.props.filterColumn, this.props.precision)}</span>
    );
  }
}
export class FooterCount extends React.Component {
  render() {
    return (
      <span><strong>Count:</strong>{Count(this.props.data)}</span>
    );
  }
}
