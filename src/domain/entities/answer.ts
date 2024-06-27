import { randomUUID } from 'node:crypto';

export interface AnswerProps {
    authorId: string;
    questionId: string;
    content: string;
}

export class Answer {
    public content: string;
    public authorId: string;
    public questionId: string;
    public id: string;

    constructor(props: AnswerProps, id?: string) {
        this.content = props.content;
        this.authorId = props.authorId;
        this.questionId = props.questionId;
        this.id = id ?? randomUUID();
    }
}
