import { PartialType } from '@nestjs/swagger'
import { Evalution } from '@app/queries/entities'

export class InsertEvalutionDto extends PartialType(Evalution) {}

export const evalutionData: InsertEvalutionDto[] = [
    {
        rate: 5,
        userId: 1,
        laptopId: 1,
    },
    {
        rate: 4,
        userId: 1,
        laptopId: 1,
    },
    {
        rate: 4,
        userId: 1,
        laptopId: 1,
    },
    {
        rate: 5,
        userId: 1,
        laptopId: 2,
    },
]
