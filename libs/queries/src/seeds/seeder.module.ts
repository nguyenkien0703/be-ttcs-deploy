import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from '@app/shares/config/configuration'
import { DatabaseModule } from '@app/queries/database/database.module'
import { CommentSeederModule } from '@app/queries/seeds/comment/comment.seeder.module'
import { EvalutionSeederModule } from '@app/queries/seeds/evalution/evalution.seeder.module'
import { LaptopSeederModule } from '@app/queries/seeds/laptop/laptop.seeder.module'
import { OrderSeederModule } from '@app/queries/seeds/order/order.seeder.module'
import { OrderDetailSeederModule } from '@app/queries/seeds/order-detail/order-detail.seeder.module'
import { RoleSeederModule } from '@app/queries/seeds/role/role.seeder.module'
import { UserSeederModule } from '@app/queries/seeds/user/user.seeder.module'
import { Seeder } from '@app/queries/seeds/seeder'

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
        }),
        DatabaseModule,
        CommentSeederModule,
        EvalutionSeederModule,
        LaptopSeederModule,
        OrderSeederModule,
        OrderDetailSeederModule,
        RoleSeederModule,
        UserSeederModule,
    ],
    providers: [Seeder],
    exports: [Seeder],
})
export class SeederModule {}
