import { BaseEntity } from './../../shared';

export class Opstina implements BaseEntity {
    constructor(
        public id?: number,
        public naziv?: string,
    ) {
    }
}
