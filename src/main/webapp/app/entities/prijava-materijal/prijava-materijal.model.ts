import { BaseEntity } from './../../shared';

export class PrijavaMaterijal implements BaseEntity {
    constructor(
        public id?: number,
        public kolicina?: number,
        public opis?: string,
        public datum?: any,
        public materijalTip?: BaseEntity,
        public prijavaIntervencija?: BaseEntity,
    ) {
    }
}
