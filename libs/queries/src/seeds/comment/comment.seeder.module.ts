import { Module } from '@nestjs/common'
import { CommentSeederService } from '@app/queries/seeds/comment/comment.seeder.service'
import { TypeOrmExModule } from '@app/shares'
import { CommentRepository } from '@app/queries/repositories'

const repositories = TypeOrmExModule.forCustomRepository([CommentRepository])

@Module({
    imports: [repositories],
    providers: [CommentSeederService],
    exports: [CommentSeederService],
})
export class CommentSeederModule {}
