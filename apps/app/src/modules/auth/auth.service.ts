import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import {
    ChangePasswordDto,
    ForgotPasswordDto,
    LoginUserByPassword,
    RefreshTokenDto,
    ResetPasswordDto,
    SignUpUserDto,
} from '@app/queries/dtos'
import { GenerateAccessJWTData, LoginResponseData } from './auth.interface'
import { UserService } from '../users/user.service'
import { httpErrors } from '@app/shares/exeption-filter'
import { comparePasswordUser, hashPassword } from '@app/shares/utils/bcrypt'
import { User } from '@app/queries/entities/user.entity'
import {
    generateAccessJWT,
    generateCryptoToken,
    generateRefreshTokenJWT,
    verifyRefreshJWT,
} from '@app/shares/utils/jwt'
import { ConfigService } from '@nestjs/config'
import { TOKEN_VERIFY_EMAIL_EXPIRE_IN_MILISECOND } from '@app/shares/constants/user.const'
import { EmailService } from '../emails/email.service'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly emailService: EmailService,
        private readonly configService: ConfigService,
    ) {}

    async loginUserByPassword(
        loginByPassword: LoginUserByPassword,
    ): Promise<LoginResponseData> {
        const { email, password } = loginByPassword
        const user = await this.userService.findUserByEmail(email)
        if (!user) {
            throw new HttpException(
                httpErrors.USER_NOT_FOUND,
                HttpStatus.NOT_FOUND,
            )
        }
        // console.log(email, '---', password)
        // console.log('user.password---',user.password)
        // console.log('await hashPassword(password)---',await hashPassword("nguyenkien"))
        const checkPassword = await comparePasswordUser(password, user.password)
        if (!checkPassword) {
            throw new HttpException(
                httpErrors.USER_INVALID_PASSWORD,
                HttpStatus.FORBIDDEN,
            )
        }
        const { userData, accessToken, refreshToken } =
            await this.generateResponseLoginData(user)
        return {
            userData,
            accessToken,
            refreshToken,
        }
    }
    async generateResponseLoginData(user: User): Promise<LoginResponseData> {
        let accessToken
        let refreshToken
        let userData

        try {
            userData = {
                id: user.id,
                email: user.email,
                name: user.name,
                address: user.address,
                role: user.role.roleName,
            }

            accessToken = generateAccessJWT(userData, {
                expiresIn: Number(
                    this.configService.get('api.accessTokenExpireInSec'),
                ),
            })

            refreshToken = generateRefreshTokenJWT(userData, {
                expiresIn: Number(
                    this.configService.get('api.refreshTokenExpireInSec'),
                ),
            })
        } catch (error) {
            throw new HttpException(
                {
                    message: error.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }

        return {
            userData,
            accessToken,
            refreshToken,
        }
    }
    async generateNewAccessJWT(
        refreshTokenDto: RefreshTokenDto,
    ): Promise<GenerateAccessJWTData> {
        const refreshToken = refreshTokenDto.refreshToken
        let payload
        try {
            payload = await verifyRefreshJWT(refreshToken)
        } catch (error) {
            throw new HttpException(
                {
                    message: error.message,
                },
                HttpStatus.UNAUTHORIZED,
            )
        }
        const accessToken = generateAccessJWT(payload)
        return accessToken
    }

    async signUpUser(signUpUserDto: SignUpUserDto) {
        const signUpedUser = await this.userService.signUpUser(signUpUserDto)
        return signUpedUser
    }

    async sendEmailForgotPassword(forgotPasswordDto: ForgotPasswordDto) {
        const { email } = forgotPasswordDto
        const existedUser = await this.userService.getUserByEmail(email)
        if (!existedUser) {
            throw new HttpException(
                httpErrors.USER_NOT_FOUND,
                HttpStatus.NOT_FOUND,
            )
        }
        existedUser.resetPasswordToken = generateCryptoToken()
        existedUser.resetPasswordExpireTime = new Date(
            Date.now() + TOKEN_VERIFY_EMAIL_EXPIRE_IN_MILISECOND,
        )
        await existedUser.save()

        try {
            await this.emailService.sendEmailConfirmResetPassword(existedUser)
        } catch (error) {
            throw new HttpException(
                httpErrors.RESET_PASSWORD_TOKEN_SEND_FAILED,
                HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }
    }

    async verifyEmailAndResetPassword(
        linkToken: string,
        resetPasswordDto: ResetPasswordDto,
    ): Promise<string> {
        const { password, confirmPassword } = resetPasswordDto
        const user =
            await this.userService.getUserByResetPasswordToken(linkToken)
        if (!user) {
            throw new HttpException(
                httpErrors.USER_NOT_FOUND,
                HttpStatus.NOT_FOUND,
            )
        }
        const currentTime = new Date()
        const expiredLinkToken = user.resetPasswordExpireTime
        if (currentTime > expiredLinkToken) {
            throw new HttpException(
                httpErrors.RESET_PASSWORD_TOKEN_EXPIRED,
                HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }
        const newPasswordHashed = await hashPassword(password)
        user.password = newPasswordHashed
        await user.save()

        return 'Reset Password Successfully'
    }

    async changePassword(userId: number, changePasswordDto: ChangePasswordDto) {
        const { currentPassword, newPassword } = changePasswordDto
        const existedUser = await this.userService.getUserById(userId)
        if (!existedUser) {
            throw new HttpException(
                httpErrors.USER_NOT_FOUND,
                HttpStatus.NOT_FOUND,
            )
        }
        const checkPassword = await comparePasswordUser(
            currentPassword,
            existedUser.password,
        )
        if (!checkPassword) {
            throw new HttpException(
                httpErrors.USER_INVALID_PASSWORD,
                HttpStatus.FORBIDDEN,
            )
        }
        const hashedNewPassword = await hashPassword(newPassword)
        existedUser.password = hashedNewPassword
        await existedUser.save()

        return 'Change Password successfully!!!'
    }
}
