import { randomUUID } from 'node:crypto';

export class Question {
    public title: string;
    public content: string;
    public authorId: string;
    public id: string;

    constructor(title: string, content: string, authorId: string, id?: string) {
        this.title = title;
        this.content = content;
        this.authorId = authorId;
        this.id = id ?? randomUUID();
    }
}
