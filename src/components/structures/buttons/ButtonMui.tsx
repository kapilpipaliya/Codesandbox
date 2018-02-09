import * as React from 'react';
import { observer } from 'mobx-react';
import * as isInteger from 'lodash/isInteger';
import * as isNil from 'lodash/isNil';
import * as parseInt from 'lodash/parseInt';
import Button from 'material-ui/Button';

const checkLabel = (text, label) => isInteger(parseInt(label)) || isNil(label)
  ? text : `${text} ${label}`;

export default observer(({
  onlyIcon = false,
  disabled = false,
  content = null,
  type = 'button',
  className,
  onClick,
  text,
  label,
  icon
}) => <Button
  type={type}
  disabled={disabled}
  onClick={onClick}
  className={className}
  data-tip={checkLabel(text, label)}
  style={{'color': 'orangered'}}
>
  {content ||
      <span>
        <i className={`fa fa-${icon} fa-2x`} />
        {!onlyIcon && <b className="dn di-ns"> {checkLabel(text, label)}</b>}
      </span>}
</Button>);
