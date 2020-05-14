require('dotenv').config()

const { CLIENT, DATABASE, PG_USER, PASSWORD, HOST, PG_PORT } = process.env

module.exports = {
    development: {
        client: CLIENT,
        connection: {
            database: DATABASE,
            user: PG_USER,
            password: process.env.PASSWORD||'12345',
            host: HOST,
            port: PG_PORT,
        },
        migrations: {
            directory: __dirname + '/database/migrations',
        },
        seeds: {
            directory: __dirname + '/database/seeds',
        },
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: process.env.PASSWORD||'12345',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },

    production: {
        client: 'postgresql',
        useNullAsDefault: true,
        connection: {
            database: 'my_db',
            user: 'username',
            password: process.env.PASSWORD||'12345',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: 'database/migrations',
        },
    },
}