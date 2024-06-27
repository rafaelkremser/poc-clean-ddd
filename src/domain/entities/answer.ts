import { Entity } from '../../core/entities/entity';
import { UniqueEntityID } from '../../core/entities/unique-entity-is';

export interface AnswerProps {
    authorId: UniqueEntityID;
    questionId: UniqueEntityID;
    content: string;
}

export class Answer extends Entity<AnswerProps> {
    get content() {
        return this.props.content;
    }
}
