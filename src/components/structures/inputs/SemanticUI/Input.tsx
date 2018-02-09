import * as React from 'react';
import { observer } from 'mobx-react';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input'; // Exported With Defaul
import { FormHelperText } from 'material-ui/Form';
import isVisible from '../branch';

export default isVisible(observer((props) => {
const field = props.field;
return (
    <>
    <Input fluid
      // autoFocus={field.autoFocus}
      // checked={field.checked}
      disabled={field.disabled}
      id={field.id}
      // name={field.name}
      onBlur={field.onBlur}
      onChange={field.onChange}
      onFocus={field.onFocus}
      placeholder={field.placeholder}
      type={field.type}
      value={field.value}
      error={field.error ? true : false}
      size="mini"
      {...props}
    />
    {field.error && <FormHelperText id={field.id}>{field.error}</FormHelperText>}
  </>
  );
}));

// onBlur={field.onBlur} and onFocus={field.onFocus} Combination required

    // if (this.props.visible === false) {
    //   return <span></span>;
    // }