import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { OrderService } from './order.service'
import { JwtAuthGuard } from '@app/shares/guards/jwt-auth.guard'
import { CreateOrderDto, GetAllOrderDto } from '@app/queries/dtos/order.dto'
import { UserScope } from '@app/shares/decorators/user.decorator'
import { User } from '@app/queries'
import { RoleGuard } from '@app/shares/guards/role.guard'
import { RoleEnum, Roles } from '@app/shares'

@Controller('orders')
@ApiTags('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post('')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    async createOrder(
        @Body() createOrderDto: CreateOrderDto,
        @UserScope() user: User,
    ) {
        const userId = user?.id
        const createdOrder = await this.orderService.createOrder(
            userId,
            createOrderDto,
        )
        return createdOrder
    }

    @Get('')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async getAllOrderByUserId(
        @Query() getAllOrderDto: GetAllOrderDto,
        @UserScope() user: User,
    ) {
        const userId = user?.id
        const orders = await this.orderService.getAllOrderByUserId(
            getAllOrderDto,
            userId,
        )
        return orders
    }
}
