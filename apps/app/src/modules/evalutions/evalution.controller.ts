import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { EvalutionService } from './evalution.service'
import { JwtAuthGuard } from '@app/shares/guards/jwt-auth.guard'
import { CreateEvalutionDto, UpdateEvalutionDto } from '@app/queries/dtos'
import { UserScope } from '@app/shares/decorators/user.decorator'
import { User } from '@app/queries'

@Controller('evalutions')
@ApiTags('evalutions')
export class EvalutionController {
    constructor(private readonly evalutionService: EvalutionService) {}

    @Post('')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    @ApiBearerAuth()
    async createEvalution(
        @Body() createEvalutionDto: CreateEvalutionDto,
        @UserScope() user: User,
    ) {
        const userId = user?.id
        const createdEvalution = await this.evalutionService.createEvalution(
            userId,
            createEvalutionDto,
        )
        return createdEvalution
    }

    @Patch('/:id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    @ApiBearerAuth()
    async updateEvalution(
        @Param('id') evalutionId: number,
        @Body() updateEvalutionDto: UpdateEvalutionDto,
        @UserScope() user: User,
    ) {
        const userId = user?.id
        const updatedEvalution = await this.evalutionService.updateEvalution(
            evalutionId,
            userId,
            updateEvalutionDto,
        )
        return updatedEvalution
    }
}
