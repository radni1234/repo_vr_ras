import { BaseEntity } from './../../shared';

export class UgovorIntervencijaStav implements BaseEntity {
    constructor(
        public id?: number,
        public naziv?: string,
        public cena?: number,
        public ugovorIntervencija?: BaseEntity,
        public jedMere?: BaseEntity,
    ) {
    }
}
