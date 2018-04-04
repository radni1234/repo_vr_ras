import { BaseEntity } from './../../shared';

export class SvetiljkaTip implements BaseEntity {
    constructor(
        public id?: number,
        public naziv?: string,
        public izvor?: string,
        public snaga?: number,
    ) {
    }
}
