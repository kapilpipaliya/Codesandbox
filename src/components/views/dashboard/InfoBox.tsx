import * as React from 'react';

import Paper from 'material-ui/Paper';
import { grey } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';

const styles = (theme) => ({
  root: theme.typography.button,
  fontWeightMedium: theme.typography.fontWeightMedium,
  fontWeightLight: theme.typography.fontWeightLight,
});

const grey800 = grey[800];
const white = grey[50];

@withStyles(styles)
class InfoBox extends React.Component {
  render() {
    const {
      color, title, value, Icon,
    } = this.props;

    const styles1 = {
      content: {
        padding: '5px 10px',
        marginLeft: 90,
        height: 80,
      },
      number: {
        display: 'block',
        fontWeight: this.props.fontWeightMedium,
        fontSize: 18,
        color: grey800,
      },
      text: {
        fontSize: 20,
        fontWeight: this.props.fontWeightLight,
        color: grey800,
      },
      iconSpan: {
        float: 'left',
        height: 90,
        width: 90,
        textAlign: 'center',
        backgroundColor: color,
      },
      icon: {
        height: 48,
        width: 48,
        marginTop: 20,
        maxWidth: '100%',

      },
    };

    return (
      <Paper>
        <span style={styles1.iconSpan}>
          <Icon
            color={white}
            style={styles1.icon}
          />
        </span>

        <div style={styles1.content}>
          <span style={styles1.text}>{title}</span>
          <span style={styles1.number}>{value}</span>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(InfoBox);
