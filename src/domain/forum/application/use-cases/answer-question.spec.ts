import { AnswerQuestionUseCase } from './answer-question';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe('Create Question', () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
    });

    it('should be able to create a question', async () => {
        const { answer } = await sut.handle({
            questionId: '1',
            instructorId: '1',
            content: 'Nova Resposta',
        });

        expect(answer.id).toBeTruthy();
        expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id);
    });
});
