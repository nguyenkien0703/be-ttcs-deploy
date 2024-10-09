import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCommentDto {
    // @IsNumber()
    // @IsNotEmpty()
    // @Type(() => Number)
    // @ApiProperty({
    //     required: true,
    //     example: 10,
    // })
    // userId: number

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty({
        required: true,
        example: 10,
    })
    laptopId: number

    @IsString()
    @IsOptional()
    @ApiProperty({
        required: true,
        example: 'laptop nay ok phet nhi ',
    })
    content: string
}

export class UpdateCommentDto {
    @IsString()
    @IsOptional()
    @ApiProperty({
        required: true,
        example: 'laptop nay ok phet nhi ',
    })
    content: string
}
