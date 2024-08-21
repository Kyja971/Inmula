db.createUser({
	user: 'intern_db_admin',
	pwd: 'admin',
	roles: [
		{
			role: 'dbOwner',
			db: 'intern_db_admin'
		}
	],
	mechanisms: ['SCRAM-SHA-256']
})
