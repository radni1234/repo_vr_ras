import { BaseEntity } from './../../shared';

export class Mesto implements BaseEntity {
    constructor(
        public id?: number,
        public naziv?: string,
        public opstina?: BaseEntity,
    ) {
    }
}
