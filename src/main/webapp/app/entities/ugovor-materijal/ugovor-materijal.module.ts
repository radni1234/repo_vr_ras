import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RasvetaSharedModule } from '../../shared';
import {
    UgovorMaterijalService,
    UgovorMaterijalPopupService,
    UgovorMaterijalComponent,
    UgovorMaterijalDetailComponent,
    UgovorMaterijalDialogComponent,
    UgovorMaterijalPopupComponent,
    UgovorMaterijalDeletePopupComponent,
    UgovorMaterijalDeleteDialogComponent,
    ugovorMaterijalRoute,
    ugovorMaterijalPopupRoute,
    UgovorMaterijalResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...ugovorMaterijalRoute,
    ...ugovorMaterijalPopupRoute,
];

@NgModule({
    imports: [
        RasvetaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UgovorMaterijalComponent,
        UgovorMaterijalDetailComponent,
        UgovorMaterijalDialogComponent,
        UgovorMaterijalDeleteDialogComponent,
        UgovorMaterijalPopupComponent,
        UgovorMaterijalDeletePopupComponent,
    ],
    entryComponents: [
        UgovorMaterijalComponent,
        UgovorMaterijalDialogComponent,
        UgovorMaterijalPopupComponent,
        UgovorMaterijalDeleteDialogComponent,
        UgovorMaterijalDeletePopupComponent,
    ],
    providers: [
        UgovorMaterijalService,
        UgovorMaterijalPopupService,
        UgovorMaterijalResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RasvetaUgovorMaterijalModule {}
