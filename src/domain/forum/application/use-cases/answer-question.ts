import { UniqueEntityID } from '@/core/entities/unique-entity-is';
import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { AnswersRepository } from '../repository/answers-repository';

interface AnswerQuestionUseCaseRequest {
    instructorId: string;
    questionId: string;
    content: string;
}

export class AnswerQuestionUseCase {
    constructor(private answerRepository: AnswersRepository) {}

    async handle({
        instructorId,
        questionId,
        content,
    }: AnswerQuestionUseCaseRequest) {
        const answer = Answer.create({
            authorId: new UniqueEntityID(instructorId),
            questionId: new UniqueEntityID(questionId),
            content,
        });

        await this.answerRepository.create(answer);

        return answer;
    }
}
