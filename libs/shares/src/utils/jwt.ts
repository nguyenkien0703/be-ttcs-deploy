import configuration from '@app/shares/config/configuration'
import * as jwt from 'jsonwebtoken'
import * as crypto from 'crypto'

export const generateCryptoToken = (): string => {
    const resetToken = crypto.randomBytes(20).toString('hex')
    return crypto.createHash('sha256').update(resetToken).digest('hex')
}

export const generateAccessJWT = (data, options = {}) => {
    const key = configuration().api.accessJwtSecretKey
    return jwt.sign(data, key, options)
}

export const generateRefreshTokenJWT = (data, options = {}) => {
    const key = configuration().api.refreshJwtSecretKey
    return jwt.sign(data, key, options)
}

export const verifyRefreshJWT = async (token, options = {}) => {
    const key = configuration().api.refreshJwtSecretKey
    return await jwt.verify(token, key, options)
}

export const verifyAccessJWT = async (token, options = {}) => {
    const key = configuration().api.accessJwtSecretKey
    return await jwt.verify(token, key, options)
}
