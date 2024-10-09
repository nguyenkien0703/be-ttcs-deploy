import { Module } from '@nestjs/common'
import { EvalutionSeederService } from '@app/queries/seeds/evalution/evalution.seeder.service'
import { TypeOrmExModule } from '@app/shares'
import { EvalutionRepository } from '@app/queries/repositories'
const repositories = TypeOrmExModule.forCustomRepository([EvalutionRepository])

@Module({
    imports: [repositories],
    providers: [EvalutionSeederService],
    exports: [EvalutionSeederService],
})
export class EvalutionSeederModule {}
