import * as React from 'react';

import Paper from 'material-ui/Paper';
import { purple } from 'material-ui/colors';
import { Line, LineChart, ResponsiveContainer } from 'recharts';
import { withStyles } from 'material-ui/styles';

const white = purple[50];
const purple600 = purple[600];
const purple500 = purple[500];

const styles = (theme) => ({
  'root': theme.typography.button,
  'fontWeightMedium': theme.typography.fontWeightMedium,
  'fontWeightLight': theme.typography.fontWeightLight
});

const NewOrders = (props) => {
  const styles1 = {
    'paper': {
      'backgroundColor': purple500,
      'height': 150
    },
    'div': {
      'height': 95,
      'padding': '5px 15px 0 15px'
    },
    'header': {
      'fontSize': 24,
      'fontWeight': props.fontWeightLight,
      'color': white,
      'backgroundColor': purple600,
      'padding': 10
    }
  };

  return (
    <Paper style={styles1.paper}>
      <div style={{...styles1.header}}>New Orders</div>
      <div style={styles1.div}>
        <ResponsiveContainer>
          <LineChart data={props.data}>
            <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(NewOrders);
