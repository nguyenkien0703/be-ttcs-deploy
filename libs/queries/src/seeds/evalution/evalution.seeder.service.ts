import { Injectable, Logger } from '@nestjs/common'
import { Evalution } from '@app/queries/entities'
import {
    evalutionData,
    InsertEvalutionDto,
} from '@app/queries/seeds/evalution/data'
import { EvalutionRepository } from '@app/queries/repositories'

@Injectable()
export class EvalutionSeederService {
    constructor(private readonly evalutionRepository: EvalutionRepository) {}

    async saveOneEvalution(evalution: InsertEvalutionDto): Promise<Evalution> {
        const createEvalution = await this.evalutionRepository.create(evalution)
        await createEvalution.save()
        Logger.log(
            'evalution________insertd__evalution_id: ' + createEvalution.id,
        )
        return createEvalution
    }
    async seedEvalution() {
        const savePromises = evalutionData.map((evalution) =>
            this.saveOneEvalution(evalution),
        )
        Logger.debug('evalution_______start_seeding____')
        await Promise.all(savePromises)
        Logger.debug('evalution_______end_seeding____')
    }
}
