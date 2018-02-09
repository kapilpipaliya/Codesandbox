import * as React from 'react';
import { observer } from 'mobx-react';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import NumberFormat from 'react-number-format';

class NumberFormatCustom1 extends React.Component {
  render() {
    const { onChange, custom, ...noOnChange } = this.props;
    const onMyChange = (values) => {
      onChange(values.value);
    };
    return (
      <NumberFormat
        {...noOnChange}
        {...custom}
        onValueChange={onMyChange}
      />
    );
  }
}

@observer
export default class NumberFormatCustom extends React.Component {
  render() {
    const field = this.props.field;
    return (
      <FormControl error={field.touched && field.hasError}>
        {field.label && <InputLabel htmlFor={field.id}>{field.label}</InputLabel>}
        <Input
          {...field.bind()}
          inputComponent={NumberFormatCustom1}
          inputProps={{
            custom: this.props.inputProps,
          }}
        />
        {field.touched &&
          field.error &&
          <FormHelperText error={field.touched && field.invalid}>
            {field.touched && field.error}
          </FormHelperText>}
      </FormControl>
    );
  }
}
