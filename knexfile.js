// Update with your config settings.
require("dotenv").config();
module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    // client: "postgresql",
    // connection: {
    //   database: "postgres",
    //   user: "postgres",
    //   password: "Ganesh23" || "12345",
    //   host: "127.0.0.1",
    //   port: 5432,
    // },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { directory: "./data/seeds" },
  },
  
  testing:{
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./data/migrations",
    }
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./data/migrations",
    },
  },
};
