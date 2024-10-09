import { Repository } from 'typeorm'
import { CustomRepository } from '@app/shares'
import { Order } from '@app/queries/entities'
@CustomRepository(Order)
export class OrderRepository extends Repository<Order> {
    async createOrder(
        address: string,
        name: string,
        phone: string,
        userId: number,
    ): Promise<Order> {
        const order = await this.create({
            address: address,
            name: name,
            phone: phone,
            userId: userId,
        })
        await order.save()
        return order
    }
}
