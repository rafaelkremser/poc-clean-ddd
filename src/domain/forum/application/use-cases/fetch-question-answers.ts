import { AnswersRepository } from '../repositories/answers-repository';
import { Answer } from '../../enterprise/entities/answer';

interface FetchQuestionAnswersUseCaseRequest {
    questionId: string;
    page: number;
}

interface FetchQuestionAnswersUseCaseResponse {
    answers: Answer[];
}

export class FetchQuestionAnswersUseCase {
    constructor(private answersRepository: AnswersRepository) {}

    async handle({
        questionId,
        page,
    }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
        const answers = await this.answersRepository.findManyByQuestionId(
            questionId,
            { page }
        );

        return { answers };
    }
}
