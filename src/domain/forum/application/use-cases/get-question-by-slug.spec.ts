import { GetQuestionBySlugUseCase } from './get-question-by-slug';
import { CreateQuestionUseCase } from './create-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

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
        const createdQuestion = makeQuestion({
            title: 'An example for test',
        });
        await inMemoryQuestionsRepository.create(createdQuestion);

        const result = await sut.handle({
            slug: 'an-example-for-test',
        });

        expect(result.isRight()).toBe(true);
    });

    it('should not be able to get a unnexistent slug question', async () => {
        const result = await sut.handle({
            slug: 'an-example-for-test',
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(ResourceNotFoundError);
    });
});
