import { AnswerQuestionUseCase } from './answer-question';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { makeAnswer } from 'test/factories/make-answer';
import { EditAnswerUseCase } from './edit-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { title } from 'process';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let answerQuestionUseCase: AnswerQuestionUseCase;
let sut: EditAnswerUseCase;

describe('Edit Answer', () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        answerQuestionUseCase = new AnswerQuestionUseCase(
            inMemoryAnswersRepository
        );
        sut = new EditAnswerUseCase(inMemoryAnswersRepository);
    });

    it('should be able to edit a answer', async () => {
        const createdAnswer = makeAnswer(
            { authorId: new UniqueEntityID('author-01') },
            new UniqueEntityID('answer-01')
        );
        await inMemoryAnswersRepository.create(createdAnswer);

        await sut.handle({
            answerId: 'answer-01',
            authorId: 'author-01',
            content: 'New content',
        });

        expect(inMemoryAnswersRepository.items[0]).toMatchObject({
            content: 'New content',
        });
    });

    it('should not be able to edit a answer from another user', async () => {
        const createdAnswer = makeAnswer(
            { authorId: new UniqueEntityID('author-01') },
            new UniqueEntityID('answer-01')
        );
        await inMemoryAnswersRepository.create(createdAnswer);

        await expect(
            sut.handle({
                answerId: 'answer-01',
                authorId: 'author-02',
                content: 'New content',
            })
        ).rejects.toBeInstanceOf(Error);
    });
});
