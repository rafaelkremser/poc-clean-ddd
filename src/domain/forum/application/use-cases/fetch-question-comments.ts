import { QuestionCommentsRepository } from '../repositories/question-comments-repository';
import { QuestionComment } from '../../enterprise/entities/question-comment';

interface FetchQuestionCommentsUseCaseRequest {
    questionId: string;
    page: number;
}

interface FetchQuestionCommentsUseCaseResponse {
    questionComments: QuestionComment[];
}

export class FetchQuestionCommentsUseCase {
    constructor(
        private questionCommentsRepository: QuestionCommentsRepository
    ) {}

    async handle({
        questionId,
        page,
    }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
        const questionComments =
            await this.questionCommentsRepository.findManyByQuestionId(
                questionId,
                {
                    page,
                }
            );

        return { questionComments };
    }
}
