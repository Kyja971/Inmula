db.createUser({
  user: 'boite_db_admin',
  pwd: 'admin',
  roles: [
    {
      role: 'dbOwner',
      db: 'boite_db',
    },
  ],
  mechanisms: ['SCRAM-SHA-256'],
});
