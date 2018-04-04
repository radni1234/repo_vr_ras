import { BaseEntity } from './../../shared';

export class UgovorMaterijal implements BaseEntity {
    constructor(
        public id?: number,
        public opis?: string,
        public datumOd?: any,
        public datumDo?: any,
        public opstina?: BaseEntity,
    ) {
    }
}
