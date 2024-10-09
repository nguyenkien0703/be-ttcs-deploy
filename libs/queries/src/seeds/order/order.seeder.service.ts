import { Injectable, Logger } from '@nestjs/common'
import { OrderRepository } from '@app/queries/repositories'
import { InsertLaptopDto, laptopData } from '@app/queries/seeds/laptop/data'
import { Laptop, Order } from '@app/queries/entities'
import { InsertOrderDto, orderData } from '@app/queries/seeds/order/data'

@Injectable()
export class OrderSeederService {
    constructor(private readonly orderRepository: OrderRepository) {}

    async saveOneOrder(order: InsertOrderDto): Promise<Order> {
        const createOrder = await this.orderRepository.create(order)
        await createOrder.save()
        Logger.log('order________insertd__order_id: ' + createOrder.id)
        return createOrder
    }
    async seedOrder() {
        const savePromises = orderData.map((order) => this.saveOneOrder(order))
        Logger.debug('order_______start_seeding____')
        await Promise.all(savePromises)
        Logger.debug('order_______end_seeding____')
    }
}
