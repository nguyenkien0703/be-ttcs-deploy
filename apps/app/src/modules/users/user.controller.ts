import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service'

@Controller('users')
@ApiTags('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    async getUserById(@Param('id') userId: number) {
        const user = await this.userService.getUserById(userId)
        return user
    }
}
