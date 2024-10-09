import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import {
    ChangePasswordDto,
    ForgotPasswordDto,
    LoginUserByPassword,
    RefreshTokenDto,
    ResetPasswordDto,
    SignUpUserDto,
} from '@app/queries/dtos'
import { JwtAuthGuard } from '@app/shares/guards/jwt-auth.guard'
import { UserScope } from '@app/shares/decorators/user.decorator'
import { User } from '@app/queries'

@Controller('auths')
@ApiTags('auths')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    //LoginUser By Email-Password
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async loginUserByPassword(@Body() loginByPassword: LoginUserByPassword) {
        const loginData =
            await this.authService.loginUserByPassword(loginByPassword)
        return loginData
    }

    // signup
    @Post('sign-up')
    @HttpCode(HttpStatus.CREATED)
    async signUpUser(@Body() signUpUserDto: SignUpUserDto) {
        const signUpedUser = await this.authService.signUpUser(signUpUserDto)
        return signUpedUser
    }

    @Post('/refresh-token')
    @HttpCode(HttpStatus.CREATED)
    async generateNewAccessJWT(@Body() refreshTokenDto: RefreshTokenDto) {
        const newAccessToken =
            await this.authService.generateNewAccessJWT(refreshTokenDto)
        return newAccessToken
    }
    @Post('/forgot-password')
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    async sendEmailForgotPassword(
        @Body() forgotPasswordDto: ForgotPasswordDto,
    ) {
        await this.authService.sendEmailForgotPassword(forgotPasswordDto)
        return 'Send reset password token to your email successfully!!!'
    }

    @Post('/email/verify/:token')
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    async verifyEmailAndResetPassword(
        @Param('token') linkToken: string,
        @Body() resetPasswordDto: ResetPasswordDto,
    ) {
        const isEmailVerify =
            await this.authService.verifyEmailAndResetPassword(
                linkToken,
                resetPasswordDto,
            )
        return isEmailVerify
    }

    @Post('/reset-password')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    async changePassword(
        @Body() changePasswordDto: ChangePasswordDto,
        @UserScope() user: User,
    ) {
        const userId = user?.id
        const changePassword = await this.authService.changePassword(
            userId,
            changePasswordDto,
        )
        return changePassword
    }
}
