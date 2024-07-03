import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';

interface CreateQuestionUseCaseRequest {
    authorId: string;
    title: string;
    content: string;
}

interface CreateQuestionUseCaseResponse {
    question: Question;
}

export class CreateQuestionUseCase {
    constructor(private questionRepository: QuestionsRepository) {}

    async handle({
        authorId,
        title,
        content,
    }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
        const question = Question.create({
            authorId: new UniqueEntityID(authorId),
            title,
            content,
        });

        await this.questionRepository.create(question);

        return { question };
    }
}
