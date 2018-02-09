import * as React from 'react';
import { observer } from 'mobx-react';
import * as DropdownList from 'react-widgets/lib/DropdownList';
import isVisible from '../branch';

export default isVisible(observer(({field}) => <div className="measure">
  <label
    htmlFor={field.id}
    className="f7 db mb2 mt3 light-silver"
  >
    {field.label}
  </label>
  <DropdownList
    id={field.id}
    value={field.value}
    onChange={field.sync}
    data={field.extra ? field.extra : []}
  />
</div>));
