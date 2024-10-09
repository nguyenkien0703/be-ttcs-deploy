import { Injectable, Logger } from '@nestjs/common'
import { UserRepository } from '@app/queries/repositories'
import { User } from '@app/queries/entities'
import { InsertUserDto, userData } from '@app/queries/seeds/user/data'

@Injectable()
export class UserSeederService {
    constructor(private readonly userRepository: UserRepository) {}

    async saveOneUser(user: InsertUserDto): Promise<User> {
        const createUser = await this.userRepository.create(user)
        await createUser.save()
        Logger.log('user________insertd__user_id: ' + createUser.id)
        return createUser
    }

    async seedUser() {
        const savePromises = userData.map((user) => this.saveOneUser(user))
        Logger.debug('user_______start_seeding____')
        await Promise.all(savePromises)
        Logger.debug('user_______end_seeding____')
    }
}
