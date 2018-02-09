import * as React from 'react';
import { observer } from 'mobx-react';
// Import Select from 'react-select';
import Select from './react-selectTether';
import 'react-select/dist/react-select.css';
import { FormHelperText } from 'material-ui/Form';
import isVisible from '../branch';
export default isVisible(observer(({field, isLabelShow, labelKey, valueKey, multi, visible}) => {
    const extra = Array.isArray(field.extra) && field.extra.length > 0 && typeof field.extra[0] === 'object'
      ? field.extra
      : field.extra != null ? field.extra.map(elm => ({id: elm, slug: elm})) : null;
    return <div className="measure">
  {isLabelShow &&
        <label
          htmlFor={field.id}
          className="f7 db mb2 mt3 light-silver"
        >
          {field.label}
        </label>}
  <Select
    {...field.bind()}
    options={extra}
    resetValue={[]}
    labelKey={labelKey || 'slug'}
    valueKey={valueKey || 'id'}
    autoBlur
    multi={multi || false}
    clearable={false}
  />
  {field.error && <FormHelperText id={field.id}>{field.error}</FormHelperText>}
</div>; }));

/*
 * Multi
 * output hooks overrides valueKey
   {field.error && <div className="ui error message"><ul className="list"><li>{field.error}</li></ul></div> }
 */
