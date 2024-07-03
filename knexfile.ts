import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      user: 'postgres.gxudmhvxiqrvfsxglirz',
      password: 'KyTqYYRzXcXPNVVi',
      port: 6543,
      host: 'aws-0-ap-southeast-1.pooler.supabase.com',
      database: 'postgres',
    },
    migrations: {
      directory: './src/migrations',  // Path to your migrations directory
    },
    seeds: {
      directory: './src/seeds',  // Path to your seeds directory
    },
  },
};

module.exports = config;
