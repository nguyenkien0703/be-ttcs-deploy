import { Injectable, Logger } from '@nestjs/common'
import { commentData, InsertCommentDto } from '@app/queries/seeds/comment/data'
import { Comment } from '@app/queries/entities'
import { CommentRepository } from '@app/queries/repositories'

@Injectable()
export class CommentSeederService {
    constructor(private readonly commentRepository: CommentRepository) {}

    async saveOneComment(comment: InsertCommentDto): Promise<Comment> {
        const createComment = await this.commentRepository.create(comment)
        await createComment.save()
        Logger.log('comment________insertd__comment_id: ' + createComment.id)
        return createComment
    }
    async seedComment() {
        const savePromises = commentData.map((comment) =>
            this.saveOneComment(comment),
        )
        Logger.debug('comment_______start_seeding____')
        await Promise.all(savePromises)
        Logger.debug('comment_______end_seeding____')
    }
}
