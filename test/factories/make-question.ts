import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
    Question,
    QuestionProps,
} from '@/domain/forum/enterprise/entities/question';

export function makeQuestion(
    override: Partial<QuestionProps> = {},
    id?: UniqueEntityID
) {
    const question = Question.create(
        {
            authorId: new UniqueEntityID(),
            title: faker.lorem.lines(1),
            content: faker.lorem.text(),
            ...override,
        },
        id
    );

    console.log(question.content);

    return question;
}
