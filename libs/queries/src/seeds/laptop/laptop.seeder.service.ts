import { Injectable, Logger } from '@nestjs/common'
import { LaptopRepository } from '@app/queries/repositories'
import { Laptop } from '@app/queries/entities'
import { InsertLaptopDto, laptopData } from '@app/queries/seeds/laptop/data'

@Injectable()
export class LaptopSeederService {
    constructor(private readonly laptopRepository: LaptopRepository) {}

    async saveOneLaptop(laptop: InsertLaptopDto): Promise<Laptop> {
        const createLaptop = await this.laptopRepository.create(laptop)
        await createLaptop.save()
        Logger.log('laptop________insertd__laptop_id: ' + createLaptop.id)
        return createLaptop
    }
    async seedLaptop() {
        const savePromises = laptopData.map((laptop) =>
            this.saveOneLaptop(laptop),
        )
        Logger.debug('laptop_______start_seeding____')
        await Promise.all(savePromises)
        Logger.debug('laptop_______end_seeding____')
    }
}
