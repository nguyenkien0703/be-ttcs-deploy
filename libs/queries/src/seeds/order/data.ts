import { PartialType } from '@nestjs/swagger'
import { Order } from '@app/queries/entities'
import { StatusOrder } from '@app/shares/constants/status-order.const'

export class InsertOrderDto extends PartialType(Order) {}

export const orderData: InsertOrderDto[] = [
    {
        userId: 1,
        status: StatusOrder.PENDING,
        address: 'Quốc Oai - Hà Nội',
        name: 'Nguyễn Danh Nhân',
        phone: '3669916015',
    },
    {
        userId: 1,
        status: StatusOrder.COMPLETED,
        address: 'Nga Sơn - Thanh Hóa',
        name: 'Nguyễn Trung Anh',
        phone: '987654321',
    },
    {
        userId: 1,
        status: StatusOrder.PROCESS,
        address: 'Nông Cống - Thanh Hóa',
        name: 'Trương Thị Ngọc',
        phone: '337478888',
    },
    {
        userId: 1,
        status: StatusOrder.PENDING,
        address: 'Khánh Nhạc - Ninh Bình',
        name: 'Nguyễn Văn Quân',
        phone: '339792000',
    },
]
