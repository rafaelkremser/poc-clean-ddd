import { Slug } from './value-objects/slug';
import { Entity } from '../../core/entities/entity';
import { UniqueEntityID } from '../../core/entities/unique-entity-is';
import { Optional } from '../../core/types/optional';

interface QuestionProps {
    authorId: UniqueEntityID;
    title: string;
    content: string;
    slug: Slug;
    bestAnswerId?: UniqueEntityID;
    createdAt: Date;
    updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
    static create(
        props: Optional<QuestionProps, 'createdAt'>,
        id?: UniqueEntityID
    ) {
        const question = new Question(
            {
                ...props,
                createdAt: new Date(),
            },
            id
        );

        return question;
    }
}
