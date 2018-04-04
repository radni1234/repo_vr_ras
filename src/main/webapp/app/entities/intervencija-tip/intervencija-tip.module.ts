import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RasvetaSharedModule } from '../../shared';
import {
    IntervencijaTipService,
    IntervencijaTipPopupService,
    IntervencijaTipComponent,
    IntervencijaTipDetailComponent,
    IntervencijaTipDialogComponent,
    IntervencijaTipPopupComponent,
    IntervencijaTipDeletePopupComponent,
    IntervencijaTipDeleteDialogComponent,
    intervencijaTipRoute,
    intervencijaTipPopupRoute,
    IntervencijaTipResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...intervencijaTipRoute,
    ...intervencijaTipPopupRoute,
];

@NgModule({
    imports: [
        RasvetaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        IntervencijaTipComponent,
        IntervencijaTipDetailComponent,
        IntervencijaTipDialogComponent,
        IntervencijaTipDeleteDialogComponent,
        IntervencijaTipPopupComponent,
        IntervencijaTipDeletePopupComponent,
    ],
    entryComponents: [
        IntervencijaTipComponent,
        IntervencijaTipDialogComponent,
        IntervencijaTipPopupComponent,
        IntervencijaTipDeleteDialogComponent,
        IntervencijaTipDeletePopupComponent,
    ],
    providers: [
        IntervencijaTipService,
        IntervencijaTipPopupService,
        IntervencijaTipResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RasvetaIntervencijaTipModule {}
