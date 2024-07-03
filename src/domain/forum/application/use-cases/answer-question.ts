import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';

interface AnswerQuestionUseCaseRequest {
    instructorId: string;
    questionId: string;
    content: string;
}

interface AnswerQuestionUseCaseResponse {
    answer: Answer;
}

export class AnswerQuestionUseCase {
    constructor(private answerRepository: AnswersRepository) {}

    async handle({
        instructorId,
        questionId,
        content,
    }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
        const answer = Answer.create({
            authorId: new UniqueEntityID(instructorId),
            questionId: new UniqueEntityID(questionId),
            content,
        });

        await this.answerRepository.create(answer);

        return { answer };
    }
}
