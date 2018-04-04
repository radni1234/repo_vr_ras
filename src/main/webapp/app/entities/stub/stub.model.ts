import { BaseEntity } from './../../shared';

export class Stub implements BaseEntity {
    constructor(
        public id?: number,
        public adresa?: string,
        public lonD?: number,
        public latD?: number,
        public rbr?: number,
        public adresaSlike?: string,
        public mesto?: BaseEntity,
        public stubTip?: BaseEntity,
        public status?: BaseEntity,
    ) {
    }
}
