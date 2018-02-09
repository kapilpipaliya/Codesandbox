import * as React from 'react';
import { observer } from 'mobx-react';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form'; // Exported With Defaul
import TextArea from 'semantic-ui-react/dist/commonjs/collections/Form/FormTextArea'; // Exported With Defaul
import { FormHelperText } from 'material-ui/Form';
import isVisible from '../branch';

export default isVisible(observer((props) => {
const field = props.field;
return (
  <>
    <TextArea
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
      {...props}
    />
    {field.error && <FormHelperText id={field.id}>{field.error}</FormHelperText>}
  </>
  );
}));

// Bug Error is not displaying..