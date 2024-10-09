import { Injectable, Logger } from '@nestjs/common'
import { RoleRepository } from '@app/queries/repositories'
import { Role } from '@app/queries/entities'
import { InsertRoleDto, roleData } from '@app/queries/seeds/role/data'

@Injectable()
export class RoleSeederService {
    constructor(private readonly roleRepository: RoleRepository) {}

    async saveOneRole(role: InsertRoleDto): Promise<Role> {
        const createRole = await this.roleRepository.create(role)
        await createRole.save()
        Logger.log('role________insertd__role_id: ' + createRole.id)
        return createRole
    }
    async seedRole() {
        const savePromises = roleData.map((role) => this.saveOneRole(role))
        Logger.debug('role_______start_seeding____')
        await Promise.all(savePromises)
        Logger.debug('role_______end_seeding____')
    }
}
