import { BaseEntity } from './../../shared';

export class Prijava implements BaseEntity {
    constructor(
        public id?: number,
        public opis?: string,
        public prijavio?: string,
        public telefon?: string,
        public email?: string,
        public datum?: any,
        public stub?: BaseEntity,
    ) {
    }
}
