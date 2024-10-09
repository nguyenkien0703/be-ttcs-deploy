import { Module } from '@nestjs/common'
import { OrderSeederService } from '@app/queries/seeds/order/order.seeder.service'
import { TypeOrmExModule } from '@app/shares'
import { OrderRepository } from '@app/queries/repositories'

const repositories = TypeOrmExModule.forCustomRepository([OrderRepository])
@Module({
    imports: [repositories],
    providers: [OrderSeederService],
    exports: [OrderSeederService],
})
export class OrderSeederModule {}
