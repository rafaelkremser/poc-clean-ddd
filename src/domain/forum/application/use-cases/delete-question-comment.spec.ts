import { CommentOnQuestionUseCase } from './comment-on-question';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { DeleteQuestionCommentUseCase } from './delete-question-comment';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestionComment } from 'test/factories/make-question-comment';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let commentOnQuestionUseCase: CommentOnQuestionUseCase;
let sut: DeleteQuestionCommentUseCase;

describe('Delete Question Comment', () => {
    beforeEach(() => {
        inMemoryQuestionCommentsRepository =
            new InMemoryQuestionCommentsRepository();
        commentOnQuestionUseCase = new CommentOnQuestionUseCase(
            inMemoryQuestionCommentsRepository,
            inMemoryQuestionsRepository
        );
        sut = new DeleteQuestionCommentUseCase(
            inMemoryQuestionCommentsRepository
        );
    });

    it('should be able to delete a question comment', async () => {
        const questionComment = makeQuestionComment();
        await inMemoryQuestionCommentsRepository.create(questionComment);

        await sut.handle({
            questionCommentId: questionComment.id.toString(),
            authorId: questionComment.authorId.toString(),
        });

        expect(inMemoryQuestionCommentsRepository.items[0]).toBeFalsy();
    });

    it('should not be able to delete another user question comment', async () => {
        const questionComment = makeQuestionComment({
            authorId: new UniqueEntityID('author-01'),
        });
        await inMemoryQuestionCommentsRepository.create(questionComment);

        await expect(
            sut.handle({
                questionCommentId: questionComment.id.toString(),
                authorId: 'author-02',
            })
        ).rejects.toBeInstanceOf(Error);
    });
});
