import { Entity } from '../../core/entities/entity';
import { UniqueEntityID } from '../../core/entities/unique-entity-is';

interface StudentProps {
    name: string;
}

export class Student extends Entity<StudentProps> {
    static create(props: StudentProps, id?: UniqueEntityID) {
        const question = new Student(
            {
                ...props,
                createdAt: new Date(),
            },
            id
        );

        return question;
    }
}
