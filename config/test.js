module.exports = {
	api: {
		logs: {
			warning: 'warnings.test.log',
			error: 'errors.test.log'
		}
	},
	db: {
		connectionString: process.env.TEST_DB_CONNECTION_STRING,
		databaseName: process.env.TEST_DB_NAME
	}
}