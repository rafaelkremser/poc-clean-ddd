import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswersRepository } from '../repositories/answers-repository';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository';

interface CommentOnAnswerUseCaseRequest {
    answerId: string;
    authorId: string;
    content: string;
}

interface CommentOnAnswerUseCaseResponse {
    answerComment: AnswerComment;
}

export class CommentOnAnswerUseCase {
    constructor(
        private answerCommentsRepository: AnswerCommentsRepository,
        private answerRepository: AnswersRepository
    ) {}

    async handle({
        answerId,
        authorId,
        content,
    }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
        const answer = await this.answerRepository.findById(answerId);

        if (!answer) {
            throw new Error('Answer not found.');
        }

        const answerComment = AnswerComment.create({
            answerId: new UniqueEntityID(answerId),
            authorId: new UniqueEntityID(authorId),
            content,
        });

        await this.answerCommentsRepository.create(answerComment);

        return { answerComment };
    }
}
