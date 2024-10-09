import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Laptop, LaptopRepository } from '@app/queries'
import {
    CreateLaptopDto,
    GetAllLaptopDto,
    UpdateLaptopDto,
} from '@app/queries/dtos'
import { Pagination } from 'nestjs-typeorm-paginate'
import { httpErrors } from '@app/shares/exeption-filter'
import e from 'express'

@Injectable()
export class LaptopService {
    constructor(private readonly laptopRepository: LaptopRepository) {}

    async getAllLaptop(
        getAllLaptopDto: GetAllLaptopDto,
    ): Promise<Pagination<Laptop>> {
        const laptops =
            await this.laptopRepository.getAllLaptop(getAllLaptopDto)
        return laptops
    }

    async getLaptopById(laptopId: number): Promise<Laptop> {
        const existedLaptop =
            await this.laptopRepository.getLaptopById(laptopId)
        if (!existedLaptop) {
            throw new HttpException(
                httpErrors.LAPTOP_NOT_FOUND,
                HttpStatus.NOT_FOUND,
            )
        }
        return existedLaptop
    }

    async createLaptop(createLaptopDto: CreateLaptopDto): Promise<Laptop> {
        const createdLaptop =
            await this.laptopRepository.createLaptop(createLaptopDto)
        return createdLaptop
    }

    async updateLaptop(
        laptopId: number,
        updateLaptopDto: UpdateLaptopDto,
    ): Promise<Laptop> {
        let existedLaptop = await this.laptopRepository.getLaptopById(laptopId)
        if (!existedLaptop) {
            throw new HttpException(
                { message: 'laptop khong ton tai' },
                HttpStatus.NOT_FOUND,
            )
        }
        try {
            existedLaptop = await this.laptopRepository.updateLaptop(
                laptopId,
                updateLaptopDto,
            )
        } catch (error) {
            throw new HttpException(
                { message: error.message },
                HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }
        return existedLaptop
    }
}
