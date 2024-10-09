import { Repository } from 'typeorm'
import { Evalution } from '@app/queries/entities'
import { CustomRepository } from '@app/shares'
import { CreateEvalutionDto, UpdateEvalutionDto } from '@app/queries/dtos'

@CustomRepository(Evalution)
export class EvalutionRepository extends Repository<Evalution> {
    async createEvalution(
        userId: number,
        createEvalutionDto: CreateEvalutionDto,
    ): Promise<Evalution> {
        const evalution = await this.create({
            userId: userId,
            laptopId: createEvalutionDto.laptopId,
            rate: createEvalutionDto.rate,
        })
        await evalution.save()
        return evalution
    }

    async updateEvalution(
        evalutionId: number,
        updateEvalutionDto: UpdateEvalutionDto,
    ): Promise<Evalution> {
        const { rate } = updateEvalutionDto
        await this.createQueryBuilder('evalutions')
            .update(Evalution)
            .set({
                rate: rate,
            })
            .where('evalutions.id = :id', {
                id: evalutionId,
            })
            .execute()
        const evalution = await this.findOne({
            where: {
                id: evalutionId,
            },
        })
        return evalution
    }
}
