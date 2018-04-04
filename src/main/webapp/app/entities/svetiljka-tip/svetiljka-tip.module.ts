import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RasvetaSharedModule } from '../../shared';
import {
    SvetiljkaTipService,
    SvetiljkaTipPopupService,
    SvetiljkaTipComponent,
    SvetiljkaTipDetailComponent,
    SvetiljkaTipDialogComponent,
    SvetiljkaTipPopupComponent,
    SvetiljkaTipDeletePopupComponent,
    SvetiljkaTipDeleteDialogComponent,
    svetiljkaTipRoute,
    svetiljkaTipPopupRoute,
    SvetiljkaTipResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...svetiljkaTipRoute,
    ...svetiljkaTipPopupRoute,
];

@NgModule({
    imports: [
        RasvetaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SvetiljkaTipComponent,
        SvetiljkaTipDetailComponent,
        SvetiljkaTipDialogComponent,
        SvetiljkaTipDeleteDialogComponent,
        SvetiljkaTipPopupComponent,
        SvetiljkaTipDeletePopupComponent,
    ],
    entryComponents: [
        SvetiljkaTipComponent,
        SvetiljkaTipDialogComponent,
        SvetiljkaTipPopupComponent,
        SvetiljkaTipDeleteDialogComponent,
        SvetiljkaTipDeletePopupComponent,
    ],
    providers: [
        SvetiljkaTipService,
        SvetiljkaTipPopupService,
        SvetiljkaTipResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RasvetaSvetiljkaTipModule {}
