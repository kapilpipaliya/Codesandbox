import * as React from 'react';
import { observer } from 'mobx-react';
import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox'; // Exported With Default
import isVisible from '../branch';

const handleChange = (field) => (event, data) => {
  field.onChange(data.checked);
};

export default isVisible(observer(({field}) => <Checkbox value={field.value} checked={field.value} onChange={handleChange(field)} slider/>));
