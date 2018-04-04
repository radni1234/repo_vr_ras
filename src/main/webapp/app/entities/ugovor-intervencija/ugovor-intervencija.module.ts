import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RasvetaSharedModule } from '../../shared';
import {
    UgovorIntervencijaService,
    UgovorIntervencijaPopupService,
    UgovorIntervencijaComponent,
    UgovorIntervencijaDetailComponent,
    UgovorIntervencijaDialogComponent,
    UgovorIntervencijaPopupComponent,
    UgovorIntervencijaDeletePopupComponent,
    UgovorIntervencijaDeleteDialogComponent,
    ugovorIntervencijaRoute,
    ugovorIntervencijaPopupRoute,
    UgovorIntervencijaResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...ugovorIntervencijaRoute,
    ...ugovorIntervencijaPopupRoute,
];

@NgModule({
    imports: [
        RasvetaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UgovorIntervencijaComponent,
        UgovorIntervencijaDetailComponent,
        UgovorIntervencijaDialogComponent,
        UgovorIntervencijaDeleteDialogComponent,
        UgovorIntervencijaPopupComponent,
        UgovorIntervencijaDeletePopupComponent,
    ],
    entryComponents: [
        UgovorIntervencijaComponent,
        UgovorIntervencijaDialogComponent,
        UgovorIntervencijaPopupComponent,
        UgovorIntervencijaDeleteDialogComponent,
        UgovorIntervencijaDeletePopupComponent,
    ],
    providers: [
        UgovorIntervencijaService,
        UgovorIntervencijaPopupService,
        UgovorIntervencijaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RasvetaUgovorIntervencijaModule {}
