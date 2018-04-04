import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RasvetaSharedModule } from '../../shared';
import {
    PrijavaService,
    PrijavaPopupService,
    PrijavaComponent,
    PrijavaDetailComponent,
    PrijavaDialogComponent,
    PrijavaPopupComponent,
    PrijavaDeletePopupComponent,
    PrijavaDeleteDialogComponent,
    prijavaRoute,
    prijavaPopupRoute,
    PrijavaResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...prijavaRoute,
    ...prijavaPopupRoute,
];

@NgModule({
    imports: [
        RasvetaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PrijavaComponent,
        PrijavaDetailComponent,
        PrijavaDialogComponent,
        PrijavaDeleteDialogComponent,
        PrijavaPopupComponent,
        PrijavaDeletePopupComponent,
    ],
    entryComponents: [
        PrijavaComponent,
        PrijavaDialogComponent,
        PrijavaPopupComponent,
        PrijavaDeleteDialogComponent,
        PrijavaDeletePopupComponent,
    ],
    providers: [
        PrijavaService,
        PrijavaPopupService,
        PrijavaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RasvetaPrijavaModule {}
