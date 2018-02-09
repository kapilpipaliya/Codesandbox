import * as React from 'react';
// Import styled from 'styled-components';
import { observer } from 'mobx-react';
import { InputNumber } from 'antd';
import isVisible from '../branch';

export default isVisible(observer(({field}) => <InputNumber {...field.bind()} />));
