import { Answer } from '../entities/answer';
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
        const answer = new Answer({
            authorId: instructorId,
            questionId,
            content,
        });

        await this.answerRepository.create(answer);

        return answer;
    }
}
