import { BaseEntity } from './../../shared';

export class IntervencijaTip implements BaseEntity {
    constructor(
        public id?: number,
        public naziv?: string,
    ) {
    }
}
