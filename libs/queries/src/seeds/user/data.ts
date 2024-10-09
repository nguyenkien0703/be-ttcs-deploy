import { PartialType } from '@nestjs/swagger'
import { User } from '@app/queries/entities'

export class InsertUserDto extends PartialType(User) {}
/**
 * nguyenkien -> $2b$10$YiXVxvtcscz0ZEP0MSER/uvkjg1Z2178sD4akfNm70C8h.ltFwUHi
 *
 */
export const userData: InsertUserDto[] = [
    {
        name: 'kien',
        email: 'nguyenkien123ns@gmail.com',
        address: 'Yên Phong - Bắc Ninh',
        password:
            '$2b$10$pDa1qETnhA5NDLg0GiKMu.2Zdh10k6clOYIMdkyFuCMdy9dkuRqNG',
        phone: '372109881',
        // avatar: "https://static1.bestie.vn/Mlog/ImageContent/201909/dau-hieu-cua-nguoi-chua-truong-thanh-de-avatar-den-khi-that-tinh-5f32ad.jpg",
        roleId: 1,
    },
]
