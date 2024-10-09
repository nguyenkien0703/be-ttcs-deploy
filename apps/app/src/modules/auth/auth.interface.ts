import { User } from '@app/queries/entities/user.entity'

export interface LoginResponseData {
    accessToken: string
    refreshToken: string
    userData: User
}

export interface GenerateAccessJWTData {
    accessToken: string
}
