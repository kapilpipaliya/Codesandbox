import * as React from 'react';
import { observer } from 'mobx-react';
import { ToggleButton } from 'primereact/components/togglebutton/ToggleButton';
import isVisible from '../branch';

const handleChange = (field) => (event) => {

  field.onChange(event.value);
};

export default isVisible(observer(({field}) => <ToggleButton style={{'width': '50px'}} checked={field.value} onChange={handleChange(field)}/>));
