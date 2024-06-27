import { UniqueEntityID } from './unique-entity-is';

export class Entity<Props> {
    private _id: UniqueEntityID;
    protected props: any;

    get id() {
        return this._id;
    }

    constructor(props: any, id?: string) {
        this.props = props;
        this._id = new UniqueEntityID(id);
    }
}
