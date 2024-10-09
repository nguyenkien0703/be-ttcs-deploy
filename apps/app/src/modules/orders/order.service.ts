import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Laptop, Order, OrderRepository } from '@app/queries'
import { CreateOrderDto, GetAllOrderDto } from '@app/queries/dtos/order.dto'
import { UserService } from '../users/user.service'
import { OrderDetailService } from '../order-detail/order-detail.service'
import { EmailService } from '../emails/email.service'
import { LaptopService } from '../laptop/laptop.service'
import { LaptopResponseData } from '../laptop/laptop.interface'

@Injectable()
export class OrderService {
    constructor(
        private readonly orderRepository: OrderRepository,

        private readonly userService: UserService,
        private readonly orderDetailService: OrderDetailService,
        private readonly emailService: EmailService,
        private readonly laptopService: LaptopService,
    ) {}

    async createOrder(
        userId: number,
        createOrderDto: CreateOrderDto,
    ): Promise<Order> {
        const { address, name, laptops, phone } = createOrderDto
        const existedUser = await this.userService.getUserById(userId)
        if (!existedUser) {
            throw new HttpException(
                { message: 'user not found' },
                HttpStatus.NOT_FOUND,
            )
        }
        let createdOrder: Order
        try {
            createdOrder = await this.orderRepository.createOrder(
                address,
                name,
                phone,
                userId,
            )
        } catch (error) {
            throw new HttpException(
                { message: 'created order failed' },
                HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }

        try {
            await Promise.all(
                laptops.map((laptop) =>
                    this.orderDetailService.createOrderDetail(
                        createdOrder.id,
                        userId,
                        laptop,
                    ),
                ),
            )
        } catch (error) {
            throw new HttpException(
                { message: 'create order detail failed' },
                HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }

        try {
            const laptopResponse: LaptopResponseData[] = []
            let totalAmount = 0

            await Promise.all([
                ...laptops.map(async (laptopItem) => {
                    const existedlaptop =
                        await this.laptopService.getLaptopById(
                            laptopItem.laptopId,
                        )
                    totalAmount += existedlaptop.price * laptopItem.quantity
                    laptopResponse.push({
                        laptop: existedlaptop,
                        quantity: laptopItem.quantity,
                    })
                }),
            ])
            await this.emailService.sendEmailCreatedOrderSuccessfully(
                existedUser,
                laptopResponse,
                totalAmount,
            )
        } catch (error) {
            throw new HttpException(
                { message: error.message },
                HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }
        return createdOrder
    }

    async getAllOrderByUserId(getAllOrderDto: GetAllOrderDto, userId: number) {
        const orders = await this.orderDetailService.getAllOrderByUserId(
            getAllOrderDto,
            userId,
        )
        return orders
    }
}
