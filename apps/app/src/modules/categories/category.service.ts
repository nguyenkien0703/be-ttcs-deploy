import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

@Injectable()
export class CategoryService {
    // Mock data storage - replace with actual repository injection
    private categories = [
        { id: 1, name: 'Laptops', description: 'All laptop products', createdAt: new Date() },
        { id: 2, name: 'Accessories', description: 'Laptop accessories', createdAt: new Date() },
    ]
    private currentId = 3

    async getAllCategories(query: { page?: number; limit?: number }) {
        const page = query.page || 1
        const limit = query.limit || 10
        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit

        return {
            items: this.categories.slice(startIndex, endIndex),
            meta: {
                totalItems: this.categories.length,
                itemCount: Math.min(limit, this.categories.length - startIndex),
                itemsPerPage: limit,
                totalPages: Math.ceil(this.categories.length / limit),
                currentPage: page,
            },
        }
    }

    async getCategoryById(categoryId: number) {
        const category = this.categories.find(c => c.id === Number(categoryId))

        if (!category) {
            throw new HttpException(
                { message: 'Category not found' },
                HttpStatus.NOT_FOUND,
            )
        }

        return category
    }

    async createCategory(createCategoryDto: any) {
        const newCategory = {
            id: this.currentId++,
            ...createCategoryDto,
            createdAt: new Date(),
        }

        this.categories.push(newCategory)
        return newCategory
    }

    async updateCategory(categoryId: number, updateCategoryDto: any) {
        const categoryIndex = this.categories.findIndex(c => c.id === Number(categoryId))

        if (categoryIndex === -1) {
            throw new HttpException(
                { message: 'Category not found' },
                HttpStatus.NOT_FOUND,
            )
        }

        this.categories[categoryIndex] = {
            ...this.categories[categoryIndex],
            ...updateCategoryDto,
        }

        return this.categories[categoryIndex]
    }

    async deleteCategory(categoryId: number) {
        const categoryIndex = this.categories.findIndex(c => c.id === Number(categoryId))

        if (categoryIndex === -1) {
            throw new HttpException(
                { message: 'Category not found' },
                HttpStatus.NOT_FOUND,
            )
        }

        this.categories.splice(categoryIndex, 1)
        return true
    }
}
