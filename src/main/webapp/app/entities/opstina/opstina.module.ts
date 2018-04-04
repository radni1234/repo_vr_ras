import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RasvetaSharedModule } from '../../shared';
import {
    OpstinaService,
    OpstinaPopupService,
    OpstinaComponent,
    OpstinaDetailComponent,
    OpstinaDialogComponent,
    OpstinaPopupComponent,
    OpstinaDeletePopupComponent,
    OpstinaDeleteDialogComponent,
    opstinaRoute,
    opstinaPopupRoute,
    OpstinaResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...opstinaRoute,
    ...opstinaPopupRoute,
];

@NgModule({
    imports: [
        RasvetaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OpstinaComponent,
        OpstinaDetailComponent,
        OpstinaDialogComponent,
        OpstinaDeleteDialogComponent,
        OpstinaPopupComponent,
        OpstinaDeletePopupComponent,
    ],
    entryComponents: [
        OpstinaComponent,
        OpstinaDialogComponent,
        OpstinaPopupComponent,
        OpstinaDeleteDialogComponent,
        OpstinaDeletePopupComponent,
    ],
    providers: [
        OpstinaService,
        OpstinaPopupService,
        OpstinaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RasvetaOpstinaModule {}
