import { BaseEntity } from './../../shared';

export class Status implements BaseEntity {
    constructor(
        public id?: number,
        public naziv?: string,
        public redosled?: number,
    ) {
    }
}
