import * as React from 'react';
import TextField from 'material-ui/TextField';
import { blue } from 'material-ui/colors';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui-icons/Search';

const white = blue[50];
const blue500 = blue[50];

const SearchBox = () => {
  const styles = {
    'iconButton': {
      'float': 'left',
      'paddingTop': 17
    },
    'textField': {
      'color': white,
      'backgroundColor': blue500,
      'borderRadius': 2,
      'height': 35
    },
    'inputStyle': {
      'color': white,
      'paddingLeft': 5
    },
    'hintStyle': {
      'height': 16,
      'paddingLeft': 5,
      'color': white
    }
  };

  return (
    <div>
      <IconButton style={styles.iconButton}>
        <Search color={white} />
      </IconButton>
      <TextField
        hintText="Search..."
        underlineShow={false}
        fullWidth
        style={styles.textField}
        inputStyle={styles.inputStyle}
        hintStyle={styles.hintStyle}
      />
    </div>
  );
};

export default SearchBox;
