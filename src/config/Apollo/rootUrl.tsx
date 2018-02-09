export const ROOT_URL = process.env.NODE_ENV === 'development'
  ? 'https://testu1-kapilp.c9users.io:8081'
  : 'https://scejewel.herokuapp.com';

const RAILS_PORT = 8081;
export const SUBSCRIPTION_URL = process.env.NODE_ENV === 'development'
  ? `wss://testu1-kapilp.c9users.io:${RAILS_PORT}`
  : `wss://scejewel.herokuapp.com:${RAILS_PORT}`;
