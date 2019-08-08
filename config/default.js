module.exports = {
	host: 'localhost',
	api: {
		port: 8080,
		baseUrl: 'http://localhost:8080/api/',
		secret: process.env.SECRET,
		logs: {
			warning: 'warnings.dev.log',
			error: 'errors.dev.log'
		}
	},
	db: {
		connectionString: process.env.DEV_DB_CONNECTION_STRING,
		databaseName: process.env.DEV_DB_NAME,
		options: {
			useNewUrlParser: true
		},
		maxDumpSize: 100000000
	},
	redis: {
		host: '127.0.0.1',
		port: '6379'
	},
	mailer: {
		user: process.env.MAIL_USER,
		password: process.env.MAIL_PASSWORD
	},
	defaults: {
		customerImage: 'https://pngimage.net/wp-content/uploads/2018/06/profile-png-5.png',
		companyImage: 'https://static.thenounproject.com/png/509354-200.png',
		consultantImage: 'https://pngimage.net/wp-content/uploads/2018/05/consultant-png-3.png',
		productImage: 'https://pngimage.net/wp-content/uploads/2018/06/icon-product-png-1.png'
	}
}