import { Repository } from 'typeorm'
import { CustomRepository } from '@app/shares'
import { Role } from '@app/queries/entities'

@CustomRepository(Role)
export class RoleRepository extends Repository<Role> {}
