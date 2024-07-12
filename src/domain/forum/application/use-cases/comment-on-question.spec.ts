import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { CommentOnQuestionUseCase } from './comment-on-question';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments';
import { makeQuestion } from 'test/factories/make-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CommentOnQuestionUseCase;

describe('Comment Question', () => {
    beforeEach(() => {
        inMemoryQuestionCommentsRepository =
            new InMemoryQuestionCommentsRepository();
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new CommentOnQuestionUseCase(
            inMemoryQuestionCommentsRepository,
            inMemoryQuestionsRepository
        );
    });

    it('should be able to comment a question', async () => {
        const question = makeQuestion();

        await inMemoryQuestionsRepository.create(question);

        const { questionComment } = await sut.handle({
            questionId: question.id.toString(),
            authorId: 'author-01',
            content: 'An example for comment',
        });

        expect(questionComment.id).toBeTruthy();
        expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
            'An example for comment'
        );
    });
});
