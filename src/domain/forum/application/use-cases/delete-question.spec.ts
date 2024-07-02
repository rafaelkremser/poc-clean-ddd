import { CreateQuestionUseCase } from './create-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';
import { DeleteQuestionUseCase } from './delete-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let createQuestionUseCase: CreateQuestionUseCase;
let sut: DeleteQuestionUseCase;

describe('Delete Question', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        createQuestionUseCase = new CreateQuestionUseCase(
            inMemoryQuestionsRepository
        );
        sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
    });

    it('should be able to delete a question', async () => {
        const createdQuestion = makeQuestion(
            { authorId: new UniqueEntityID('author-01') },
            new UniqueEntityID('question-01')
        );
        await inMemoryQuestionsRepository.create(createdQuestion);

        await sut.handle({
            questionId: 'question-01',
            authorId: 'author-01',
        });

        expect(inMemoryQuestionsRepository.items[0]).toBeFalsy();
    });

    it('should not be able to delete a question from another user', async () => {
        const createdQuestion = makeQuestion(
            { authorId: new UniqueEntityID('author-01') },
            new UniqueEntityID('question-01')
        );
        await inMemoryQuestionsRepository.create(createdQuestion);

        await expect(
            sut.handle({
                questionId: 'question-01',
                authorId: 'author-02',
            })
        ).rejects.toBeInstanceOf(Error);
    });
});
