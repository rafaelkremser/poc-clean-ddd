import { CreateQuestionUseCase } from './create-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe('Create Question', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
    });

    it('should be able to create a question', async () => {
        const result = await sut.handle({
            authorId: 'author-01',
            title: 'An example for title',
            content: 'An example for response',
        });

        expect(result.isRight()).toBe(true);
        expect(inMemoryQuestionsRepository.items[0]).toEqual(
            result.value?.question
        );
    });
});
