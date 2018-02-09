import * as find from 'lodash/find';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default (query = {}) => {
  // Assume these usernames are in the database
  const db = [
    {'user': 'Claudio'},
    {'user': 'FoxHound'},
    {'user': 'SteveJobs'}
  ];

  return sleep(1500).
    then(() => console.log('async call ...')).
    then(() => find(db, query) || []);
};

