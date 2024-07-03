import { CreateQuestionUseCase } from './create-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';
import { EditQuestionUseCase } from './edit-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { title } from 'process';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let createQuestionUseCase: CreateQuestionUseCase;
let sut: EditQuestionUseCase;

describe('Edit Question', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        createQuestionUseCase = new CreateQuestionUseCase(
            inMemoryQuestionsRepository
        );
        sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
    });

    it('should be able to edit a question', async () => {
        const createdQuestion = makeQuestion(
            { authorId: new UniqueEntityID('author-01') },
            new UniqueEntityID('question-01')
        );
        await inMemoryQuestionsRepository.create(createdQuestion);

        await sut.handle({
            questionId: 'question-01',
            authorId: 'author-01',
            title: 'New title',
            content: 'New content',
        });

        expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
            title: 'New title',
            content: 'New content',
        });
    });

    it('should not be able to edit a question from another user', async () => {
        const createdQuestion = makeQuestion(
            { authorId: new UniqueEntityID('author-01') },
            new UniqueEntityID('question-01')
        );
        await inMemoryQuestionsRepository.create(createdQuestion);

        await expect(
            sut.handle({
                questionId: 'question-01',
                authorId: 'author-02',
                title: 'New title',
                content: 'New content',
            })
        ).rejects.toBeInstanceOf(Error);
    });
});
