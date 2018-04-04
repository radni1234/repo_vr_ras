import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RasvetaSharedModule } from '../../shared';
import {
    PrijavaStatusService,
    PrijavaStatusPopupService,
    PrijavaStatusComponent,
    PrijavaStatusDetailComponent,
    PrijavaStatusDialogComponent,
    PrijavaStatusPopupComponent,
    PrijavaStatusDeletePopupComponent,
    PrijavaStatusDeleteDialogComponent,
    prijavaStatusRoute,
    prijavaStatusPopupRoute,
    PrijavaStatusResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...prijavaStatusRoute,
    ...prijavaStatusPopupRoute,
];

@NgModule({
    imports: [
        RasvetaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PrijavaStatusComponent,
        PrijavaStatusDetailComponent,
        PrijavaStatusDialogComponent,
        PrijavaStatusDeleteDialogComponent,
        PrijavaStatusPopupComponent,
        PrijavaStatusDeletePopupComponent,
    ],
    entryComponents: [
        PrijavaStatusComponent,
        PrijavaStatusDialogComponent,
        PrijavaStatusPopupComponent,
        PrijavaStatusDeleteDialogComponent,
        PrijavaStatusDeletePopupComponent,
    ],
    providers: [
        PrijavaStatusService,
        PrijavaStatusPopupService,
        PrijavaStatusResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RasvetaPrijavaStatusModule {}
