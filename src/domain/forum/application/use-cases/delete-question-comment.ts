import { QuestionCommentsRepository } from '../repositories/question-comments-repository';

interface DeleteQuestionCommentUseCaseRequest {
    questionCommentId: string;
    authorId: string;
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
    constructor(
        private questionCommentRepository: QuestionCommentsRepository
    ) {}

    async handle({
        questionCommentId,
        authorId,
    }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
        const questionComment = await this.questionCommentRepository.findById(
            questionCommentId
        );

        if (!questionComment) {
            throw new Error('Comment not found');
        }

        if (authorId !== questionComment.authorId.toString()) {
            throw new Error('Not allowed.');
        }

        await this.questionCommentRepository.delete(questionComment);

        return {};
    }
}
