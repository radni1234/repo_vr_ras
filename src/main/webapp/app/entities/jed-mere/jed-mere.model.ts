import { BaseEntity } from './../../shared';

export class JedMere implements BaseEntity {
    constructor(
        public id?: number,
        public naziv?: string,
    ) {
    }
}
