module.exports = {
  development: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: 'mysql',
    timezone: '+07:00',
    dialectOptions: {
      bigNumberStrings: true,
    },
    define: {
      freezeTableName: 1,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
  production: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: 'postgres',
    timezone: '+07:00',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    define: {
      freezeTableName: 1,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
}
