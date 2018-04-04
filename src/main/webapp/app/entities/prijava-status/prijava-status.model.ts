import { BaseEntity } from './../../shared';

export class PrijavaStatus implements BaseEntity {
    constructor(
        public id?: number,
        public opis?: string,
        public datum?: any,
        public trajanje?: number,
        public prijava?: BaseEntity,
        public status?: BaseEntity,
    ) {
    }
}
