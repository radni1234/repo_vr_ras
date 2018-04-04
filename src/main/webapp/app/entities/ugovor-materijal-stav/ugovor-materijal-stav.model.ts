import { BaseEntity } from './../../shared';

export class UgovorMaterijalStav implements BaseEntity {
    constructor(
        public id?: number,
        public naziv?: string,
        public cena?: number,
        public ugovorMaterijal?: BaseEntity,
        public jedMere?: BaseEntity,
    ) {
    }
}
