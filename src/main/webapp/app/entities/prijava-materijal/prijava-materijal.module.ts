import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RasvetaSharedModule } from '../../shared';
import {
    PrijavaMaterijalService,
    PrijavaMaterijalPopupService,
    PrijavaMaterijalComponent,
    PrijavaMaterijalDetailComponent,
    PrijavaMaterijalDialogComponent,
    PrijavaMaterijalPopupComponent,
    PrijavaMaterijalDeletePopupComponent,
    PrijavaMaterijalDeleteDialogComponent,
    prijavaMaterijalRoute,
    prijavaMaterijalPopupRoute,
    PrijavaMaterijalResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...prijavaMaterijalRoute,
    ...prijavaMaterijalPopupRoute,
];

@NgModule({
    imports: [
        RasvetaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PrijavaMaterijalComponent,
        PrijavaMaterijalDetailComponent,
        PrijavaMaterijalDialogComponent,
        PrijavaMaterijalDeleteDialogComponent,
        PrijavaMaterijalPopupComponent,
        PrijavaMaterijalDeletePopupComponent,
    ],
    entryComponents: [
        PrijavaMaterijalComponent,
        PrijavaMaterijalDialogComponent,
        PrijavaMaterijalPopupComponent,
        PrijavaMaterijalDeleteDialogComponent,
        PrijavaMaterijalDeletePopupComponent,
    ],
    providers: [
        PrijavaMaterijalService,
        PrijavaMaterijalPopupService,
        PrijavaMaterijalResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RasvetaPrijavaMaterijalModule {}
