import { BaseEntity } from './../../shared';

export class MaterijalTip implements BaseEntity {
    constructor(
        public id?: number,
        public naziv?: string,
    ) {
    }
}
