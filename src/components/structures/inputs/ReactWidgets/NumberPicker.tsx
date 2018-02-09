import * as React from 'react';
import { observer } from 'mobx-react';
import * as NumberPicker from 'react-widgets/lib/NumberPicker';
import { FormHelperText } from 'material-ui/Form';
import isVisible from '../branch';

const handleChange = (field) => (value) => {
  field.onChange(value);
};

export default isVisible(observer((props) => (
  <>
    <NumberPicker
      value={props.field.value}
      {...props.field.bind({onChange: handleChange(props.field), onBlur: () => props.field.onBlur(props.field.value)})}
      {...props}
    />
    {props.field.error && <FormHelperText id={props.field.id}>{props.field.error}</FormHelperText>}
  </>
)));
