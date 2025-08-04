module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './nihongo.db'
    },
    migrations: {
      directory: './src/server/migrations'
    },
    useNullAsDefault: true
  }
};
