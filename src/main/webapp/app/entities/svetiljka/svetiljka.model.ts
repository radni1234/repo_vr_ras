import { BaseEntity } from './../../shared';

export class Svetiljka implements BaseEntity {
    constructor(
        public id?: number,
        public kom?: number,
        public stub?: BaseEntity,
        public svetiljkaTip?: BaseEntity,
    ) {
    }
}
