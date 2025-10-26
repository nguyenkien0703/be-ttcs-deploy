export interface ICategory {
    id: number
    name: string
    description?: string
    createdAt: Date
    updatedAt?: Date
}

export interface ICreateCategoryDto {
    name: string
    description?: string
}

export interface IUpdateCategoryDto {
    name?: string
    description?: string
}

export interface IGetCategoriesQuery {
    page?: number
    limit?: number
    search?: string
}
