import * as React from 'react';
import { observer } from 'mobx-react';
import TextField from 'material-ui/TextField';

export default observer(({
  field,
  validatingText = 'validating...'
}) => <div>
  <TextField
    error={field.touched && field.hasError}
    {...field.bind({validatingText})}
  /><br />
</div>);
