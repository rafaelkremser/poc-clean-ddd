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
        const { question } = await sut.handle({
            authorId: 'Jonh Doe',
            title: 'An example for title',
            content: 'An example for response',
        });

        expect(question.id).toBeTruthy();
        expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id);
    });
});
