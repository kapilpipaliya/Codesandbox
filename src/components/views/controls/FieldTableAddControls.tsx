import * as React from 'react';
import { observer } from 'mobx-react';
import Button from 'structures/buttons/Button';
import $ from 'assets/stylesheets/styles';

export default observer(({form, field, controls = null}) => <span>

  {(!controls || controls.addMetal) &&
      <Button
        onlyIcon
        text="Add Metal"
        type="button"
        icon="circle"
        label={field.label}
        onClick={() => form.calcAdd({addMetal: true})}
        className={$.fctrl}
      />}
      
  {(!controls || controls.addDiamond) &&
      <Button
        onlyIcon
        text="Add Diamond"
        type="button"
        icon="diamond"
        label={field.label}
        onClick={() => form.calcAdd({addDiamond: true})}
        className={$.fctrl}
      />}

  {(!controls || controls.addCS) &&
      <Button
        onlyIcon
        text="Add CS"
        type="button"
        icon="heart-o"
        label={field.label}
        onClick={() => form.calcAdd({addCS: true})}
        className={$.fctrl}
      />}

</span>);

  // {(!controls || controls.onReset) &&
  //     <Button
  //       onlyIcon
  //       text="Reset"
  //       type="button"
  //       icon="refresh"
  //       label={field.label}
  //       onClick={field.onReset}
  //       className={$.fctrl}
  //     />}