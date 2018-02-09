import * as React from 'react';
import { observer } from 'mobx-react';
import * as map from 'lodash/map';
import isVisible from '../branch';

function renderOptions(extra) {
  // The Magical Lodash
  return map(extra, (option) => <option key={parseInt(option.id, 10)} value={parseInt(option.id, 10)}>
    {option.slug}
  </option>);
}

export default isVisible(observer(({field}) => <div className="measure">
  <label
    htmlFor={field.id}
    className="f7 db mb2 mt3 light-silver"
  >
    {field.label}
  </label>
  <select {...field.bind()}>
    {renderOptions(field.extra)}
  </select>
</div>));
