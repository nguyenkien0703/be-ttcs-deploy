import { Injectable } from '@nestjs/common'
import { OrderDetail, OrderDetailRepository } from '@app/queries'
import { LaptopDto } from '@app/queries/dtos'
import { Pagination } from 'nestjs-typeorm-paginate'
import { GetAllOrderDto } from '@app/queries/dtos/order.dto'

@Injectable()
export class OrderDetailService {
    constructor(
        private readonly orderDetailRepository: OrderDetailRepository,
    ) {}

    async createOrderDetail(
        orderId: number,
        userId: number,
        laptopDto: LaptopDto,
    ): Promise<OrderDetail> {
        const orderDetail = await this.orderDetailRepository.createOrderDetail(
            orderId,
            userId,
            laptopDto,
        )
        return orderDetail
    }

    async getAllOrderByUserId(
        getAllOrderDto: GetAllOrderDto,
        userId: number,
    ): Promise<Pagination<OrderDetail>> {
        const orders = await this.orderDetailRepository.getAllOrderByUserId(
            getAllOrderDto,
            userId,
        )
        return orders
    }
}
