import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { makeAnswer } from 'test/factories/make-answer';
import { DeleteAnswerUseCase } from './delete-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswerQuestionUseCase } from './answer-question';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let answerQuestionUseCase: AnswerQuestionUseCase;
let sut: DeleteAnswerUseCase;

describe('Delete Answer', () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        answerQuestionUseCase = new AnswerQuestionUseCase(
            inMemoryAnswersRepository
        );
        sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
    });

    it('should be able to delete a answer', async () => {
        const createdAnswer = makeAnswer(
            { authorId: new UniqueEntityID('author-01') },
            new UniqueEntityID('answer-01')
        );
        await inMemoryAnswersRepository.create(createdAnswer);

        await sut.handle({
            answerId: 'answer-01',
            authorId: 'author-01',
        });

        expect(inMemoryAnswersRepository.items[0]).toBeFalsy();
    });

    it('should not be able to delete a answer from another user', async () => {
        const createdAnswer = makeAnswer(
            { authorId: new UniqueEntityID('author-01') },
            new UniqueEntityID('answer-01')
        );
        await inMemoryAnswersRepository.create(createdAnswer);

        await expect(
            sut.handle({
                answerId: 'answer-01',
                authorId: 'author-02',
            })
        ).rejects.toBeInstanceOf(Error);
    });
});
