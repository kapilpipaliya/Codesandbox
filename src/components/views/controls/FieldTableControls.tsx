import * as React from 'react';
import { observer } from 'mobx-react';
import Button from 'structures/buttons/Button';
import $ from 'assets/stylesheets/styles';

export default observer(({field, controls = null}) => <span>

  {(!controls || controls.importLines) &&
      <Button
        onlyIcon
        text="Import Lines"
        type="button"
        icon="folder-open"
        label={field.label}
        // onClick={field.saveAs}
        className={$.fctrl}
      />}

  {(!controls || controls.saveAs) &&
      <Button
        onlyIcon
        text="Save As"
        type="button"
        icon="floppy-o"
        label={field.label}
        // onClick={field.saveAs}
        className={$.fctrl}
      />}

  {(!controls || controls.selectAll) &&
      <Button
        onlyIcon
        text="Delete"
        type="button"
        icon="check-square"
        label={field.label}
        // onClick={field.selectAll}
        className={$.fctrl}
      />}

  {(!controls || controls.clearAll) &&
      <Button
        onlyIcon
        text="Clear"
        type="button"
        icon="square-o"
        label={field.label}
        onClick={field.clearAll}
        className={$.fctrl}
      />}
  {(!controls || controls.excel) &&
      <Button
        onlyIcon
        text="Excel"
        type="button"
        icon="file-excel-o"
        label={field.label}
        onClick={field.clearAll}
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