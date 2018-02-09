import * as React from 'react';
import * as map from 'lodash/map';
import { observer } from 'mobx-react';
import capitalize from 'utils/stringEnhancer';
// This should be stateless function.
import isVisible from '../branch';

import Dropdown from 'semantic-ui-react/dist/commonjs/addons/Dropdown';

@isVisible
@observer
class SimpleSelect extends React.Component {
  constructor(props) {
    super(props);
    const { oField } = this.props;
    const { label, name } = this.props.field;
    this.state = { label: label || capitalize(name), option_field: oField || 'slug' };
    this.input = this.input.bind(this);
  }
  
  handleChange = (e, { value }) => this.props.field.onChange(value);
  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery });

  input() {
    const { field } = this.props;

    if (this.props.visible === false) {
      return <span></span>;
    }

    return (
        <Dropdown
          {...this.props}
          {...field.bind()}
          options={field.extra}
          onChange={this.handleChange}
          fluid selection
        >
        </Dropdown>
    );
  }
  
  renderOptions() {
    // The Magical Lodash
    // <Option value="0" />
// friendOptions = [
//   {
//     text: 'Jenny Hess',
//     value: 'Jenny Hess',
//     image: { avatar: true, src: '/assets/images/avatar/small/jenny.jpg' },
//   },
//  ...
// ]
    return map(this.props.field.extra, (option) => (
      <Option key={parseInt(option.id, 10)} value={parseInt(option.id, 10)}>
        {option[this.state.option_field]}
      </Option>
    ));
  }
  
  render() {
    return (this.input());
  }
}

export default SimpleSelect;

        // {field.touched && field.hasError && 
        //   <FormHelperText error={field.touched && field.hasError}>{field.error}</FormHelperText>
        // }