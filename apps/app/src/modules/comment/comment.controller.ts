import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CommentService } from './comment.service'
import { CreateCommentDto, UpdateCommentDto } from '@app/queries/dtos'
import { JwtAuthGuard } from '@app/shares/guards/jwt-auth.guard'
import { RoleGuard } from '@app/shares/guards/role.guard'
import { RoleEnum, Roles } from '@app/shares'
import { User } from '@app/queries'
import { UserScope } from '@app/shares/decorators/user.decorator'

@Controller('comments')
@ApiTags('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get('/laptops/:laptopId')
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    async getAllCommentLaptopByLaptopId(@Param('laptopId') laptopId: number) {
        const comments =
            await this.commentService.getAllCommentLaptopByLaptopId(laptopId)
        return comments
    }

    @Post('')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async createComment(
        @Body() createCommentDto: CreateCommentDto,
        @UserScope() user: User,
    ) {
        const userId = user?.id
        const createdComment = await this.commentService.createComment(
            createCommentDto,
            userId,
        )
        return createdComment
    }

    @Patch('/:id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async updateComment(
        @Param('id') commentId: number,
        @Body() updateCommentDto: UpdateCommentDto,
        @UserScope() user: User,
    ) {
        const userId = user?.id
        const comment = await this.commentService.updateComment(
            commentId,
            userId,
            updateCommentDto,
        )
        return comment
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async deleteComment(
        @Param('id') commentId: number,
        @UserScope() user: User,
    ) {
        const userId = user?.id
        await this.commentService.deleteComment(commentId, userId)
        return 'delete comment successfully'
    }

    @Get('/:commentId')
    @HttpCode(HttpStatus.OK)
    // @ApiBearerAuth()
    async getCommentById(@Param('commentId') commentId: number) {
        const comment = await this.commentService.getCommentById(commentId)
        return comment
    }
}
