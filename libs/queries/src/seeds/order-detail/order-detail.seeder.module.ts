import { TypeOrmExModule } from '@app/shares'
import { OrderDetailRepository } from '@app/queries/repositories'
import { Module } from '@nestjs/common'
import { OrderDetailSeederService } from '@app/queries/seeds/order-detail/order-detail.seeder.service'

const repositories = TypeOrmExModule.forCustomRepository([
    OrderDetailRepository,
])
@Module({
    imports: [repositories],
    providers: [OrderDetailSeederService],
    exports: [OrderDetailSeederService],
})
export class OrderDetailSeederModule {}
