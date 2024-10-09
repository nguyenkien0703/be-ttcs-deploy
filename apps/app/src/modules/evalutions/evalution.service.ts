import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Evalution, EvalutionRepository } from '@app/queries'
import { CreateEvalutionDto, UpdateEvalutionDto } from '@app/queries/dtos'

@Injectable()
export class EvalutionService {
    constructor(private readonly evalutionRepository: EvalutionRepository) {}

    async createEvalution(
        userId: number,
        createEvalutionDto: CreateEvalutionDto,
    ): Promise<Evalution> {
        const createdEvalution = await this.evalutionRepository.createEvalution(
            userId,
            createEvalutionDto,
        )
        return createdEvalution
    }
    async updateEvalution(
        evalutionId: number,
        userId: number,
        updateEvalutionDto: UpdateEvalutionDto,
    ): Promise<Evalution> {
        let existedEvalution = await this.evalutionRepository.findOne({
            where: {
                id: evalutionId,
            },
        })
        if (!existedEvalution) {
            throw new HttpException(
                { message: 'evalution not found' },
                HttpStatus.NOT_FOUND,
            )
        }
        if (userId != existedEvalution.userId) {
            throw new HttpException(
                { message: 'You are not the first person from your family' },
                HttpStatus.BAD_REQUEST,
            )
        }
        try {
            existedEvalution = await this.evalutionRepository.updateEvalution(
                evalutionId,
                updateEvalutionDto,
            )
            return existedEvalution
        } catch (error) {
            throw new HttpException(
                { message: error.message },
                HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }
    }
}
