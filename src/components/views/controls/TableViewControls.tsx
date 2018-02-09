import * as React from 'react';
import { observer } from 'mobx-react';
import Button from 'structures/buttons/Button';
import $ from 'assets/stylesheets/styles';

export default observer(({field, controls = null}) => <span>

  {(!controls || controls.tableView) &&
      <Button
        onlyIcon
        text="Table View"
        type="button"
        icon="table"
        // label={field.label}
        // onClick={field.saveAs}
        className={$.fctrl}
      />}

  {(!controls || controls.listView) &&
      <Button
        onlyIcon
        text="Save As"
        type="button"
        icon="list"
        // label={field.label}
        // onClick={field.saveAs}
        className={$.fctrl}
      />}

  {(!controls || controls.thListView) &&
      <Button
        onlyIcon
        text="TH List View"
        type="button"
        icon="th-list"
        // label={field.label}
        // onClick={field.selectAll}
        className={$.fctrl}
      />}

  {(!controls || controls.thView) &&
      <Button
        onlyIcon
        text="Clear"
        type="button"
        icon="th"
        // label={field.label}
        // onClick={field.clearAll}
        className={$.fctrl}
      />}
      
  {(!controls || controls.thLargeView) &&
      <Button
        onlyIcon
        text="Clear"
        type="button"
        icon="th-large"
        // label={field.label}
        // onClick={field.clearAll}
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