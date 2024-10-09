import {
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { LaptopDto } from '@app/queries/dtos/laptop.dto'
import { Type } from 'class-transformer'
import { GetAllDto } from '@app/queries/dtos/base.dto'

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        required: true,
        example: 'nga son thanh hoa',
    })
    address: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        required: true,
        example: 'Nguyen Van Kien',
    })
    name: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        required: true,
        example: '0868071819',
    })
    phone: string

    @ApiProperty({
        required: true,
        type: [LaptopDto],
    })
    @ValidateNested({
        each: true,
    })
    @Type(() => LaptopDto)
    laptops: LaptopDto[]
}

export class GetAllOrderDto extends GetAllDto {}
