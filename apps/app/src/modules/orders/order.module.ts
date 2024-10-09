import { Module } from '@nestjs/common'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import { UserModule } from '../users/user.module'
import { OrderDetailModule } from '../order-detail/order-detail.module'
import { EmailModule } from '../emails/email.module'
import { LaptopModule } from '../laptop/laptop.module'

@Module({
    imports: [UserModule, OrderDetailModule, EmailModule, LaptopModule],
    controllers: [OrderController],
    providers: [OrderService],
    exports: [OrderService],
})
export class OrderModule {}
