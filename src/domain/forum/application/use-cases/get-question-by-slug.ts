import { Question } from '@/domain/forum/enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';
import { left } from '@/core/either';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

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
            return left(new ResourceNotFoundError());
        }

        return { question };
    }
}
