import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RasvetaSharedModule } from '../../shared';
import {
    JedMereService,
    JedMerePopupService,
    JedMereComponent,
    JedMereDetailComponent,
    JedMereDialogComponent,
    JedMerePopupComponent,
    JedMereDeletePopupComponent,
    JedMereDeleteDialogComponent,
    jedMereRoute,
    jedMerePopupRoute,
    JedMereResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...jedMereRoute,
    ...jedMerePopupRoute,
];

@NgModule({
    imports: [
        RasvetaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        JedMereComponent,
        JedMereDetailComponent,
        JedMereDialogComponent,
        JedMereDeleteDialogComponent,
        JedMerePopupComponent,
        JedMereDeletePopupComponent,
    ],
    entryComponents: [
        JedMereComponent,
        JedMereDialogComponent,
        JedMerePopupComponent,
        JedMereDeleteDialogComponent,
        JedMereDeletePopupComponent,
    ],
    providers: [
        JedMereService,
        JedMerePopupService,
        JedMereResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RasvetaJedMereModule {}
