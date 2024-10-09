import { Repository } from 'typeorm'
import { CustomRepository } from '@app/shares'
import { Laptop } from '@app/queries/entities'
import {
    CreateLaptopDto,
    GetAllLaptopDto,
    UpdateLaptopDto,
} from '@app/queries/dtos'
import { paginate, Pagination } from 'nestjs-typeorm-paginate'

@CustomRepository(Laptop)
export class LaptopRepository extends Repository<Laptop> {
    async getAllLaptop(options: GetAllLaptopDto): Promise<Pagination<Laptop>> {
        const { page, limit, searchQuery } = options
        const queryBuider = this.createQueryBuilder('laptops').select([
            'laptops.id',
            'laptops.name',
            'laptops.price',
            'laptops.brand',
            'laptops.image',
        ])
        // if (brandQuery) {
        //     queryBuider.andWhere("laptops.brand like :brand", {
        //         brand: brandQuery,
        //     })
        // }
        if (searchQuery) {
            queryBuider.andWhere('laptops.name like :searchQuery', {
                searchQuery: `%${searchQuery}%`,
            })
        }
        return paginate(queryBuider, { page, limit })
    }

    async getLaptopById(laptopId: number): Promise<Laptop> {
        const queryBuilder = this.createQueryBuilder('laptops')
            .select([
                'laptops.id',
                'laptops.name',
                'laptops.cpu',
                'laptops.ram',
                'laptops.screen',
                'laptops.color',
                'laptops.os',
                'laptops.storage',
                'laptops.graphicCard',
                'laptops.description',
                'laptops.pin',
                'laptops.price',
                'laptops.material',
                'laptops.brand',
                'laptops.quantity',
                'laptops.image',
            ])
            .where('laptops.id = :id', {
                id: laptopId,
            })
        const laptop = await queryBuilder.getOne()
        return laptop
    }

    async createLaptop(createLaptopDto: CreateLaptopDto): Promise<Laptop> {
        const createdLaptop = await this.create({
            ...createLaptopDto,
        })
        await createdLaptop.save()
        return createdLaptop
    }

    async updateLaptop(
        laptopId: number,
        updateLaptopDto: UpdateLaptopDto,
    ): Promise<Laptop> {
        await this.createQueryBuilder('laptops')
            .update(Laptop)
            .set({
                name: updateLaptopDto.name,
                cpu: updateLaptopDto.cpu,
                ram: updateLaptopDto.ram,
                description: updateLaptopDto.description,
                screen: updateLaptopDto.screen,
                color: updateLaptopDto.color,
                os: updateLaptopDto.os,
                storage: updateLaptopDto.storage,
                graphicCard: updateLaptopDto.graphicCard,
                pin: updateLaptopDto.pin,
                price: updateLaptopDto.price,
                sale: updateLaptopDto.sale,
                material: updateLaptopDto.material,
                brand: updateLaptopDto.brand,
                quantity: updateLaptopDto.quantity,
            })
            .where('laptops.id = :id', {
                id: laptopId,
            })
            .execute()
        const laptop = await this.findOne({
            where: {
                id: laptopId,
            },
        })
        return laptop
    }
}
