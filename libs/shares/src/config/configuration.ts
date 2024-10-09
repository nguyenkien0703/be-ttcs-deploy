import * as dotenv from 'dotenv'
import * as process from 'process'
import { isBoolean } from 'class-validator'
dotenv.config()

interface Configuration {
    database: {
        host: string
        port: number
        name: string
        user: string
        password: string
        type: string
        logging: boolean
        synchronize: boolean
    }
    api: {
        port: number
        prefix: string
        accessJwtSecretKey: string
        refreshJwtSecretKey: string
        accessTokenExpireInSec: number
        refreshTokenExpireInSec: number
        secretUserPasswordKey: string
    }
    email: {
        host: string
        // port: number;
        secure: boolean
        auth: {
            user: string
            password: string
        }
        cc_emails: Array<string>
    }
    fe: {
        port: number
        ipAddress: string
    }
}
export default (): Configuration => ({
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        name: process.env.DB_NAME || 'laptop',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '19091978chinh',
        type: process.env.DB_TYPE || 'mysql',
        logging: process.env.DB_LOGGING === 'true',
        synchronize: process.env.DB_SYNC === 'true',
    },
    api: {
        port: parseInt(process.env.API_PORT, 10) || 4000,
        prefix: process.env.API_PREFIX || 'api',
        accessJwtSecretKey: process.env.ACCESS_JWT_SECRET_KEY || '',
        refreshJwtSecretKey: process.env.REFRESH_JWT_SECRET_KEY || '',
        accessTokenExpireInSec: parseInt(
            process.env.ACCESS_TOKEN_EXPIRE_IN_SEC,
            10,
        ),
        refreshTokenExpireInSec: parseInt(
            process.env.REFRESH_TOKEN_EXPIRE_IN_SEC,
            10,
        ),
        secretUserPasswordKey: process.env.PASSWORD_SECRET_KEY_USER,
    },
    email: {
        host: process.env.EMAIL_HOST,
        // port: parseInt(process.env.EMAIL_PORT,10),
        secure: isBoolean(process.env.EMAIL_SECURE),
        auth: {
            user: process.env.EMAIL_USER,
            password: process.env.EMAIL_PASSWORD,
        },
        cc_emails: (process.env.CC_EMAILS || '').split(','),
    },
    fe: {
        port: parseInt(process.env.FE_PORT, 10) || 3001,
        ipAddress: process.env.IP_ADDRESS,
    },
})
