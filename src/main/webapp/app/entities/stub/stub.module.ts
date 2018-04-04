import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RasvetaSharedModule } from '../../shared';
import {
    StubService,
    StubPopupService,
    StubComponent,
    StubDetailComponent,
    StubDialogComponent,
    StubPopupComponent,
    StubDeletePopupComponent,
    StubDeleteDialogComponent,
    stubRoute,
    stubPopupRoute,
    StubResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...stubRoute,
    ...stubPopupRoute,
];

@NgModule({
    imports: [
        RasvetaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StubComponent,
        StubDetailComponent,
        StubDialogComponent,
        StubDeleteDialogComponent,
        StubPopupComponent,
        StubDeletePopupComponent,
    ],
    entryComponents: [
        StubComponent,
        StubDialogComponent,
        StubPopupComponent,
        StubDeleteDialogComponent,
        StubDeletePopupComponent,
    ],
    providers: [
        StubService,
        StubPopupService,
        StubResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RasvetaStubModule {}
