import * as React from 'react';
import * as map from 'lodash/map';
import { observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
// import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

import capitalize from 'utils/stringEnhancer';
// This should be stateless function.

const styles = (theme) => ({
  formControl: {
    marginRight: theme.spacing.unit,
    // minWidth: 200,
  },
});

@observer
class SimpleSelect extends React.Component {
  constructor(props) {
    super(props);
    const { oField } = this.props;
    const { label, name } = this.props.field;
    this.state = { label: label || capitalize(name), option_field: oField || 'slug' };
    this.input = this.input.bind(this);
  }
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  }

  input() {
    const { field } = this.props;
    const { classes } = this.props;
    // if (custom) {
    //   delete custom.classes;
    //   delete custom.oField;
    // } // This Key Making Problems.

    // const inputChange = (e) => {
    //   input.onChange(e);
    //   if (onChange2) {
    //     onChange2(parseInt(e.target.value, 10));
    //   }
    // };

    if (this.props.visible === false) {
      return <span></span>;
    }

    // if (custom) {
    //   custom.visible = undefined;
    // } // This Key Making Problems.

    return (
      <FormControl
        className={classes.formControl}
        error={field.touched && field.hasError}
        fullWidth
      >
        {this.props.field.label && <InputLabel htmlFor={field.name}>{this.state.label}</InputLabel>}
        <Select
          native
          {...field.bind()}
          input={<Input id={field.name} />}
        >
          <option value="0" />
          {this.renderOptions()}
        </Select>
        {field.touched && field.hasError && 
          <FormHelperText error={field.touched && field.hasError}>{field.error}</FormHelperText>
        }
      </FormControl>
    );
  }
  renderOptions() {
    // The Magical Lodash
    return map(this.props.field.extra, (option) => (
      <option key={parseInt(option.id, 10)} value={parseInt(option.id, 10)}>
        {option[this.state.option_field]}
      </option>
    ));
  }
  render() {
    return (this.input());
  }
}

export default withStyles(styles)(SimpleSelect);
