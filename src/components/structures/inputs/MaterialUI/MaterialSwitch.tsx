import * as React from 'react';
import { observer } from 'mobx-react';
import Switch from 'material-ui/Switch';
import { FormHelperText } from 'material-ui/Form';
import isVisible from '../branch';

const handleChange = (field) => (event, checked) => {
  field.onChange(checked);
};
  
export default isVisible(observer((props) => (
  <>
    <Switch
      checked={props.field.value}
      {...props.field.bind({onChange: handleChange(props.field), onBlur: () => props.field.onBlur(props.field.value), value: ''})}
      {...props} 
    />
    {props.field.error && <FormHelperText id={props.field.id}>{props.field.error}</FormHelperText>}
  </>
)));

// Value Should be passed string