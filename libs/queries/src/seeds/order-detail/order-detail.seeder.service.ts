import { Injectable, Logger } from '@nestjs/common'
import { OrderDetailRepository } from '@app/queries/repositories'
import { OrderDetail } from '@app/queries/entities'
import {
    InsertOrderDetailDto,
    orderDetailData,
} from '@app/queries/seeds/order-detail/data'

@Injectable()
export class OrderDetailSeederService {
    constructor(
        private readonly orderDetailRepository: OrderDetailRepository,
    ) {}

    async saveOneOrderDetail(
        orderDetail: InsertOrderDetailDto,
    ): Promise<OrderDetail> {
        const createOrderDetail =
            await this.orderDetailRepository.create(orderDetail)
        await createOrderDetail.save()
        Logger.log(
            'order_detail________insertd__order_detail_id: ' +
                createOrderDetail.id,
        )
        return createOrderDetail
    }
    async seedOrderDetail() {
        const savePromises = orderDetailData.map((orderDetail) =>
            this.saveOneOrderDetail(orderDetail),
        )
        Logger.debug('order__detail_______start_seeding____')
        await Promise.all(savePromises)
        Logger.debug('order__detail_______end_seeding____')
    }
}
