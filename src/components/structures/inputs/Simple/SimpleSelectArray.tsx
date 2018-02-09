// @flow
// https://gist.github.com/brigand/6b95c5c622aa87fc212c813b9ec31dea
// GreenJello> 
import * as React from 'react';
import { observer } from 'mobx-react';
import * as map from 'lodash/map';
import isVisible from '../branch';
// type Props = {
//   options: Array<string | Object>,
//   index?: number,
//   value?: string,
//   onSelect: (index: number, item: string | Object) => mixed,
// }

@isVisible
@observer
export default
class Dropdown extends React.Component {
  render() {
    const { field } = this.props; // Added
    const index = typeof field.value === 'number'
      ? field.value
      : field.value != null
      ? field.extra.findIndex(x => this.getText(x) === this.getText(field.value))
      : -1;
    return (
      <div>
        <select
          value={String(index)}
          onChange={({ target }) => {
            const { selectedIndex } = target;
            const value = field.extra[selectedIndex];
            // this.props.onSelect(selectedIndex, value);
            field.onChange(value);
          }}
        >
          {field.extra && field.extra.map((x, i) => (
            <option value={String(i)} key={i}>{this.getText(x)}</option>
          ))}
        </select>
      </div>
    );
  }

  // getText(el: string | Object) {
  getText(el) {
    if (typeof el === 'string') { return el; }
    return el.text;
  }
}

// <Dropdown 
//   options={['a', 'b']}
//   index={this.state.selected}
//   onSelect={(index, text) => { this.setState({ selected: index })
//   } />