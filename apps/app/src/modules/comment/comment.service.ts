import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Comment, CommentRepository } from '@app/queries'
import { CreateCommentDto, UpdateCommentDto } from '@app/queries/dtos'
import { httpErrors } from '@app/shares/exeption-filter'
import { UserService } from '../users/user.service'
import { Pagination } from 'nestjs-typeorm-paginate'

@Injectable()
export class CommentService {
    constructor(
        private readonly commentRepository: CommentRepository,

        private readonly userService: UserService,
    ) {}

    async getAllCommentLaptopByLaptopId(
        laptopId: number,
    ): Promise<Pagination<Comment>> {
        const comments =
            await this.commentRepository.getAllCommentLaptopByLaptopId(laptopId)
        return comments
    }

    async createComment(
        createCommentDto: CreateCommentDto,
        userId: number,
    ): Promise<Comment> {
        const comment = await this.commentRepository.createComment(
            createCommentDto,
            userId,
        )

        return comment
    }

    async updateComment(
        commentId: number,
        userId: number,
        updateCommentDto: UpdateCommentDto,
    ): Promise<Comment> {
        const existedComment = await this.commentRepository.findOne({
            where: {
                id: commentId,
            },
        })
        if (!existedComment) {
            throw new HttpException(
                httpErrors.COMMENT_NOT_FOUND,
                HttpStatus.NOT_FOUND,
            )
        }
        if (userId != existedComment.userId) {
            throw new HttpException(
                { message: 'You are not the reason for this comment' },
                HttpStatus.BAD_REQUEST,
            )
        }
        existedComment.content = updateCommentDto.content
        await existedComment.save()
        return existedComment
    }

    async deleteComment(commentId: number, userId: number) {
        const existedComment = await this.commentRepository.findOne({
            where: {
                id: commentId,
            },
        })
        if (!existedComment) {
            throw new HttpException(
                httpErrors.COMMENT_NOT_FOUND,
                HttpStatus.NOT_FOUND,
            )
        }
        if (userId != existedComment.userId) {
            throw new HttpException(
                { message: 'You are not the reason for this comment' },
                HttpStatus.BAD_REQUEST,
            )
        }
        await this.commentRepository.delete(commentId)
    }

    async getCommentById(commentId: number): Promise<Comment> {
        const comment = await this.commentRepository.getCommentById(commentId)

        if (!comment) {
            throw new HttpException(
                { message: 'Comment not found' },
                HttpStatus.NOT_FOUND,
            )
        }

        return comment
    }
}
