import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RasvetaSharedModule } from '../../shared';
import {
    SvetiljkaService,
    SvetiljkaPopupService,
    SvetiljkaComponent,
    SvetiljkaDetailComponent,
    SvetiljkaDialogComponent,
    SvetiljkaPopupComponent,
    SvetiljkaDeletePopupComponent,
    SvetiljkaDeleteDialogComponent,
    svetiljkaRoute,
    svetiljkaPopupRoute,
    SvetiljkaResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...svetiljkaRoute,
    ...svetiljkaPopupRoute,
];

@NgModule({
    imports: [
        RasvetaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SvetiljkaComponent,
        SvetiljkaDetailComponent,
        SvetiljkaDialogComponent,
        SvetiljkaDeleteDialogComponent,
        SvetiljkaPopupComponent,
        SvetiljkaDeletePopupComponent,
    ],
    entryComponents: [
        SvetiljkaComponent,
        SvetiljkaDialogComponent,
        SvetiljkaPopupComponent,
        SvetiljkaDeleteDialogComponent,
        SvetiljkaDeletePopupComponent,
    ],
    providers: [
        SvetiljkaService,
        SvetiljkaPopupService,
        SvetiljkaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RasvetaSvetiljkaModule {}
