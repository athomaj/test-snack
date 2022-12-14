const path = require('path');

module.exports = ({ env }) => ({
  // connection: {
  //   client: 'sqlite',
  //   connection: {
  //     filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
  //   },
  //   useNullAsDefault: true,
  // },
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', ''),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', ''),
      user: env('DATABASE_USERNAME', ''),
      password: env('DATABASE_PASSWORD', ''),
      ssl: env.bool('DATABASE_SSL', false),
    },
    acquireConnectionTimeout: env.int(
      "DATABASE_ACQUIRE_CONNECTION_TIMEOUT",
      300000
    ),
  },
});