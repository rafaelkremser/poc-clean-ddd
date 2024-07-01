import { GetQuestionBySlugUseCase } from './get-question-by-slug';
import { CreateQuestionUseCase } from './create-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';

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

        const { question } = await sut.handle({
            slug: 'an-example-for-test',
        });

        expect(question.id).toBeTruthy();
        expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id);
    });
});
