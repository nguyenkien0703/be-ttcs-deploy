import { PartialType } from '@nestjs/swagger'
import { Role } from '@app/queries/entities'
import { RoleEnum } from '@app/shares'

export class InsertRoleDto extends PartialType(Role) {}

export const roleData: InsertRoleDto[] = [
    {
        roleName: RoleEnum.ADMIN,
    },
    {
        roleName: RoleEnum.USER,
    },
]
