import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import configuration from '@app/shares/config/configuration'
import { DatabaseModule } from '@app/queries/database/database.module'
import { GlobalRepository } from './global-repositories/globla-repository.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './users/user.module'
import { RoleModule } from './roles/role.module'
import { LaptopModule } from './laptop/laptop.module'
import { CommentModule } from './comment/comment.module'
import { OrderModule } from './orders/order.module'
import { EvalutionModule } from './evalutions/evalution.module'
import { OrderDetailModule } from './order-detail/order-detail.module'
import { EmailModule } from './emails/email.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        DatabaseModule,
        GlobalRepository,
        AuthModule,
        UserModule,
        RoleModule,
        LaptopModule,
        CommentModule,
        OrderModule,
        EvalutionModule,
        OrderDetailModule,
        EmailModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
