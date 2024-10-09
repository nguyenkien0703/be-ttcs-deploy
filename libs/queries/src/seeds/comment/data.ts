import { PartialType } from '@nestjs/swagger'
import { Comment } from '@app/queries/entities'

export class InsertCommentDto extends PartialType(Comment) {}

export const commentData: InsertCommentDto[] = [
    {
        content: 'Laptop này xịn thật',
        userId: 1,
        laptopId: 2,
    },
    {
        content: 'Laptop này có tốc độ xử lý cao đấy',
        userId: 1,
        laptopId: 2,
    },
    {
        content: 'Laptop này chất lừ nhỉ',
        userId: 1,
        laptopId: 2,
    },
    {
        content: 'Laptop này giá hạt rẻ quá',
        userId: 1,
        laptopId: 3,
    },
    {
        content: 'Đúng là đồ rẻ như cho ^^',
        userId: 1,
        laptopId: 3,
    },
    {
        content: 'Laptop đã đắt còn chạy chậm v~~',
        userId: 1,
        laptopId: 4,
    },
]
