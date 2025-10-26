import {
    Body,
    Controller,
    Delete,
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
import { CategoryService } from './category.service'
import { JwtAuthGuard } from '@app/shares/guards/jwt-auth.guard'
import { RoleGuard } from '@app/shares/guards/role.guard'
import { RoleEnum, Roles } from '@app/shares'

@Controller('categories')
@ApiTags('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get('')
    @HttpCode(HttpStatus.OK)
    async getAllCategories(@Query('page') page?: number, @Query('limit') limit?: number) {
        const categories = await this.categoryService.getAllCategories({ page, limit })
        return categories
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async getCategoryById(@Param('id') categoryId: number) {
        const category = await this.categoryService.getCategoryById(categoryId)
        return category
    }

    @Post('')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(RoleEnum.ADMIN)
    @ApiBearerAuth()
    async createCategory(@Body() createCategoryDto: any) {
        const createdCategory = await this.categoryService.createCategory(createCategoryDto)
        return createdCategory
    }

    @Patch('/:id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(RoleEnum.ADMIN)
    @ApiBearerAuth()
    async updateCategory(
        @Param('id') categoryId: number,
        @Body() updateCategoryDto: any,
    ) {
        const updatedCategory = await this.categoryService.updateCategory(
            categoryId,
            updateCategoryDto,
        )
        return updatedCategory
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(RoleEnum.ADMIN)
    @ApiBearerAuth()
    async deleteCategory(@Param('id') categoryId: number) {
        await this.categoryService.deleteCategory(categoryId)
        return { message: 'Category deleted successfully' }
    }
}
