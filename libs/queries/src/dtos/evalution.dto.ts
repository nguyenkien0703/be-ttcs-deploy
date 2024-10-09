import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty, OmitType } from '@nestjs/swagger'

export class CreateEvalutionDto {
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty({
        required: true,
        example: 10,
    })
    laptopId: number

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty({
        required: true,
        example: 10,
    })
    rate: number
}

export class UpdateEvalutionDto extends OmitType(CreateEvalutionDto, [
    'laptopId',
]) {}
