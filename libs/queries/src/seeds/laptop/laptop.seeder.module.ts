import { Module } from '@nestjs/common'
import { LaptopSeederService } from '@app/queries/seeds/laptop/laptop.seeder.service'
import { TypeOrmExModule } from '@app/shares'
import { LaptopRepository } from '@app/queries/repositories'
const repositories = TypeOrmExModule.forCustomRepository([LaptopRepository])

@Module({
    imports: [repositories],
    providers: [LaptopSeederService],
    exports: [LaptopSeederService],
})
export class LaptopSeederModule {}
