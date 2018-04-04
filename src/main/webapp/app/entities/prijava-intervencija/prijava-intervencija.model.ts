import { BaseEntity } from './../../shared';

export class PrijavaIntervencija implements BaseEntity {
    constructor(
        public id?: number,
        public opis?: string,
        public datum?: any,
        public intervencijaTip?: BaseEntity,
        public prijavaStatus?: BaseEntity,
    ) {
    }
}
