import { Injectable, Logger } from '@nestjs/common'
import { CommentSeederService } from '@app/queries/seeds/comment/comment.seeder.service'
import { EvalutionSeederService } from '@app/queries/seeds/evalution/evalution.seeder.service'
import { LaptopSeederService } from '@app/queries/seeds/laptop/laptop.seeder.service'
import { OrderSeederService } from '@app/queries/seeds/order/order.seeder.service'
import { OrderDetailSeederService } from '@app/queries/seeds/order-detail/order-detail.seeder.service'
import { RoleSeederService } from '@app/queries/seeds/role/role.seeder.service'
import { UserSeederService } from '@app/queries/seeds/user/user.seeder.service'

@Injectable()
export class Seeder {
    constructor(
        private readonly commentSeederService: CommentSeederService,
        private readonly evalutionSeederService: EvalutionSeederService,
        private readonly laptopSeederService: LaptopSeederService,
        private readonly orderSeederService: OrderSeederService,
        private readonly orderDetailSeederService: OrderDetailSeederService,
        private readonly roleSeederService: RoleSeederService,
        private readonly userSeederService: UserSeederService,
    ) {}
    async seed() {
        Logger.log('START_SEEDING_DATA')
        await this.seedRole()
        await this.seedLaptop()
        await this.seedUser()
        await this.seedEvalution()
        await this.seedComment()
        await this.seedOrder()
        await this.seedOrderDetail()
        Logger.log('END_SEEDING_DATA')
    }

    async seedComment() {
        await this.commentSeederService.seedComment()
    }
    async seedEvalution() {
        await this.evalutionSeederService.seedEvalution()
    }

    async seedLaptop() {
        await this.laptopSeederService.seedLaptop()
    }
    async seedOrder() {
        await this.orderSeederService.seedOrder()
    }
    async seedOrderDetail() {
        await this.orderDetailSeederService.seedOrderDetail()
    }
    async seedRole() {
        await this.roleSeederService.seedRole()
    }
    async seedUser() {
        await this.userSeederService.seedUser()
    }
}
