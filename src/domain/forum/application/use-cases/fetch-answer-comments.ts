import { AnswerCommentsRepository } from '../repositories/answer-comments-repository';
import { AnswerComment } from '../../enterprise/entities/answer-comment';

interface FetchAnswerCommentsUseCaseRequest {
    answerId: string;
    page: number;
}

interface FetchAnswerCommentsUseCaseResponse {
    answerComments: AnswerComment[];
}

export class FetchAnswerCommentsUseCase {
    constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

    async handle({
        answerId,
        page,
    }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
        const answerComments =
            await this.answerCommentsRepository.findManyByAnswerId(answerId, {
                page,
            });

        return { answerComments };
    }
}
