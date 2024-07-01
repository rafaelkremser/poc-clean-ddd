import { GetQuestionBySlugUseCase } from './get-question-by-slug';
import { CreateQuestionUseCase } from './create-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { Question } from '../../enterprise/entities/question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let createQuestionUseCase: CreateQuestionUseCase;
let sut: GetQuestionBySlugUseCase;

describe('Get Question By Slug', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        createQuestionUseCase = new CreateQuestionUseCase(
            inMemoryQuestionsRepository
        );
        sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
    });

    it('should be able to get a question', async () => {
        const newQuestion = Question.create({
            authorId: new UniqueEntityID(),
            title: 'An example for title',
            content: 'An example for response',
        });

        await inMemoryQuestionsRepository.create(newQuestion);

        const { question } = await sut.handle({
            slug: 'an-example-for-title',
        });

        expect(question.id).toBeTruthy();
        expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id);
    });
});
