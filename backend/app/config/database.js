module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      // charset: env('DATABASE_CHARSET', 'utf8mb4'),
      connector: 'bookshelf',
      settings: {
        client: 'mysql',
        host: env('DATABASE_HOST', 'mysql'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'strapi'),
        username: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false),
        charset: "utf8mb4_unicode_ci"
      },
      options: {
        charset: "utf8mb4_unicode_ci"
      }
    },
  },
});
