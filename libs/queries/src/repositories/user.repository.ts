import { Repository } from 'typeorm'
import { CustomRepository } from '@app/shares'
import { Role, User } from '@app/queries/entities'
import { SignUpUserDto } from '@app/queries/dtos'
import { hashPassword } from '@app/shares/utils/bcrypt'

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    async getUserByEmail(email: string): Promise<User> {
        const queryBuilder = this.createQueryBuilder('users').leftJoinAndSelect(
            'users.role',
            'role',
        )
        queryBuilder.andWhere('users.email = :email', {
            email,
        })
        const user = await queryBuilder.getOne()
        return user
    }

    async signUpUser(signUpUserDto: SignUpUserDto, role: Role): Promise<User> {
        const { email, name, address, password, phone } = signUpUserDto
        const signUpedUser = await this.create({
            email: email,
            name: name,
            address: address,
            phone: phone,
            password: await hashPassword(password),
            roleId: role.id,
        })
        await signUpedUser.save()
        return signUpedUser
    }
}
