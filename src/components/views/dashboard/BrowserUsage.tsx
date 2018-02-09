import * as React from 'react';

import Paper from 'material-ui/Paper';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemText } from 'material-ui/List';

const BrowserUsage = (props) => {
  const styles = {
    'paper': {
      'minHeight': 344,
      'padding': 10
    },
    'legend': {'paddingTop': 20},
    'pieChartDiv': {
      'height': 290,
      'textAlign': 'center'
    }
  };

  return (
    <Paper style={styles.paper}>
      <span >Browser Usage</span>

      <div />

      <div className="row">
        <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
          <div style={styles.pieChartDiv}>
            <ResponsiveContainer>
              <PieChart>
                <Pie dataKey="uv" innerRadius={80} outerRadius={130} data={props.data} fill="#8884d8">
                  {props.data.map((item) => <Cell key={item.name} fill={item.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
          <div style={styles.legend}>
            <div style={styles.legend}>
              <List>
                {props.data.map((item) => <ListItem key={item.name}>
                  <Avatar style={{'backgroundColor': item.color}}>{item.icon}</Avatar>
                  <ListItemText primary={item.name} />
                </ListItem>)}
              </List>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default BrowserUsage;
