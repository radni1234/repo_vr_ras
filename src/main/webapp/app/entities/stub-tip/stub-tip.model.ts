import { BaseEntity } from './../../shared';

export class StubTip implements BaseEntity {
    constructor(
        public id?: number,
        public naziv?: string,
    ) {
    }
}
