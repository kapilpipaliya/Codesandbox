import * as React from 'react';
import { observer } from 'mobx-react';
import * as DateTimePicker from 'react-widgets/lib/DateTimePicker';
import { FormHelperText } from 'material-ui/Form';
import isVisible from '../branch';

export default isVisible(observer(({field}) => <div className="measure">
  {/* <label
      htmlFor={field.id}
      className="f7 db mb2 mt3 light-silver"
    >
      {field.label}
    </label>*/}
  <DateTimePicker
    {...field.bind({'onChange': field.sync})}
    time={true}
  />
  {field.error && <FormHelperText id={field.id}>{field.error}</FormHelperText>}
</div>));
