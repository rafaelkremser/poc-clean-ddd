import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { QuestionsRepository } from '../repository/questions-repository';

interface GetQuestionBySlugUseCaseRequest {
    slug: string;
}

interface GetQuestionBySlugUseCaseResponse {
    question: Question;
}

export class GetQuestionBySlugUseCase {
    constructor(private questionRepository: QuestionsRepository) {}

    async handle({
        slug,
    }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
        const question = await this.questionRepository.findBySlug(slug);

        if (!question) {
            throw new Error('Question not found');
        }

        return { question };
    }
}
