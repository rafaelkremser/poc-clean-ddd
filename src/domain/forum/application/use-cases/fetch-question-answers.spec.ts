import { FetchQuestionAnswersUseCase } from './fetch-question-answers';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { makeAnswer } from 'test/factories/make-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository';

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionAnswersUseCase;

describe('Fetch Question Answers', () => {
    beforeEach(() => {
        inMemoryAnswerAttachmentsRepository =
            new InMemoryAnswerAttachmentsRepository();
        inMemoryAnswersRepository = new InMemoryAnswersRepository(
            inMemoryAnswerAttachmentsRepository
        );

        sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository);
    });

    it('should be able to fetch question answers', async () => {
        await inMemoryAnswersRepository.create(
            makeAnswer({ questionId: new UniqueEntityID('question-01') })
        );
        await inMemoryAnswersRepository.create(
            makeAnswer({ questionId: new UniqueEntityID('question-01') })
        );
        await inMemoryAnswersRepository.create(
            makeAnswer({ questionId: new UniqueEntityID('question-01') })
        );

        const result = await sut.handle({
            questionId: 'question-01',
            page: 1,
        });

        expect(result.value?.answers).toHaveLength(3);
    });

    it('should be able to fetch paginated recent questions', async () => {
        for (let i = 1; i <= 22; i++) {
            await inMemoryAnswersRepository.create(
                makeAnswer({ questionId: new UniqueEntityID('question-01') })
            );
        }

        const result = await sut.handle({
            questionId: 'question-01',
            page: 2,
        });

        expect(result.value?.answers).toHaveLength(2);
    });
});
