module.exports = {
	host: 'https://remote-consultant.herokuapp.com/',
	api: {
		port: process.env.PORT,
		baseUrl: 'https://remote-consultant.herokuapp.com/api/',
		logs: {
			warning: 'warnings.log',
			error: 'errors.log'
		}
	},
	db: {
		connectionString: process.env.DB_CONNECTION_STRING,
		databaseName: process.env.DB_NAME
	}
}