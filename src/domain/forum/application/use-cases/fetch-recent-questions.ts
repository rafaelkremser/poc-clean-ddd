import { Question } from '@/domain/forum/enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';

interface FetchRecentQuestionsUseCaseRequest {
    page: number;
}

interface FetchRecentQuestionsUseCaseResponse {
    questions: Question[];
}

export class FetchRecentQuestionsUseCase {
    constructor(private questionRepository: QuestionsRepository) {}

    async handle({
        page,
    }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
        const questions = await this.questionRepository.findManyRecent({
            page,
        });

        return { questions };
    }
}
