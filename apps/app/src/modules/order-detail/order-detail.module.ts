import { Module } from '@nestjs/common'
import { OrderDetailService } from './order-detail.service'

@Module({
    imports: [],
    controllers: [],
    providers: [OrderDetailService],
    exports: [OrderDetailService],
})
export class OrderDetailModule {}
