import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RasvetaSharedModule } from '../../shared';
import {
    UgovorMaterijalStavService,
    UgovorMaterijalStavPopupService,
    UgovorMaterijalStavComponent,
    UgovorMaterijalStavDetailComponent,
    UgovorMaterijalStavDialogComponent,
    UgovorMaterijalStavPopupComponent,
    UgovorMaterijalStavDeletePopupComponent,
    UgovorMaterijalStavDeleteDialogComponent,
    ugovorMaterijalStavRoute,
    ugovorMaterijalStavPopupRoute,
    UgovorMaterijalStavResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...ugovorMaterijalStavRoute,
    ...ugovorMaterijalStavPopupRoute,
];

@NgModule({
    imports: [
        RasvetaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UgovorMaterijalStavComponent,
        UgovorMaterijalStavDetailComponent,
        UgovorMaterijalStavDialogComponent,
        UgovorMaterijalStavDeleteDialogComponent,
        UgovorMaterijalStavPopupComponent,
        UgovorMaterijalStavDeletePopupComponent,
    ],
    entryComponents: [
        UgovorMaterijalStavComponent,
        UgovorMaterijalStavDialogComponent,
        UgovorMaterijalStavPopupComponent,
        UgovorMaterijalStavDeleteDialogComponent,
        UgovorMaterijalStavDeletePopupComponent,
    ],
    providers: [
        UgovorMaterijalStavService,
        UgovorMaterijalStavPopupService,
        UgovorMaterijalStavResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RasvetaUgovorMaterijalStavModule {}
