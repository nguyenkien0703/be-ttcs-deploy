import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { RoleModule } from '../roles/role.module'
import { UserController } from './user.controller'

@Module({
    imports: [RoleModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
