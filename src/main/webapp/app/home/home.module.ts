import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RasvetaSharedModule } from '../shared';
import { AgmCoreModule } from '@agm/core';

import { HOME_ROUTE, HomeComponent } from './';

@NgModule({
    imports: [
        RasvetaSharedModule,
        RouterModule.forChild([ HOME_ROUTE ]),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBFai77JKJpWYUJCMug80K5KYw49dk2RYc', libraries: ['places'], language: 'sh'
        })
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RasvetaHomeModule {}
