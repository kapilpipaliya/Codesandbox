import * as React from 'react';

import Paper from 'material-ui/Paper';
import { pink } from 'material-ui/colors';
import { Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts';

const white = pink[50];
const pink600 = pink[600];
const pink500 = pink[500];

const MonthlySales = (props) => {
  const styles = {
    'paper': {
      'backgroundColor': pink600,
      'height': 150
    },
    'div': {
      'marginLeft': 'auto',
      'marginRight': 'auto',
      'width': '95%',
      'height': 85
    },
    'header': {
      'color': white,
      'backgroundColor': pink500,
      'padding': 10
    }
  };

  return (
    <Paper style={styles.paper}>
      <div >Monthly Sales</div>
      <div style={styles.div}>
        <ResponsiveContainer>
          <BarChart data={props.data}>
            <Bar dataKey="uv" fill={pink500} />
            <XAxis dataKey="name" stroke="none" tick={{'fill': white}} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

export default MonthlySales;
