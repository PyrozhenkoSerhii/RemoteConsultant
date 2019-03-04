import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

const env = process.env.NODE_ENV || 'dev'

const dev = {
    api: {
        port: parseInt(process.env.DEV_API_PORT) || 8080,
        secret: process.env.DEV_JWT_SECRET || 'secret',
        logs: {
            warning: 'warnings.dev.log',
            error: 'errors.dev.log'
        }
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: parseInt(process.env.DEV_DB_PORT) || 27017,
        connectionString: process.env.DEV_DB_CONNECTION_STRING || 'Enter your DB connString',
        databaseName: process.env.DEV_DB_NAME || 'devDB',
        options: {
            useNewUrlParser: true
        },
        maxDumpSize: process.env.MAX_DUMP_SIZE || 10e7 
    },
    redis: {
        host: process.env.REDIS_URL || '127.0.0.1',
        port: process.env.REDIS_PORT || '6379'
    },
    urls: {
        emailVerifyingBase: process.env.EMAIL_VERIFYING_BASE || 'http://localhost:8080/users/verifying/',
        passwordResetBase: process.env.PASSWORD_RESET_BASE || 'http://localhost:8080/users/resetPasswordConfirm/'
    },
    defaults: {
        customerImage: 'https://pngimage.net/wp-content/uploads/2018/06/profile-png-5.png',
        companyImage: 'https://static.thenounproject.com/png/509354-200.png',
        consultantImage: 'https://pngimage.net/wp-content/uploads/2018/05/consultant-png-3.png',
        productImage: 'https://pngimage.net/wp-content/uploads/2018/06/icon-product-png-1.png'
    }
}

const prod = {
    api: {
        port: parseInt(process.env.PORT),
        secret: process.env.SECRET,
        logs: {
            warning: 'warnings.log',
            error: 'errors.log'
        }
    },
    db: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        connectionString: process.env.DB_CONNECTION_STRING,
        databaseName: process.env.DB_NAME,
        options: {
            useNewUrlParser: true
        },
        maxDumpSize: process.env.MAX_DUMP_SIZE 
    },
    urls: {
        emailVerifyingBase: process.env.EMAIL_VERIFYING_BASE,
        passwordResetBase: process.env.PASSWORD_RESET_BASE
    },
    redis: {
        host: process.env.REDIS_URL,
        port: process.env.REDIS_PORT
    },
    defaults: {
        customerImage: 'https://pngimage.net/wp-content/uploads/2018/06/profile-png-5.png',
        companyImage: 'https://static.thenounproject.com/png/509354-200.png',
        consultantImage: 'https://pngimage.net/wp-content/uploads/2018/05/consultant-png-3.png',
        productImage: 'https://pngimage.net/wp-content/uploads/2018/06/icon-product-png-1.png'
    }
}

const test = {
    api: {
        port: 8080,
        secret: 'secret',
        logs: {
            warning: 'warnings.test.log',
            error: 'errors.test.log'
        }

    },
    db: {
        host: 'localhost',
        port: 27017,
        connectionString: process.env.TEST_DB_CONNECTION_STRING || 'mongodb://192.168.2.111/test',
        databaseName: process.env.TEST_DB_NAME || 'test database',
        options: {
            useNewUrlParser: true
        },
        maxDumpSize: 10e7 
    },
    redis: {
        host: '127.0.0.1',
        port: '6379'
    },
    urls: {
        emailVerifyingBase: 'http://localhost:8080/users/verifying/',
        passwordResetBase: 'http://localhost:8080/users/resetPasswordConfirm/'
    },
    defaults: {
        customerImage: 'https://pngimage.net/wp-content/uploads/2018/06/profile-png-5.png',
        companyImage: 'https://static.thenounproject.com/png/509354-200.png',
        consultantImage: 'https://pngimage.net/wp-content/uploads/2018/05/consultant-png-3.png',
        productImage: 'https://pngimage.net/wp-content/uploads/2018/06/icon-product-png-1.png'
    }
}


const config = {
    dev,
    prod,
    test
}

module.exports = config[env]