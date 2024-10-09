import { TypeOrmExModule } from '@app/shares'
import { UserRepository } from '@app/queries/repositories'
import { Module } from '@nestjs/common'
import { UserSeederService } from '@app/queries/seeds/user/user.seeder.service'

const repositories = TypeOrmExModule.forCustomRepository([UserRepository])
@Module({
    imports: [repositories],
    providers: [UserSeederService],
    exports: [UserSeederService],
})
export class UserSeederModule {}
