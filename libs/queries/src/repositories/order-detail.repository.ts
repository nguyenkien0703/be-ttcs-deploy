import { Repository } from 'typeorm'
import { OrderDetail } from '@app/queries/entities'
import { CustomRepository } from '@app/shares'
import { LaptopDto } from '@app/queries/dtos'
import { paginate, Pagination } from 'nestjs-typeorm-paginate'
import { GetAllOrderDto } from '@app/queries/dtos/order.dto'

@CustomRepository(OrderDetail)
export class OrderDetailRepository extends Repository<OrderDetail> {
    async createOrderDetail(
        orderId: number,
        userId: number,
        laptopDto: LaptopDto,
    ): Promise<OrderDetail> {
        const { laptopId, quantity } = laptopDto
        const orderDetail = await this.create({
            laptopId: laptopId,
            quantity: quantity,
            userId: userId,
            orderId: orderId,
        })
        await orderDetail.save()
        return orderDetail
    }

    async getAllOrderByUserId(
        options: GetAllOrderDto,
        userId: number,
    ): Promise<Pagination<OrderDetail>> {
        const { page, limit } = options
        const queryBuilder = this.createQueryBuilder('order_details')
            .select([
                'order_details.id',
                'order_details.laptopId',
                'order_details.userId',
                'order_details.quantity',
            ])
            .leftJoin('order_details.laptop', 'laptop')
            .addSelect([
                'laptop.name',
                'laptop.id',
                'laptop.price',
                'laptop.image',
            ])

        return paginate(queryBuilder, { page, limit })
    }
}
