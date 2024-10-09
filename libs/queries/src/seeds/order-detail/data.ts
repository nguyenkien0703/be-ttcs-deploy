import { PartialType } from '@nestjs/swagger'
import { OrderDetail } from '@app/queries/entities'

export class InsertOrderDetailDto extends PartialType(OrderDetail) {}

export const orderDetailData: InsertOrderDetailDto[] = [
    {
        orderId: 1,
        laptopId: 1,
        quantity: 1,
        userId: 1,
    },
    {
        orderId: 1,
        laptopId: 2,
        quantity: 2,
        userId: 1,
    },
    {
        orderId: 2,
        laptopId: 7,
        quantity: 1,
        userId: 1,
    },
    {
        orderId: 3,
        laptopId: 10,
        quantity: 1,
        userId: 1,
    },
    {
        orderId: 4,
        laptopId: 11,
        quantity: 1,
        userId: 1,
    },
]
