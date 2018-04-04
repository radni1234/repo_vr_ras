import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RasvetaSharedModule } from '../../shared';
import {
    MestoService,
    MestoPopupService,
    MestoComponent,
    MestoDetailComponent,
    MestoDialogComponent,
    MestoPopupComponent,
    MestoDeletePopupComponent,
    MestoDeleteDialogComponent,
    mestoRoute,
    mestoPopupRoute,
    MestoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...mestoRoute,
    ...mestoPopupRoute,
];

@NgModule({
    imports: [
        RasvetaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MestoComponent,
        MestoDetailComponent,
        MestoDialogComponent,
        MestoDeleteDialogComponent,
        MestoPopupComponent,
        MestoDeletePopupComponent,
    ],
    entryComponents: [
        MestoComponent,
        MestoDialogComponent,
        MestoPopupComponent,
        MestoDeleteDialogComponent,
        MestoDeletePopupComponent,
    ],
    providers: [
        MestoService,
        MestoPopupService,
        MestoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RasvetaMestoModule {}
