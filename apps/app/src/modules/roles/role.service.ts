import { Injectable } from '@nestjs/common'
import { Role, RoleRepository } from '@app/queries'
import { RoleEnum } from '@app/shares'

@Injectable()
export class RoleService {
    constructor(private readonly roleRepository: RoleRepository) {}
    async getRoleByRoleName(roleName: RoleEnum): Promise<Role> {
        const role = await this.roleRepository.findOne({
            where: {
                roleName: roleName,
            },
        })
        return role
    }
}
