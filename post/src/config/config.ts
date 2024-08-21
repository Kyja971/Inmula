export default () => ({
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    name: process.env.DATABASE_NAME,
    user: {
      name: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    },
  },
});
