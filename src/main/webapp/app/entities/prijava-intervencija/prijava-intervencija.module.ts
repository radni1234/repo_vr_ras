import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RasvetaSharedModule } from '../../shared';
import {
    PrijavaIntervencijaService,
    PrijavaIntervencijaPopupService,
    PrijavaIntervencijaComponent,
    PrijavaIntervencijaDetailComponent,
    PrijavaIntervencijaDialogComponent,
    PrijavaIntervencijaPopupComponent,
    PrijavaIntervencijaDeletePopupComponent,
    PrijavaIntervencijaDeleteDialogComponent,
    prijavaIntervencijaRoute,
    prijavaIntervencijaPopupRoute,
    PrijavaIntervencijaResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...prijavaIntervencijaRoute,
    ...prijavaIntervencijaPopupRoute,
];

@NgModule({
    imports: [
        RasvetaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PrijavaIntervencijaComponent,
        PrijavaIntervencijaDetailComponent,
        PrijavaIntervencijaDialogComponent,
        PrijavaIntervencijaDeleteDialogComponent,
        PrijavaIntervencijaPopupComponent,
        PrijavaIntervencijaDeletePopupComponent,
    ],
    entryComponents: [
        PrijavaIntervencijaComponent,
        PrijavaIntervencijaDialogComponent,
        PrijavaIntervencijaPopupComponent,
        PrijavaIntervencijaDeleteDialogComponent,
        PrijavaIntervencijaDeletePopupComponent,
    ],
    providers: [
        PrijavaIntervencijaService,
        PrijavaIntervencijaPopupService,
        PrijavaIntervencijaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RasvetaPrijavaIntervencijaModule {}
