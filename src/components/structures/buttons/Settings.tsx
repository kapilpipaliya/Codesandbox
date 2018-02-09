import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import SettingsIcon from 'material-ui-icons/Settings';

const styles = (theme) => ({'button': {'margin': theme.spacing.unit}});

function FloatingActionButtons(props) {
  const {classes} = props;
  return (
    <div>
      <Button variant="fab" mini aria-label="Settings" className={classes.button}>
        <SettingsIcon />
      </Button>
    </div>
  );
}

export default withStyles(styles)(FloatingActionButtons);
