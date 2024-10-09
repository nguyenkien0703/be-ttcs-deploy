import { GetAllDto } from '@app/queries/dtos/base.dto'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class GetAllLaptopDto extends GetAllDto {
    // @IsString()
    // @IsOptional()
    // @ApiProperty({
    //     required: false,
    //     example: "dell",
    // })
    // brandQuery?: string
}
export class CreateLaptopDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        required: true,
        example: 'Laptop Dell Vostro 3480-70183779/70187708',
    })
    name: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        required: true,
        example: 'Core i5 8265U 1.6 Ghz up to 3.9Ghz-6Mb',
    })
    cpu: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        required: true,
        example: '8Gb',
    })
    ram: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        required: true,
        example: '14.0Inch',
    })
    screen: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        required: true,
        example: 'Black',
    })
    color: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        required: true,
        example: 'Windows 10 Home',
    })
    os: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        required: true,
        example: '1Tb/ DVDRW',
    })
    storage: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        required: true,
        example: 'Intel Graphics HD 620',
    })
    graphicCard: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        required: true,
        example:
            'Laptop Dell Vostro 3480 70183779/70187708 mang đến hiệu năng mạnh mẽ và có tính di động cao, rất gọn nhẹ để bạn mang theo bên mình. Nếu bạn đang tìm kiếm một chiếc laptop phục vụ nhu cầu làm việc và độ bền cao thì Dell Vostro 3480 chính là lựa chọn bạn đang cần. ',
    })
    description: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        required: true,
        example: '4 cell',
    })
    pin: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: 13690000,
    })
    price: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: 10,
    })
    sale: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: 10,
    })
    quantity: number

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        required: true,
        example: 'Plastic',
    })
    material: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        required: true,
        example: 'Dell',
    })
    brand: string
}

export class UpdateLaptopDto {
    @IsOptional()
    @IsString()
    @ApiProperty({
        required: false,
        example: 'Laptop Dell Vostro 3480-70183779/70187708',
    })
    name: string

    @IsOptional()
    @IsString()
    @ApiProperty({
        required: false,
        example: 'Core i5 8265U 1.6 Ghz up to 3.9Ghz-6Mb',
    })
    cpu: string

    @IsOptional()
    @IsString()
    @ApiProperty({
        required: false,
        example: '8Gb',
    })
    ram: string

    @IsOptional()
    @IsString()
    @ApiProperty({
        required: false,
        example: '14.0Inch',
    })
    screen: string

    @IsOptional()
    @IsString()
    @ApiProperty({
        required: false,
        example: 'Black',
    })
    color: string

    @IsOptional()
    @IsString()
    @ApiProperty({
        required: false,
        example: 'Windows 10 Home',
    })
    os: string

    @IsOptional()
    @IsString()
    @ApiProperty({
        required: false,
        example: '1Tb/ DVDRW',
    })
    storage: string

    @IsOptional()
    @IsString()
    @ApiProperty({
        required: false,
        example: 'Intel Graphics HD 620',
    })
    graphicCard: string

    @IsOptional()
    @IsString()
    @ApiProperty({
        required: false,
        example:
            'Laptop Dell Vostro 3480 70183779/70187708 mang đến hiệu năng mạnh mẽ và có tính di động cao, rất gọn nhẹ để bạn mang theo bên mình. Nếu bạn đang tìm kiếm một chiếc laptop phục vụ nhu cầu làm việc và độ bền cao thì Dell Vostro 3480 chính là lựa chọn bạn đang cần. ',
    })
    description: string

    @IsOptional()
    @IsString()
    @ApiProperty({
        required: false,
        example: '4 cell',
    })
    pin: string

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        required: false,
        example: 13690000,
    })
    price: number

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        required: false,
        example: 10,
    })
    sale: number

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        required: false,
        example: 10,
    })
    quantity: number

    @IsOptional()
    @IsString()
    @ApiProperty({
        required: false,
        example: 'Plastic',
    })
    material: string

    @IsOptional()
    @IsString()
    @ApiProperty({
        required: false,
        example: 'Dell',
    })
    brand: string
}

export class LaptopDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: 1,
    })
    laptopId: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: 10,
    })
    quantity: number
}
