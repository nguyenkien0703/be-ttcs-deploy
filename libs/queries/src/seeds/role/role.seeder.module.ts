import { TypeOrmExModule } from '@app/shares'
import { RoleRepository } from '@app/queries/repositories'
import { Module } from '@nestjs/common'
import { RoleSeederService } from '@app/queries/seeds/role/role.seeder.service'

const repositories = TypeOrmExModule.forCustomRepository([RoleRepository])
@Module({
    imports: [repositories],
    providers: [RoleSeederService],
    exports: [RoleSeederService],
})
export class RoleSeederModule {}
