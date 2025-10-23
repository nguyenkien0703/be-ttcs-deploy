import { PartialType } from '@nestjs/swagger'
import { User } from '@app/queries/entities'

export class InsertUserDto extends PartialType(User) {}
/**
 * Plain password: Kien123ns@
 * Hashed password: $2b$10$sniZTbxYLePMvDKvNaIj2eAP2xJduxBhtONxu3Zt4xnewYqsGfWIO
 */
export const userData: InsertUserDto[] = [
    {
        name: 'kien',
        email: 'nguyenkien123ns@gmail.com',
        address: 'Yên Phong - Bắc Ninh',
        password:
            '$2b$10$sniZTbxYLePMvDKvNaIj2eAP2xJduxBhtONxu3Zt4xnewYqsGfWIO',
        phone: '372109881',
        // avatar: "https://static1.bestie.vn/Mlog/ImageContent/201909/dau-hieu-cua-nguoi-chua-truong-thanh-de-avatar-den-khi-that-tinh-5f32ad.jpg",
        roleId: 1,
    },
]
