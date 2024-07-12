import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { CommentOnAnswerUseCase } from './comment-on-answer';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { makeAnswer } from 'test/factories/make-answer';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: CommentOnAnswerUseCase;

describe('Comment Answer', () => {
    beforeEach(() => {
        inMemoryAnswerCommentsRepository =
            new InMemoryAnswerCommentsRepository();
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        sut = new CommentOnAnswerUseCase(
            inMemoryAnswerCommentsRepository,
            inMemoryAnswersRepository
        );
    });

    it('should be able to comment a answer', async () => {
        const answer = makeAnswer();

        await inMemoryAnswersRepository.create(answer);

        const { answerComment } = await sut.handle({
            answerId: answer.id.toString(),
            authorId: 'author-01',
            content: 'An example for comment',
        });

        expect(answerComment.id).toBeTruthy();
        expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
            'An example for comment'
        );
    });
});
