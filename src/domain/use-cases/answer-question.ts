import { Answer, AnswerProps } from '../entities/answer';

interface AnswerQuestionUseCaseRequest {
    instructorId: string;
    questionId: string;
    content: string;
}

export class AnswerQuestionUseCase {
    handle({
        instructorId,
        questionId,
        content,
    }: AnswerQuestionUseCaseRequest) {
        const answer = new Answer({
            authorId: instructorId,
            questionId,
            content,
        });

        return answer;
    }
}
