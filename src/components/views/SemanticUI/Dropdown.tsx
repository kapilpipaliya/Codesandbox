import * as React from 'react';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown'; // Exported With Default
// TODO: This is missing functionality for sub-menu here from SUI core examples.
// The "Publish To Web" item should contain a sub-menu.

const DropdownExampleDropdown = (props) => (
  <Dropdown text="Actions">
    <Dropdown.Menu>
      {props.children}
    </Dropdown.Menu>
  </Dropdown>
);

export default DropdownExampleDropdown;
