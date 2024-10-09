import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { LaptopService } from './laptop.service'
import {
    CreateLaptopDto,
    GetAllLaptopDto,
    UpdateLaptopDto,
} from '@app/queries/dtos'
import { RoleGuard } from '@app/shares/guards/role.guard'
import { JwtAuthGuard } from '@app/shares/guards/jwt-auth.guard'
import { RoleEnum, Roles } from '@app/shares'

@Controller('laptops')
@ApiTags('laptops')
export class LaptopController {
    constructor(private readonly laptopService: LaptopService) {}

    @Get('')
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    async getAllLaptop(@Query() getAllLaptopDto: GetAllLaptopDto) {
        const laptops = await this.laptopService.getAllLaptop(getAllLaptopDto)
        return laptops
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    async getLaptopById(@Param('id') laptopId: number) {
        const laptop = await this.laptopService.getLaptopById(laptopId)
        return laptop
    }

    @Post('')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(RoleEnum.ADMIN)
    @ApiBearerAuth()
    async createLaptop(@Body() createLaptopDto: CreateLaptopDto) {
        const createdLaptop =
            await this.laptopService.createLaptop(createLaptopDto)
        return createdLaptop
    }

    @Patch('/:id')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(RoleEnum.ADMIN)
    @ApiBearerAuth()
    async updateLaptop(
        @Param('id') laptopId: number,
        @Body() updateLaptopDto: UpdateLaptopDto,
    ) {
        const updatedLaptop = await this.laptopService.updateLaptop(
            laptopId,
            updateLaptopDto,
        )
        return updatedLaptop
    }
}
