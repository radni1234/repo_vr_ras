import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RasvetaSharedModule } from '../../shared';
import {
    UgovorIntervencijaStavService,
    UgovorIntervencijaStavPopupService,
    UgovorIntervencijaStavComponent,
    UgovorIntervencijaStavDetailComponent,
    UgovorIntervencijaStavDialogComponent,
    UgovorIntervencijaStavPopupComponent,
    UgovorIntervencijaStavDeletePopupComponent,
    UgovorIntervencijaStavDeleteDialogComponent,
    ugovorIntervencijaStavRoute,
    ugovorIntervencijaStavPopupRoute,
    UgovorIntervencijaStavResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...ugovorIntervencijaStavRoute,
    ...ugovorIntervencijaStavPopupRoute,
];

@NgModule({
    imports: [
        RasvetaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UgovorIntervencijaStavComponent,
        UgovorIntervencijaStavDetailComponent,
        UgovorIntervencijaStavDialogComponent,
        UgovorIntervencijaStavDeleteDialogComponent,
        UgovorIntervencijaStavPopupComponent,
        UgovorIntervencijaStavDeletePopupComponent,
    ],
    entryComponents: [
        UgovorIntervencijaStavComponent,
        UgovorIntervencijaStavDialogComponent,
        UgovorIntervencijaStavPopupComponent,
        UgovorIntervencijaStavDeleteDialogComponent,
        UgovorIntervencijaStavDeletePopupComponent,
    ],
    providers: [
        UgovorIntervencijaStavService,
        UgovorIntervencijaStavPopupService,
        UgovorIntervencijaStavResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RasvetaUgovorIntervencijaStavModule {}
