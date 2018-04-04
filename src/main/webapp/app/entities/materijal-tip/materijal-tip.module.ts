import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RasvetaSharedModule } from '../../shared';
import {
    MaterijalTipService,
    MaterijalTipPopupService,
    MaterijalTipComponent,
    MaterijalTipDetailComponent,
    MaterijalTipDialogComponent,
    MaterijalTipPopupComponent,
    MaterijalTipDeletePopupComponent,
    MaterijalTipDeleteDialogComponent,
    materijalTipRoute,
    materijalTipPopupRoute,
    MaterijalTipResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...materijalTipRoute,
    ...materijalTipPopupRoute,
];

@NgModule({
    imports: [
        RasvetaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MaterijalTipComponent,
        MaterijalTipDetailComponent,
        MaterijalTipDialogComponent,
        MaterijalTipDeleteDialogComponent,
        MaterijalTipPopupComponent,
        MaterijalTipDeletePopupComponent,
    ],
    entryComponents: [
        MaterijalTipComponent,
        MaterijalTipDialogComponent,
        MaterijalTipPopupComponent,
        MaterijalTipDeleteDialogComponent,
        MaterijalTipDeletePopupComponent,
    ],
    providers: [
        MaterijalTipService,
        MaterijalTipPopupService,
        MaterijalTipResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RasvetaMaterijalTipModule {}
