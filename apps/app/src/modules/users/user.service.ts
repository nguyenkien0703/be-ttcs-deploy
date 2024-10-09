import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserRepository } from '@app/queries'
import { User } from '@app/queries/entities/user.entity'
import { SignUpUserDto } from '@app/queries/dtos'
import { httpErrors } from '@app/shares/exeption-filter'
import { RoleService } from '../roles/role.service'
import { RoleEnum } from '@app/shares'

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly roleService: RoleService,
    ) {}

    async findUserByEmail(email: string): Promise<User> {
        const user = await this.userRepository.getUserByEmail(email)

        return user
    }

    async signUpUser(signUpUserDto: SignUpUserDto): Promise<User> {
        const { email } = signUpUserDto
        const existedUser = await this.userRepository.getUserByEmail(email)
        if (existedUser) {
            throw new HttpException(
                httpErrors.USER_EXISTED,
                HttpStatus.BAD_REQUEST,
            )
        }
        let createUser: User
        const roleUser = await this.roleService.getRoleByRoleName(RoleEnum.USER)
        try {
            createUser = await this.userRepository.signUpUser(
                signUpUserDto,
                roleUser,
            )
            delete createUser.password
            return createUser
        } catch (error) {
            throw new HttpException(
                {
                    message: error.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }
    }

    async getUserById(userId: number): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        })
        return user
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                email: email,
            },
        })
        return user
    }

    async getUserByResetPasswordToken(token: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                resetPasswordToken: token,
            },
        })
        return user
    }
}
