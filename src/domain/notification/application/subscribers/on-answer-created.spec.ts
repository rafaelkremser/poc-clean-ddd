import { makeAnswer } from 'test/factories/make-answer';
import { OnAnswerCreated } from './on-answer-created';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';
import {
    SendNotificationUseCase,
    SendNotificationUseCaseRequest,
    SendNotificationUseCaseResponse,
} from '../use-cases/send-notification';
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository';
import { makeQuestion } from 'test/factories/make-question';
import { SpyInstance } from 'vitest';
import { waitFor } from 'test/utils/wait-for';

let inMemoryQuestionsRespository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sendNotificationUseCase: SendNotificationUseCase;

let sendNotificationExecuteSpy: SpyInstance<
    [SendNotificationUseCaseRequest],
    Promise<SendNotificationUseCaseResponse>
>;

describe('On Answer Created', () => {
    beforeEach(() => {
        inMemoryQuestionAttachmentsRepository =
            new InMemoryQuestionAttachmentsRepository();
        inMemoryQuestionsRespository = new InMemoryQuestionsRepository(
            inMemoryQuestionAttachmentsRepository
        );
        inMemoryAnswerAttachmentsRepository =
            new InMemoryAnswerAttachmentsRepository();
        inMemoryAnswersRepository = new InMemoryAnswersRepository(
            inMemoryAnswerAttachmentsRepository
        );
        inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
        sendNotificationUseCase = new SendNotificationUseCase(
            inMemoryNotificationsRepository
        );

        sendNotificationExecuteSpy = vi.spyOn(
            sendNotificationUseCase,
            'handle'
        );

        new OnAnswerCreated(
            inMemoryQuestionsRespository,
            sendNotificationUseCase
        );
    });

    it('should send a notification when an answer is created', async () => {
        const question = makeQuestion();
        const answer = makeAnswer({ questionId: question.id });

        inMemoryQuestionsRespository.create(question);
        inMemoryAnswersRepository.create(answer);

        await waitFor(() => {
            expect(sendNotificationExecuteSpy).toHaveBeenCalled();
        });
    });
});
