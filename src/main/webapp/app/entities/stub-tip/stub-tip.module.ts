import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RasvetaSharedModule } from '../../shared';
import {
    StubTipService,
    StubTipPopupService,
    StubTipComponent,
    StubTipDetailComponent,
    StubTipDialogComponent,
    StubTipPopupComponent,
    StubTipDeletePopupComponent,
    StubTipDeleteDialogComponent,
    stubTipRoute,
    stubTipPopupRoute,
    StubTipResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...stubTipRoute,
    ...stubTipPopupRoute,
];

@NgModule({
    imports: [
        RasvetaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StubTipComponent,
        StubTipDetailComponent,
        StubTipDialogComponent,
        StubTipDeleteDialogComponent,
        StubTipPopupComponent,
        StubTipDeletePopupComponent,
    ],
    entryComponents: [
        StubTipComponent,
        StubTipDialogComponent,
        StubTipPopupComponent,
        StubTipDeleteDialogComponent,
        StubTipDeletePopupComponent,
    ],
    providers: [
        StubTipService,
        StubTipPopupService,
        StubTipResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RasvetaStubTipModule {}
