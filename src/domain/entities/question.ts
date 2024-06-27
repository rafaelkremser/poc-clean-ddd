import { Slug } from './value-objects/slug';
import { Entity } from '../../core/entities/entity';
import { UniqueEntityID } from '../../core/entities/unique-entity-is';

interface QuestionProps {
    authorId: UniqueEntityID;
    title: string;
    content: string;
    slug: Slug;
    bestAnswerId?: UniqueEntityID;
    createdAt: Date;
    updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {}
