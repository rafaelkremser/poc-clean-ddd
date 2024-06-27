import { expect, test } from 'vitest';
import { AnswerQuestionUseCase } from './answer-question';

test('create an answer', async () => {
    const answerQuestion = new AnswerQuestionUseCase();

    const answer = answerQuestion.handle({
        questionId: '1',
        instructorId: '1',
        content: 'Nova Resposta',
    });

    expect(answer.content).toEqual('Nova Resposta');
});
