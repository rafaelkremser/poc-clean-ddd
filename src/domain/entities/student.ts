import { randomUUID } from 'node:crypto';

export class Student {
    name: string;
    id: string;

    constructor(name: string, id?: string) {
        this.name = name;
        this.id = id ?? randomUUID();
    }
}
